<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/3
 * Time: 0:56
 */

class Model_ViewCart extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'v_cart_total';
    }

    public function getByUserId($userId){
        $row = $this->getORM()
            ->select('*')
            ->where('memeber_id', $userId)
            ->fetch();
        return $row;
    }
}