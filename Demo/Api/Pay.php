<?php
/*
 * +----------------------------------------------------------------------
 * | 支付
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

class Api_Pay extends PhalApi_Api {

	public function getRules() {
        return array(
            'pay' => array(
                'openid' => array('name' => 'openid', 'type' =>'string', 'require' => true, 'desc' => 'openid'),
                'type' 	=> array('name' => 'type', 'type' =>'enum', 'require' => true, 'range' => array('aliwap', 'wechat'), 'desc' => '引擎类型，比如aliwap'),
                'orderNo' => array('name' => 'order_no', 'type' =>'string', 'require' => true, 'desc' => '订单编号'),
                'price' => array('name' => 'price', 'type' => 'string', 'require' => true, 'desc' => '支付价格'),
            ),
            'notify' => array(

            ),
        );
	}

    /**
     * 支付接口
     * @desc 支付接口
     * @return html 返回支付发起请求
     */
	public function pay(){
		//获取对应的支付引擎
        DI()->pay->set($this->type);

        // 获取openid
        $data = array();
        //$data['order_no'] = $this->orderNo;
        $data['openid'] = $this->openid;
        $data['order_no'] = date('YmdHis'). ''. PhalApi_Tool::createRandNumber(4);
        $data['title'] = '测试的订单';
        $data['body'] = '测试的订单';
        $data['price'] = '0.01';
        $data['fee_type'] = 'CNY';
        echo DI()->pay->buildRequestForm($data);
        exit;
	}

    public function notify(){
        $xml = $GLOBALS["HTTP_RAW_POST_DATA"];
        DI()->logger->log('notify','支付结果', $xml);
    }

    /**
     * 请求验证
     */
    public function verifyNotify($notify) {
        //xml转array
        $this->values = $this->xmlToArray($notify);

        if($this->values['return_code'] != 'SUCCESS'){
            DI()->logger->log('payError','支付失败', $this->values);
            return false;
        }

        if(!$this->checkSign()){
            DI()->logger->log('payError','签名错误', $this->values);
            return false;
        }

        //写入订单信息  TODO
        $this->setInfo($this->values);
        return true;
    }

    /**
     * 异步通知验证成功返回信息
     */
    public function notifySuccess(){
        $return = array();
        $return['return_code'] = 'SUCCESS';
        $return['return_msg'] = 'OK';
        echo $this->arrayToXml($return);
    }

    /**
     * 异步通知验证失败返回信息
     */
    public function notifyError(){
        $return = array();
        $return['return_code'] = 'FAIL';
        $return['return_msg'] = '验证失败';
        echo $this->arrayToXml($return);
    }

    /**
     * 写入订单信息
     * @param [type] $notify [description]
     */
    protected function setInfo($notify) {
        $info = array();
        //支付状态
        $info['status'] = ($notify['return_code'] == 'SUCCESS') ? true : false;
        $info['money'] = $notify['total_fee']/100;
        //商户订单号
        $info['out_trade_no'] = $notify['out_trade_no'];
        //微信交易号
        $info['trade_no'] = $notify['transaction_id'];
        $this->info = $info;
    }
}