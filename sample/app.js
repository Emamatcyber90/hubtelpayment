
const Hubtel = require("../index"); 

const MerchantAccount = Hubtel.MerchantAccount; 
const OnlineCheckout = Hubtel.OnlineCheckout; 


let ma = new MerchantAccount(config);


// receive money 
ma.receiveMobileMoney({
    CustomerName :"test" , 
    CustomerEmail: "paulmajora@gmail.com", 
    CustomerMsisdn : '233554446175',
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