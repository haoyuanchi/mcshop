<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 19:10
 */

class Api_Category extends PhalApi_Api {
    public function getRules() {
        return array(
            'getList' => array(
            ),
        );
    }

    /**
     * 获取类别列表
     * @desc 获取类别列表
     * @return int code 操作码，0表示成功
     * @return array category_list 类别列表
     * @return int category_list[].id 类别ID
     * @return string category_list[].name_zh 类别名中文
     * @return string category_list[].name_en 类别名英文
     * @return int 类别数量
     * @return string msg 提示信息
     */
    public function getList(){
        $rs = array('code' => 0, 'msg' => '', 'category_list' => array());

        $domain = new Domain_Category();
        $category_list = $domain->getList();

        $rs['category_list'] = $category_list;
        return $rs;
    }
}