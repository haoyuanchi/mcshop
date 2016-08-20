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

    public function getPayStatusByOrderId($orderId){
        $row = $this->getORM()
            ->select('payment_status')
            ->where('id', $orderId)
            ->fetch();
        return $row;
    }

    public function updateOrderBySn($sn, $orderInfo){
        $rows = $this->getORM()
            ->where('sn', $sn)
            ->update($orderInfo);
        return $rows;
    }

    public function getAllListByUserId($userId, $brandId){
        $rows = $this->getORM()
            ->select('*')
            ->where('user_id', $userId)
            ->where('brand_id', $brandId)
            ->order('create_date desc')
            ->fetchAll();
        return $rows;
    }

    public function getPayListByUserId($userId, $brandId, $payStatus){
        $rows = $this->getORM()
            ->select('*')
            ->where('user_id', $userId)
            ->where('brand_id', $brandId)
            ->where('payment_status', $payStatus)
            ->order('create_date desc')
            ->fetchAll();
        return $rows;
    }

    public function getDeliverListByUserId($userId, $brandId, $deliverStatus){
        $rows = $this->getORM()
            ->select('*')
            ->where('user_id', $userId)
            ->where('brand_id', $brandId)
            ->where('deliver_status', $deliverStatus)
            ->order('create_date desc')
            ->fetchAll();
        return $rows;
    }

    public function getRefundListByUserId($userId, $brandId, $refundStatus){
        $rows = $this->getORM()
            ->select('*')
            ->where('user_id', $userId)
            ->where('brand_id', $brandId)
            ->where('refund_status', $refundStatus)
            ->order('create_date desc')
            ->fetchAll();
        return $rows;
    }
}