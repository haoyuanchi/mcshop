<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/28
 * Time: 15:32
 */

class Model_ModifyApplyLog extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'member_modify_apply_log';
    }


}