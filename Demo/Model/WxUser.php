<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/28
 * Time: 22:39
 */

class Model_WxUser extends PhalApi_Model_NotORM {
    protected function getTableName($id) {
        return 'member_weixin';
    }

    public function isFirstWxChat($openId) {
        $num = $this->getORM()
            ->where('openid', $openId)
            ->count('id');
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
}