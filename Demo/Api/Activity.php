<?php

class Api_Activity extends PhalApi_Api {
    public function getRules() {
        return array(
            'getCoupon' => array(
                'activitycode' => array('name' => 'activity_code', 'type' => 'string' , 'require' => true, 'desc' => '活动码'),
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
        

    }
	

}
