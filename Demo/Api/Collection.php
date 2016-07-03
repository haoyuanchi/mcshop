<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 11:57
 */

class Api_Collection extends PhalApi_Api {

    public function getRules() {
        return array(
            'getList' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
            ),
            'add' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'goodId' => array('name' => 'good_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '商品id'),
            ),
            'del' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'collectId' => array('name' => 'collect_id', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '收藏夹id'),
            ),
        );
    }


    /**
     * 获取收藏列表
     * @desc 获取收藏列表
     * @return int code 操作码，
     * @return array good_list 收藏商品列表
     * @return int good_list[].id 商品ID
     * @return string good_list[].image 商品图片地址
     * @return string good_list[].name 商品名称
     * @return string good_list[].price_origin 商品原价
     * @return string good_list[].price_sale 商品促销价
     * @return string msg 提示信息
     */
    public function getList() {
        $ret['code'] = 0;

        $model = new Model_Collection();
        $collectionList = $model->getListByUserId($this->userId);

        $modelGood = new Model_Good();
        foreach($collectionList as $key=>$collection){
            $good = $modelGood->getGood($collection['good_id']);
            $ret['good_list'] = array_merge(array('id' => $collection['id']), $good);
        }

        return $ret;
    }

    /**
     * 加入收藏夹
     * @desc 加入收藏夹
	 * @return object message 返回信息
	 * @return string message.type  固定值warn
	 * @return string message.content  该商品已收藏 or 商品收藏成功

     */
    public function add() {
        $ret['code'] = 0;

        $collection['good_id'] = $this->goodId;
        $collection['member_id'] = $this->userId;

        $model = new Model_Collection();
        $collectId = $model->insert($collection);
        $ret['collect_id'] = $collectId;

        return $ret;
    }

    /**
     * 取消收藏夹
     * @desc 取消收藏夹
     */
    public function del() {
        $ret['code'] = 0;

        $model = new Model_Collection();
        $collectId = $model->delete($this->collectId);
        $ret['collect_id'] = $collectId;

        return $ret;
    }

}