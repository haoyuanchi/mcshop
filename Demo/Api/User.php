<?php

class Api_User extends PhalApi_Api {
    private $verifyBaseUrl = 'http://113.108.202.195:8081/epoService/wxJson/updateVip.action?';

    public function getRules() {
        return array(
            'bind' => array(
                'openId' => array('name' => 'openid', 'type' => 'string', 'require' => true, 'desc' => '用户ID'),
                'name' => array('name' => 'name', 'type' => 'string', 'require' => true, 'desc' => '用户姓名'),
                'tel' => array('name' => 'tel', 'type' => 'string', 'require' => true, 'desc' => '用户手机号'),
            ),
            'getBaseInfo' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
            ),
			'modifyInfo' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
				'province' => array('name' => 'province', 'type' => 'string', 'require' => true, 'desc' => '省'),
				'city' => array('name' => 'city', 'type' => 'string', 'require' => true, 'desc' => '市'),
				'area' => array('name' => 'area', 'type' => 'string', 'require' => true, 'desc' => '县区'),
				'detail' => array('name' => 'detail', 'type' => 'string', 'require' => true, 'desc' => '具体地址'),
				'birY' => array('name' => 'birthday_y', 'type' => 'string', 'require' => true, 'desc' => '出生年'),
				'birM' => array('name' => 'birthday_m', 'type' => 'string', 'require' => true, 'desc' => '出生月'),
				'birD' => array('name' => 'birthday_d', 'type' => 'string', 'require' => true, 'desc' => '出生日'),
				'tel' => array('name' => 'tel', 'type' => 'string', 'require' => true, 'desc' => '电话'),
				'pro' => array('name' => 'profession', 'type' => 'string', 'require' => true, 'desc' => '行业'),
				'job' => array('name' => 'job', 'type' => 'string', 'require' => true, 'desc' => '职业'),
				'hobby' => array('name' => 'hobby', 'type' => 'string', 'require' => true, 'desc' => '爱好'),
            ),
			'getGiftAuthority' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
            ),
			'getGift' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
				'address' => array('name' => 'address', 'type' => 'string', 'require' => false, 'desc' => '全部地址'),
            ),
            'getVerifyCode' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
            ),
        );
    }

    /**
     * 绑定微信用户
     * @desc 绑定微信用户
     * @return int user_id
     * @return string msg 提示信息
     */
    public function bind() {
        $ret['code'] = 0;

        $domain = new Domain_User();
        $userId = $domain->bind($this->openId, $this->name, $this->tel);
        if($userId == null){
            $ret['code'] = 1;
            $ret['msg'] = "请确认你所填号码名字和服务门店所留号码名字一致";
            return $ret;
        }

        $info = $domain->getBaseInfo($userId);
        return $info;
    }

    /**
     * 获取用户基本信息 
     * @desc 用于获取单个用户基本信息 vip会员主页积个人资料也
     * @return int code 操作码，0表示成功， 1表示用户不存在
     * @return object info 用户信息对象
     * @return int info.id 用户ID
     * @return string info.name 用户名字
     * @return string info.tel 用户手机号
     * @return string info.birthd 用户生日
     * @return object info.card vip卡信息
     * @return string info.card.brand  vip卡所属品牌
     * @return string info.card.id  vip卡编号
     * @return string info.card.level  vip卡几折卡
     * @return string info.card.store  vip卡开卡店铺
     * @return int info.integral   用户积分
     * @return int info.integral_expired   用户即将到期积分
     * @return string info.recent_cost   近一年累计消费额
     * @return int info.coupon   用户优惠券积分
     * @return string msg 提示信息
     */
    public function getBaseInfo() {
        $rs = array('code' => 0, 'msg' => '', 'info' => array());

        $domain = new Domain_User();
        $info = $domain->getBaseInfo($this->userId);

        if (empty($info)) {
            DI()->logger->debug('user not found', $this->userId);

            $rs['code'] = 1;
            $rs['msg'] = T('user not exists');
            return $rs;
        }

        $rs['info'] = $info;

        return $rs;
    }

	/**
     * 完善基本信息 
     * @desc 完善个人资料获取积分
     * @return int code 操作码
     * @return string msg 提示信息
     */
    public function modifyInfo() {
        $ret['code'] = 0;

        $userInfo['province'] = $this->province;
        $userInfo['city'] = $this->city;
        $userInfo['area'] = $this->area;
        $userInfo['address'] = $this->province.$this->city.$this->area.$this->detail;
        $userInfo['birth'] =date("Y-m-d", strtotime($this->birY.'-'.$this->birM.'-'.$this->birD));

        $userInfo['mobile'] = $this->tel;
        //$userInfo['pro'] = $this->pro;    // 行业
        $userInfo['occupation'] = $this->job;
        $userInfo['hobby'] = $this->hobby;

        $userModel = new Model_User();

        $ret['is_success'] = $userModel->update($this->userId, $userInfo);

        // 强制更新
        $ret['user'] = $userModel->getByUserId($this->userId);
        return $ret;
    }
	
	/**
     * 获取领取礼物权限 
     * @desc 获取领取礼物权限 
     * @return int code 操作码，
	 * @return int is_authority 是否能够领取礼物
     * @return int rank 会员等级
     * @return string addr 地址
     * @return string vip_code VIP会员号
     * @return string vip_number VIP卡号
     * @return string tel 会员手机号
     * @return string msg 提示信息
     */
    public function getGiftAuthority() {
        // 获取生日为本月的所有用户， 查看用户是否在该用户中
        $currentMonth = intval(date('m',time()));
        /*$modelCurrentBirth = new Model_ViewMemberCurrentBirth();
        $ret['is_authority'] = $modelCurrentBirth->isGiftAuthority($this->userId);*/

        $modelUser = new Model_User();
        $userInfo = $modelUser->getByUserId($this->userId);

        $ret['gift']['is_authority'] = $modelUser->isGiftAuthority($this->userId, $currentMonth);

        if($ret['gift']['is_authority']){
            if($userInfo['amount'] > 20000){
                $ret['gift']['status'] = 2;
                $ret['gift']['msg'] = '礼品';
            }
            else if($userInfo['amount'] > 0){
                $ret['gift']['status'] = 1;
                $ret['gift']['msg'] = '贺卡';
            }
            else{
                $ret['gift']['status'] = 0;
                $ret['gift']['msg'] = '祝福语';
            }
        }

        $ret['user']['rank_id'] = $userInfo['member_rank_id'];
        $ret['user']['rank_name'] = $userInfo['member_rank_name'];
        $ret['user']['addr'] = $userInfo['address'];
        $ret['user']['vip_code'] = $userInfo['vip_code'];
        $ret['user']['vip_number'] = $userInfo['vip_number'];
        $ret['user']['tel'] = $userInfo['mobile'];


        return $ret;
    }
	
	/**
     * 填写收货地址信息获取礼物
     * @desc 填写收货地址信息获取礼物
     * @return int code 操作码，
     * @return string msg 提示信息
     */
    public function getGift() {
        // 输出用户级别
        $userModel = new Model_User();
        $userInfo['is_get_gift'] = 1;
        if(!empty($this->address)){
            $userInfo['address'] = $this->address;
        }
        $userModel->update($this->userId, $userInfo);

        $ret['code'] = 0;

        return $ret;
    }

    /**
     * 获取五折卡验证码
     * @desc 获取五折卡验证码
     * @return int code 操作码
     * @return int verify_code 五折卡验证码
     * @return string msg 提示信息
     */
    public function getVerifyCode(){
        $ret['code'] = 0;

        $userModel = new Model_User();
        $userInfo = $userModel->getByUserId($this->userId);

        $token = sha1($userInfo['vip_number'].'+moco@wechat2013');
        $url = $this->verifyBaseUrl.'token='.$token.'&c='.$userInfo['vip_number'].'&n='.$userInfo['name'].'&type=9';

        $curl = new PhalApi_CUrl(2);
        $rs = json_decode($curl->get($url));

        $ret['verify_code'] = $rs['data']['code'];

        $ret['msg'] = '';

        return $ret;
    }

}
