<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/3
 * Time: 0:56
 */

class Model_ViewCartTotal extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'v_cart_total';
    }

    public function getByUserId($userId, $brandId){
        $row = $this->getORM()
            ->select('*')
            ->where('user_id', $userId)
            ->where('brand_id', $brandId)
            ->fetch();
        return $row;
    }
}