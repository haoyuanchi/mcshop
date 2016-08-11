<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/3
 * Time: 0:02
 */

class Model_Collection extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'user_collection';
    }

    public function getListByUserId($userId, $brandId){
        $rows = $this->getORM()
            ->select('*')
            ->where('user_id', $userId)
            ->where('brand_id', $brandId)
            ->order('create_date')
            ->fetchAll();
        return $rows;
    }

    public function isCollected($userId, $brandId, $goodId){
        $num = $this->getORM()
            ->where('user_id', $userId)
            ->where('brand_id', $brandId)
            ->where('good_id', $goodId)
            ->count('id');
        return $num == 0 ? false : true;
    }

    public function deleteByGoodId($userId, $brandId, $goodId){
        return $this->getORM()
            ->where('user_id', $userId)
            ->where('brand_id', $brandId)
            ->where('good_id', $goodId)
            ->delete();
    }
}