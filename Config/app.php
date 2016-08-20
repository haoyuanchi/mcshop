<?php
/**
 * 请在下面放置任何您需要的应用配置
 */

return array(
    /**
     * 应用接口层的统一参数
     */
    'apiCommonRules' => array(
        //其他原来的参数配置
        //'sign' => array('name' => 'sign', 'require' => true),

        /*//登录信息
        'userId' => array(
            'name' => 'user_id', 'type' => 'int', 'default' => 0, 'require' => false,
        ),
        'token' => array(
            'name' => 'token', 'type' => 'string', 'default' => '', 'require' => false,
        ),*/
    ),

    /**
     * 支付相关配置
     */
    'Pay' => array(
        //异步/同步地址
        'notify_url' => 'http://bbbccc.moco.com.cn/mcshop/Public/pay/wechat/notify.php',

        //支付宝wap端设置
        'aliwap' => array(
            //收款账号邮箱
            'email' => 'admin@admin.com',

            //加密key
            'key' => 'xxx',

            //合作者ID
            'partner' => '123456'
        ),

        //微信支付设置
        'wechat' => array(
            //公众号的唯一标识
            'appid' => 'wxac6c150d38e45e9f',

            //商户号
            'mchid' => '1351002901',

            //公众号的appsecret
            'appsecret' => '2e1aa740dfe08639edea2bb4ed1432d7',

            //微信支付Key
            'key' => 'qw1b6Q56e053610fR4T2A7fQ3EF530I9'
        ),
    ),

    'Wechat' => array(
        'plugins' => array(
            Wechat_InMessage::MSG_TYPE_TEXT => array('Plugin_Menu',),
            Wechat_InMessage::MSG_TYPE_IMAGE => array(),
            Wechat_InMessage::MSG_TYPE_VOICE => array(),
            Wechat_InMessage::MSG_TYPE_VIDEO => array(),
            Wechat_InMessage::MSG_TYPE_LOCATION => array(),
            Wechat_InMessage::MSG_TYPE_LINK => array(),
            Wechat_InMessage::MSG_TYPE_EVENT => array(),
            Wechat_InMessage::MSG_TYPE_DEVICE_EVENT => array(),
            Wechat_InMessage::MSG_TYPE_DEVICE_TEXT => array(),
        ),
    ),
);
