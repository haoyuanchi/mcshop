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
                'payStatus' => array('name' => 'pay_status', 'type' => 'int', 'require' => false, 'desc' => '支付状态，0：未支付，1：已支付'),
                'deliverStatus' => array('name' => 'deliver_status', 'type' => 'int', 'require' => false, 'desc' => '发货状态，0：未发货，1：正在发货，2：已签收'),
                'refundStatus' => array('name' => 'refund_status', 'type' => 'int', 'require' => false, 'desc' => '退款状态，0：未退款，1：正在退款，2：退款成功'),
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
                'cartIds' => array('name' => 'cart_ids', 'type' => 'array', 'format' => 'explode', 'require' => true, 'desc' => '购物篮ID，多个以逗号分割'),
                'amountPaid' => array('name' => 'amount_paid', 'type' => 'flout', 'require' => true, 'desc' => '支付金额'),
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
     * @return array order_list 订单列表
     * @return int order_list[].id 订单id
     * @return string msg 提示信息
     */
    public function getList() {
        $ret['code'] = 0;

        $model = new Model_Order();

        if(empty($this->payStatus) && empty($this->deliverStatus) && empty($this->refundStatus)) {
            $ret['order_list'] = $model->getAllListByUserId($this->userId);
        }
        else if(!empty($this->payStatus)){
            $ret['order_list'] = $model->getPayListByUserId($this->userId, $this->payStatus);
        }
        else if(!empty($this->deliverStatus)){
            $ret['order_list'] = $model->getDeliverListByUserId($this->userId, $this->deliverStatus);
        }
        else if(!empty($this->refundStatus)){
            $ret['order_list'] = $model->getRefundListByUserId($this->userId, $this->refundStatus);
        }

        $ret['msg'] = '';
        return $ret;
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
        $ret['code'] = 0;

        $modelOrder = new Model_Order();
        $orderInfo = $modelOrder->get($this->orderId);

        $modelOrderItem = new Model_OrderItem();
        $orderItemList = $modelOrderItem->getAllListByOrderId($this->orderId);

        $ret['order_info'] = $orderInfo;
        $ret['order_info']['item_list'] = $orderItemList;

        $ret['msg'] = '';
        return $ret;
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
     * @return string info.addr_list[]_tel 收件人电话
	 * @return string info.addr_list[]_address 收件人地址
	 * @return string info.addr_list[]_postcodes收件人邮编
     * @return array info.coupon_list 订单可用优惠券对象列表
     * @return string msg 提示信息
     */
    public function genOrderByCart() {
        // 根据cartid 获取 cart 信息
        $modelTotal = new Model_ViewCartTotal();
        $total = $modelTotal->getByUserId($this->userId);

        $ret['total_quantity'] = $total['total_quantity'];
        $ret['total_price_origin'] = $total['total_price_origin'];
        $ret['total_price'] = $total['total_price'];
        $ret['tol_save'] = $ret['total_price_origin'] - $ret['total_price'];

        $modelCart = new Model_ViewCartDetail();

        // 获取购物篮信息
        foreach ($this->cartIds as $key => $cartId) {
            $cartDetail = $modelCart->getByCartId($this->$cartId);
            $ret['good_list'][$key] = $cartDetail;
        }

        // 获取地址列表
        $modelAddr = new Model_Address();
        $addrList = $modelAddr->getListByUserId($this->userId);
        $ret['addr_list'] = $addrList;

        // 获取优惠券列表
        $modelCoupon = new Model_ViewCoupon();
        $coupon_list = $modelCoupon->getListByUserId($this->userId, 0, 0);
        $ret['coupon_list'] = $coupon_list;

        return $ret;
    }



    /**
     * 提交订单
     * @desc 提交订单生成订单编号
     * @return int code 操作码
     * @return string msg 提示信息
     */
    public function commitOrder() {
        $ret['code'] = 0;

        // 获取收货信息
        $modelAddr = new Model_Address();
        $addr = $modelAddr->get($this->addressId);
        $order['address'] = $addr['address'];
        $order['zip_code'] = $addr['zip_code'];
        $order['area'] = $addr['area'];
        $order['area_name'] = $addr['area_name'];
        $order['consignee'] = $addr['consignee'];
        $order['phone'] = $addr['phone'];

        // 获取发票信息
        if(!empty($this->invoiceHeader)){
            $order['is_invoice'] = 1;
            $order['invoice_type'] = $this->invoiceType;
            $order['invoice_title'] = $this->invoiceHeader;
        }

        $order['memo'] = $this->comment;

        // 优惠券信息
        if(!empty($this->couponId)){
            $order['is_coupon'] = 1;
            $modelCoupon = new Model_Coupon();
            $couponInfo = $modelCoupon->get($this->couponId);
            $order['coupon_code'] = $couponInfo['code'];
            $order['coupon_discount'] = $couponInfo['coupon_price'];

            // 更新优惠券
            /*$couponInfoNew['is_used'] = 1;
            $couponInfoNew['used_date'] = date('Y-m-d H:i:s');
            $modelCoupon->update($this->couponId, $couponInfoNew);*/

            $modelCoupon->updateSetUsed($this->couponId);
        }

        // 如果是购物车，清空用户的购物车
        // 1. 生成订单
        $order['amount_paid'] = $this->amountPaid;
        // TODO 订单编号的设置
        $order['sn'] = '2016062216935';
        $order['create_date'] = date('Y-m-d H:i:s');
        $order['modify_date'] = date('Y-m-d H:i:s');
        $order['expired_date'] = date('Y-m-d H:i:s', time() + 60 * 60 * 24 * 60);

        $modelOrder = new Model_Order();
        $orderId = $modelOrder->insert($order);

        // 2. 加入订单项
        $orderItem['order_id'] = $orderId;

        $ret['order']['id'] = $orderId;

        $modelCartDetail = new Model_ViewCartDetail();
        $modelOrderItem = new Model_OrderItem();
        $modelCart = new Model_Cart();
        foreach ($this->cartIds as $key => $cartId) {
            $cartDetail = $modelCartDetail->getByCartId($this->$cartId);
            $orderItem['barcode_id'] = $cartDetail['barcode_id'];
            $orderItem['full_name'] = $cartDetail['full_name'];
            $orderItem['name'] = $cartDetail['nae'];
            $orderItem['price'] = $cartDetail['price'];
            $orderItem['quantity'] = $cartDetail['quantity'];
            $orderItem['sn'] = $cartDetail['sn'];
            $orderItem['thumbnail'] = $cartDetail['image'];

            $orderItemId = $modelOrderItem->insert($orderItem);

            $ret['order']['item'][$key]['order_item_id'] = $orderItemId;

            // 3. 清除购物车
            $modelCart->delete($cartId);
        }

        $ret['msg'] = 0;

        return $ret;
    }
}