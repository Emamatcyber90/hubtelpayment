class MerchantAccount{

    constructor()
    {
        this.http = http;
    }
    // constructor(http)
    // {
    //     this.http = http;
    // }

    /**
     * Receive mobile money
     *
     * @param ReceiveMobileMoneyRequest $request
     * @return ReceiveMobileMoneyResponse
     */
    receiveMobileMoney(request)
    {
        const response = this.http.sendReceiveMobileMoneyRequest(request);
        return response;
        // return new ReceiveMobileMoneyResponse(...$response);
    }

    /**
     * Refund mobile money
     * @param RefundMobileMoneyRequest $request
     * @return RefundMobileMoneyResponse
     */
    refundMobileMoney(request)
    {
        const response = this.httpsendRefundMobileMoneyRequest(request);
        return new RefundMobileMoneyResponse(response);
    }

    /**
     * Online checkout
     *
     * @param OnlineCheckoutRequest $request
     * @return mixed
     * @throws \Exception
     */
    onlineCheckout(request)
    {
        const checkout_url = this.http.sendOnlineCheckoutRequest(request);
        return checkout_url;
        // return header('Location: ' . checkout_url);
    }

    /**
     * Check online checkout invoice status
     *
     * @param string $token
     * @return OnlineCheckoutInvoiceStatusResponse
     * @throws \Exception
     */
    checkInvoiceStatus(token)
    {
        const response = this.http.sendCheckInvoiceStatusRequest(token);
        return response;
    }
}