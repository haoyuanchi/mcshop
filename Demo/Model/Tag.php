<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/1
 * Time: 15:43
 */
class Model_Tag extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'tag';
    }

    public function getTopImage(){
        $row = $this->getORM()->select('*')->where('is_enabled',1)->fetch();
        return $row;
    }
}