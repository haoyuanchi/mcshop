<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/3
 * Time: 0:02
 */

class Model_Collection extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'member_collection';
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