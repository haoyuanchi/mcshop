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
     * 完善基本信息 
     * @desc 完善个人资料获取积分
     * @return int code 操作码，
     * @return string Coupon_code 提示信息		
     * @return string msg 提示信息
     */
    public function getCoupon() {
        

    }
	

}
