"use strict";

var crypto = require("crypto"),
    assert = require("assert");

var carn = function (param) {
    return param ? param.split("&").sort().join("&") : "";
};

exports.sign = function (requestOptions, options) {
    // var now = new Date("Fri, 25 May 2012 00:24:53 GMT");
    var now = new Date();
    requestOptions.host = "glacier." + options.Region + ".amazonaws.com";

    requestOptions.headers.Host = "glacier." + options.Region + ".amazonaws.com";
    requestOptions.headers.Date = now.toISOString().replace(/-/g, "").replace(/:/g, "").substring(0, 15) + "Z";
    requestOptions.headers["x-amz-glacier-version"] = "2012-06-01";
    requestOptions.headers["x-amz-date"] = requestOptions.headers.Date;

    var carnonicalRequest = "";
    carnonicalRequest += requestOptions.method + "\n";
    carnonicalRequest += requestOptions.path.split("?")[0] + "\n";
    carnonicalRequest += carn(requestOptions.path.split("?")[1]) + "\n";
    carnonicalRequest += "host:" + requestOptions.host + "\n";
    carnonicalRequest += "x-amz-date:" + requestOptions.headers.Date + "\n";
    carnonicalRequest += "x-amz-glacier-version:" + requestOptions.headers["x-amz-glacier-version"] + "\n";
    carnonicalRequest += "\n";
    carnonicalRequest += "host;x-amz-date;x-amz-glacier-version\n";
    carnonicalRequest += crypto.createHash("sha256").update("").digest("hex");
    // console.info("The carnonical request:\n" + carnonicalRequest);

    var stringToSign = "";
    stringToSign += "AWS4-HMAC-SHA256\n";
    stringToSign += requestOptions.headers.Date + "\n";
    stringToSign += requestOptions.headers.Date.substring(0, 8) + "/" + options.Region + "/glacier/aws4_request\n";
    stringToSign += crypto.createHash("sha256").update(carnonicalRequest).digest("hex");
    // console.info("String to sign:\n" + stringToSign);

    var kDate       = crypto.createHmac("sha256", "AWS4" + options.SecretKey).update(requestOptions.headers.Date.substring(0, 8)).digest("binary");
    var kRegion     = crypto.createHmac("sha256", kDate).update(options.Region).digest("binary");
    var kService    = crypto.createHmac("sha256", kRegion).update("glacier").digest("binary");
    var kSigning    = crypto.createHmac("sha256", kService).update("aws4_request").digest("binary");
    var signature   = crypto.createHmac("sha256", kSigning).update(stringToSign).digest("hex");
    // console.info("Signature:\n" + signature);
    requestOptions.headers.Authorization = "AWS4-HMAC-SHA256 " + "Credential=" + options.AccessKeyId + "/" + requestOptions.headers.Date.substring(0, 8) + "/" + options.Region + "/glacier/aws4_request," + "SignedHeaders=host;x-amz-date;x-amz-glacier-version," + "Signature=" + signature;
    return null;
};

