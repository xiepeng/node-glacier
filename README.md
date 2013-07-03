*Under development...*
# node-glacier
#### API Version: 2012-06-01

A node.js module for [Amazon Glacier](http://aws.amazon.com/glacier/ "go to the official page of Amazon Glacier").

## Installation

```shell
npm install node-glacier
```

## Usage
```javascript
var glacier = require("glacier");
var glacierClient = new glacier.Client({
    Region      : "AWS region such as us-east-1",
    AccessKeyID : "Your AWS Access Key Id",
    SecretKey   : "Your AWS Secret Key"
});
```

## Create a vault
```javascript
glacierClient.createVault(vaultName, function (err, res) { ... });
```

## Delete a vault
```javascript
glacierClient.deleteVault(vaultName, function (err, res) { ... });
```

## Get a list of your vaults
```javascript
glacierClient.listVaults(function (err, res) { ... });
```

## Add a description to the vault
```javascript
glacierClient.describeVault(vaultName, function (err, res) { ... });
```

## Add a description to the vault
```javascript
glacierClient.describeVault(vaultName, function (err, res) { ... });
```

## Set the SNS vault notifations
```javascript
glacierClient.setVaultNotificationConfiguration = function (vaultName, topic, events, function(err, res)) { ... });
```

## Get SNS vault notifations
```javascript
glacierClient.getVaultNotifications = function (vaultName, callback) { ... });
```
