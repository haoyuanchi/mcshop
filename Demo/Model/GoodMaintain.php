<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/1
 * Time: 20:32
 */

class Model_GoodMaintain extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'good_washing_instructions';
    }

    public function getMaintainList($goodId){
        $sql = 'select t1.good_id,t2.id,t2.instructions,t2.washing_icon'
            .' from mc_good_washing_instruction t1 left join mc_washing_instruction t2 on t1.washing_instruction_id=t2.id'
            .' where t1.good_id=:goodId'
            .' order by t2.sort' ;
        $params = array(':goodId' => $goodId);
        $rows = $this->getORM()->queryAll($sql, $params);
        return $rows;
    }
}