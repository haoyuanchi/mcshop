<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/3
 * Time: 21:06
 */

class Model_ViewCartDetail extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'v_cart_detail';
    }

    public function getListByUserId($userId, $brandId){
        $rows = $this->getORM()
            ->select('*')
            ->where('user_id', $userId)
            ->where('brand_id', $brandId)
            ->fetchAll();
        return $rows;
    }

    public function getByCartId($cartId){
        $row = $this->getORM()
            ->select('*')
            ->where('cart_id', $cartId)
            ->fetch();
        return $row;
    }
}