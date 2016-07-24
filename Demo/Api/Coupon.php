<?php

class Api_Coupon extends PhalApi_Api {
    public function getRules() {
        return array(
            'getCouponList' => array(
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '品牌ID'),
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户id'),
                'isUsed' => array('name' => 'is_used', 'type' => 'int', 'require' => false, 'default'=>'0', 'desc' => '是否已经使用'),
                'isDated' => array('name' => 'is_dated', 'type' => 'int', 'require' => false, 'default'=>'0', 'desc' => '是否已经过期'),
                'couponType' => array('name' => 'coupon_type', 'type' => 'int', 'require' => false, 'default'=>'0', 'desc' => ' null：全部 0：未使用 1：已使用 2：已过期'),
            ),

        );
    }

    /**
     * 获取优惠券列表
     * @desc 获取优惠券列表
     * @return int code 操作码，
     * @return array coupon_list 代金券列表
     * @return string coupon_list[].status 代金券适用状态
     * @return sring coupon_list[].endtime 代金券有效期
	 * @return sring coupon_list[].code 代金券条形数据码	
     * @return string msg 提示信息
     */
    public function getCouponList() {
        $ret['code'] = 0;

        $url = "http://113.108.202.195:8081/epoService/vipJson/proc.action?do=ticket&openId=123456&brand=1&ctype=0&procOutCursorCount=1";
        $curl = new PhalApi_CUrl(2);
        $couponList = json_decode($curl->get($url));

        /*$model = new Model_ViewCoupon();
        $couponList = $model->getListByUserId($this->userId, $this->isUsed, $this->isDated);*/
        $ret['coupon_list'] = $couponList;

        $ret['code'] = 0;
        return $ret;
    }
}
