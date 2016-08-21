<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/4
 * Time: 0:17
 */

class Model_OrderItem extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'order_item';
    }

    public function deleteByOrderId($orderId){
        $row = $this->getORM()
            ->where('order', $orderId)
            ->delete();
        return $row;
    }

    public function getAllListByUserId($userId){
        $rows = $this->getORM()
            ->select('*')
            ->where('member_id', $userId)
            ->order('create_date desc')
            ->fetchAll();
        return $rows;
    }

    public function getAllListByOrderId($orderId){
        $rows = $this->getORM()
            ->select('*')
            ->where('order_id', $orderId)
            ->order('create_date desc')
            ->fetchAll();
        return $rows;
    }

}