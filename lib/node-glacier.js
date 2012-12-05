"use strict";

var auth   = require("./auth.js"),
    assert = require("assert"),
    crypto = require("crypto"),
    fs     = require("fs"),
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

        auth.sign(requestOptions, options, JSON.stringify(reqPayload));
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




    this.uploadArchiveStream = function (vaultName, fileName, description, callback) {
        var fileStream = fs.createReadStream(fileName);
        var treeHash = require("./treehash.js");
        var linearHash = crypto.createHash("sha256");
        var fileLength = 0;

        fileStream.on("data", function(chunk) {
            fileLength += chunk.length;
            treeHash.update(chunk);
            linearHash.update(chunk);
        });

        fileStream.on("end", function () {

            var tHash, lHash;
            tHash = treeHash.finalize();
            lHash = linearHash.digest("hex");

            console.info("Finale tree hash=" + tHash);
            console.info("Finale linear hash=" + lHash);

            var err;
            var requestOptions = {
                host    : "glacier." + region + ".amazonaws.com",
                path    : "/" + accountId + "/vaults/" + vaultName + "/archives",
                port    : 80,
                method  : "POST",
                headers : {
                    "Content-Length"            : fileLength,
                    "x-amz-archive-description" : description,
                    "x-amz-content-sha256"      : lHash,
                    "x-amz-sha256-tree-hash"    : tHash
                }
            };
    
            auth.sign(requestOptions, options, lHash);
            // console.dir(requestOptions);


            var req = http.request(requestOptions, function (res) {
                // console.info(res.statusCode);
                // res.on("data", function (chunk) {console.info("" + chunk)});
                err = (res.statusCode !== 201);
                var message = "";
                if (!err) {
                    message += JSON.stringify(res.headers);
                } else {
                    res.on("data", function (chunk) { message += chunk; });
                }
                res.on("end", function () {
                    callback(err, message);
                });
            });

            req.on("error", function (e) {
                callback(true, e.message)
            });

            var sameFileStream = fs.createReadStream(fileName);

            sameFileStream.on("data", function (chunk) {
                req.write(chunk);
            });

            sameFileStream.on("end", function () {
                req.end();
            });

        });

        return null;

    }



    this.uploadArchive = function (vaultName, fileName, description, callback) {
        var getTreeHash = require("treehash");
        var file        = fs.readFileSync(fileName);
        var treeHash    = getTreeHash(file);
        // console.info("Tree Hash = " + treeHash);
        var linearHash  = crypto.createHash("sha256").update(file).digest("hex");
        // console.info("Linear Hash = " + linearHash);

        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults/" + vaultName + "/archives",
            port    : 80,
            method  : "POST",
            headers : {
                "Content-Length"            : file.length,
                "x-amz-archive-description" : description,
                "x-amz-content-sha256"      : linearHash,
                "x-amz-sha256-tree-hash"    : treeHash
            }
        };

        auth.sign(requestOptions, options, linearHash);
        // console.dir(requestOptions);

        try {
            var req = http.request(requestOptions, function (res) {
                // console.info(res.statusCode);
                // res.on("data", function (chunk) {console.info("" + chunk)});
                err = (res.statusCode !== 201);
                var message = "";
                if (!err) {
                    message += JSON.stringify(res.headers);
                } else {
                    res.on("data", function (chunk) { message += chunk; });
                }
                res.on("end", function () {
                    callback(err, message);
                });
            });

            req.on("error", function (e) {
                callback(true, e.message)
            });

            req.write(file);
            req.end();

        } catch (e) {
            callback(true, e);
        }
        return null;

    };



    this.deleteArchive = function () {};

    this.initiateMultipartUpload = function () {};
    this.uploadPart = function () {};
    this.completeMultipartUpload = function () {};
    this.abortMultipartUpload = function () {};
    this.listParts = function () {};
    this.listMultipartUploads = function () {};



    this.initiateJob = function (name, reqPayload, callback) {
        
        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults/" + name + "/jobs",
            port    : 80,
            method  : "POST",
            headers : {}
        };
        
        auth.sign(requestOptions, options, JSON.stringify(reqPayload));
        // console.dir(requestOptions);
        try {
            http.request(requestOptions, function (res) {
                // console.info(res.statusCode);
                // res.on("data", function (chunk) {console.info("" + chunk)});
                err = (res.statusCode !== 202);
                var message = "";
                res.on("data", function (chunk) { message += chunk; });
                res.on("end", function () {
                    callback(err, err?message:JSON.stringify(res.headers));
                });
            }).end(JSON.stringify(reqPayload));
        } catch (e) {
            callback(true, e);
        }

        return null;

    };

    this.retrieveInventory = function (name, jobDescription, format, topic, callback) {
        return this.initiateJob(name, {
            Type        : "inventory-retrieval",
            Description : jobDescription,
            Format      : format,
            SNSTopic    : topic
        }, callback);
    }



    this.describeJob = function (name, jobId, callback) {

        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults/" + name + "/jobs/" + jobId,
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



    this.getJobOutput = function (name, jobId, callback) {

        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults/" + name + "/jobs/" + jobId + "/output",
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



    this.listJobs = function (name, callback) {

        var err;
        var requestOptions = {
            host    : "glacier." + region + ".amazonaws.com",
            path    : "/" + accountId + "/vaults/" + name + "/jobs",
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


/*  callback (err, res)
 *
 *
 *
 *
 *
 */
    this.uploadArchiveFromS3Stream = function (bucket, path, vaultName, callback) {
        var s3Client = require("knox").createClient({
            key     : options.AccessKeyId,
            secret  : options.SecretKey,
            bucket  : bucket
        });

        console.info("Retrieving file from S3: " + bucket + path);

        s3Client.get(path).on("response", function (res) {
            // console.info(res.statusCode);
            // console.info(res.headers);
            if (res.statusCode !== 200) {
                var message = "";
                res.on("data",  function (chunk) {message += chunk});
                res.on("end",   function () {return callback(true, message)});
            } else {
                var treeHash = require("./treehash.js");
                var file = new Buffer(parseInt(res.headers["content-length"]));
                var receivedBytes = 0;
                res.on("data", function (chunk) {
                    // copy chunk into Buffer file
                    chunk.copy(file, receivedBytes); 
                    receivedBytes += chunk.length;
                });
                res.on("end", function () {
                    
                    var getTreeHash = require("treehash");
                    var treeHash    = getTreeHash(file);
                    var linearHash  = crypto.createHash("sha256").update(file).digest("hex");
            
                    var err;
                    var requestOptions = {
                        host    : "glacier." + region + ".amazonaws.com",
                        path    : "/" + accountId + "/vaults/" + vaultName + "/archives",
                        port    : 80,
                        method  : "POST",
                        headers : {
                            "Content-Length"            : file.length,
                            "x-amz-archive-description" : "S3://" + bucket + path,
                            "x-amz-content-sha256"      : linearHash,
                            "x-amz-sha256-tree-hash"    : treeHash
                        }
                    };
            
                    auth.sign(requestOptions, options, linearHash);
                    // console.dir(requestOptions);

                    try {
                        var req = http.request(requestOptions, function (res) {
                            // console.info(res.statusCode);
                            // res.on("data", function (chunk) {console.info("" + chunk)});
                            err = (res.statusCode !== 201);
                            var message = "";
                            if (!err) {
                                message += JSON.stringify(res.headers);
                            } else {
                                res.on("data", function (chunk) { message += chunk; });
                            }
                            res.on("end", function () {
                                callback(err, message);
                            });
                        });
            
                        req.on("error", function (e) {
                            callback(true, e.message)
                        });
            
                        req.write(file);
                        req.end();
            
                    } catch (e) {
                        callback(true, e);
                    }
                });
            }
        }).end();

    };


    this.uploadArchiveFromS3 = function (bucket, path, vaultName, callback) {
        var s3Client = require("knox").createClient({
            key     : options.AccessKeyId,
            secret  : options.SecretKey,
            bucket  : bucket
        });

        console.info("Retrieving file from S3: " + bucket + path);

        s3Client.get(path).on("response", function (res) {
            // console.info(res.statusCode);
            // console.info(res.headers);
            if (res.statusCode !== 200) {
                var message = "";
                res.on("data",  function (chunk) {message += chunk});
                res.on("end",   function () {return callback(true, message)});
            } else {
                var file = new Buffer(parseInt(res.headers["content-length"]));
                var receivedBytes = 0;
                res.on("data", function (chunk) {
                    // copy chunk into Buffer file
                    chunk.copy(file, receivedBytes); 
                    receivedBytes += chunk.length;
                });
                res.on("end", function () {
                    
                    var getTreeHash = require("treehash");
                    var treeHash    = getTreeHash(file);
                    var linearHash  = crypto.createHash("sha256").update(file).digest("hex");
            
                    var err;
                    var requestOptions = {
                        host    : "glacier." + region + ".amazonaws.com",
                        path    : "/" + accountId + "/vaults/" + vaultName + "/archives",
                        port    : 80,
                        method  : "POST",
                        headers : {
                            "Content-Length"            : file.length,
                            "x-amz-archive-description" : "S3://" + bucket + path,
                            "x-amz-content-sha256"      : linearHash,
                            "x-amz-sha256-tree-hash"    : treeHash
                        }
                    };
            
                    auth.sign(requestOptions, options, linearHash);
                    // console.dir(requestOptions);

                    try {
                        var req = http.request(requestOptions, function (res) {
                            // console.info(res.statusCode);
                            // res.on("data", function (chunk) {console.info("" + chunk)});
                            err = (res.statusCode !== 201);
                            var message = "";
                            if (!err) {
                                message += JSON.stringify(res.headers);
                            } else {
                                res.on("data", function (chunk) { message += chunk; });
                            }
                            res.on("end", function () {
                                callback(err, message);
                            });
                        });
            
                        req.on("error", function (e) {
                            callback(true, e.message)
                        });
            
                        req.write(file);
                        req.end();
            
                    } catch (e) {
                        callback(true, e);
                    }
                });
            }
        }).end();

    };


    this.batchUploadArchivesFromS3 = function (bucket, prefix, vaultName, callback) {
        var s3Client = require("knox").createClient({
            key     : options.AccessKeyId,
            secret  : options.SecretKey,
            bucket  : bucket
        });

        var uploadArchiveFromS3 = this.uploadArchiveFromS3;

        s3Client.list({prefix:prefix}, function (err, data) {
            if (!err && data.Contents) {
                var uploadOneArchive = function (list, index) {
                    index = index || 0;
                    if (index < list.length) {
                        uploadArchiveFromS3(bucket, list[index], vaultName, function (err, res){
                            if (!err) {
                                index++;
                                uploadOneArchive(list, index);
                            } else {
                                callback(true, '{"message":"error occurred while uploading /' + list[index] + '"}');
                            }
                        });
                    } else {
                        callback(false, '{"message":"All ' + list.length + ' files uploaded to glacier."}');
                    }
                };
                var fileList = [];
                for (var i=0; i<data.Contents.length; i++) {
                    fileList.push("/" + data.Contents[i].Key);
                }
                uploadOneArchive(fileList);
            } else {
                callback(true, '{"message":"cannot find S3://' + bucket + "/" + prefix + '}');
            }
        });




    };

    return this;
};


