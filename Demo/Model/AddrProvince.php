<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/2
 * Time: 23:01
 */

class Model_AddrProvince extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'province';
    }

    public function getList(){
        $rows = $this->getORM()
            ->select('*')
            ->order('name')
            ->fetchAll();
        return $rows;
    }
}