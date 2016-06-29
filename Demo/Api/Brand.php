<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 19:10
 */

class Api_Brand extends PhalApi_Api {

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
     * 获取品牌列表
     */
    public function getList() {

    }

}