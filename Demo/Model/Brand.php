<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/30
 * Time: 18:59
 */

class Model_Brand extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'brand';
    }

    public function getList(){
        $rows = $this->getORM()->select('*')->fetchAll();
        return $rows;
    }

    public function getByCode($code){
        $row = $this->getORM()->select('*')->where('code',$code)->fetch();
        return $row;
    }
}