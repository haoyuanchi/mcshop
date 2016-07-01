<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/1
 * Time: 15:31
 */
class Model_Index extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'index_rotation_image';
    }

    public function getRotationImageList($type){
        $row = $this->getORM()->select('*')->where('type',$type)->fetchAll();
        return $row;
    }
}