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

    public function getListByUserId($userId, $isUsed, $isExpired){
        $row = $this->getORM()
            ->select('*')
            ->where('member_id', $userId)
            ->where('is_used', $isUsed)
            ->where('is_expired', $isExpired)
            ->fetch();
        return $row;
    }
}