<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/4
 * Time: 2:47
 */

class Model_ViewMemberCurrentBirth extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'v_member_current_birth';
    }

    public function isGiftAuthority($userId){
        $num = $this->getORM()
            ->where('id', $userId)
            ->count('id');
        return $num == 1 ? true : false;
    }

}