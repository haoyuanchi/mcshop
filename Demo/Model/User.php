<?php

class Model_User extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'member';
    }

    public function isFirstBind($openId) {
        $num = $this->getORM()->where('wx_open_id', $openId)->count('id');
        return $num == 0 ? true : false;
    }

    // 强制重新设置缓存
    public function getByUserId($userId) {
        // 先清除缓存
        $key = 'userbaseinfo_' . $userId;
        $userInfo = $this->getORM()
            ->select('*')
            ->where('id = ?', $userId)
            ->fetch();
        $ret = $this->formatBaseInfo($userInfo);
        DI()->cache->set($key, $ret, 600);

        return $ret;
    }

    public function getByTelName($tel, $name){
        $userInfo =  $this->getORM()
            ->select('*')
            ->where('mobile = ?', $tel)
            ->where('name = ?', $name)
            ->fetch();

        $ret = $this->formatBaseInfo($userInfo);

        return $ret;
    }

    public function getByOpenId($openId){
        $userInfo =  $this->getORM()
            ->select('*')
            ->where('wx_open_id = ?', $openId)
            ->fetch();

        $ret = $this->formatBaseInfo($userInfo);

        return $ret;
    }

    public function getByUserIdWithCache($userId) {
        $key = 'userbaseinfo_' . $userId;
        $rs = DI()->cache->get($key);
        if ($rs === NULL) {
            $rs = $this->getByUserId($userId);
        }
        return $rs;
    }

    public function isGiftAuthority($userId, $mouth){
        $num = $this->getORM()
            ->where('id', $userId)
            ->where('month(birth)', $mouth)
            ->count('id');
        return $num == 1 ? true : false;
    }

    public function getLevel($userId){
        return $this->getORM()
            ->select('member_rank')
            ->where('id', $userId)
            ->fetch();
    }

    public function getAddress($userId){
        return $this->getORM()
            ->select('address')
            ->where('id', $userId)
            ->fetch();
    }

    public function formatBaseInfo($userInfo){
        if(empty($userInfo)){
            return $userInfo;
        }
        $ret['id'] = $userInfo['id'];
        $ret['name'] = $userInfo['name'];
        $ret['mobile'] = $userInfo['mobile'];
        $ret['address'] = $userInfo['address'];
        $ret['amount'] = $userInfo['amount'];
        $ret['balance'] = $userInfo['balance'];
        $ret['birth'] = $userInfo['birth'];
        $ret['gender'] = ($userInfo['gender'] == 0 ) ? '男' : '女';
        $ret['vip_code'] = $userInfo['vip_code'];
        $ret['vip_number'] = $userInfo['vip_number'];
        $ret['integral'] = $userInfo['integral'];
        $ret['email'] = $userInfo['username'];
        $ret['language'] = $userInfo['language_preference'];
        $ret['bust'] = $userInfo['bust'];
        $ret['hip'] = $userInfo['hip'];
        $ret['waist'] = $userInfo['waist'];
        $ret['occupation'] = $userInfo['occupation'];
        $ret['wx_open_id'] = $userInfo['wx_open_id'];
        $ret['wx_nickname'] = $userInfo['wx_nickname'];
        $ret['wx_head_img_url'] = $userInfo['wx_headimgurl'];
        $ret['province'] = $userInfo['province'];
        $ret['city'] = $userInfo['city'];
        $ret['area'] = $userInfo['area'];
        $ret['occupation'] = $userInfo['occupation'];
        $ret['profession'] = $userInfo['profession'];
        $ret['hobby'] = $userInfo['hobby'];

        // 获取用户的等级信息
        $modelRank = new Model_MemberRank();
        $rank = $modelRank->getByMemberRankId($userInfo['member_rank_id']);
        $ret['member_rank_id'] = $userInfo['member_rank_id'];
        $ret['member_rank_name'] = $rank['name'];
        $ret['member_rank_scale'] = $rank['scale'];
        $ret['member_rank_fold_scale'] = $rank['fold_scale'];

        // 获取用户的购物车数量
        $modelCartTotal = new Model_ViewCartTotal();
        $cart_info = $modelCartTotal->getByUserId($userInfo['id']);
        $ret['cart_quantity'] = $cart_info['total_quantity'];

        // 获取用户所属店铺
        $modelStore = new Model_Store();
        $store_info = $modelStore->getByStoreCode($userInfo['store_code']);
        $ret['store_info'] = $store_info;

        return $ret;
    }
}
