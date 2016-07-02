<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/2
 * Time: 23:01
 */

class Model_AddrCity extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'city';
    }

    public function getListByProvinceId($provinceId){
        $rows = $this->getORM()
            ->select('*')
            ->where('province_id', $provinceId)
            ->order('name')
            ->fetchAll();
        return $rows;
    }
}