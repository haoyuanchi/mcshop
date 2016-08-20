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
                'provinceId' => array('name' => 'province_id', 'type' => 'int', 'require' => true, 'desc' => '省id'),
            ),
			'getAreaList' => array(
                'city' => array('name' => 'city_id', 'type' => 'int', 'require' => true, 'desc' => '市id'),
            ),
			'addAddress' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
				'province' => array('name' => 'province', 'type' => 'string', 'require' => true, 'desc' => '省'),
                'city' => array('name' => 'city', 'type' => 'string', 'require' => true, 'desc' => '市'),
                'area' => array('name' => 'area', 'type' => 'string', 'require' => true, 'desc' => '区'),
                'detail' => array('name' => 'detail', 'type' => 'string', 'require' => true, 'desc' => '详细'),
				'name' => array('name' => 'name', 'type' => 'string', 'require' => true, 'desc' => '收件人姓名'),
				'tel' => array('name' => 'tel', 'type' => 'string', 'require' => true, 'desc' => '收件人电话'),
				'postcode' => array('name' => 'postcode', 'type' => 'string', 'require' => true, 'desc' => '邮编'),
            ),
			'editAddress' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
				'addrId' => array('name' => 'addr_id', 'type' => 'int', 'require' => true, 'desc' => '原收货地址id'),
                'province' => array('name' => 'province', 'type' => 'string', 'require' => true, 'desc' => '省'),
                'city' => array('name' => 'city', 'type' => 'string', 'require' => true, 'desc' => '市'),
                'area' => array('name' => 'area', 'type' => 'string', 'require' => true, 'desc' => '区'),
                'detail' => array('name' => 'detail', 'type' => 'string', 'require' => true, 'desc' => '详细'),
				'name' => array('name' => 'name', 'type' => 'string', 'require' => true, 'desc' => '收件人姓名'),
				'tel' => array('name' => 'tel', 'type' => 'string', 'require' => true, 'desc' => '收件人电话'),
				'postcode' => array('name' => 'postcode', 'type' => 'string', 'require' => true, 'desc' => '邮编'),
            ),
            'delAddress' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'addrId' => array('name' => 'addr_id', 'type' => 'int', 'require' => true, 'desc' => '收货地址id'),
            ),
			'getAddress' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
				'addrId' => array('name' => 'addr_id', 'type' => 'int', 'require' => true, 'desc' => '收货地址id'),
            ),
            'getAddressList' => array(
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
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
	
	/**
     * 收货地址获取县区列表
     * @desc 新增收货地址获取县区列表
     * @return int code 操作码
     * @return array area_list 地区列表
	 * @return int area_list[].id 地区id
     * @return string area_list[].name 地区名称
     * @return string area_list[].code 地区名称
     * @return string msg 提示信息
     */
    public function getAreaList() {
        $model = new Model_AddrArea();
        $ret['area_list'] = $model->getListByCityId($this->cityId);
        $ret['code'] = 0;

        return $ret;
    }
	
	/**
     * 新增收货地址
     * @desc 新增收货地址
     * @return int code 操作码
	 * @return int addr_id 新生成的收货地址编号
     * @return string msg 提示信息
     */
    public function addAddress() {
        $ret['code'] = 0;

        $addr['address'] = $this->province.$this->city.$this->area.$this->detail;
        $addr['province'] = $this->province;
        $addr['city'] = $this->city;
        $addr['area'] = $this->area;
        $addr['detail'] = $this->detail;
        $addr['consignee'] = $this->name;
        $addr['phone'] = $this->tel;
        $addr['postcode'] = $this->postcode;
        $addr['create_date'] = date('Y-m-d H:i:s');
        $addr['modify_date'] = date('Y-m-d H:i:s');
        $addr['user_id'] = $this->userId;

        $model = new Model_Address();
        $addrId = $model->insert($addr);

        $ret['addr_id'] = $addrId;

        $ret['msg'] = '';
        return $ret;
    }
	
	/**
     * 修改收货地址
     * @desc 修改收货地址
     * @return int code 操作码
	 * @return int addr_id 收货地址编号
     * @return string msg 提示信息
     */
    public function editAddress() {
        $ret['code'] = 0;

        $addr['address'] = $this->province.$this->city.$this->area.$this->detail;
        $addr['province'] = $this->province;
        $addr['city'] = $this->city;
        $addr['area'] = $this->area;
        $addr['detail'] = $this->detail;
        $addr['consignee'] = $this->name;
        $addr['phone'] = $this->tel;
        $addr['postcode'] = $this->postcode;
        $addr['modify_date'] = date('Y-m-d H:i:s');
        $addr['user_id'] = $this->userId;

        $model = new Model_Address();
        $ret['addr_id'] = $model->update($this->addrId, $addr);

        $ret['msg'] = '';
        return $ret;
    }

    /**
     * 删除收货地址
     * @desc 删除收货地址
     * @return int code 操作码
     * @return int is_deleted 是否删除收货地址
     * @return string msg 提示信息
     */
    public function delAddress() {
        $ret['code'] = 0;

        $model = new Model_Address();
        $ret['is_deleted'] = $model->delete($this->addrId);

        $ret['msg'] = '';
        return $ret;
    }




    /**
     * 获取收货地址列表
     * @desc 获取收货地址列表
     * @return int code 操作码
     * @return array address_list 地址
     * @return string address_list[].id 地址id
     * @return string address_list[].province 地址id
     * @return string address_list[].city_value 市
     * @return string address_list[].county_value 区县
     * @return string address_list[].detail 详细地址
     * @return string address_list[].address 全部地址
     * @return string address_list[].name 收货人名字
     * @return string address_list[].tel 收货人电话
     * @return string address_list[].postcodes 收货人邮编
     * @return string msg 提示信息
     */
    public function getAddressList() {
        $ret['code'] = 0;

        $model = new Model_Address();
        $ret['address_list'] = $model->getListByUserId($this->userId);

        $ret['msg'] = '';
        return $ret;
    }

    /**
     * 获取收货地址列表
     * @desc 获取收货地址列表
     * @return int code 操作码
     * @return object address 地址
     * @return string address.id 地址id
     * @return string address.province 地址id
     * @return string address.city_value 市
     * @return string address.county_value 区县
     * @return string address.detail 详细地址
     * @return string address.address 全部地址
     * @return string address.name 收货人名字
     * @return string address.tel 收货人电话
     * @return string address.postcodes 收货人邮编
     * @return string msg 提示信息
     */
    public function getAddress() {
        $ret['code'] = 0;

        $model = new Model_Address();
        $ret['address'] = $model->get($this->addrId);

        $ret['msg'] = '';
        return;
    }
}