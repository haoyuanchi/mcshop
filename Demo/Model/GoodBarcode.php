<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/1
 * Time: 20:01
 */

class Model_GoodBarcode extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'good_barcode';
    }

    public function getBarcodeList($good_id){
        $rows = $this->getORM()->select('*')
            ->where('good_id',$good_id)->where('is_active',1)
            ->fetchAll();
        return $rows;
    }
}