<?php

class Api_Activity extends PhalApi_Api {
    private $baseUrl = "http://113.108.202.195:8081/epoService/vipJson/proc.action?do=getvipcoupon";

    public function getRules() {
        return array(
            'getCoupon' => array(
                'activitycode' => array('name' => 'activity_code', 'type' => 'string' , 'require' => true, 'desc' => '活动码'),
                'brandId' => array('name' => 'brand_id', 'type' => 'int' , 'require' => true, 'desc' => '品牌id'),
                'openid' => array('name' => 'openid', 'type' => 'string' , 'require' => true, 'desc' => '用户openid'),
                'userId' => array('name' => 'user_id', 'type' => 'int' , 'require' => true, 'desc' => '用户id'),
            ),
        );
    }


	/**
     * 活动兑换
     * @desc 兑换活动码
     * @return int code 操作码，
     * @return string Coupon_id 兑换
     * @return string msg 提示信息
     */
    public function getCoupon() {
        $ret['code'] = 0;

        if($this->brandId == 18){
            $brandId = 1;
        }else if($this->brandId == 19){
            $brandId = 23;
        }else {
            $ret['code'] = 1;
            $ret['msg'] = '请输入正确的品牌编号';
            return $ret;
        }

        $curl = new PhalApi_CUrl(2);
        $url = "$this->baseUrl&openId=$this->openid&brand=$brandId&cdkey=$this->activitycode";

        // 进行活动兑换
        $serverRet = json_decode($curl->get($url));

        if($serverRet->success == 0){
            $ret['code'] = 1;
            $ret['msg'] = $serverRet->errMsg;
            return $ret;
        } elseif($serverRet->success == 1){
            $urlData =  $serverRet->data;

            $modelCoupon = new Model_Coupon();
            $coupon['create_date'] = $urlData->startdate;
            $coupon['modify_date'] = date('Y-m-d H:i:s');
            $coupon['expiry_date'] = $urlData->enddate;

            $coupon['brand_id'] = $this->brandId;

            $coupon['code'] = $urlData->couponno;
            $coupon['member_id'] = $this->userId;
            $coupon['coupon_id'] = 1;
            $coupon['coupon_price'] = $urlData->value;

            $couponId = $modelCoupon->insert($coupon);

            $ret['coupon'] = $urlData;

            $ret['msg'] = '';

            return $ret;
        } else {
            $ret['code'] = 2;
            $ret['msg'] = "无法访问服务器，请稍后重试";
            return $ret;
        }
    }
}
