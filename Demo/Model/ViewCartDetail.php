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

    public function getListByUserId($userId){
        $rows = $this->getORM()
            ->select('*')
            ->where('member_id', $userId)
            ->fetchAll();
        return $rows;
    }
}