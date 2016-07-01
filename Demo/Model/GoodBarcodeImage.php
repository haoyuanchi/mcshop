<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/1
 * Time: 20:55
 */

class Model_GoodBarcodeImage extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'good_barcode_image';
    }

    public function getList($barcodeId){
        $rows = $this->getORM()->select('*')
            ->where('barcode_id',$barcodeId)
            ->order('sort')
            ->fetchAll();
        return $rows;
    }
}