<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/2
 * Time: 23:46
 */

class Model_Cart extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'cart';
    }

    public function isExits($userId, $barcodeId){
        $num = $this->getORM()
            ->where('member_id', $userId)
            ->where('barcode_id', $barcodeId)
            ->count('id');
        return $num == 0 ? false : true;
    }

    public function insert_update($userId, $barcodeId, $cart){
        if($this->isExits($userId, $barcodeId)){
            // 更新
            $quantity = 'quantity + ' . $cart['quantity'];
            $cart['quantity'] = new NotORM_Literal($quantity);

            return $this->getORM()
                ->where('member_id', $userId)
                ->where('barcode_id', $barcodeId)
                ->update($cart);
        }
        else{
            return $this->insert($cart);
        }
    }

    public function getListByUserId($userId){
        $rows = $this->getORM()
            ->select('*')
            ->where('member_id', $userId)
            ->order('create_date')
            ->fetchAll();
        return $rows;
    }
}