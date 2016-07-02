<?php 
/**
 * 以下配置为系统级的配置，通常放置不同环境下的不同配置
 */

return array(
	/**
	 * 默认环境配置
	 */
	'debug' => true,

	/**
	 * MC缓存服务器参考配置
	 */
	 'mc' => array(
        'host' => '127.0.0.1',
        'port' => 11211,
	 ),

    /**
     * file cache 缓存服务器参考配置
     */
    'fc' => array(
        'path' => API_ROOT . '/Runtime',
        'prefix' => 'mcshop',
    ),

    /**
     * 加密
     */
    'crypt' => array(
        'mcrypt_iv' => '12345678',      //8位
    ),
);
