<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/30
 * Time: 19:08
 */

class Model_Category extends PhalApi_Model_NotORM
{

    protected function getTableName($id)
    {
        return 'category';
    }

    public function getList(){
        $row = $this->getORM()
            ->select('*')
            ->order('orders desc')
            ->fetchAll();
        return $row;
    }

}