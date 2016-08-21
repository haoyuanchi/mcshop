<?php

class Api_Coupon extends PhalApi_Api {
    private $baseUrl = 'http://113.108.202.195:8081/epoService/vipJson/proc.action?do=ticket';

    public function getRules() {
        return array(
            'getCouponList' => array(
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '品牌ID'),
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户id'),
                'openId' => array('name' => 'openid', 'type' => 'string', 'require' => true, 'desc' => '用户openid'),
                'couponType' => array('name' => 'coupon_type', 'type' => 'int', 'require' => false, 'default'=>'0', 'desc' => ' 0：全部 1：未使用 2：已使用 3：已过期'),
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

        if($this->brandId == 18){
            $brandId = 1;
        }else if($this->brandId == 19){
            $brandId = 23;
        }else {
            $ret['code'] = 1;
            $ret['msg'] = '请输入正确的品牌编号';
            return $ret;
        }

        $url = "$this->baseUrl&userid=$this->openId&brand=$brandId&ctype=$this->couponType&procOutCursorCount=1";
        $curl = new PhalApi_CUrl(2);
        $couponList = json_decode($curl->get($url));
        if($couponList->success == '1'){
            $ret['coupon_list'] = $couponList->data->data;
        }

        /*$model = new Model_Coupon();
        $couponList = $model->getListByUserId($this->userId, $this->brandId, $this->couponType);
        if($couponList){
            $ret['coupon_list'] = $couponList;
        }*/

        else{
            $ret['code'] = 1;
            $ret['msg'] = '获取优惠券列表失败';
            return $ret;
        }

        $ret['code'] = 0;
        return $ret;
    }
}
