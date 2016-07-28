<?php

class Domain_User {
    public function bind($openId, $name, $tel){
        $model = new Model_User();
        $info= $model->getByOpenId($openId);

        if (empty($info)) {
            // 第一次绑定，查看是否存在用户
            $userInfo = $model->getByTelName($tel, $name);

            if(!empty($userInfo)){
                // 更新用户的微信信息
                $wxmodel = new Model_WxUser();
                $wxInfo = $wxmodel->getByWxOpenId($openId);

                if(empty($wxInfo)){
                    DI()->logger->error('用户的openid有误', array('openId' => $openId));
                    return false;
                }

                $user['wx_open_id'] = $openId;
                $user['wx_city'] = $wxInfo['city'];
                $user['wx_headimgurl'] = $wxInfo['headimgurl'];
                $user['wx_nickname'] = $wxInfo['nickname'];
                $user['wx_province'] = $wxInfo['province'];
                $user['wx_sex'] = $wxInfo['sex'];
                $user['wx_privilege'] = $wxInfo['privilege'];

                $model->update($userInfo['id'], $user);

                $user_id = $userInfo['id'];
            } else {
                //用户登录信息错误
                DI()->logger->error('用户登录信息输入有误', array('openId' => $openId, 'name'=>$name, 'tel'=>$tel));
                return $userInfo;
            }

            /*// 获取微信用户信息，保存到user表
            $wxmodel = new Model_WxUser();
            $wxInfo = $wxmodel->getByWxOpenId($openId);

            $user['create_date'] = date('Y-m-d H:i:s');
            $user['modify_date'] = date('Y-m-d H:i:s');
            $user['mobile'] = $tel;
            $user['username'] = $name;
            $user['password'] = $name;

            $user['wx_open_id'] = $openId;
            $user['wx_city'] = $wxInfo['city'];
            $user['wx_headimgurl'] = $wxInfo['headimgurl'];
            $user['wx_nickname'] = $wxInfo['nickname'];
            $user['wx_province'] = $wxInfo['province'];
            $user['wx_sex'] = $wxInfo['sex'];
            $user['wx_privilege'] = $wxInfo['privilege'];

            $user_id = $model->insert($user);*/
        } else {
            $user_id = $info['id'];
        }

        return $user_id;
    }

    public function getBaseInfo($userId) {
        $rs = array();

        $userId = intval($userId);
        if ($userId <= 0) {
            return $rs;
        }

        // 版本1：简单的获取
        $model = new Model_User();
        $ret = $model->getByUserId($userId);

        return $ret;
    }

    public function getBaseInfoWithCache($userId) {
        $rs = array();

        $userId = intval($userId);
        if ($userId <= 0) {
            return $rs;
        }

		// 版本2：使用单点缓存/多级缓存 (应该移至Model层中)
        $model = new Model_User();
        $ret = $model->getByUserIdWithCache($userId);

		// 版本3：缓存 + 代理
        /**
        $query = new PhalApi_ModelQuery();
        $query->id = $userId;
        $modelProxy = new ModelProxy_UserBaseInfo();
        $rs = $modelProxy->getData($query);
         */
        return $ret;
    }
}
