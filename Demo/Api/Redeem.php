<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 16:56
 */

class Api_Redeem extends PhalApi_Api {

    public function getRules() {
        return array(
            'getTheRules' => array(
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id，不同品牌兑换规则不同'),
            ),
            'redeemMO' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户id'),
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
				'redeemNumber' => array('name' => 'redeem_number', 'type' => 'int', 'require' => true, 'desc' => '兑换数量(MO)'),
            ),
            'getValue' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户id'),
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
                'redeemIntegral' => array('name' => 'redeem_integral', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '兑换积分'),
            ),
            'redeemEd' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户id'),
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
                'redeemIntegral' => array('name' => 'redeem_integral', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '兑换积分'),
				'coupon' => array('name' => 'coupon', 'type' => 'float', 'require' => true, 'desc' => '兑换的面值'),
            ),
            'getStore' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户id'),
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
				'provinceId' => array('name' => 'provice_id', 'type' => 'int', 'require' => true, 'desc' => '省id'),
				'cityId' => array('name' => 'city_id', 'type' => 'int', 'require' => true, 'desc' => '市id'),
            ),
        );
    }

    /**
     * 获取相应品牌的可用积分及兑换规则
     * @desc 获取应品牌的积分及兑换规则
     * @return int integral   积分
     * @return string rules 相应规则
	 * @return string msg 提示信息
     */
    public function getTheRules() {


    }

    /**
     * MO品牌的积分兑换
     * @desc MO品牌的积分兑换
	 * @return int code 操作码
	 * @return string msg 提示信息
     */
    public function redeemMO() {
        $ret['code'] = 0;

        /*$openId = $this->userId;
        $brandId = $this->brandId;
        $integral = $this->redeemIndegral;
        $value = $this->coupon;
        $url = "http://113.108.202.195:8081/epoService/vipJson/proc.action?do=integral&openId=$openId&brand=$brandId&integral=$integral&value=$value";
        $curl = new PhalApi_CUrl(2);
        $ret = json_decode($curl->get($url));
        return $ret;*/

        // TODO 增加原子操作
        $modelUser = new Model_User();
        $userInfo = $modelUser->getByUserId($this->userId);

        if($userInfo['integral'] < $this->redeemNumber * 10000){
            $ret['code'] = 1;
            $ret['msg'] = '积分不足，请重新输入兑换数量';
            return $ret;
        }
        // 增加500优惠券
        $modelCoupon = new Model_Coupon();
        $coupon['create_date'] = date('Y-m-d H:i:s');
        $coupon['modify_date'] = date('Y-m-d H:i:s');
        $coupon['expiry_date'] = date('Y-m-d H:i:s', time() + 60 * 60 * 24 * 60);
        //TODO
        $coupon['code'] = 'VX151A0004861656';
        $coupon['member_id'] = $this->userId;
        $coupon['coupon_id'] = 1;
        $coupon['coupon_price'] = 500;

        $couponId = $modelCoupon->insert($coupon);

        $userInfoNew['integral'] = $userInfo['integral'] - $this->redeemNumber * 10000;
        $userId = $modelUser->update($this->userId, $userInfoNew);

        $ret['couponId'] = $couponId;

        $ret['msg'] = '';

        return $ret;
    }
	
    /**
     * Ed品牌输入兑换额获取可兑换面值
     * @desc 获取应品牌的积分及兑换规则
     * @return int coupon   可兑换面值
	 * @return string msg 提示信息
     */
    public function getValue() {
        $ret['code'] = 0;

        // TODO 兑换面值的规则
        if($this->redeemIntegral >= 10000 && $this->redeemIntegral <= 29999){
            $coupon_value = intval(($this->redeemIntegral * 0.05) / 100) * 100;
        }
        else if($this->redeemIntegral >= 30000 && $this->redeemIntegral <= 49999){
            $coupon_value = intval(($this->redeemIntegral * 0.055) / 100) * 100;
        }
        else if($this->redeemIntegral >= 50000){
            $coupon_value = intval(($this->redeemIntegral * 0.06) / 100) * 100;
        }
        else{
            $coupon_value = 0;
        }

        $ret['coupon_value'] = $coupon_value;
        $ret['msg'] = '';

        return $ret;
    }

    /**
     * Ed品牌的积分兑换
     * @desc Ed品牌的积分兑换
	 * @return int code 操作码
	 * @return string msg 提示信息
     */
    public function redeemEd() {
        $ret['code'] = 0;

        /*$openId = $this->userId;
        $brandId = $this->brandId;
        $integral = $this->redeemIndegral;
        $value = $this->coupon;
        $url = "http://113.108.202.195:8081/epoService/vipJson/proc.action?do=integral&openId=$openId&brand=$brandId&integral=$integral&value=$value";
        $curl = new PhalApi_CUrl(2);
        $ret = json_decode($curl->get($url));

        return $ret;*/

        // TODO 增加原子操作
        $modelUser = new Model_User();
        $userInfo = $modelUser->getByUserId($this->userId);

        if($userInfo['integral'] < $this->redeemIntegral){
            $ret['code'] = 1;
            $ret['msg'] = '积分不足，请重新输入兑换数量';
            return $ret;
        }

        $coupon_value = $this->coupon;

        if($this->redeemIntegral >= 10000 && $this->redeemIntegral <= 29999){
            //$coupon_value = intval(($this->integral * 0.05) / 100) * 100;
            $usedIntegral = $coupon_value / 0.05;
        }
        else if($this->redeemIntegral >= 30000 && $this->redeemIntegral <= 49999){
            //$coupon_value = intval(($this->integral * 0.055) / 100) * 100;
            $usedIntegral = $coupon_value / 0.055;
        }
        else if($this->redeemIntegral >= 50000){
            //$coupon_value = intval(($this->integral * 0.06) / 100) * 100;
            $usedIntegral = $coupon_value / 0.06;
        }
        else{
            //$coupon_value = 0;
            $usedIntegral = 0;
        }

        $modelCoupon = new Model_Coupon();
        $coupon['create_date'] = date('Y-m-d H:i:s');
        $coupon['modify_date'] = date('Y-m-d H:i:s');
        $coupon['expiry_date'] = date('Y-m-d H:i:s', time() + 60 * 60 * 24 * 60);
        //TODO
        $coupon['code'] = 'VX151A0004861656';
        $coupon['member_id'] = $this->userId;
        $coupon['coupon_id'] = 1;
        $coupon['coupon_price'] = $this->coupon;

        $couponId = $modelCoupon->insert($coupon);

        $userInfoNew['integral'] = $userInfo['integral'] - $usedIntegral;
        $userId = $modelUser->update($this->userId, $userInfoNew);

        $ret['couponId'] = $couponId;

        $ret['msg'] = '';

        return $ret;
    }
	
    /**
     * 获取适用店铺
     * @获取适用店铺
	 * @return int code 操作码
	 * @return array store_list 适用店铺列表
	 * @return string store_list[].name 店铺名称
	 * @return string msg 提示信息
     */
    public function getStore() {

    }
	
	
}