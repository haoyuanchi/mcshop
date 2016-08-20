<?php
/*
 * +----------------------------------------------------------------------
 * | 支付异步/同步回调
 * +----------------------------------------------------------------------
 * | Copyright (c) 2015 summer All rights reserved.
 * +----------------------------------------------------------------------
 * | Author: summer <aer_c@qq.com> <qq7579476>
 * +----------------------------------------------------------------------
 * | This is not a free software, unauthorized no use and dissemination.
 * +----------------------------------------------------------------------
 * | Date
 * +----------------------------------------------------------------------
 */

class Api_Notify extends PhalApi_Api {

	public function getRules() {
        return array(
            'index' => array(
                'type' => array('name' => 'type', 'type' =>'string', 'require' => true, 'desc' => '引擎类型，比如alipay'),
                'method' => array('name' => 'method', 'type' =>'string', 'desc' => '回调类型，notify异步/return同步'),
            ),
        );
	}
	
    /**
     * 支付异步/同步回调
     * @return string 无 根据不同的引擎，返回不同的信息，如果错误信息，则存入日志
     */
	public function index() {
        //获取对应的支付引擎
        DI()->pay->set($this->type);
        
        //获取回调信息
        $notify = $GLOBALS['PAY_NOTIFY'];
        
        if(!$notify) {
            DI()->logger->log('payError','Not data commit', array('Type' => $this->type));
            exit; //直接结束程序，不抛出错误
        }

        //验证
        if(DI()->pay->verifyNotify($notify) == true){
            //获取订单信息
            $info = DI()->pay->getInfo();

            // 根据订单号更新订单的状态
            $OrderModel = new Model_Order();
            $orderInfo['payment_status'] = 1;
            $orderInfo['payment_method_name'] = $this->type;
            $orderInfo['payment_plugin_id'] = $this->type;
            $res = $OrderModel->updateOrderBySn($info['out_trade_no'], $orderInfo);
            
            //订单更新成功
            if($res){
                if ($this->method == "return") {
                    //TODO 同步回调需要跳转的页面
                } else {
                    DI()->logger->log('paySuccess', 'Pay Success',array('Type' => $this->type, 'Method' => $this->method, 'Data'=> $info));

                    //移除超全局变量
                    unset($GLOBALS['PAY_NOTIFY']);

                    //支付接口需要返回的信息，通知接口我们已经接收到了支付成功的状态
                    DI()->pay->notifySuccess();

                    /*$order_id = $info['out_trade_no'];
                    $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/member/order/paySuccess.html?order_id=$order_id";
                    header("Location:{$url}");
                    DI()->logger->debug("调试链接", array('url'=>$url));*/

                    exit; //需要结束程序
                }
            }else{
                DI()->pay->notifyError();
                DI()->logger->log('payError','Failed to pay', $info);
                exit;
            }
        }else{
            DI()->pay->notifyError();
            DI()->logger->log('payError','Verify error', array('Type' => $this->type, 'Method'=> $this->method, 'Data' => $notify));

            /*$values = DI()->pay->xmlToArray($notify);
            $order_id = $values['out_trade_no'];
            $url="http://bbbccc.moco.com.cn/mcshop/app/mobile/member/order/paySuccess.html?order_id=$order_id";
            header("Location:{$url}");*/
            exit; //需要结束程序
        }
	}
}









