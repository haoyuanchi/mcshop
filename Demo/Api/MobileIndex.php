<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 19:10
 */

class Api_MobileIndex extends PhalApi_Api {

    public function getRules() {
        return array(
            'getCategoryInfo' => array(
            ),
        );
    }


    /**
     * 商城首页商品及品牌分类
	 * @desc 商品及品牌分类
     * @return object topCategory 顶部推荐商品类，可为空
	 * @return int topCategory.tag_id 顶部推荐商品tagIds
	 * @return string topCategory.img 顶部推荐商品图片地址
	 * @return array midCategory_list  中间滚动商品分类列表
	 * @return int midCategory_list[].tag_id  商品分类tagIds
	 * @return int midCategory_list[].img	   商品分类图片地址	
	 * @return array brandCategory_list  品牌商品分类列表
	 * @return int brandCategory_list[].brand_id  品牌商品的id
	 * @return int brandCategory_list[].brand_name  品牌商品的英文缩写
	 * @return int brandCategory_list[].img	  品牌商品图片地址	
     */
	
    public function getCategoryInfo() {

    }

}