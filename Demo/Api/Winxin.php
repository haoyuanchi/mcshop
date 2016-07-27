<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/27
 * Time: 9:20
 */

class Api_Winxin extends PhalApi_Api{
    private $appid = 'wxac6c150d38e45e9f';
    private $appSecret = '2e1aa740dfe08639edea2bb4ed1432d7';

    public function getRules() {
        return array(
            'getSignPackage' => array(

            ),
            'updateLocation' => array(
                'openid' => array('name' => 'openid', 'type' => 'string', 'require' => true, 'desc' => 'openid'),
                'latitude' => array('name' => 'latitude', 'type' => 'float', 'require' => true, 'desc' => '纬度，浮点数，范围为90 ~ -90'),
                'longitude' => array('name' => 'longitude', 'type' => 'float', 'require' => true, 'desc' => '经度，浮点数，范围为180 ~ -180'),
            ),
        );
    }

    public function getSignPackage(){
        $domain = new Domain_WxJSSDK($this->appid, $this->appSecret);
        $ret = $domain->getSignPackage();
        return $ret;
    }

    /**
     * 更新用户的经纬度
     * @desc 更新用户的经纬度
     * @return int code 操作码，0表示成功
     * @return string msg 提示信息
     */
    public function updateLocation(){
        $ret['code'] = 0;

        $model = new Model_WxUser();
        $ret['id'] = $model->updateAddress($this->openid, $this->latitude, $this->longitude);

        $ret['msg'] = '';
        return $ret;
    }

}