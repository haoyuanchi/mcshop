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

    private $queryMemberBaseUrl = 'http://113.108.202.195:8081/epoService/vipJson/proc.action?do=customer_get';

    public function getWxUserInfo($openId, $brandId, $accessToken)
    {
        $model = new Model_WxUser();
        $isFirstWxChat = $model->isFirstWxChat($openId, $brandId);
        if ($isFirstWxChat) {
            $wxUserInfo = $this->_getWxUserInfoByToken($openId, $accessToken);
            $wxUser['create_date'] = date('Y-m-d H:i:s');
            $wxUser['modify_date'] = date('Y-m-d H:i:s');
            $wxUser['wx_openid'] = $wxUserInfo->openid;
            $wxUser['wx_nickname'] = $wxUserInfo->nickname;
            $wxUser['wx_sex'] = $wxUserInfo->sex;
            $wxUser['wx_city'] = $wxUserInfo->city;
            $wxUser['wx_province'] = $wxUserInfo->province;
            $wxUser['wx_country'] = $wxUserInfo->country;
            $wxUser['wx_headimgurl'] = $wxUserInfo->headimgurl;
            $wxUser['wx_privilege'] = serialize($wxUserInfo->privilege);
            $wxUser['brand_id'] = $brandId;

            // 插入数据库
            $wxUserId = $model->insert($wxUser);
            if ($wxUserId <= 0) {
                //异常1：用户创建失败
                DI()->logger->error('failed to create weixin user', array('openId' => $openId));
                throw new PhalApi_Exception_InternalServerError(T('failed to create weixin user'));
                return;
            }
        }
        $wxUserInfo = $model->getByWxOpenId($openId, $brandId);

        return $wxUserInfo;
    }

    public function isRegister($userId, $brandId, $name, $tel){
        // 先从本地数据库查
        $model = new Model_WxUser();
        $userInfo = $model->getByTelName($brandId, $tel, $name);

        if(empty($userInfo)) {
            if ($brandId == 18) {
                $brandIdERP = 1;
            } elseif ($brandId == 19) {
                $brandIdERP = 23;
            } else {
                return false;
            }

            // 调用接口获取用户的信息
            $queryMemberUrl = "$this->queryMemberBaseUrl&openId=&brand=$brandIdERP&phone=$tel&name=$name";
            $curl = new PhalApi_CUrl(2);
            $memberInfoERP = json_decode($curl->get($queryMemberUrl));

            if ($memberInfoERP->success == 0) {
                DI()->logger->error('用户登录信息输入有误', array('userId' => $userId, 'brandId' => $brandId, 'name' => $name, 'tel' => $tel));
                return false;
            }
        }

        return true;
    }

    // TODO
    public function bind($userId, $brandId, $name, $tel){
        // 先从本地数据库查
        $model = new Model_WxUser();
        $userInfo = $model->getByTelName($brandId, $tel, $name);

        if(empty($userInfo)){

            if($brandId == 18){
                $brandIdERP = 1;
            }elseif($brandId == 19){
                $brandIdERP = 23;
            }else {
                return false;
            }

            // 调用接口获取用户的信息
            $queryMemberUrl = "$this->queryMemberBaseUrl&openId=&brand=$brandIdERP&phone=$tel&name=$name";
            $curl = new PhalApi_CUrl(2);
            $memberInfoERP = json_decode($curl->get($queryMemberUrl));

            if($memberInfoERP->success == 0){
                DI()->logger->error('用户登录信息输入有误', array('userId' => $userId, 'brandId'=>$brandId, 'name'=>$name, 'tel'=>$tel));
                return false;
            }

            $memberDataERP = $memberInfoERP->data;

            // 把用户信息存入到本地数据库
            $memberInfo['birth'] = $memberDataERP->birthdate;
            $memberInfo['gender'] = $memberDataERP->gender;
            $memberInfo['mobile'] = $memberDataERP->phone;
            $memberInfo['name'] = $memberDataERP->name;
            $memberInfo['vip_no'] = $memberDataERP->vipno;
            $memberInfo['vip_cardno'] = $memberDataERP->vipcardno;
            $memberInfo['integral'] = $memberDataERP->integral;
            $memberInfo['clear_integral'] = $memberDataERP->clearfun;
            $memberInfo['valid_integral'] = $memberDataERP->fun;
            $memberInfo['store_code'] = $memberDataERP->storecode;
            $memberInfo['store_name'] = $memberDataERP->storename;
            $memberInfo['province'] = $memberDataERP->areaprovname;
            $memberInfo['city'] = $memberDataERP->areacityname;
            $memberInfo['area'] = $memberDataERP->areadistname;
            $memberInfo['detail'] = $memberDataERP->areaothers;
            $memberInfo['address'] = $memberDataERP->areaprovname . $memberDataERP->areacityname. $memberDataERP->areadistname . $memberDataERP->areaothers;

            // 用户等级信息
            $memberInfo['grade_id'] = $memberDataERP->gradeId;
            $memberInfo['grade_name'] = $memberDataERP->gradeName;
            $memberInfo['grade_discount'] = $memberDataERP->gradeDiscount;

            $model->update($userId, $memberInfo);
        }

        $userInfo = $model->getByUserId($userId);

        return $userInfo;
    }

    /**
     * 获取用户的全部信息， 包括微信信息、会员信息、购物车信息等
     */
    public function getUserInfo($userId, $brandId){
        // 根据userid 获取 openid
        $modelUser = new Model_WxUser();
        $userInfo = $modelUser->getByUserId($userId);

        // 用户店铺信息
        $modelStore = new Model_Store();
        $store_info = $modelStore->getByStoreCode($userInfo['store_code']);
        $userInfo['store_info'] = $store_info;

        // 获取用户的购物车数量
        $modelCartTotal = new Model_ViewCartTotal();
        $cart_info = $modelCartTotal->getByUserId($userId, $brandId);
        $userInfo['cart_quantity'] = $cart_info['total_quantity'];

        return $userInfo;
    }

    /* 微信号是否被注册 */
    public function isRegisterByOpenId($openId, $brandId){
        // 调用接口获取用户的信息
        $queryMemberUrl = "$this->queryMemberBaseUrl&openId=$openId&brand=$brandId&phone=&name=";
        $curl = new PhalApi_CUrl(2);
        $memberInfoERP = json_decode($curl->get($queryMemberUrl));

        if($memberInfoERP->success == 0){
            return false;
        }else{
            return true;
        }
    }

    /* 检测是否绑定 */
    public function checkIsBind($userId){
        // 判断是否绑定，没有绑定强制绑定
        $useModel = new model_WxUser();
        $isFirstBind = $useModel->isFirstBind($userId);

        // 跳转到绑定页面
        if($isFirstBind){
            $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/member/member.html";
            header("Location:{$url}");
            exit;
        }
    }

    /* 用户信息是否完善 */
    public function isComplete($userInfo){
        if(empty($userInfo['name']) || empty($userInfo['mobile']) || empty($userInfo['address']) ||
            empty($userInfo['birth']) || empty($userInfo['occupation']) || empty($userInfo['hobby']) || empty($userInfo['profession']))
        {
            return false;

        }
        return true;
    }

    /* 注册用户信息 */
    public function register($userId, $memberInfo){
        $modelUser = new Model_WxUser();
        $memberInfo['bind_date'] = date('Y-m-d H:i:s');
        return $modelUser->update($userId, $memberInfo);
    }

    /* 修改用户信息 */
    public function update($userId, $memberInfo){
        $modelUser = new Model_WxUser();
        $memberInfo['modify_date'] = date('Y-m-d H:i:s');
        return $modelUser->update($userId, $memberInfo);
    }


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


    private function __formatBaseInfo($userInfo, $memberInfo){

        $ret['id'] = $userInfo['id'];
        $ret['wx_open_id'] = $userInfo['openid'];
        $ret['wx_nickname'] = $userInfo['nickname'];
        $ret['wx_head_img_url'] = $userInfo['headimgurl'];
        $ret['wx_gender'] = ($userInfo['sex'] == 1 ) ? '男' : (($userInfo['gender'] == 2 ) ? '女' : '未知');


        $ret['name'] = $memberInfo['name'];
        $ret['mobile'] = $memberInfo['mobile'];
        $ret['birth'] = $memberInfo['birth'];
        $ret['address'] = $memberInfo['address'];
        $ret['gender'] = ($memberInfo['gender'] == 0 ) ? '男' : '女';
        $ret['vip_no'] = $memberInfo['vip_no'];
        $ret['vip_cardno'] = $memberInfo['vip_cardno'];

        $ret['integral'] = $memberInfo['integral'];
        $ret['clear_integral'] = $memberInfo['clear_integral'];
        $ret['valid_integral'] = $memberInfo['valid_integral'];

        $ret['occupation'] = $memberInfo['occupation'];
        $ret['profession'] = $memberInfo['profession'];
        $ret['hobby'] = $memberInfo['hobby'];

        $ret['province'] = $memberInfo['province'];
        $ret['city'] = $memberInfo['city'];
        $ret['area'] = $memberInfo['area'];
        $ret['detail'] = $memberInfo['detail'];
        $ret['address'] = $memberInfo['address'];

        // 获取用户的等级信息
        $ret['member_rank_id'] = $memberInfo['member_rank_id'];
        $ret['member_rank_code'] = $memberInfo['member_rank_code'];
        $ret['member_rank_name'] = $memberInfo['member_rank_name'];
        // TODO 折扣率
        // $ret['member_rank_scale'] = $memberInfo['scale'];

        return $ret;
    }


}