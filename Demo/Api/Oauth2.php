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
        $domain = new Domain_WxUser();
        $wxUserInfo = $domain->getWxUserInfo($openId, $accessToken);

        // 判断是否绑定，没有绑定强制绑定
        $model = new model_User();
        $isFirstBind = $model->isFirstBind($this->openId);

        // 跳转到绑定页面
        if($isFirstBind){
            setcookie('openId',$this->openId, '86400*360'); //设置cookie长期有效
            $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/list.html";
            echo '<!--<SCRIPT LANGUAGE="javascript">';
            echo "location.href='{$url}'";
            echo "</SCRIPT>-->";
            exit;
        }

        // 跳转到首页
        setcookie('brand_id',$this->brandId, '60'); //设置cookie一个小时有效
        $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/list.html";
        echo '<!--<SCRIPT LANGUAGE="javascript">';
        echo "location.href='{$url}'";
        echo "</SCRIPT>-->";
        exit;
    }
}