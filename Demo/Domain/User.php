<?php

class Domain_User {

    public function getUserInfo($openId, $accessToken) {
        $model = new Model_User();
        $isFirstWxChat = $model->isFirstWxChat($openId);

        if ($isFirstWxChat) {
            $wxUserInfo = getWxUserInfo($openId, $accessToken);
            // 插入数据库
            $model->insert($wxUserInfo);
        }
    }


    public function getByWxOpenId($openId){
        //
        $model = new Model_User();
        $isFirstWxChat = $model->isFirstWxChat($openId);

        if ($isFirstWxChat) {
            // 获取用户信息

            $userId = Domain_User_User_Generator::createUserForWeixin($this->openId, $this->nickname, $this->avatar);
            if ($userId <= 0) {
                //异常1：用户创建失败
                DI()->logger->error('failed to create weixin user', array('openId' => $this->openId));
                throw new PhalApi_Exception_InternalServerError(T('failed to create weixin user'));
            }

            $id = $domain->bindUser($userId, $this->openId, $this->token, $this->expiresIn);
            if ($id <= 0) {
                //异常2：绑定微信失败
                DI()->logger->error('failed to bind user with weixin',
                    array('userid' => $userId, 'openId' => $this->openId));
                throw new PhalApi_Exception_InternalServerError(T('failed to bind user with weixin'));
            }
        } else {
            $userId = $domain->getUserIdByWxOpenId($this->openId);
        }

    }


    public function getBaseInfo($userId) {
        $rs = array();

        $userId = intval($userId);
        if ($userId <= 0) {
            return $rs;
        }

		// 版本1：简单的获取
        $model = new Model_User();
        $rs = $model->getByUserId($userId);

		// 版本2：使用单点缓存/多级缓存 (应该移至Model层中)
		/**
        $model = new Model_User();
        $rs = $model->getByUserIdWithCache($userId);
		*/

		// 版本3：缓存 + 代理
		/**
		$query = new PhalApi_ModelQuery();
		$query->id = $userId;
		$modelProxy = new ModelProxy_UserBaseInfo();
		$rs = $modelProxy->getData($query);
		*/

        return $rs;
    }
}
