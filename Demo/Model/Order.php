<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/4
 * Time: 0:17
 */

class Model_Order extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'order';
    }

    public function getAllListByUserId($userId){
        $rows = $this->getORM()
            ->select('*')
            ->where('member_id', $userId)
            ->order('create_date desc')
            ->fetchAll();
        return $rows;
    }

    public function getPayListByUserId($userId, $payStatus){
        $rows = $this->getORM()
            ->select('*')
            ->where('member_id', $userId)
            ->where('payment_status', $payStatus)
            ->order('create_date desc')
            ->fetchAll();
        return $rows;
    }

    public function getDeliverListByUserId($userId,$deliverStatus){
        $rows = $this->getORM()
            ->select('*')
            ->where('member_id', $userId)
            ->where('deliver_status', $deliverStatus)
            ->order('create_date desc')
            ->fetchAll();
        return $rows;
    }

    public function getRefundListByUserId($userId, $refundStatus){
        $rows = $this->getORM()
            ->select('*')
            ->where('member_id', $userId)
            ->where('refund_status', $refundStatus)
            ->order('create_date desc')
            ->fetchAll();
        return $rows;
    }
}