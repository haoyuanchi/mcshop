<?php

class Model_User extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'member';
    }

    public function isFirstBind($openId) {
        $num = $this->getORM()->where('wx_openid', $openId)->count('id');
        return $num == 0 ? true : false;
    }

    public function getByUserId($userId) {
        return $this->getORM()
            ->select('*')
            ->where('id = ?', $userId)
            ->fetch();
    }

    public function getByOpenId($openId){
        return $this->getORM()
            ->select('*')
            ->where('wx_open_id = ?', $openId)
            ->fetch();
    }

    public function getByUserIdWithCache($userId) {
        $key = 'userbaseinfo_' . $userId;
        $rs = DI()->cache->get($key);
        if ($rs === NULL) {
            $rs = $this->getByUserId($userId);
            DI()->cache->set($key, $rs, 600);
        }
        return $rs;
    }

}
