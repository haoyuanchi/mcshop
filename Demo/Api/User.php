<?php

class Api_User extends PhalApi_Api {
    private $queryUserBaseUrl = 'http://113.108.202.195:8081/epoService/vipJson/proc.action?do=customer_get';
    private $addUserBaseUrl = 'http://113.108.202.195:8081/epoService/vipJson/proc.action?do=customer_add';
    private $updateUserBaseUrl = 'http://113.108.202.195:8081/epoService/vipJson/proc.action?do=customer_up';

    private $verifyBaseUrl = 'http://113.108.202.195:8081/epoService/wxJson/updateVip.action?';
    private $mobileCodeBaseUrl = "http://113.108.202.195:8081/epoService/ishow/GetValidationCode.action?";

    public function getRules() {
        return array(
            'bind' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
                'name' => array('name' => 'name', 'type' => 'string', 'require' => true, 'desc' => '用户姓名'),
                'tel' => array('name' => 'tel', 'type' => 'string', 'require' => true, 'desc' => '用户手机号'),
            ),
            'isRegister' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
                'name' => array('name' => 'name', 'type' => 'string', 'require' => true, 'desc' => '用户姓名'),
                'tel' => array('name' => 'tel', 'type' => 'string', 'require' => true, 'desc' => '用户手机号'),
            ),
            'getMobileValidationCode' => array(
                'vipCardCode' => array('name' => 'vip_cardno', 'type' => 'string', 'require' => true, 'desc' => 'vip卡号'),
            ),
            'getUserInfo' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
            ),
            'register' => array(
                'openId' => array('name' => 'openid', 'type' => 'string', 'require' => true, 'desc' => '用户微信ID'),
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
                'userName' => array('name' => 'user_name', 'type' => 'string', 'require' => true, 'desc' => '用户的姓名，请填写真实的姓名，后面无法更改'),
                'province' => array('name' => 'province', 'type' => 'string', 'require' => true, 'desc' => '省'),
                'city' => array('name' => 'city', 'type' => 'string', 'require' => true, 'desc' => '市'),
                'area' => array('name' => 'area', 'type' => 'string', 'require' => true, 'desc' => '县区'),
                'detail' => array('name' => 'detail', 'type' => 'string', 'require' => true, 'desc' => '具体地址'),
                'birY' => array('name' => 'birthday_y', 'type' => 'string', 'require' => true, 'desc' => '出生年'),
                'birM' => array('name' => 'birthday_m', 'type' => 'string', 'require' => true, 'desc' => '出生月'),
                'birD' => array('name' => 'birthday_d', 'type' => 'string', 'require' => true, 'desc' => '出生日'),
                'tel' => array('name' => 'tel', 'type' => 'string', 'require' => true, 'desc' => '电话'),
                'profession' => array('name' => 'profession', 'type' => 'string', 'require' => true, 'desc' => '行业'),
                'occupation' => array('name' => 'occupation', 'type' => 'string', 'require' => true, 'desc' => '职业'),
                'hobby' => array('name' => 'hobby', 'type' => 'string', 'require' => true, 'desc' => '爱好'),
                'storeCode' => array('name' => 'store_code', 'type' => 'string', 'require' => true, 'desc' => '用户所属店铺'),
            ),
			'modifyInfo' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
                'openId' => array('name' => 'openid', 'type' => 'string', 'require' => true, 'desc' => '用户微信ID'),
				'province' => array('name' => 'province', 'type' => 'string', 'require' => true, 'desc' => '省'),
				'city' => array('name' => 'city', 'type' => 'string', 'require' => true, 'desc' => '市'),
				'area' => array('name' => 'area', 'type' => 'string', 'require' => true, 'desc' => '县区'),
				'detail' => array('name' => 'detail', 'type' => 'string', 'require' => true, 'desc' => '具体地址'),
				'tel' => array('name' => 'tel', 'type' => 'string', 'require' => true, 'desc' => '电话'),
				'profession' => array('name' => 'profession', 'type' => 'string', 'require' => true, 'desc' => '行业'),
				'occupation' => array('name' => 'occupation', 'type' => 'string', 'require' => true, 'desc' => '职业'),
				'hobby' => array('name' => 'hobby', 'type' => 'string', 'require' => true, 'desc' => '爱好'),
                'storeCode' => array('name' => 'store_code', 'type' => 'string', 'require' => false, 'desc' => '用户所属店铺'),
            ),
			'getGiftAuthority' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
            ),
			'getGift' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
				'address' => array('name' => 'address', 'type' => 'string', 'require' => false, 'desc' => '全部地址'),
				'tel' => array('name' => 'tel', 'type' => 'string', 'require' => false, 'desc' => '领取礼物的电话'),
            ),
            'getVerifyCode' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
            ),
        );
    }


    /**
     * 是否注册用户
     * @desc 是否注册用户
     * @return int user_id
     * @return string msg 提示信息
     */
    public function isRegister(){
        $ret['code'] = 0;

        $domain = new Domain_WxUser();

        $ret['is_register'] = $domain->isRegister($this->userId, $this->brandId, $this->name, $this->tel);

        $ret['msg'] = "请确认你所填号码名字和服务门店所留号码名字一致";

        return $ret;
    }

    /**
     * 绑定微信用户
     * @desc 绑定微信用户
     * @return int user_id
     * @return string msg 提示信息
     */
    public function bind() {
        $ret['code'] = 0;

        $domain = new Domain_WxUser();

        $userInfo = $domain->bind($this->userId, $this->brandId, $this->name, $this->tel);
        if($userInfo == false){
            $ret['code'] = 1;
            $ret['msg'] = "请确认你所填号码名字和服务门店所留号码名字一致";
            return $ret;
        } else if($domain->isComplete($userInfo) == false) {
            $ret['code'] = 2;
            $ret['msg'] = "跳转到用户信息完善页面进行用户信息完善";
            $ret['user_info'] = $userInfo;
            $ret['redirect_url'] = "http://bbbccc.moco.com.cn/mcshop/app/mobile/usercenter/wx_infomodify.html";
            return $ret;
        } else {
            $ret['msg'] = '绑定成功';
            $ret['user_info'] = $userInfo;
            $ret['redirect_url'] = "http://bbbccc.moco.com.cn/mcshop/app/mobile/mobileIndex.html";
            return $ret;
        }

        return $ret;
    }

    /**
     * 获取手机短信验证码
     * @desc 获取短信验证码
     * @return string msg 提示信息
     */
    public function getMobileValidationCode() {
        $ret['code'] = 0;

        $token = sha1($this->vipCardCode.'+moco@wechat2013');
        $url = $this->mobileCodeBaseUrl.'token='.$token.'&vipCarCode='.$this->vipCardCode;

        $curl = new PhalApi_CUrl(2);
        $rs = json_decode($curl->get($url));

        if($rs->result == "true"){
            $ret['verify_code'] = $rs->verifySelf;
            $ret['msg'] = '';
        }
        else{
            $ret['code'] = 1;
            $ret['msg'] = '获取验证码失败，请重试';
            return $ret;
        }

        return $ret;
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
    public function getUserInfo() {
        $rs = array('code' => 0, 'msg' => '', 'info' => array());

        $domain = new Domain_WxUser();
        $userInfo = $domain->getUserInfoFromErp($this->userId, $this->brandId);

        if (empty($userInfo)) {
            DI()->logger->debug('user not found', $this->userId);

            $rs['code'] = 1;
            $rs['msg'] = T('user not exists');
            return $rs;
        }

        $rs['info'] = $userInfo;

        return $rs;
    }

    /**
     * 注册用户
     * @desc 注册用户
     * @return int code 操作码
     * @return string msg 提示信息
     */
    public function register() {
        $ret['code'] = 0;

        $memberInfo['province'] = $this->province;
        $memberInfo['city'] = $this->city;
        $memberInfo['area'] = $this->area;
        $memberInfo['detail'] = $this->detail;
        $memberInfo['address'] = $this->province.$this->city.$this->area.$this->detail;
        $memberInfo['birth'] =date("Y-m-d", strtotime($this->birY.'-'.$this->birM.'-'.$this->birD));

        $memberInfo['mobile'] = $this->tel;
        $memberInfo['profession'] = $this->profession;    // 行业
        $memberInfo['occupation'] = $this->occupation;
        $memberInfo['hobby'] = $this->hobby;
        $memberInfo['brand_id'] = $this->brandId;

        $birthday = $memberInfo['birth'];

        if($this->brandId == 18){
            $brandId = 1;
        }elseif($this->brandId == 19){
            $brandId = 23;
        } else {
            $ret['code'] = 1;
            $ret['msg'] = '请输入正确的品牌编号';
            return $ret;
        }

        $domain = new Domain_WxUser();
        if($domain->isRegisterByOpenId($this->openId, $this->brandId)){
            $ret['code'] = 1;
            $ret['msg'] = '该微信已经被注册，请核证后在试';
            return $ret;
        }

        $memberInfo['name'] = $this->userName;
        $memberInfo['store_code'] = $this->storeCode;

        // 调用接口获取用户的vip卡号
        $addUserUrl = "$this->addUserBaseUrl&openId=$this->openId&brand=$brandId&phone=$this->tel&name=$this->userName&birthday=$birthday&storecode=$this->storeCode";
        $curl = new PhalApi_CUrl(2);
        $memberERP = json_decode($curl->get($addUserUrl));

        if($memberERP->success == '0'){
            $ret['code'] = 1;
            $ret['msg'] = $memberERP->errMsg;
            return $ret;
        }

        $memberData = $memberERP->data;

        $memberInfo['vip_no'] = $memberData->vipno;
        $memberInfo['vip_cardno'] = $memberData->vipcard;
        $memberInfo['vip_type'] = $memberData->viptype;
        $memberInfo['store_name'] = $memberData->storename;

        // 用户等级信息
        $memberInfo['grade_id'] = $memberData->gradeId;
        $memberInfo['grade_name'] = $memberData->gradeName;
        $memberInfo['grade_discount'] = $memberData->gradeDiscount;

        $ret['is_success'] = $domain->register($this->userId, $memberInfo);

        $ret['user'] = $domain->getUserInfo($this->userId, $this->brandId);

        return $ret;
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
        $userInfo['detail'] = $this->detail;
        $userInfo['address'] = $this->province.$this->city.$this->area.$this->detail;

        $userInfo['mobile'] = $this->tel;
        $userInfo['profession'] = $this->profession;    // 行业
        $userInfo['occupation'] = $this->occupation;
        $userInfo['hobby'] = $this->hobby;
        $userInfo['brand_id'] = $this->brandId;

        if($this->brandId == 18){
            $brandId = 1;
        }elseif($this->brandId == 19){
            $brandId = 23;
        } else {
            $ret['code'] = 1;
            $ret['msg'] = '请输入正确的品牌编号';
            return $ret;
        }

        $domain = new Domain_WxUser();

        $userData = $domain->getUserInfo($this->userId, $this->brandId);
        $name = $userData['name'];
        $birth = $userData['birth'];
        $sex = $userData['gender'];
        // 调用接口获取用户的vip卡号
        $updateUserUrl = "$this->updateUserBaseUrl&openId=$this->openId&brand=$brandId&phone=$this->tel&name=$name&birthday=$birth&sex=$sex";
        $curl = new PhalApi_CUrl(2);
        $memberERP = json_decode($curl->get($updateUserUrl));

        if($memberERP->success == "0"){
            $ret['code'] = 1;
            $ret['msg'] = '更新用户信息失败';
            return $ret;
        }else{
            $ret['is_success'] = $domain->update($this->userId, $userInfo);

            if($ret['is_success']){
                if(!empty($this->storeCode)){
                    // 提交申请进行用户店铺修改
                    $modifyApply['store_code'] = $this->storeCode;
                    $modifyApply['user_id'] = $this->userId;
                    $modifyApply['create_date'] = date('Y-m-d H:i:s');

                    $modelModifyLog = new Model_ModifyApplyLog();
                    $modelModifyLog->insert($modifyApply);
                }
            }
        }

        $ret['user'] = $domain->getUserInfo($this->userId, $this->brandId);

        $ret['msg'] = '';

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

        $userModel = new Model_WxUser();
        $ret['gift']['is_authority'] = $userModel->isGiftAuthority($this->userId, $currentMonth);

        if($ret['gift']['is_authority']){
            $domain = new Domain_WxUser();
            $memberInfo = $domain->getUserInfo($this->userId, $this->brandId);

            // TODO 一年消费额满2w
            if($memberInfo['amount'] > 20000){
                $ret['gift']['status'] = 2;
                $ret['gift']['msg'] = '礼品';
            }
            else if($memberInfo['amount'] > 0){
                $ret['gift']['status'] = 1;
                $ret['gift']['msg'] = '贺卡';
            }
            else{
                $ret['gift']['status'] = 0;
                $ret['gift']['msg'] = '祝福语';
            }
        }

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
        $userModel = new Model_WxUser();
        $memberInfo['is_get_gift'] = 1;
        if(!empty($this->address)){
            $memberInfo['gift_address'] = $this->address;
            $memberInfo['gift_tel'] = $this->tel;
        }

        $userModel->update($this->userId, $memberInfo);

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

        $model = new Model_WxUser();
        $userInfo = $model->getByUserId($this->userId);

        $token = sha1($userInfo['vip_cardno'].'+moco@wechat2013');
        $url = $this->mobileCodeBaseUrl.'token='.$token.'&vipCarCode='.$userInfo['vip_cardno'];

        $curl = new PhalApi_CUrl(2);
        $rs = json_decode($curl->get($url));

        if($rs->result == "true"){
            $ret['verify_code'] = $rs->verifySelf;
            DI()->logger->debug('用户验证码', array('code'=>$rs->verifySelf, 'userid'=>$userInfo['id'], 'date'=>date('Y-m-d H:i:s')));
        }else{
            $ret['code'] = 1;
            $ret['msg'] = '获取验证码失败，请重试';
            DI()->logger->error('获取验证码失败', array('date'=>date('Y-m-d H:i:s'), 'userid'=>$userInfo['id'], 'error'=>$rs->errMsg));
            return $ret;
        }

        $ret['msg'] = '';

        return $ret;
    }

}
