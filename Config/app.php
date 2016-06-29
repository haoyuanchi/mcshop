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

        //登录信息
        'userId' => array(
            'name' => 'user_id', 'type' => 'int', 'default' => 0, 'require' => false,
        ),
        'token' => array(
            'name' => 'token', 'type' => 'string', 'default' => '', 'require' => false,
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
