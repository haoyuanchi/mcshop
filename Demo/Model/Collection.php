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

    public function isCollected($userId, $goodId){
        $num = $this->getORM()
            ->where('member_id', $userId)
            ->where('good_id', $goodId)
            ->count('id');
        return $num == 0 ? false : true;
    }

    public function deleteByGoodId($userId, $goodId){
        return $this->getORM()
            ->where('member_id', $userId)
            ->where('good_id', $goodId)
            ->delete();
    }
}