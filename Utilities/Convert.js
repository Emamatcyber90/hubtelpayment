var base64 = require('base-64');

class Convert{
    base64Encode(input){
        return base64.encode(input);
    }

    base64Decode(input){
        return base64.decode(input);
    }

    jsonEncode(input){
        return JSON.stringify(input);
    }

    jsonDecode(input){
        return JSON.parse(input);
    }
}

module.exports = new Convert();