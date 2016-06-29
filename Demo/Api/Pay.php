<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 16:56
 */

class Api_Pay extends PhalApi_Api {

    public function getRules() {
        return array(
            'getOrderInfo' => array(
                'orderId' => array('name' => 'order_id', 'type' => 'int',  'require' => true, 'desc' => '订单ID'),
            ),
            'getMultiOrderInfo' => array(
                'userIds' => array('name' => 'user_ids', 'type' => 'array', 'format' => 'explode', 'require' => true, 'desc' => '用户ID，多个以逗号分割'),
            ),
        );
    }

    /**
     * 获取订单详情
     * @desc 获取订单详情 收银台页面
     * @return int code 操作码
	 * @return object order 订单信息对象
     * @return string order.id 订单id
     * @return string order.code 订单编号
     * @return string order.delivery  订单快递方式
     * @return string order.tol_price 订单价格实付金额
     * @return string order.pay   订单支付方式 -- 目前只支持微信支付
	 * @return object order.address   订单收货信息
	 * @return string order.address.name   订单收货信息_收货人
	 * @return string order.address.tel   订单收货信息_收货人电话
	 * @return string order.address.addr   订单收货信息_收货人地址
	 * @return string order.address.postcodes   订单收货信息_收货人邮编
	 * @return string msg 提示信息
     */
    public function getOrderInfo() {

    }

    /**
     * 批量获取订单信息
     * @desc 用于获取多个订单基本信息
     */
    public function getMultiOrderInfo() {

    }


}