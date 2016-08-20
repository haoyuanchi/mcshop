<?php
/*
 * +----------------------------------------------------------------------
 * | 支付
 * +----------------------------------------------------------------------
 * | Copyright (c) 2015 summer All rights reserved.
 * +----------------------------------------------------------------------
 * | Author: summer <aer_c@qq.com> <qq7579476>
 * +----------------------------------------------------------------------
 * | This is not a free software, unauthorized no use and dissemination.
 * +----------------------------------------------------------------------
 * | Date
 * +----------------------------------------------------------------------
 */

class Api_Pay extends PhalApi_Api {

	public function getRules() {
        return array(
            'pay' => array(
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '品牌ID'),
                'openid' => array('name' => 'openid', 'type' =>'string', 'require' => true, 'desc' => 'openid'),
                'type' 	=> array('name' => 'type', 'type' =>'enum', 'require' => true, 'range' => array('aliwap', 'wechat'), 'desc' => '引擎类型，比如aliwap'),
                'orderNo' => array('name' => 'order_no', 'type' =>'string', 'require' => true, 'desc' => '订单编号'),
                'price' => array('name' => 'price', 'type' => 'string', 'require' => true, 'desc' => '支付价格'),
            ),
        );
	}

    /**
     * 支付接口
     * @desc 支付接口
     * @return param 返回支付发起请求
     */
	public function pay(){
        $ret['code'] = 0;

		//获取对应的支付引擎
        DI()->pay->set($this->type);

        // 获取openid
        $data = array();

        $data['openid'] = $this->openid;
        $data['order_no'] = $this->orderNo;
        $data['title'] = '测试的订单';
        $data['body'] = '测试的订单';
        $data['price'] = '0.01';
        $data['fee_type'] = 'CNY';

        $param = DI()->pay->buildRequestForm($data);
        if($param){
            $ret['param'] = $param;
        }else{
            $ret['code'] = 1;
            $ret['msg'] = '支付失败，请重试！';
            return $ret;
        }

        $ret['msg'] = '';

        return $ret;
	}
}