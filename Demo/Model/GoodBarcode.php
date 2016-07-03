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

    public function getDetailByBarcodeId($barcodeId){
        $sql = 'select t1.id, t1.barcode, t1.full_name, t1.color_id, t1.color_code, t1.color_name,'
            .' t1.size_id, t1.size_code, t1.size_name, t1.stock, t1.allocated_stock, t1.color_image_thumbnail,'
            .' t2.code, t2.name, t2.price_origin, t2.price_point, t2.price, t2.point, t2.image'
            .' from mc_good_barcode as t1 left join mc_good t2 on t1.good_id=t2.id'
            .' where t1.id=:barcodeId';
        $params = array(':barcodeId' => $barcodeId);
        $rows = $this->getORM()->queryAll($sql, $params);
        return $rows[0];
    }
}