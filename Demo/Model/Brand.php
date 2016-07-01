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
        $row = $this->getORM()->select('*')->fetchAll();
        return $row;
    }

    public function getByCode($code){
        $row = $this->getORM()->select('*')->where('code',$code)->fetch();
        return $row;
    }
}