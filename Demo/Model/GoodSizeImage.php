<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/1
 * Time: 20:30
 */

class Model_GoodSizeImage extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'good_size_image';
    }

    public function getSizeImageList($good_id){
        $rows = $this->getORM()->select('*')
            ->where('good_id',$good_id)
            ->fetchAll();
        return $rows;
    }
}