<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/23
 * Time: 19:38
 */
class Api_Store extends PhalApi_Api {

    const EARTH_RADIUS = 6371; //地球半径，平均半径为6371km

    public function getRules() {
        return array(
            'getStoreList' => array(
                'brandName' => array('name' => 'brand_name', 'type' => 'string', 'require' => true, 'desc' => '品牌名称， MO 或者 ED '),
                'province' => array('name' => 'province', 'type' => 'string', 'require' => true, 'desc' => '省'),
                'city' => array('name' => 'city', 'type' => 'string', 'require' => true, 'desc' => '市'),
            ),
            'getNearbyStoreList' => array(
                'brandId' => array('name' => 'brand_id', 'type' => 'string', 'require' => true, 'desc' => '品牌名称， MO 或者 ED '),
                'userId' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'latitude' => array('name' => 'latitude', 'type' => 'float', 'require' => true, 'desc' => '纬度，浮点数，范围为90 ~ -90'),
                'longitude' => array('name' => 'longitude', 'type' => 'float', 'require' => true, 'desc' => '经度，浮点数，范围为180 ~ -180'),
            ),
        );
    }

    /**
     * 根据省市查询店铺
     * @desc 根据省市查询店铺
     * @return int code 操作码
     * @return array store_list 店铺列表
     * @return string msg 提示信息
     */
    public function getStoreList() {
        $ret['code'] = 0;

        $model = new Model_Store();
        /*$modelBrand = new Model_Brand();
        $brandInfo = $modelBrand->get($this->brandId);*/

        $ret['store_list'] = $model->getListByCity($this->province, $this->city, $this->brandName);


        $ret['msg'] = '';

        return $ret;
    }

    /**
     * 查询附近的店铺
     * @desc 查询附近的店铺
     * @return int code 操作码
     * @return array store_list 店铺列表
     * @return string msg 提示信息
     */
    public function getNearbyStoreList() {
        $ret['code'] = 0;

        //使用此函数计算得到结果后，带入sql查询
        $squares = $this->__returnSquarePoint($this->longitude, $this->latitude);

        $model = new Model_Store();
        $ret['store_list'] = $model->getNearByList($squares, $this->$brandName);

        $ret['msg'] = '';

        return $ret;
    }


    /**
     *计算某个经纬度的周围某段距离的正方形的四个点
     *
     *@param lng float 经度
     *@param lat float 纬度
     *@param distance float 该点所在圆的半径，该圆与此正方形内切，默认值为 2千米
     *@return array 正方形的四个点的经纬度坐标
     */
    function __returnSquarePoint($lng, $lat, $distance = 2){

        $dlng =  2 * asin(sin($distance / (2 * EARTH_RADIUS)) / cos(deg2rad($lat)));
        $dlng = rad2deg($dlng);

        $dlat = $distance/EARTH_RADIUS;
        $dlat = rad2deg($dlat);

        return array(
            'left-top'=>array('lat'=>$lat + $dlat,'lng'=>$lng-$dlng),
            'right-top'=>array('lat'=>$lat + $dlat, 'lng'=>$lng + $dlng),
            'left-bottom'=>array('lat'=>$lat - $dlat, 'lng'=>$lng - $dlng),
            'right-bottom'=>array('lat'=>$lat - $dlat, 'lng'=>$lng + $dlng)
        );
    }

}