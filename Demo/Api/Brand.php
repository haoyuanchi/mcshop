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
        );
    }


    /**
     * 获取品牌列表
     */
    public function getList() {
        $ret['code'] = 0;

        $model = new Model_Brand();
        $ret['brand_list'] = $model->getList();

        $ret['msg'] = '';
        return $ret;
    }
}