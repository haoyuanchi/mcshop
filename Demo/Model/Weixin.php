<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/7/27
 * Time: 9:20
 */

class Model_WxUser extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'member_weixin';
    }

    public function isFirstWxChat($openId) {
        $num = $this->getORM()->where('openid', $openId)->count('id');
        return $num == 0 ? true : false;
    }

    public function getByWxOpenId($openId) {
        $rs = $this->getORM()->select('*')->where('openid', $openId)->fetch();
        return $rs;
    }

    public function getByOpenIdWithCache($openId){
        $key = 'wxuserinfo_' . $openId;
        $rs = DI()->cache->get($key);
        if ($rs === NULL) {
            $rs = $this->getByWxOpenId($openId);
            DI()->cache->set($key, $rs['id'], 600);
        }
        return $rs;
    }

    public function updateAddress($openId, $lat, $lon){
        $data['latitude'] = $lat;
        $data['longitude'] = $lon;
        $rs = $this->getORM()
                ->where('openid', $openId)
                ->update($data);
        return $rs;
    }
}