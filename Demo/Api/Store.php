<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/23
 * Time: 19:38
 */

class Api_Store extends PhalApi_Api {

    public function getRules() {
        return array(
            'getStoreList' => array(
                'province' => array('name' => 'province', 'type' => 'string', 'require' => true, 'desc' => '省'),
                'city' => array('name' => 'city', 'type' => 'string', 'require' => true, 'desc' => '市'),
            ),
            'getNearbyStoreList' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'latitude' => array('name' => 'latitude', 'type' => 'flout', 'require' => true, 'desc' => '纬度，浮点数，范围为90 ~ -90'),
                'longitude' => array('name' => 'longitude', 'type' => 'flout', 'require' => true, 'desc' => '浮点数，范围为180 ~ -180'),
            ),
        );
    }

    /**
     * 收货地址获取省份列表
     * @desc 新增收货地址获取省份列表
     * @return int code 操作码
     * @return array province_list 省份列表
     * @return int province_list[].id 省份id
     * @return string province_list[].name 省份名称
     * @return string province_list[].code 省份名称
     * @return string msg 提示信息
     */
    public function getProvinceList() {
        $model = new Model_AddrProvince();
        $ret['provide_list'] = $model->getList();
        $ret['code'] = 0;

        return $ret;
    }

    /**
     * 收货地址获取城市列表
     * @desc 新增收货地址获取城市列表
     * @return int code 操作码
     * @return array city_list 城市列表
     * @return int city_list[].id 城市id
     * @return string city_list[].name 城市名称
     * @return string city_list[].code 城市编码
     * @return string msg 提示信息
     */
    public function getCityList() {
        $model = new Model_AddrCity();
        $ret['city_list'] = $model->getListByProvinceId($this->provindeId);
        $ret['code'] = 0;

        return $ret;
    }
}