<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/3
 * Time: 21:36
 */

class Model_MemberRank extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'member_rank';
    }

    public function getByMemberRankId($memberRankId){
        $row = $this->getORM()
            ->select('*')
            ->where('id', $memberRankId)
            ->fetch();
        return $row;
    }
}