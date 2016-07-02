<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/2
 * Time: 23:46
 */

class Model_Cart extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'cart';
    }

    public function getListByUserId($userId){
        $rows = $this->getORM()
            ->select('*')
            ->where('memeber_id', $userId)
            ->order('create_date')
            ->fetchAll();
        return $rows;
    }
}