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
            ->where('member_id', $userId)
            ->order('create_date')
            ->fetchAll();
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