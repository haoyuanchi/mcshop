<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/23
 * Time: 19:43
 */

class Model_Store extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'area';
    }

    public function getListByProvinceId($provinceId){
        $rows = $this->getORM()
            ->select('*')
            ->where('province_id', $provinceId)
            ->order('name')
            ->fetchAll();
        return $rows;
    }

    public function getListByCityId($cityId){
        $rows = $this->getORM()
            ->select('*')
            ->where('city_id', $cityId)
            ->order('name')
            ->fetchAll();
        return $rows;
    }
}