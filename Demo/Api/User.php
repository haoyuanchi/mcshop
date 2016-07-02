<?php

class Api_User extends PhalApi_Api {
    public function getRules() {
        return array(
            'bind' => array(
                'openId' => array('name' => 'openid', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
                'name' => array('name' => 'name', 'type' => 'string', 'require' => true, 'desc' => '用户姓名'),
                'tel' => array('name' => 'tel', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户手机号'),
            ),
            'getBaseInfo' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
            ),
			'modifyInfo' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户ID'),
				'provinceId' => array('name' => 'provice_id', 'type' => 'int', 'require' => true, 'desc' => '省id'),
				'cityId ' => array('name' => 'city_id', 'type' => 'int', 'require' => true, 'desc' => '市id'),
				'countyId' => array('name' => 'county_id', 'type' => 'int', 'require' => true, 'desc' => '县区id'),
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
				'detail' => array('name' => 'detail', 'type' => 'string', 'require' => true, 'desc' => '具体地址'),
				'cardId' => array('name' => 'card_id', 'type' => 'string', 'require' => true, 'desc' => '卡号'),
				'tel' => array('name' => 'tel', 'type' => 'string', 'require' => true, 'desc' => '电话'),
            ),
        );
    }

    /**
     * 绑定微信用户
     * @desc 完善个人资料获取积分
     * @return int user_id
     * @return string msg 提示信息
     */
    public function bind() {
        $domain = new Domain_User();
        $userId = $domain->bing($this->openId, $this->name, $this->tel);
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
     * @return int code 操作码，

     * @return string msg 提示信息
     */
    public function modifyInfo() {
        

    }
	
	/**
     * 获取领取礼物权限 
     * @desc 获取领取礼物权限 
     * @return int code 操作码，
	 * @return int Authority 相关权限，
     * @return string msg 提示信息
     */
    public function getGiftAuthority() {
        

    }
	
	/**
     * 填写收货地址信息获取礼物
     * @desc 填写收货地址信息获取礼物
     * @return int code 操作码，
     * @return string msg 提示信息
     */
    public function getGift() {
        

    }
}
