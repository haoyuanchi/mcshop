<?php

include_once('weixin.class.php');//引用刚定义的微信消息处理类
require_once dirname(dirname(__FILE__)) . '/SDK/PHP/PhalApiClient/PhalApiClient.php';

define("TOKEN", "mocoweixin");
define('DEBUG', true);

$client = PhalApiClient::create()
    ->withHost('http://bbbccc.moco.com.cn/mcshop/Public/demo/');

$weixin = new WeiXin(TOKEN, DEBUG);//实例化
$weixin->getMsg();
$type = $weixin->msgType;//消息类型
$username = $weixin->msg['FromUserName'];//哪个用户给你发的消息,这个$username是微信加密之后的，但是每个用户都是一一对应的

if ($type === 'text') {
    if ($weixin->msg['Content'] == 'Hello2BizUser') {
        //微信用户第一次关注你的账号的时候，你的公众账号就会受到一条内容为'Hello2BizUser'的消息
        $reply = $weixin->makeText('欢迎你关注moco');
    } else {
        //这里就是用户输入了文本信息
        $keyword = $weixin->msg['Content'];   //用户的文本消息内容

        $reply = $weixin->makeNews($results);
    }
} elseif ($type === 'location') {
    // 将经纬度保存到数据库中
    $rs = $client->reset()
        ->withService('Default.Index')
        ->withParams('username', 'dogstar')
        ->withTimeout(3000)
        ->request();

    $contentStr = "纬度 " . $object->Latitude . " 经度" . $object->Longitude;
} elseif ($type === 'image') {
    //用户发送的是图片
} elseif ($type === 'voice') {
    //用户发送的是声音
}

$weixin->reply($reply);

?>