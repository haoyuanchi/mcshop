<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 11:57
 */

class Api_Collection extends PhalApi_Api {

    public function getRules() {
        return array(
            'getList' => array(

            ),
            'add' => array(
                'goodId' => array('name' => 'good_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品id'),
            ),
            'del' => array(
                'collectId' => array('name' => 'collect_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '收藏夹id'),
            ),
        );
    }


    /**
     * 获取收藏列表
     * @desc 获取收藏列表
     * @return int code 操作码，
     * @return array good_list 收藏商品列表
     * @return int good_list[].id 商品ID
     * @return string good_list[].imgage 商品图片地址	
     * @return string good_list[].name 商品名称
     * @return string good_list[].price_origin 商品原价
     * @return string good_list[].price_sale 商品促销价
     * @return string msg 提示信息
     */
    public function getList() {

    }

    /**
     * 加入收藏夹
     * @desc 加入收藏夹
	 * @return object message 返回信息
	 * @return string message.type  固定值warn
	 * @return string message.content  该商品已收藏 or 商品收藏成功

     */
    public function add() {

    }

    /**
     * 取消收藏夹
     * @desc 取消收藏夹
     */
    public function del() {

    }

}