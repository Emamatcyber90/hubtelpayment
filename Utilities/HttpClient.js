const axios = require('axios');

class HttpClient{
  constructor(options){
        
      
      this.baseURL = options.baseURL;
      this.authorization = options.authorization;

      this.headers = options.headers || {};


      this.http  = axios.create({
          baseURL: this.baseURL
        });
        this.http.defaults.headers.common['Authorization'] = this.authorization;
  }

  header(key , value){
    this.http.defaults.headers.common[key] = value;
    return this;
  }

  body(params){
    this.params = params;
    return this;
  }

  json(params){
    this.body(JSON.stringify(params));
    return this;
  }

  params(params){
    this.params = params;
    return this;
  }

  get(url){
    this.http.get(url , {
          params: this.params
    })
  .then(function (response) {
    console.log(response);
    this.then(response);
  })
  .catch(function (error) {
    console.log(error);
    this.catch(response);
    
  });
  }
  post(url , params){
    this.body(params);
    this.http.get(url , params)
  .then(function (response) {
    console.log(response);
    this.then(response);
  })
  .catch(function (error) {
    console.log(error);
    this.catch(response);
  });

  }
  then(cb){
    this.then = cb;
  }
  catch(cb){
    this.catch = cb;
  }

  test(){
    // Set config defaults when creating the instance
    
    var instance = axios.create({
      baseURL: 'https://api.example.com'
    });
  
    // Alter defaults after instance has been created
    instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  }
}