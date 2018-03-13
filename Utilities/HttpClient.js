const axios = require('axios');

class HttpClient {
  constructor(options){
      this.baseURL = options.baseURL || '';
      this.authorization = options.authorization || '';

      this.headers = options.headers || {};

      this._http  = axios;

      // this.http =  axios.create({
      //   baseURL: 'https://api.hubtel.com',
      //   // timeout: 1000,
      //   // headers: {'X-Custom-Header': 'foobar'}
      // });

      this._http.defaults.headers.common['Authorization'] = this.authorization;
  }

  header(key , value){
    this._http.defaults.headers.common[key] = value;
    return this;
  }

  // headers(key , value){
  //   this.http.defaults.headers.common[key] = value;
  //   return this;
  // }

  getUrl(route){
      return this.baseURL + route;
  }
  body(params){
    this._params = params;
    return this;
  }

  json(params){
    this.header('Content-Type', 'application/json')
    this.body(JSON.stringify(params));
    return this;
  }

  getParams(p){
    return p || this._params;
  }
  params(params){
    this._params = params;
    return this;
  }

  get(url){
    url = this.getUrl(url);
    return this._http.get(url , {
          params: this.getParams()
    })
    // .then( (res) => {
    //   console.debug(res.data);
    // }).catch( err => {
    //   console.debug(error.response.data , error.response.status);
    // });
  }
  post(url , params = null){
    url = this.getUrl(url);
    console.log("REQUEST ", url , this.getParams(params));
    return this._http.post(url , this.getParams(params))
    // .then( res => {
    //   console.debug( "CL" , res.data);
    // }).catch(err => {
    //   console.debug("ERR_CL", error.response.data , error.response.status);
    // });
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

module.exports =  HttpClient;