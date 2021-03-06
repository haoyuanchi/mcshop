<?php
/**
 * Created by PhpStorm.
 * User: hychi
 * Date: 2016/6/28
 * Time: 20:58
 */

class Api_Oauth2 extends PhalApi_Api {
    public $appid = 'wxac6c150d38e45e9f';
    private $appSecret = '2e1aa740dfe08639edea2bb4ed1432d7';

    public function getRules() {
        return array(
            'authorization' => array(
                'code' => array('name' => 'code', 'type' => 'string', 'require' => true, 'desc' => '授权码'),
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'min' => 1, 'require' => false, 'desc' => '品牌id'),
                'openId' => array('name' => 'open_id', 'type' => 'int', 'min' => 1, 'require' => false, 'desc' => '用户openid'),
            ),
            'userCenter' => array(
                'code' => array('name' => 'code', 'type' => 'string', 'require' => true, 'desc' => '授权码'),
                'brandId' => array('name' => 'brand_id', 'type' => 'int', 'min' => 1, 'require' => false, 'desc' => '品牌id'),
                'openId' => array('name' => 'open_id', 'type' => 'int', 'min' => 1, 'require' => false, 'desc' => '用户openid'),
            ),
        );
    }

    public function userCenter(){
        // 从其他页面跳转过来的
        if(!empty($this->openId)){

        }

        $curl = new PhalApi_CUrl(2);
        // 使用code获取OpenID
        $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$this->appid.'&secret='.$this->appSecret.'&code='.$this->code.'&grant_type=authorization_code';

        // 执行url获取openid 和 Access Token
        $rs = json_decode($curl->get($url));
        $openId = $rs->openid;
        $accessToken = $rs->access_token;

        $domain = new Domain_WxUser();
        $wxUserInfo = $domain->getWxUserInfo($openId, $this->brandId, $accessToken);

        setcookie('brand_id',$this->brandId, time()+36000,'/'); //设置cookie 600分钟有效
        $userInfo = $domain->getUserInfo($wxUserInfo['id'], $this->brandId);
        setcookie('user_info', json_encode($userInfo), time()+36000, '/');

        // 检测是否绑定
        $isFirstBind = $domain->checkIsBind($wxUserInfo['id']);
        // 跳转到绑定页面
        if($isFirstBind){
            $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/member/member.html";
            header("Location:{$url}");
            exit;
        }


        // 判断用户信息是否完善，如果不完善则跳转到用户信息完善页面
        if($domain->isComplete($userInfo) == false){
            //setcookie('user_type', 2, time() + 360, '/');
            $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/usercenter/wx_infomodify.html";
            header("Location:{$url}");
            exit;
        }

        // 跳转到首页
        $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/usercenter/wx_usercenter.html";
        header("Location:{$url}");
        exit;

    }

    public function authorization(){
        // 从其他页面跳转过来的
        if(!empty($this->openId)){

        }

        $curl = new PhalApi_CUrl(2);
        // 使用code获取OpenID
        $url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$this->appid.'&secret='.$this->appSecret.'&code='.$this->code.'&grant_type=authorization_code';

        // 执行url获取openid 和 Access Token
        $rs = json_decode($curl->get($url));
        $openId = $rs->openid;
        $accessToken = $rs->access_token;

        $domain = new Domain_WxUser();
        $wxUserInfo = $domain->getWxUserInfo($openId, $this->brandId, $accessToken);

        //setcookie('brand_id',$this->brandId, '360', '/'); //设置cookie 6分钟有效
        setcookie('brand_id',$this->brandId, time()+36000,'/'); //设置cookie 600分钟有效
        $userInfo = $domain->getUserInfo($wxUserInfo['id'], $this->brandId);

        setcookie('user_info', json_encode($userInfo), time()+36000, '/');

        // 跳转到首页
        $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/mobileIndex.html";
        header("Location:{$url}");
        exit;
    }

}