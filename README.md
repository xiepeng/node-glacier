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


