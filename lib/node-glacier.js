"use strict";
var auth   = require("./auth.js"),
    assert = require("assert"),
    http   = require("http");

exports.Client = function (options) {

    var errorMsg =  "Must provide Account ID, Access Key ID and Secret Key " +
                    "as an argument in the form of " +
                    "{AccountId: *****, AccessKeyId: *****, SecretKey: *****, Region: *****}.";

    assert(options, errorMsg);

    var accountId   = options.AccountId || "-",
        accessKeyId = options.AccessKeyId,
        secretKey   = options.SecretKey,
        region      = options.Region;

    assert(accountId && accessKeyId && secretKey && region, errorMsg);

    this.createVault = function (name, callback) {

        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults/" + name,
            port    : 80,
            method  : "PUT",
            headers : {}
        };

        auth.sign(requestOptions, options);
        // console.dir(requestOptions);

        try {
            http.request(requestOptions, function (res) {
                // console.info(res.statusCode);
                // res.on("data", function (chunk) {console.info("" + chunk)});
                err = (res.statusCode !== 201);
                var message = "";
                res.on("data", function (chunk) { message += chunk; });
                res.on("end", function () {
                    callback(err, message);
                });
            }).end();
        } catch (e) {
            callback(true, e);
        }

        return null;

    };


    this.deleteVault = function (name, callback) {

        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults/" + name,
            port    : 80,
            method  : "DELETE",
            headers : {}
        };

        auth.sign(requestOptions, options);
        // console.dir(requestOptions);

        try {
            http.request(requestOptions, function (res) {
                // console.info(res.statusCode);
                // res.on("data", function (chunk) {console.info("" + chunk)});
                err =  (res.statusCode !== 204);
                var message = "";
                res.on("data", function (chunk) { message += chunk; });
                res.on("end", function () {
                    callback(err, message);
                });
            }).end();
        } catch (e) {
            callback(e);
        }

        return null;

    };

    this.describeVault = function (name, callback) {

        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults/" + name,
            port    : 80,
            method  : "GET",
            headers : {}
        };

        auth.sign(requestOptions, options);
        // console.dir(requestOptions);

        try {
            http.request(requestOptions, function (res) {
                // console.info(res.statusCode);
                // res.on("data", function (chunk) {console.info("" + chunk)});
                err =  (res.statusCode !== 200);
                var message = "";
                res.on("data", function (chunk) { message += chunk; });
                res.on("end", function () {
                    callback(err, message);
                });
            }).end();
        } catch (e) {
            callback(true, e);
        }

        return null;

    };




    this.listVaults = function (callback) {

        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults",
            port    : 80,
            method  : "GET",
            headers : {}
        };

        auth.sign(requestOptions, options);
        // console.dir(requestOptions);

        try {
            http.request(requestOptions, function (res) {
                // console.info(res.statusCode);
                // res.on("data", function (chunk) {console.info("" + chunk)});
                err =  (res.statusCode !== 200);
                var message = "";
                res.on("data", function (chunk) { message += chunk; });
                res.on("end", function () {
                    callback(err, message);
                });
            }).end();
        } catch (e) {
            callback(true, e);
        }

        return null;

    };



    this.setVaultNotificationConfiguration = function (name, topic, events, callback) {

        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults/" + name + "/notification-configuration",
            port    : 80,
            method  : "PUT",
            headers : {}
        };
        
        var reqPayload = {
            SNSTopic: topic,
            Events: events
        }

        auth.sign(requestOptions, options, reqPayload);
        // console.dir(requestOptions);
        try {
            http.request(requestOptions, function (res) {
                // console.info(res.statusCode);
                // res.on("data", function (chunk) {console.info("" + chunk)});
                err = (res.statusCode !== 204);
                var message = "";
                res.on("data", function (chunk) { message += chunk; });
                res.on("end", function () {
                    callback(err, message);
                });
            }).end(JSON.stringify(reqPayload));
        } catch (e) {
            callback(true, e);
        }

        return null;

    };





    this.getVaultNotifications = function (name, callback) {

        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults/" + name + "/notification-configuration",
            port    : 80,
            method  : "GET",
            headers : {}
        };
        
        auth.sign(requestOptions, options);
        // console.dir(requestOptions);
        try {
            http.request(requestOptions, function (res) {
                // console.info(res.statusCode);
                // res.on("data", function (chunk) {console.info("" + chunk)});
                err = (res.statusCode !== 200);
                var message = "";
                res.on("data", function (chunk) { message += chunk; });
                res.on("end", function () {
                    callback(err, message);
                });
            }).end();
        } catch (e) {
            callback(true, e);
        }

        return null;

    };




    this.deleteVaultNotifications = function (name, callback) {

        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults/" + name + "/notification-configuration",
            port    : 80,
            method  : "DELETE",
            headers : {}
        };
        
        auth.sign(requestOptions, options);
        // console.dir(requestOptions);
        try {
            http.request(requestOptions, function (res) {
                // console.info(res.statusCode);
                // res.on("data", function (chunk) {console.info("" + chunk)});
                err = (res.statusCode !== 204);
                var message = "";
                res.on("data", function (chunk) { message += chunk; });
                res.on("end", function () {
                    callback(err, message);
                });
            }).end();
        } catch (e) {
            callback(true, e);
        }

        return null;

    };

    this.uploadArchive = function () {};
    this.deleteArchive = function () {};

    this.initiateMultipartUpload = function () {};
    this.uploadPart = function () {};
    this.completeMultipartUpload = function () {};
    this.abortMultipartUpload = function () {};
    this.listParts = function () {};
    this.listMultipartUploads = function () {};

    this.initiateJob = function () {};
    this.describeJob = function () {};
    this.getJobOutput = function () {};
    this.listJobs = function () {};

    return this;
};
