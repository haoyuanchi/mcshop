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
        );
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

        // 根据用户openid获取用户信息
        /*$url = "http://113.108.202.195:8081/epoService/vipJson/proc.action?do=customer_get&openId=$openId&brand=1";
        $userInfo = json_decode($curl->get($url));*/

        $domain = new Domain_WxUser();
        $wxUserInfo = $domain->getWxUserInfo($openId, $accessToken);

        // 判断是否绑定，没有绑定强制绑定
        $useModel = new model_User();
        $isFirstBind = $useModel->isFirstBind($openId);

        // 跳转到绑定页面
        if($isFirstBind){
            //DI()->logger->info('用户第一次绑定', $isFirstBind);

            setcookie('openId',$this->openId, time()+86400*360, '/'); //设置cookie长期有效
            $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/member/member.html";
            header("Location:{$url}");
            exit;
        }

        // 已经绑定则返回用户信息并跳转到首页
        $userInfo = $useModel->getByOpenId($this->openId);
        setcookie('user_info', json_encode($userInfo), time()+36000, '/');


        //判断用户信息是否完善，如果不完善则跳转到用户信息完善页面
        $domainUser = new Domain_User();
        if($domainUser->isComplete($userInfo) == false){
            //DI()->logger->info('用户资料不完善', $userInfo);

            $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/usercenter/wx_infomodify.html";
            header("Location:{$url}");
            exit;
        }

        //DI()->logger->info('用户信息完善，直接跳转', $userInfo);

        // 跳转到首页
        //setcookie('brand_id',$this->brandId, '360', '/'); //设置cookie 6分钟有效
        setcookie('brand_id',$this->brandId, time()+36000,'/'); //设置cookie 600分钟有效
        $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/mobileIndex.html";
        header("Location:{$url}");
        exit;
    }
}