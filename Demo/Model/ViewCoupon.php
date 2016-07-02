<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/3
 * Time: 1:36
 */

class Model_ViewCoupon extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'v_coupon';
    }

    public function getListByUserId($userId, $isUsed, $isDated){
        $row = $this->getORM()
            ->select('*')
            ->where('memeber_id', $userId)
            ->where('is_used', $isUsed)
            ->where('is_dated', $isDated)
            ->fetch();
        return $row;
    }
}