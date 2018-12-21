'use strict'

const response = function(statusCode, body) {
    let allowedOrigin = arguments[2] ? arguments[2] : "*";
    let headers = {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Credentials" : true
    };
    return {
        statusCode,
        headers: headers,
        body: JSON.stringify(body)
    };
};

module.exports = response;