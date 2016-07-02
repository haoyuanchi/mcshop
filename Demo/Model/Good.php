<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/30
 * Time: 18:58
 */

class Model_Good extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'good';
    }

    public function getAllListByBrand($brandId){
        $sql = 'select t1.id as good_id, t2.id as brand_id, t1.category_id, t1.code, t1.price_origin, t1.price_point, t1.image, t1.name, t1.price, t2.cover'
            .' from mc_good as t1 left join mc_brand t2 on t1.brand_id=t2.id'
            .' where t1.brand_id=:brand_id';

        $params = array(':brand_id' => $brandId);
        $rows = $this->getORM()->queryAll($sql, $params);
        return $rows;
    }

    public function getListByBrand($brandId, $start, $num, $sort){
        $sql = 'select t1.id as good_id, t2.id as brand_id, t1.category_id, t1.code, t1.price_origin, t1.price_point, t1.image, t1.name, t1.price, t2.cover'
            .' from mc_good as t1 left join mc_brand t2 on t1.brand_id=t2.id where t1.brand_id=:brand_id order by sort limit :start, :num';

        $params = array(':brand_id' => $brandId, ':start' => $start, ':num' => $num);

        $rows = $this->getORM()->queryAll($sql, $params);
        return $rows;
    }

    public function getCountByBrand($brandId){
        $sql = 'select count(t1.id) as total'
            .' from mc_good as t1 left join mc_brand t2 on t1.brand_id=t2.id where t1.brand_id=:brand_id';
        $params = array(':brand_id' => $brandId);
        $rows = $this->getORM()->queryAll($sql, $params);
        $ret = $rows[0]['total'];
        return $ret;
    }

    public function getListByCategory($brandId, $categoryId, $start, $num, $sort){
        $sql = 'select t1.id as good_id, t2.id as brand_id, t1.category_id, t1.code, t1.price_origin, t1.price_point, t1.image, t1.name, t1.price, t2.cover'
            .' from mc_good as t1 left join mc_brand t2 on t1.brand_id=t2.id'
            .' where t1.brand_id=:brand_id and t1.category_id=:categoryId'
            .' order by :sort'
            .' limit :start, :num';

        $params = array(':brand_id' => $brandId, ':categoryId' => $categoryId, ':sort'=>$sort, ':start' => $start, ':num' => $num);

        $rows = $this->getORM()->queryAll($sql, $params);
        return $rows;
    }

    public function getCountByCategory($brandId, $categoryId){
        $sql = 'select count(t1.id) as total'
            .' from mc_good as t1 left join mc_brand t2 on t1.brand_id=t2.id where t1.brand_id=:brandId and t1.category_id=:categoryId';
        $params = array(':brandId' => $brandId, ':categoryId' => $categoryId);
        $rows = $this->getORM()->queryAll($sql, $params);
        $ret = $rows[0]['total'];
        return $ret;
    }

    public function getListByTag($brandId, $tagId, $start, $num, $sort){
        $sql = 'select t1.id as good_id, t2.tag_id, t3.name, t3.ed_mobile_cover, t3.mo_mobile_cover,'
            .' t1.category_id, t1.code, t1.price_origin, t1.price_point, t1.image, t1.name, t1.price'
            .' from mc_good as t1 '
            .' left join mc_good_tag t2 on t1.id=t2.good_id'
            .' left join mc_tag t3 on t2.tag_id=t3.id'
            .' where t1.brand_id=:brand_id and t2.tag_id=:tagId'
            .' order by :sort'
            .' limit :start, :num';

        $params = array(':brand_id' => $brandId, ':tagId' => $tagId, ':sort'=>'t1.'.$sort, ':start' => $start, ':num' => $num);

        $rows = $this->getORM()->queryAll($sql, $params);
        return $rows;
    }

    public function getCountByTag($brandId, $tagId){
        $sql = 'select count(t1.id) as total'
            .' from mc_good as t1 left join mc_good_tag t2 on t1.id=t2.good_id'
            .' where t1.brand_id=:brandId and t2.tag_id=:tagId';
        $params = array(':brandId' => $brandId, ':tagId' => $tagId);
        $rows = $this->getORM()->queryAll($sql, $params);
        $ret = $rows[0]['total'];
        return $ret;
    }

    public function getGood($goodId){
        $ret = $this->getORM()->select('*')
            ->where('id', $goodId)
            ->fetch();

        return $ret;
    }
}