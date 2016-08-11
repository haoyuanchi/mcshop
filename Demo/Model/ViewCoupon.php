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

    public function getListByUserId($userId, $brandId, $couponType){
        if($couponType == 0){
            // 全部
            $rows = $this->getORM()
                ->select('*')
                ->where('user_id', $userId)
                ->where('brand_id', $brandId)
                ->fetchAll();
        } elseif($couponType == 1){
            // 未使用
            $rows = $this->getORM()
                ->select('*')
                ->where('user_id', $userId)
                ->where('brand_id', $brandId)
                ->where('is_used', 0)
                ->fetchAll();
        } elseif($couponType == 2){
            // 已使用
            $rows = $this->getORM()
                ->select('*')
                ->where('user_id', $userId)
                ->where('brand_id', $brandId)
                ->where('is_used', 1)
                ->fetchAll();
        } elseif($couponType == 3){
            // 已过期
            $rows = $this->getORM()
                ->select('*')
                ->where('user_id', $userId)
                ->where('brand_id', $brandId)
                ->where('is_expired', 1)
                ->fetchAll();
        } else {
            $rows = false;
        }

        return $rows;
    }
}