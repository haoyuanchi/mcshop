<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 11:56
 */

class Api_Good extends PhalApi_Api {

    public function getRules() {
        return array(
            'getListByBrand' => array(
                'brandId' => array('name' => 'brandId', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品品牌id'),
                'page' => array('name' => 'pageNumber', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '第几页'),
                'size' => array('name' => 'pageSize', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '查询数量'),
                'sort' => array('name' => 'orderType', 'type' => 'string', 'require' => false, 'desc' => '排序方式'),
            ),
            'getListByCategory' => array(
				'brandId' => array('name' => 'brandId', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品品牌id'),
                'categoryId' => array('name' => 'productCategoryId', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品种类id'),
                'page' => array('name' => 'pageNumber', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '第几页'),
                'size' => array('name' => 'pageSize', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '查询数量'),
                'sort' => array('name' => 'orderType', 'type' => 'string', 'require' => false, 'desc' => '排序方式'),
            ),
			'getListByTagIds' => array(
                'page' => array('name' => 'pageNumber', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '第几页'),
                'size' => array('name' => 'pageSize', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '查询数量'),
                'sort' => array('name' => 'orderType', 'type' => 'string', 'require' => false, 'desc' => '排序方式'),
            ),
			'getListByTSearch' => array(
				'search' => array('name' => 'searchValue', 'type' => 'string', 'min' => 1, 'require' => true, 'desc' => '搜索关键字'),
                'page' => array('name' => 'pageNumber', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '第几页'),
                'size' => array('name' => 'pageSize', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '查询数量'),
                'sort' => array('name' => 'orderType', 'type' => 'string', 'require' => false, 'desc' => '排序方式'),
            ),
            'getInfo' => array(
                'goodId' => array('name' => 'good_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品id'),
            ),
        );
    }

    /**
     * 获取商品列表
     * @desc 获取商品列表
     * @return int code 操作码，0表示成功
	 * @return string brand_img 所属品牌图片地址
	 * @return int totalPages 总共有多少页
     * @return array good_list 商品列表
     * @return int good_list[].brand_id 所属品牌ID
     * @return bolean good_list[].isNewArrival 是否新品
	 * @return int good_list[].category_id 所属类别
     * @return int good_list[].id 商品ID
     * @return string good_list[].name 商品名字
     * @return string good_list[].image 商品图片
     * @return string good_list[].price_origin 商品原价
     * @return string good_list[].price_sale 商品促销价
     * @return int good_number 返回商品的数量
     * @return string msg 提示信息
     */
    public function getListByBrand() {

    }

    /**
     * 获取商品列表
     * @desc 获取商品列表
     * @return int code 操作码，0表示成功
	 * @return int totalPages 总共有多少页
     * @return array good_list 商品列表
     * @return int good_list[].brand_id 所属品牌ID
     * @return bolean good_list[].isNewArrival 是否新品
	 * @return int good_list[].category_id 所属类别
     * @return int good_list[].id 商品ID
     * @return string good_list[].name 商品名字
     * @return string good_list[].image 商品图片
     * @return string good_list[].price_origin 商品原价
     * @return string good_list[].price_sale 商品促销价
     * @return int good_number 返回商品的数量
     * @return string msg 提示信息
     */
    public function getListByCategory() {

    }
	
	/**
     * 获取商品列表
     * @desc 获取商品列表
     * @return int code 操作码，0表示成功
	 * @return string tag_img tag商品分类图片地址
	 * @return int totalPages 总共有多少页
     * @return array good_list 商品列表
     * @return int good_list[].brand_id 所属品牌ID
     * @return bolean good_list[].isNewArrival 是否新品
	 * @return int good_list[].category_id 所属类别
     * @return int good_list[].id 商品ID
     * @return string good_list[].name 商品名字
     * @return string good_list[].image 商品图片
     * @return string good_list[].price_origin 商品原价
     * @return string good_list[].price_sale 商品促销价
     * @return int good_number 返回商品的数量
     * @return string msg 提示信息
     */
    public function getListByTagIds() {

    }
	
	/**
     * 获取商品列表
     * @desc 获取商品列表
     * @return int code 操作码，0表示成功
	 * @return string tag_img tag商品分类图片地址
	 * @return int totalPages 总共有多少页
     * @return array good_list 商品列表
     * @return int good_list[].brand_id 所属品牌ID
     * @return bolean good_list[].isNewArrival 是否新品
	 * @return int good_list[].category_id 所属类别
     * @return int good_list[].id 商品ID
     * @return string good_list[].name 商品名字
     * @return string good_list[].image 商品图片
     * @return string good_list[].price_origin 商品原价
     * @return string good_list[].price_sale 商品促销价
     * @return int good_number 返回商品的数量
     * @return string msg 提示信息
     */
    public function getListBySearch() {

    }

    /**
     * 获取商品详情
     * @desc 获取商品列表
     * @return int code 操作码，0表示成功
     * @return object good
     * @return int good.id 商品ID
     * @return string good.name 商品名字
     * @return string good.code 商品编号
     * @return string good.price_orign 商品价格原始价格
	 * @return string good.price_sale 商品价格出售
	 * @return string good.rejected  商品退货详情链接
     * @return array good.sizeTable_list 商品尺码表
	 * @return string good.sizeTable_list[].image 商品尺码表图片
     * @return string good.delivery_info 商品寄送信息
     * @return string good.ingredient 商品成分
     * @return array good.maintain_list 商品保养
	 * @return string good.maintain_list[].image 商品保养icond地址
	 * @return string good.maintain_list[].explain 商品保养文字说明
	 * @return string good.tips 商品保养注意事项
     * @return array good.image_list 商品图片列表
     * @return string good.image_list[].image 商品图片
     * @return array good.spec_list 商品规格列表颜色，尺码，数量
     * @return int good.spec_list[].product_id	确定规格商品的id
     * @return int good.spec_list[].color_id    商品颜色id 
     * @return string good.spec_list[].color_value 商品颜色文字说明
     * @return string good.spec_list[].color_image 商品颜色图
     * @return int good.spec_list[].size_id     商品尺码id
     * @return string good.spec_list[].size_value  商品尺码文字说明
     * @return int good.spec_list[].remain_number  商品剩余库存
	 * @return boolean good.spec_list[].isMarketable  商品是否可售 
     * @return string msg 提示信息
     */
    public function getInfo() {

    }

}