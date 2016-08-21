<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 16:56
 */

class Api_Redeem extends PhalApi_Api {

    private $redeemBaseUrl = 'http://113.108.202.195:8081/epoService/vipJson/proc.action?do=integral';

    public function getRules() {
        return array(
            'getTheRules' => array(
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id，不同品牌兑换规则不同'),
            ),
            'redeem' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户id'),
                'openId' => array('name' => 'openid', 'type' => 'string', 'require' => true, 'desc' => '用户openid'),
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
                'redeemIntegral' => array('name' => 'redeem_integral', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '兑换积分'),
				'couponValue' => array('name' => 'coupon_value', 'type' => 'float', 'require' => true, 'desc' => '兑换的面值'),
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
     * 用户的积分兑换
     * @desc 用户积分兑换
	 * @return int code 操作码
	 * @return string msg 提示信息
     */
    public function redeem() {
        $ret['code'] = 0;

        $openId = $this->openId;

        if($this->brandId == 18){
            $brandId = 1;
        }else if($this->brandId == 19){
            $brandId = 23;
        }else {
            $ret['code'] = 1;
            $ret['msg'] = '请输入正确的品牌编号';
            return $ret;
        }

        $redeemIntegral = $this->redeemIntegral;
        $value = $this->couponValue;

        $domain = new Domain_WxUser();
        $userInfo = $domain->getUserInfo($this->userId, $this->brandId);

        if(empty($userInfo)){
            $ret['code'] = 5;
            $ret['msg'] = '用户未绑定';
            return $ret;
        }

        if($userInfo['integral'] < $redeemIntegral){
            $ret['code'] = 2;
            $ret['msg'] = '积分不足，请重新输入兑换数量';
            return $ret;
        }

        $url = "$this->redeemBaseUrl&openId=$openId&brand=$brandId&integral=$redeemIntegral&value=$value";
        $curl = new PhalApi_CUrl(2);
        $urlRet = json_decode($curl->get($url));

        if($urlRet->success == 1){
            $urlData =  $urlRet->data;

            $modelCoupon = new Model_Coupon();
            $coupon['create_date'] = date('Y-m-d H:i:s');
            $coupon['modify_date'] = date('Y-m-d H:i:s');
            $coupon['expiry_date'] = date('Y-m-d H:i:s', time() + 60 * 60 * 24 * 60);

            $coupon['code'] = $urlData->couponno;
            $coupon['user_id'] = $this->userId;
            $coupon['brand_id'] = $this->brandId;
            $coupon['coupon_price'] = $urlData->value;
            $coupon['project_code'] = $urlData->projectcode;
            $coupon['project_name'] = $urlData->projectname;

            $couponId = $modelCoupon->insert($coupon);

            $memberInfoNew['integral'] = $urlData->integral;
            if($domain->updateIntegral($this->userId, $memberInfoNew) == 0){
                $ret['code'] = 4;
                $ret['msg'] = '更新会员积分失败';
                return $ret;
            }

            $ret['couponId'] = $couponId;
        } else {
            $ret['code'] = 3;
            $ret['msg'] = $urlRet->errMsg;
        }

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