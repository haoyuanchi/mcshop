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
            'getIndex' => array(
                'code' => array('name' => 'code', 'type' => 'string', 'require' => false, 'default'=>'moco', 'desc' => '品牌code'),
            ),
        );
    }


    /**
     * 商城首页商品及品牌分类
	 * @desc 商品及品牌分类（暂时不用，用下面的index函数）
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


    /**
     * 商城首页商品及品牌分类
     * @desc 商品及品牌分类
     * @return object topCategory 顶部推荐商品类，可为空
     * @return int topCategory.url 顶部推荐商品链接地址
     * @return string topCategory.img 顶部推荐商品图片地址
     * @return array midCategory_list  中间滚动商品分类列表
     * @return int midCategory_list[].url  商品分类链接地址
     * @return int midCategory_list[].img	   商品分类图片地址
     * @return array brandCategory_list  品牌商品分类列表
     * @return int brandCategory_list[].brand_id  品牌商品的id
     * @return int brandCategory_list[].brand_name  品牌商品的英文缩写
     * @return int brandCategory_list[].img	  品牌商品图片地址
     */
    public function getIndex() {
        // 获取顶端
        $model = new Model_Tag();
        $top = $model->getTopImage();

        // 获取中间循环的图片
        $model = new Model_Index();
        $mids = $model->getRotationImageList('weixin');

        // 品牌
        $model = new Model_Brand();
        $brands = $model->getList();

        if($this->code=='moco') {
            $ret['topCategory']['tag_id'] = $top['id'];
            $ret['topCategory']['image'] = $top['mo_mobile_cover'];
        }
        else{
            $ret['topCategory']['tag_id'] = $top['id'];
            $ret['topCategory']['image'] = $top['ed_mobile_cover'];
        }

        foreach($mids as $key => $mid){
            $ret['midCategory_list'][$key]['tag_id'] = $mid['id'];
            $ret['midCategory_list'][$key]['img'] = $mid['rotation_image'];
        }

        foreach($brands as $key => $brand){
            $ret['brandCategory_list'][$key]['brand_id'] = $brand['id'];
            $ret['brandCategory_list'][$key]['brand_name'] = $brand['name'];
            $ret['brandCategory_list'][$key]['img'] = $brand['image'];
        }

        return $ret;
    }
}