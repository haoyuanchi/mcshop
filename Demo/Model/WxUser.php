<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/28
 * Time: 22:39
 */

class Model_WxUser extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'user_weixin';
    }

    public function isFirstWxChat($openId, $brandId) {
        $num = $this->getORM()
            ->where('wx_openid', $openId)
            ->where('brand_id', $brandId)
            ->count('id');
        return $num == 0 ? true : false;
    }

    /* 是否第一次绑定 */
    public function isFirstBind($userId) {
        $num = $this->getORM()
            ->where('id', $userId)
            ->where('vip_no', null)
            ->count('id');

        return $num == 1 ? true : false;
    }

    public function getAddress($userId){
        return $this->getORM()
            ->select('address')
            ->where('id', $userId)
            ->fetch();
    }

    public function getByUserId($userId){
        $rs = $this->getORM()
            ->select('*')
            ->where('id', $userId)
            ->fetch();
        return $rs;
    }

    public function getByWxOpenId($openId, $brandId) {
        $rs = $this->getORM()
            ->select('*')
            ->where('wx_openid', $openId)
            ->where('brand_id', $brandId)
            ->fetch();
        return $rs;
    }

    public function getByOpenIdWithCache($openId, $brandId){
        $key = 'wxuserinfo_' . $openId. $brandId;
        $rs = DI()->cache->get($key);
        if ($rs === NULL) {
            $rs = $this->getByWxOpenId($openId, $brandId);
            DI()->cache->set($key, $rs['id'], 600);
        }
        return $rs;
    }

    public function getByTelName($brandId, $tel, $name){
        $userInfo =  $this->getORM()
            ->select('*')
            ->where('mobile = ?', $tel)
            ->where('name = ?', $name)
            ->where('brand_id = ?', $brandId)
            ->fetch();

        return $userInfo;
    }

    /* 是否具备领取生日礼物权限 */
    public function isGiftAuthority($userId, $mouth){
        $num = $this->getORM()
            ->where('id', $userId)
            ->where('month(birth)', $mouth)
            ->where('is_get_gift', 0)
            ->count('id');
        return $num == 1 ? true : false;
    }
}