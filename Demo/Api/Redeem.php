<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 16:56
 */

class Api_Redeem extends PhalApi_Api {

    public function getRules() {
        return array(
            'getTheRules' => array(
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id，不同品牌兑换规则不同'),
            ),
            'redeemMO' => array(
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
				'redeemNumber' => array('name' => 'redeem_umber', 'type' => 'int', 'require' => true, 'desc' => '兑换数量(MO)'),
            ),
            'getValue' => array(
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
				'redeemIntegral ' => array('name' => 'integral', 'type' => 'int', 'require' => true, 'desc' => '兑换积分'),
            ),
            'redeemEd' => array(
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
				'redeemIntegral' => array('name' => 'integral', 'type' => 'int', 'require' => true, 'desc' => '兑换积分'),
				'coupon ' => array('name' => 'coupon', 'type' => 'float', 'require' => true, 'desc' => '兑换的面值'),
            ),
            'getStore' => array(
				'brandId' => array('name' => 'brand_id', 'type' => 'int', 'require' => true, 'desc' => '品牌id'),
				'provinceId' => array('name' => 'provice_id', 'type' => 'int', 'require' => true, 'desc' => '省id'),
				'cityId ' => array('name' => 'city_id', 'type' => 'int', 'require' => true, 'desc' => '市id'),
            ),
			

        );
    }

    /**
     * 获取相应品牌的可用积分及兑换规则
     * @desc 获取应品牌的积分及兑换规则
     * @return int integral   积分
     * @return string rules 相应规则
	 * @return string msg 提示信息
     */
    public function getTheRules() {

    }

    /**
     * MO品牌的积分兑换
     * @desc MO品牌的积分兑换
	 * @return int code 操作码
	 * @return string msg 提示信息
     */
    public function redeemMO() {

    }
	
    /**
     * Ed品牌输入兑换额获取可兑换面值
     * @desc 获取应品牌的积分及兑换规则
     * @return int coupon   可兑换面值
	 * @return string msg 提示信息
     */
    public function getValue() {

    }

    /**
     * Ed品牌的积分兑换
     * @desc Ed品牌的积分兑换
	 * @return int code 操作码
	 * @return string msg 提示信息
     */
    public function redeemEd() {

    }
	
    /**
     * 获取适用店铺
     * @获取适用店铺
	 * @return int code 操作码
	 * @return array store_list 适用店铺列表
	 * @return string store_list[].name 店铺名称
	 * @return string msg 提示信息
     */
    public function getStore() {

    }
	
	
}