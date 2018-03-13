# Hubtel Merchant Account integration for Node Js

Based on https://developers.hubtel.com/documentations/merchant-account-api

## About

The `hubtelpayment` package allows you to accept and process payments using [Hubtel Merchant Account API](https://developers.hubtel.com/documentations/merchant-account-api) directly in your Node js application.

## Features

* Receive mobile money
* Send mobile money
* Check status of transaction
* Online checkout

## Installation and Configuration

Install using `npm install hubtelpayment --save`
```js

const Hubtel =  require('hubtelpayment');

const MerchantAccount = Hubtel.MerchantAccount; 
const OnlineCheckout = Hubtel.OnlineCheckout; 

// you may store and fetch these sensitive details in a config file.
const config = {
    account_number:'<account number>', 
    client_id : '<client id >', 
    client_secret :'<client_secret>'
};

let ma = new MerchantAccount(config);

```
## Using Online Checkout feature

Let's say you are using this feature from a controller method, you can do it like so:

```js

// online checkout request

// sample order
 const order = {
     total : 70.00,
     items : [
        {
            name : "Bathing soap",
            description : "Bathing soap",
            quantity : 1,
            price : 50.00,
        },
        {
            name : "Washing soap",
            description : "Washing soap",
            quantity : 1,
            price : 20.00,
        }
     ]
 }

const OnlineCheckout =  Hubtel.OnlineCheckout;
 // Initiate online checkout
 ocRequest = new OnlineCheckout.Request();
 ocRequest.invoice.description = "Invoice description";
 ocRequest.invoice.total_amount = order.total;
 ocRequest.store.name = "My Shop";
 ocRequest.store.logo_url = 'https://cb.mysite.com/img/logo.png';
 ocRequest.store.phone = "0243XXXXXX";
 ocRequest.store.postal_address = "P. O. Box 123456";
 ocRequest.store.tagline = "Best online shop ever";
 ocRequest.store.website_url = 'https://cb.mysite.com';
 ocRequest.actions.cancel_url = 'https://cb.mysite.com/callback';
 ocRequest.actions.return_url = 'https://cb.mysite.com/callback';


 order.items.forEach((item) => {
     invoiceItem = new OnlineCheckout.Item();
     invoiceItem.name = item.name;
     invoiceItem.description = item.description;
     invoiceItem.quantity = item.quantity;
     invoiceItem.unit_price = item.price;
     invoiceItem.total_price = item.price * item.quantity;
     ocRequest.invoice.addItem(invoiceItem);
 });

 ma.onlineCheckout(ocRequest)
 .then( (res) => {
     // you can redirect the user from here
    console.log(res.data);
}).catch( error => {
    console.log(error.response.data , error.response.status);
});


ma.checkInvoiceStatus('4bb4393e394343ce')
.then( (res) => {
    console.log(res.data);
}).catch( error => {
    console.log(error.response.data , error.response.status);
});
```

## Receive Mobile Money

Here is how you request mobile money payment from say a controller method:
```js

// receive money 
ma.receiveMobileMoney({
    CustomerName :"test" , 
    CustomerEmail: "n/a", 
    CustomerMsisdn : '23324XXXXXXX',
    Channel:'mtn-gh',
    Amount : 0.5,
    ClientReference:'',
    Description:'test debit',
    PrimaryCallbackUrl : 'https://cb.mysite.com/callback',
    SecondaryCallbackURL : 'https://cb.mysite.com/callback'
})
.then( (res) => {
    console.log(res.data);
}).catch( error => {
    console.log(error.response.data , error.response.status);
});
```
  
## License

Released under the MIT License, see [LICENSE](LICENSE).

[link-author]: https://github.com/paulmajora
[link-contributors]: ../../contributors
