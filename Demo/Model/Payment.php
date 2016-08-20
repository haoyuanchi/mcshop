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

    public function getPayStatusByOrderNo($order_no){
        $row = $this->getORM()
            ->select('status')
            ->where('order_no', $order_no);
        return $row;
    }

    public function isExits($order_no){
        $num = $this->getORM()
            ->where('order_no', $order_no)
            ->count('id');
        return $num == 0 ? false : true;
    }

    public function insert_update($order_no, $payInfo){
        if($this->isExits($order_no)){
            // 更新
            return $this->getORM()
                ->where('order_no', $order_no)
                ->update($payInfo);
        }
        else{
            return $this->insert($payInfo);
        }
    }

    public function updateOrderBySn($order_no, $payInfo){
        $row = $this->getORM()
            ->where('order_no', $order_no)
            ->update($payInfo);
        return $row;
    }
}