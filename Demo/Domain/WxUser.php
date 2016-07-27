<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/28
 * Time: 22:42
 */

class Domain_WxUser
{
    private $appid = 'wxac6c150d38e45e9f';
    private $appSecret = '2e1aa740dfe08639edea2bb4ed1432d7';

    protected $snsapi_base_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
    protected $openid_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?';

    protected function getOpenidWithCode($code){
        $curl = new PhalApi_CUrl(2);
        $url = $this->__createOauthUrlForOpenid($code);
        $rs = json_decode($curl->get($url));

        return $rs;
    }

    protected function getOpenidWithoutCode($redirectUrl){
        //触发微信返回code码
        $baseUrl = urlencode($redirectUrl);
        $url = $this->__createOauthUrlForCode($baseUrl);
        Header("Location: $url");
        exit();
    }

    public function getWxUserInfo($openId, $accessToken)
    {
        $model = new Model_WxUser();
        $isFirstWxChat = $model->isFirstWxChat($openId);
        if ($isFirstWxChat) {
            $wxUserInfo = $this->_getWxUserInfoByToken($openId, $accessToken);
            $wxUser['openid'] = $wxUserInfo->openid;
            $wxUser['nickname'] = $wxUserInfo->nickname;
            $wxUser['sex'] = $wxUserInfo->sex;
            $wxUser['city'] = $wxUserInfo->city;
            $wxUser['country'] = $wxUserInfo->country;
            $wxUser['headimgurl'] = $wxUserInfo->headimgurl;
            $wxUser['privilege'] = serialize($wxUserInfo->privilege);
            //$wxUser['unionid'] = $wxUserInfo->unionid;

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
        return $rs;
    }


    /**
     * 构造获取code的url连接
     * @param string $redirectUrl 微信服务器回跳的url，需要url编码
     * @return 返回构造好的url
     */
    private function __createOauthUrlForCode($redirectUrl){
        $urlObj["appid"] = $this->appid;
        $urlObj["redirect_uri"] = "$redirectUrl";
        $urlObj["response_type"] = "code";
        $urlObj["scope"] = "snsapi_base";
        $urlObj["state"] = "STATE"."#wechat_redirect";
        $bizString = $this->toUrlParams($urlObj);
        return $this->snsapi_base_url.$bizString;
    }

    /**
     *
     * 构造获取open和access_toke的url地址
     * @param string $code，微信跳转带回的code
     *
     * @return 请求的url
     */
    private function __createOauthUrlForOpenid($code){
        $urlObj["appid"] = $this->appid;
        $urlObj["secret"] = $this->appSecret;
        $urlObj["code"] = $code;
        $urlObj["grant_type"] = "authorization_code";
        $bizString = $this->toUrlParams($urlObj);
        return $this->openid_url.$bizString;
    }


    /**
     *
     * 拼接签名字符串
     * @param array $urlObj
     *
     * @return 返回已经拼接好的字符串
     */
    private function toUrlParams($urlObj){
        $buff = "";
        foreach ($urlObj as $k => $v)
        {
            if($k != "sign" && $v !== ''){
                $buff .= $k . "=" . $v . "&";
            }
        }

        $buff = trim($buff, "&");
        return $buff;
    }


}