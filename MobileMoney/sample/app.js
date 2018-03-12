
const MerchantAccount = require("./MerchantAccount"); 


const config = {
    baseURL : 'https://api.hubtel.com',
    account_number:'<account number>', 
    client_id : '<your client id>', 
    client_secret :'<you client secret>'
};

let ma = new MerchantAccount(config);

hc.sendReceiveMobileMoneyRequest({
    CustomerName :"test" , 
    CustomerEmail: "paulmajora@gmail.com", 
    CustomerMsisdn : '233554446175',
    Channel:'mtn-gh',
    Amount : 0.5,
    ClientReference:'',
    Description:'test debit',
    PrimaryCallbackUrl : 'https://cb.mysite.com/callback'
})
.then( (res) => {
    console.log(res.data);
}).catch( error => {
    console.log(error.response.data , error.response.status);
});
