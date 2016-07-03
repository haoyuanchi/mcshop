<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 11:56
 */
class Api_Order extends PhalApi_Api {

    public function getRules() {
        return array(
            'getList' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户id'),
                'payStatus' => array('name' => 'pay_status', 'type' => 'int', 'require' => false, 'default'=>'0', 'desc' => '支付状态，0：未支付，1：已支付'),
                'deliverStatus' => array('name' => 'deliver_status', 'type' => 'int', 'require' => false, 'default'=>'0', 'desc' => '发货状态，0：未发货，1：正在发货，2：已签收'),
                'refundStatus' => array('name' => 'refund_status', 'type' => 'int', 'require' => false, 'default'=>'0', 'desc' => '退款状态，0：未退款，1：正在退款，2：退款成功'),
            ),
            'getInfo' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户id'),
                'orderId' => array('name' => 'cart_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '订单ID'),
            ),
            'genOrderByCart' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户id'),
                'cartIds' => array('name' => 'cart_ids', 'type' => 'array', 'format' => 'explode', 'require' => true, 'desc' => '购物篮ID，多个以逗号分割'),
            ),
            'commitOrder' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '用户id'),
                'orderTempId' => array('name' => 'order_temp_id', 'type' => 'int',  'require' => true, 'desc' => '订单临时id'),
				'addressId' => array('name' => 'addr_id', 'type' => 'int', 'require' => true, 'desc' => '收货地址id'),
                'invoiceType' => array('name' => 'invoice_type', 'type' => 'string', 'require' => false, 'desc' => '发票类型'),
                'invoiceHeader' => array('name' => 'invoice_header', 'type' => 'string', 'require' => false, 'desc' => '发票抬头'),
                'comment' => array('name' => 'comment', 'type' => 'string', 'require' => false, 'desc' => '备注'),
                'couponId' => array('name' => 'coupon_id', 'type' => 'int', 'require' => false, 'desc' => '优惠券id'),
            ),
			
        );
    }

    /**
     * 获取订单列表
     * @desc 获取订单列表
     * @return int code 操作码，0表示成功
     * @return array dfkorder_list 待付款订单列表
     * @return int dfkorder_list[].id 待付款订单id
     * @return array dfhorder_list 待发货订单列表
     * @return int dfhorder_list[].id 待发货订单id
     * @return array yfhorder_list 已发货订单列表
     * @return int yfhorder_list[].id 已发货订单id
     * @return array tkorder_list 退款订单列表
     * @return int tkorder_list[].id 退款订单id
     * @return string msg 提示信息
     */
    public function getList() {

    }

    /**
     * 获取订单详情
     * @desc 获取订单详情
     * @return object info 订单信息对象
     * @return int info.id 订单id
     * @return string info.code 订单编号
     * @return string info.pay_status 订单支付状态
     * @return string info.delivery_status 订单配送状态
     * @return string info.cancel_status 订单退款状态
     * @return string info.create_data 订单创建日期
     * @return string info.brand 订单所属品牌
     * @return string info.tol_number 订单商品总数
     * @return string info.tol_price 订单商品总价
     * @return string info.tol_actualPrice 订单商品实付金额
     * @return string info.tol_save 订单节省金额
     * @return array info.good 订单产品对象列表
     * @return int info.good[].id 订单产品id
     * @return string info.good[].name 订单产品名字
     * @return string info.good[].image 订单产品图片地址
     * @return string info.good[].code 订单产品编号
     * @return string info.good[].size_value 订单产品尺码文字说明
     * @return string info.good[].color_value 订单产品颜色文字说明
     * @return string info.good[].number 订单产品数量
     * @return string info.good[].price_origin 订单产品原价格
     * @return string info.good[].price_sale 订单产品实际售价
     * @return object info.address 订单地址对象
     * @return string msg 提示信息
     */
    public function getInfo() {

    }


    /**
     * 购物篮生成订单 处理订单页面
     * @desc 处理订单页面
     * @return object info 订单信息对象
     * @return int info.good.tol_number 产品总数
     * @return float info.good.tol_price 产品商品总价
     * @return float info.good.tol_actualPrice 产品商品总价实付款
	 * @return float info.good.tol_save 购物车所有商品节省
     * @return array info.good_list 订单产品信息对象列表
     * @return int info.good_list[].id 订单产品id
     * @return string info.good_list[].name 订单产品名字
     * @return string info.good_list[].image 订单产品图片
     * @return string info.good_list[].code 订单产品编号
     * @return string info.good_list[].size 订单产品尺码
     * @return string info.good_list[].color 订单产品颜色
     * @return int info.good_list[].number 订单产品数量
     * @return string info.good_list[].price 订单产品价格
     * @return boolean info.good_list[].isEnough 订单产品库存是否充足
     * @return array info.addr_list 订单地址列表
     * @return string info.addr_list[]_name 收件人
     * @return sting info.addr_list[]_tel 收件人电话
	 * @return string info.addr_list[]_address 收件人地址
	 * @return string info.addr_list[]_postcodes收件人邮编
     * @return array info.coupon_list 订单可用优惠券对象列表
     * @return string msg 提示信息
     */
    public function genOrderByCart() {
        // 购物篮生成订单， 订单temp表


    }



    /**
     * 提交订单
     * @desc 提交订单生成订单编号
     * @return int code 操作码
     * @return string msg 提示信息
     */
    public function commitOrder() {
        // 是否使用优惠券，使用的话去掉该优惠券

        // 如果是购物车，清空用户的购物车

        // 生成订单
    }
}