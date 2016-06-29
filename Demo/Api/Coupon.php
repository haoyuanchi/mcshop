<?php

class Api_Coupon extends PhalApi_Api {
    public function getRules() {
        return array(
            'getCouponList' => array(
                'bradnId' => array('name' => 'brand_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '品牌ID'),
            ),

        );
    }

    /**
     * 获取用户基本信息 
     * @desc 用于获取单个用户基本信息 vip会员主页
     * @return int code 操作码，
     * @return array coupon_list 代金券列表
     * @return string coupon_list[].status 代金券适用状态
     * @return sring coupon_list[].endtime 代金券有效期
	 * @return sring coupon_list[].code 代金券条形数据码	
     * @return string msg 提示信息
     */
    public function getCouponList() {

    }


}
