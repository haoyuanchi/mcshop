<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/23
 * Time: 19:43
 */

class Model_MobileCode extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'mobile_code';
    }

    public function isMobileCode($codeId, $code){

    }

}