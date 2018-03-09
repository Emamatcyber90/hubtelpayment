<?php

namespace Jowusu837\HubtelMerchantAccount\Helpers;

use GuzzleHttp\Client;
use Jowusu837\HubtelMerchantAccount\MobileMoney\Refund\Request as RefundRequest;
use Jowusu837\HubtelMerchantAccount\MobileMoney\Receive\Request as ReceiveMobileMoneyRequest;
use Jowusu837\HubtelMerchantAccount\OnlineCheckout\Request as OnlineCheckoutRequest;
use Jowusu837\HubtelMerchantAccount\OnlineCheckout\Response as OnlineCheckoutResponse;

const HttpClient = require('./HttpClient');

class SendsRequests
{
    // protected $http;

    // protected $config;

    // private $auth;

    constructor(config)
    {
        
        this.http = new HttpClient({baseURL: 'https://api.hubtel.com' , authorization : `${this.config['client_id']}:${this.config['client_secret']}` });
        this.config = config;
        this.auth = [this.config['api_key']['client_id'], this.config['api_key']['client_secret']];
    }

    /**
     * @param ReceiveMobileMoneyRequest $request
     * @return mixed Actual response body from gateway
     */
    sendReceiveMobileMoneyRequest(request, cb , error)
    {
        this.http
        .headers('Content-Type', 'application/json')
        .json(request)
        .post(`/v1/merchantaccount/merchants/${this.config['account_number']}/receive/mobilemoney`)
        .then(cb)
        .catch(error);
        // $response = this.http.request('POST', "/v1/merchantaccount/merchants/{$this->config['account_number']}/receive/mobilemoney", [
        //     'headers'=>[
        //         'Content-type' => 'application/json'
        //     ],
        //     'body' => this.toJson($request),
        //     'auth' => this.auth
        // ]);

        // this.checkResponseStatus(response);

        // return response.getBody();
    }

    /**
     * @param OnlineCheckoutRequest $request
     * @return OnlineCheckoutResponse
     */
    sendOnlineCheckoutRequest(request)
    {
        request.store.name = request.store.name || this.config['store']['name'];

        response = this.http.request('POST', "/v1/merchantaccount/onlinecheckout/invoice/create", [
            'json' : json_decode(json_encode(request), true),
            'auth' : this.auth
        ]);

        this.checkResponseStatus(response);

        invoiceResponse = json_decode(response.getBody());

        return invoiceResponse.response_text;
    }

    /**
     * @param $token
     * @return mixed
     */
    sendCheckInvoiceStatusRequest(token)
    {
        $response = $this.http.request('GET', `/v1/merchantaccount/onlinecheckout/invoice/status/${token}`);

        this.checkResponseStatus(response);

        return json_decode(response.getBody());
    }

    /**
     * @param RefundRequest $request
     * @return mixed Actual gateway response
     */
    sendRefundMobileMoneyRequest(request)
    {
        response = this.http.request(
            'POST', 
            "/v1/merchantaccount/merchants/{$this->config['account_number']}/transactions/refund", 
            {
            headers : [
                'Content-type' : 'application/json'
            ],
            'body' : this.toJson($request),
            'auth' : this.auth
            });
        this.checkResponseStatus(response);
        return response.getBody();
    }

    checkResponseStatus(response)
    {
        if (response.getStatusCode() !== 200) {
            throw new Exception(response.getBody());
        }
        return this;
    }
}