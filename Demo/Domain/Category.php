<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/30
 * Time: 19:06
 */

class Domain_Category
{
    public function getList()
    {
        $model = new Model_Category();
        $lists = $model->getList();

        foreach ($lists as $key => $list) {
            $ret[$key]['id'] = $list['id'];
            $ret[$key]['name_zh'] = $list['name_zh'];
            $ret[$key]['name_en'] = $list['name_en'];
        }

        return $ret;
    }
}