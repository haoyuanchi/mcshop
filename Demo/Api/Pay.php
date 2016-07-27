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
                'type' 	=> array('name' => 'type', 'type' =>'enum', 'require' => true, 'range' => array('aliwap', 'wechat'), 'desc' => '引擎类型，比如aliwap'),
                'orderNo' => array('name' => 'order_no', 'type' =>'string', 'require' => true, 'desc' => '订单编号'),
                'price' => array('name' => 'price', 'type' => 'string', 'require' => true, 'desc' => '支付价格'),
            ),
        );
	}

    /**
     * 支付接口
     * @desc 支付接口
     * @return html 返回支付发起请求
     */
	public function pay(){
		//获取对应的支付引擎
        DI()->pay->set($this->type);

        $data = array();
        //$data['order_no'] = $this->orderNo;

        $data['order_no'] = date('YmdHis'). ''. PhalApi_Tool::createRandNumber(4);

        $data['title'] = '测试的订单';
        $data['body'] = '测试的订单';
        $data['price'] = '0.01';
        $data['fee_type'] = 'CNY';
        echo DI()->pay->buildRequestForm($data);
        exit;
	}
}