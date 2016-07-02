<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/3
 * Time: 1:33
 */

class Model_Coupon extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'coupon_member';
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