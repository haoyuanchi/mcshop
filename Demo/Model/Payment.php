<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/4
 * Time: 0:17
 */

class Model_Payment extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'payment';
    }

    public function updateOrderBySn($order_no, $payInfo){
        $row = $this->getORM()
            ->where('order_no', $order_no)
            ->update($payInfo);
        return $row;
    }
}