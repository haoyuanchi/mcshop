<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 16:39
 */

class Api_Cart extends PhalApi_Api {

    public function getRules() {
        return array(
            'getList' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
            ),
            'add' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'barcodeId' => array('name' => 'id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品条形码ID--spec_id(barcode_id)'),
                'quantity' => array('name' => 'quantity', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '购买数量'),
            ),
            'del' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'cartId' => array('name' => 'cart_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '购物车ID'),
            ),
            'update' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'cartId' => array('name' => 'cart_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '购物车ID'),
                'barcodeId' => array('name' => 'id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品条形码ID--spec_id(barcode_id)'),
                'quantity' => array('name' => 'quantity', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '购买数量'),
            ),
        );
    }

    /**
     * 获取购物车列表
     * @desc 获取购物车列表
     * @return int code 操作码，0表示成功
     * @return int tol_number 购物车所有商品总数
     * @return string tol_price 购物车所有商品总价
     * @return string tol_actualPrice 购物车所有商品实付款
	 * @return string tol_save 购物车所有商品节省
     * @return array list 购物车列表
     * @return int list[].cart_id 购物车id
     * @return object list[].good 商品信息
     * @return int list[].good.image 商品图片地址
     * @return int list[].good.name 商品文字名称
     * @return int list[].good.id 商品id
     * @return string list[].good.code 商品编号
     * @return string list[].good.size_value 商品尺码值
     * @return string list[].good.color_value 商品颜色
     * @return int list[].good.number 购买商品数量
     * @return string list[].good.price 商品总价
     * @return boolean list[].good.isEnough 库存是否充足
	 * @return array list[].good.spec_list 商品规格列表颜色，尺码，数量，修改所需
     * @return int list[].good.spec_list[].barcode_id	确定规格商品的id
     * @return int list[].good.spec_list[].barcode	商品规格
     * @return int list[].good.spec_list[].color_id    商品颜色id 
     * @return string list[].good.spec_list[].color_value 商品颜色文字说明
     * @return string list[].good.spec_list[].color_image 商品颜色图地址
     * @return int list[].good.spec_list[].size_id     商品尺码id
     * @return string list[].good.spec_list[].size_value  商品尺码文字说明
     * @return int list[].good.spec_list[].remain_number  商品剩余库存
     * @return string msg 提示信息
     */
    public function getList() {
        $ret['code'] = 0;

        // 获取购物车的商品总数和价格总数
        $modelTotal = new Model_ViewCart();
        $total = $modelTotal->getByUserId($this->userId);

        $ret['total_quantity'] = $total['total_quantity'];
        $ret['total_price_origin'] = $total['total_price_origin'];
        $ret['total_price'] = $total['total_price'];
        $ret['tol_save'] = $ret['total_price_origin'] - $ret['total_price'];

        $modelCart = new Model_ViewCartDetail();
        $cartList = $modelCart->getListByUserId($this->userId);

        if(empty($cartList)){
            $ret['cart_list'] = null;
            return;
        }

        $modelGoodBarcode = new Model_GoodBarcode();
        foreach($cartList as $key => $cart){
            $ret['cart_list'][$key] = $cart;

            $goodBarcodeList = $modelGoodBarcode->getBarcodeList($cart['good_id']);

            $ret['cart_list'][$key]['spec_list'] = $goodBarcodeList;

            /*foreach($goodBarcodeList as $key2=>$barcode) {
                $ret['cart_list'][$key]['spec_list'][$key2]['id'] = $barcode['id'];
                $ret['cart_list'][$key]['spec_list'][$key]['barcode'] = $barcode['barcode'];
                $ret['cart_list'][$key]['spec_list'][$key]['name'] = $barcode['full_name'];
                $ret['cart_list'][$key]['spec_list'][$key]['barcode'] = $barcode['barcode'];
                $ret['cart_list'][$key]['spec_list'][$key]['color_id'] = $barcode['color_id'];
                $ret['cart_list'][$key]['spec_list'][$key]['color_code'] = $barcode['color_code'];
                $ret['cart_list'][$key]['spec_list'][$key]['color_name'] = $barcode['color_name'];
                $ret['cart_list'][$key]['spec_list'][$key]['color_image'] = $barcode['color_image_thumbnail'];
                $ret['cart_list'][$key]['spec_list'][$key]['size_id'] = $barcode['size_id'];
                $ret['cart_list'][$key]['spec_list'][$key]['size_code'] = $barcode['size_code'];
                $ret['cart_list'][$key]['spec_list'][$key]['size_name'] = $barcode['size_name'];
                $ret['cart_list'][$key]['spec_list'][$key]['remain_number'] = $barcode['stock'];
                $ret['cart_list'][$key]['spec_list'][$key]['allocated_stock'] = $barcode['allocated_stock'];
            }*/
        }

        $ret['code'] = 0;

        return $ret;
    }


    /**
     * 加入购物车
     * @desc 加入购物车
	 * @return int code 返回码
	 * @return int total_quantity       总数量
	 * @return int total_price_origin   总原价
	 * @return int total_price          总价格
	 * @return string msg 错误信息
     */
    public function add() {
        $ret['code'] = 0;

        $cart['member_id'] = $this->userId;
        $cart['barcode_id'] = $this->barcodeId;
        $cart['quantity'] = $this->quantity;
        $cart['create_date'] = date('Y-m-d H:i:s');
        $cart['modify_date'] = date('Y-m-d H:i:s');

        $model = new Model_Cart();
        $cartId = $model->insert($cart);

        if($cartId > 0){
            $ret['type'] = 'success';
        }

        // 获取购物车的商品总数和价格总数
        $modelTotal = new Model_ViewCart();
        $total = $modelTotal->getByUserId($this->userId);

        $ret['total_quantity'] = $total['total_quantity'];
        $ret['total_price_origin'] = $total['total_price_origin'];
        $ret['total_price'] = $total['total_price'];

        $ret['msg'] = '';

        return $ret;
    }

    /**
     * 删除购物车
     * @desc 删除购物车
     * @return int code 操作码，0表示成功
     */
    public function del() {
        $ret['code'] = 0;

        $model = new Model_Cart();
        $cartId = $model->delete($this->cartId);
        if($cartId <= 0){
            $ret['code'] = 1;
        }

        $ret['msg'] = '';
        return $ret;
    }


    /**
     * 修改购物车
     * @desc 修改购物车
     * @return int code 操作码，0表示成功
     * @return string msg 返回信息
     */
    public function update() {
        $ret['code'] = 0;

        $cart['barcode_id'] = $this->barcodeId;
        $cart['quantity'] = $this->quantity;
        $cart['modify_date'] = date('Y-m-d H:i:s');

        $model = new Model_Cart();
        $cartId = $model->update($this->cartId, $cart);

        $ret['msg'] ='';

        return $ret;
    }
}