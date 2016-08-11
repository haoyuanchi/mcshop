<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/3
 * Time: 1:33
 */

class Model_Coupon extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'coupon';
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
                ->where('expiry_date > ?', date('Y-m-d H:i:s'))
                ->fetchAll();
        } else {
            $rows = false;
        }


        /*$rows = $this->getORM()
            ->select('*')
            ->where('user_id', $userId)
            ->where('brand_id', $brandId)
            ->order('create_date')
            ->fetchAll();*/
        return $rows;
    }

    public function updateSetUsed($couponId){
        $data['is_used'] = 1;
        $data['used_date'] = date('Y-m-d H:i:s');

        return $this->getORM()
            ->where('id', $couponId)
            ->update($data);
    }
}