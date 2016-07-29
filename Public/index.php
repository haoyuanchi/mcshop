<?php
/**
 * $APP_NAME 统一入口
 */

// 解决跨域问题
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, content-type');
header('Access-Control-Allow-Methods: POST');

echo json_encode($_POST);

require_once dirname(__FILE__) . '/init.php';

//装载你的接口
DI()->loader->addDirs('Demo');

/** ---------------- 响应接口请求 ---------------- **/

$api = new PhalApi();
$rs = $api->response();
$rs->output();

