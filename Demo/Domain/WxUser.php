<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/28
 * Time: 22:42
 */

class Domain_WxUser
{
    public function getWxUserInfo($openId, $accessToken)
    {
        $model = new Model_WxUser();
        $isFirstWxChat = $model->isFirstWxChat($openId);
        if ($isFirstWxChat) {
            $wxUserInfo = $this->_getWxUserInfoByToken($openId, $accessToken);

            DI()->logger->info('获取微信用户信息' , var_dump($wxUserInfo));

            $wxUser['openid'] = $wxUserInfo['openid'];
            $wxUser['nickname'] = $wxUserInfo['nickname'];
            $wxUser['sex'] = $wxUserInfo['sex'];
            $wxUser['city'] = $wxUserInfo['city'];
            $wxUser['country'] = $wxUserInfo['country'];
            $wxUser['headimgurl'] = $wxUserInfo['headimgurl'];
            $wxUser['privilege'] = $wxUserInfo['privilege'];
            //$wxUser['unionid'] = $wxUserInfo['unionid'];

            // 插入数据库
            $wxUserId = $model->insert($wxUser);
            if ($wxUserId <= 0) {
                //异常1：用户创建失败
                DI()->logger->error('failed to create weixin user', array('openId' => $openId));
                throw new PhalApi_Exception_InternalServerError(T('failed to create weixin user'));
                return;
            }
        }
        $wxUserInfo = $model->getByOpenIdWithCache($openId);
        return $wxUserInfo;
    }

    private function _getWxUserInfoByToken($openId, $accessToken){
        $curl = new PhalApi_CUrl();
        $url = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$accessToken.'&openid='.$openId;
        $rs = json_decode($curl->get($url));
        DI()->logger->info('获取微信用户信息url' , var_dump($rs));
        return $rs;
    }
}