<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/22
 * Time: 11:56
 */

class Api_Address extends PhalApi_Api {

    public function getRules() {
        return array(
            'getProvinceList' => array(
                
            ),
			'getCityList' => array(
                'provice' => array('name' => 'provice_id', 'type' => 'int', 'require' => true, 'desc' => '省id'),
            ),
			'getCountyList' => array(
                'city' => array('name' => 'city_id', 'type' => 'int', 'require' => true, 'desc' => '市id'),
            ),
			'newAddress' => array(
				'provice' => array('name' => 'provice_id', 'type' => 'int', 'require' => true, 'desc' => '省id'),
				'city' => array('name' => 'city_id', 'type' => 'int', 'require' => true, 'desc' => '市id'),
				'county' => array('name' => 'county_id', 'type' => 'int', 'require' => true, 'desc' => '区县id'),
				'detail' => array('name' => 'detail', 'type' => 'string', 'require' => true, 'desc' => '具体地址'),
				'name' => array('name' => 'name', 'type' => 'string', 'require' => true, 'desc' => '收件人姓名'),
				'tel' => array('name' => 'tel', 'type' => 'string', 'require' => true, 'desc' => '收件人电话'),
				'postcodes' => array('name' => 'postcodes', 'type' => 'string', 'require' => true, 'desc' => '邮编'),
            ),
			'editAddress' => array(
				'addr_id' => array('name' => 'addr_id', 'type' => 'int', 'require' => true, 'desc' => '原收货地址id'),
				'provice' => array('name' => 'provice_id', 'type' => 'int', 'require' => true, 'desc' => '省id'),
				'city' => array('name' => 'city_id', 'type' => 'int', 'require' => true, 'desc' => '市id'),
				'county' => array('name' => 'county_id', 'type' => 'int', 'require' => true, 'desc' => '区县id'),
				'detail' => array('name' => 'detail', 'type' => 'string', 'require' => true, 'desc' => '具体地址'),
				'name' => array('name' => 'name', 'type' => 'string', 'require' => true, 'desc' => '收件人姓名'),
				'tel' => array('name' => 'tel', 'type' => 'string', 'require' => true, 'desc' => '收件人电话'),
				'postcodes' => array('name' => 'postcodes', 'type' => 'string', 'require' => true, 'desc' => '邮编'),
            ),
			'getAddress' => array(
				'addr_id' => array('name' => 'addr_id', 'type' => 'int', 'require' => true, 'desc' => '原收货地址id'),
            ),
        );
    }

   	 /**
     * 收货地址获取省份列表
     * @desc 新增收货地址获取省份列表
     * @return int code 操作码
     * @return array provide_list 省份列表
	 * @return int provide_list_id 省份id
     * @return string provide_list_name 省份名称
     * @return string msg 提示信息
     */
    public function getProvinceList() {

    }
	
	/**
     * 收货地址获取城市列表
     * @desc 新增收货地址获取城市列表
     * @return int code 操作码
     * @return array city_list 省份列表
	 * @return int city_list_id 省份id
     * @return string city_list_name 省份名称
     * @return string msg 提示信息
     */
    public function getCityList() {

    }
	
	/**
     * 收货地址获取县区列表
     * @desc 新增收货地址获取县区列表
     * @return int code 操作码
     * @return array county_list 省份列表
	 * @return int county_list_id 省份id
     * @return string county_list_name 省份名称
     * @return string msg 提示信息
     */
    public function getCountyList() {

    }
	
	/**
     * 新增收货地址
     * @desc 新增收货地址
     * @return int code 操作码
	 * @return int addr_id 新生成的收货地址编号
     * @return string msg 提示信息
     */
    public function newAddress() {

    }
	
	/**
     * 修改收货地址
     * @desc 修改收货地址
     * @return int code 操作码
	 * @return int addr_id 收货地址编号
     * @return string msg 提示信息
     */
    public function editAddress() {

    }
	
	/**
     * 获取收货地址
     * @desc 获取收货地址
     * @return int code 操作码
	 * @return string provice_value 省
	 * @return int provice_id 省id
	 * @return string city_value 市
	 * @return int city_id 市id
	 * @return string county_value 区县
	 * @return int county_id 区县id
	 * @return string detail 详细地址
	 * @return string name 收货人名字
	 * @return string tel 收货人电话
	 * @return string postcodes 收货人邮编
     * @return string msg 提示信息
     */
    public function getAddress() {

    }
}