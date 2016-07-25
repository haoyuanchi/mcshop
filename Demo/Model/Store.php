<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/23
 * Time: 19:43
 */

class Model_Store extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'store';
    }

    public function getNearByList($squares, $brandName){
        $rows = $this->getORM()
            ->select('*')
            ->where('longitude > ? and longitude < ?', $squares['left-top']['lng'], $squares['right-bottom']['lng'])
            ->where('latitude > ? and latitude < ?', $squares['right-bottom']['lat'], $squares['left-top']['lat'])
            ->where('brand LIKE ?', "$brandName%")
            ->order('storename')
            ->fetchAll();

        return $rows;
    }

    public function getListByCity($province, $city, $brandName){
        $rows = $this->getORM()
            ->select('*')
            ->where('province LIKE ?', "$province%")
            ->where('city LIKE ?', "$city%")
            ->where('brand LIKE ?', "$brandName%")
            ->order('storename')
            ->fetchAll();
        return $rows;
    }
}