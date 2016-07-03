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

    public function getByUserId($userId){
        $rows = $this->getORM()
            ->select('*')
            ->where('memeber_id', $userId)
            ->fetch();
        return $rows;
    }
}