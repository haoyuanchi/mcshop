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
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品品牌id'),
                'page' => array('name' => 'page', 'type' => 'int', 'min' => 0, 'require' => false, 'default'=>0, 'desc' => '第几页'),
                'size' => array('name' => 'size', 'type' => 'int', 'min' => 1, 'require' => false, 'default'=>6, 'desc' => '查询数量'),
                'sort' => array('name' => 'order_type', 'type' => 'string', 'require' => false, 'default'=>'create_date', 'desc' => '排序方式'),
            ),
            'getListByCategory' => array(
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品品牌id'),
                'categoryId' => array('name' => 'category_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品种类id'),
                'page' => array('name' => 'page', 'type' => 'int', 'min' => 0, 'require' => false, 'default'=>0, 'desc' => '第几页'),
                'size' => array('name' => 'size', 'type' => 'int', 'min' => 1, 'require' => false, 'default'=>6, 'desc' => '查询数量'),
                'sort' => array('name' => 'order_type', 'type' => 'string', 'require' => false, 'default'=>'create_date', 'desc' => '排序方式'),
            ),
			'getListByTagId' => array(
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品品牌id'),
                'tagId'=> array('name' => 'tag_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品tag'),
                'page' => array('name' => 'page', 'type' => 'int', 'min' => 0, 'require' => false, 'default'=>0, 'desc' => '第几页'),
                'size' => array('name' => 'size', 'type' => 'int', 'min' => 1, 'require' => false, 'default'=>6, 'desc' => '查询数量'),
                'sort' => array('name' => 'order_type', 'type' => 'string', 'require' => false, 'default'=>'create_date', 'desc' => '排序方式'),
            ),
			'getListByTSearch' => array(
				'search' => array('name' => 'search_value', 'type' => 'string', 'min' => 1, 'require' => true, 'desc' => '搜索关键字'),
                'page' => array('name' => 'page', 'type' => 'int', 'min' => 0, 'require' => false, 'default'=>0, 'desc' => '第几页'),
                'size' => array('name' => 'size', 'type' => 'int', 'min' => 1, 'require' => false, 'default'=>10, 'desc' => '查询数量'),
                'sort' => array('name' => 'order_type', 'type' => 'string', 'require' => false, 'default'=>'create_date', 'desc' => '排序方式'),
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
	 * @return int total_pages 总共有多少页
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
        $model = new Model_Good();
        $page_size = $this->size;
        $start = $this->page * $page_size;
        $list = $model->getListByBrand($this->brandId, $start, $page_size, $this->sort);

        $count = $model->getCountByBrand($this->brandId);
        $tol_page = ceil($count / $page_size);

        $ret['brand_img'] = $list[0]['cover'];
        $ret['total_pages'] = $tol_page;
        $ret['good_list'] = $list;
        $ret['good_number'] = $page_size;
        return $ret;
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
        $model = new Model_Good();
        $page_size = $this->size;
        $start = $this->page * $page_size;
        $list = $model->getListByCategory($this->brandId, $this->categoryId, $start, $page_size, $this->sort);
        $count = $model->getCountByCategory($this->brandId, $this->categoryId);
        $tol_page = ceil($count / $page_size);

        $ret['brand_img'] = $list[0]['cover'];
        $ret['total_pages'] = $tol_page;
        $ret['good_list'] = $list;
        $ret['good_number'] = $page_size;
        return $ret;
    }

	/**
     * 获取商品列表
     * @desc 获取商品列表
     * @return int code 操作码，0表示成功
	 * @return string tag_img tag商品分类图片地址
	 * @return int totalPages 总共有多少页
     * @return array good_list 商品列表
     * @return int good_list[].brand_id 所属品牌ID
	 * @return int good_list[].category_id 所属类别
     * @return int good_list[].id 商品ID
     * @return string good_list[].name 商品名字
     * @return string good_list[].image 商品图片
     * @return string good_list[].price_origin 商品原价
     * @return string good_list[].price_sale 商品促销价
     * @return int good_number 返回商品的数量
     * @return string msg 提示信息
     */
    public function getListByTagId() {
        $model = new Model_Good();
        $page_size = $this->size;
        $start = $this->page * $page_size;
        $list = $model->getListByTag($this->brandId, $this->tagId, $start, $page_size, $this->sort);
        $count = $model->getCountByTag($this->brandId, $this->tagId);
        $tol_page = ceil($count / $page_size);

        $ret['total_pages'] = $tol_page;
        if($this->brandId == 18){
            $ret['tag_img'] = $list[0]['mo_mobile_cover'];
        }
        else{
            $ret['tag_img'] = $list[0]['ed_mobile_cover'];
        }

        $ret['good_list'] = $list;
        $ret['good_number'] = $page_size;
        return $ret;
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
     * @return string good.ingredient 商品成分
     * @return string good.tips 商品保养注意事项
     * @return string good.delivery_info 商品寄送信息
     * @return array good.sizeTable_list 商品尺码表
	 * @return string good.sizeTable_list[].image 商品尺码表图片
     * @return array good.maintain_list 商品保养
	 * @return string good.maintain_list[].image 商品保养icond地址
	 * @return string good.maintain_list[].explain 商品保养文字说明
     * @return array good.image_list 商品图片列表
     * @return string good.image_list[].image 商品图片
     * @return array good.spec_list 商品规格列表颜色，尺码，数量
     * @return int good.spec_list[].id	barcode_id
     * @return int good.spec_list[].barcode	 商品条形码
     * @return int good.spec_list[].name	full_name
     * @return int good.spec_list[].color_id    商品颜色id
     * @return string good.spec_list[].color_value 商品颜色文字说明
     * @return string good.spec_list[].color_image 商品颜色图
     * @return int good.spec_list[].size_id     商品尺码id
     * @return string good.spec_list[].size_value  商品尺码文字说明
     * @return int good.spec_list[].remain_number  商品剩余库存
     * @return array good.spec_list[].image_list 商品图片列表
     * @return string good.spec_list[].image_list[].image 商品图片
     * @return string msg 提示信息
     */
    public function getInfo() {
        // 商品基本信息
        $model = new Model_Good();
        $good = $model->getGood($this->goodId);

        // 商品的条码信息  spec_list
        $model = new Model_GoodBarcode();
        $goodBarcodeList = $model->getBarcodeList($this->goodId);

        // 商品尺码表
        $model = new Model_GoodSizeImage();
        $sizeTableList = $model->getSizeImageList($this->goodId);

        // 商品保养
        $model = new Model_GoodMaintain();
        $maintainList = $model->getMaintainList($this->goodId);

        $ret['good']['id'] = $good['id'];
        $ret['good']['code'] = $good['code'];
        $ret['good']['name'] = $good['name'];
        $ret['good']['price_origin'] = $good['price_origin'];
        $ret['good']['price_sale'] = $good['price'];
        $ret['good']['rejected'] = $good['price'];
        $ret['good']['ingredient'] = $good['ingredient'];
        $ret['good']['delivery_info'] = $good['delivery_info'];
        $ret['good']['rejected'] = $good['rejected'];

        foreach($sizeTableList as $key=>$sizeTable){
            $ret['good']['sizeTable_list'][$key]['image'] = $sizeTable['size_guide_img'];
        }

        foreach($maintainList as $key=>$maintain){
            $ret['good']['maintain_list'][$key]['image'] = $maintain['washing_icon'];
            $ret['good']['maintain_list'][$key]['explain'] = $maintain['instructions'];
        }

        foreach($maintainList as $key=>$maintain){
            $ret['good']['maintain_list'][$key]['image'] = $maintain['washing_icon'];
            $ret['good']['maintain_list'][$key]['explain'] = $maintain['instructions'];
        }

        $model = new Model_GoodBarcodeImage();
        foreach($goodBarcodeList as $key=>$barcode){
            $ret['good']['spec_list'][$key]['id'] = $barcode['id'];
            $ret['good']['spec_list'][$key]['barcode'] = $barcode['barcode'];
            $ret['good']['spec_list'][$key]['name'] = $barcode['full_name'];
            $ret['good']['spec_list'][$key]['barcode'] = $barcode['barcode'];
            $ret['good']['spec_list'][$key]['color_id'] = $barcode['color_id'];
            $ret['good']['spec_list'][$key]['color_code'] = $barcode['color_code'];
            $ret['good']['spec_list'][$key]['color_name'] = $barcode['color_name'];
            $ret['good']['spec_list'][$key]['color_image'] = $barcode['color_image_thumbnail'];
            $ret['good']['spec_list'][$key]['size_id'] = $barcode['size_id'];
            $ret['good']['spec_list'][$key]['size_code'] = $barcode['size_code'];
            $ret['good']['spec_list'][$key]['size_name'] = $barcode['size_name'];
            $ret['good']['spec_list'][$key]['remain_number'] = $barcode['stock'];
            $ret['good']['spec_list'][$key]['allocated_stock'] = $barcode['allocated_stock'];

            $specImageList = $model->getList($barcode['id']);

            foreach($specImageList as $key2=>$specImage){
                if($key == 0){
                    $ret['good']['image_list'][$key2] = $specImage['source'];
                }
                $ret['good']['spec_list'][$key]['image_list'][$key2] = $specImage['source'];
            }
        }

        return $ret;
    }
}