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

            ),
            'add' => array(
                'barcodeId' => array('name' => 'id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品条形码ID--spec_id(barcode_id)'),
                'quantity' => array('name' => 'quantity', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '购买数量'),
            ),
            'del' => array(
                'cartId' => array('name' => 'cart_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '购物车ID'),
            ),
            'update' => array(
                'cartId' => array('name' => 'cart_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '购物车ID'),
                'goodId' => array('name' => 'good_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品ID'),
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
     * @return int list[].good.spec_list[].product_id	确定规格商品的id
     * @return int list[].good.spec_list[].color_id    商品颜色id 
     * @return string list[].good.spec_list[].color_value 商品颜色文字说明
     * @return string list[].good.spec_list[].color_image 商品颜色图地址
     * @return int list[].good.spec_list[].size_id     商品尺码id
     * @return string list[].good.spec_list[].size_value  商品尺码文字说明
     * @return int list[].good.spec_list[].remain_number  商品剩余库存
     * @return string msg 提示信息
     */
    public function getList() {

    }


    /**
     * 加入购物车
     * @desc 加入购物车
	 * @return object message 返回信息
	 * @return string message.type  添加是否成功 success or error两种情况
	 * @return string message.content  成功or失败信息  "您选购的商品已加入购物车<br />购物车共有<span>xxx</span>件商品，合计:<span>￥xxxx</span>" 或者 xxx导致无法添加到购物车
     */
    public function add() {


    }

    /**
     * 删除购物车
     * @desc 删除购物车
     * @return int code 操作码，0表示成功
     */
    public function del() {

    }


    /**
     * 修改购物车
     * @desc 修改购物车
     * @return int code 操作码，0表示成功
     */
    public function update() {

    }
}