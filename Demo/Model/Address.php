<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/2
 * Time: 23:17
 */
class Model_Address extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'member_address';
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