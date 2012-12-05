var crypto = require('crypto');

function TreeHash () {
    var megabyte = 1024 * 1024;
    this.buffer = new Buffer(0);
    this.shas   = [];
    this.update = function (chunk) {
        this.buffer += chunk;
        while (this.buffer.length > megabyte) {
            var sha = crypto.createHash('sha256').update(this.buffer.slice(0,megabyte)).digest();
            this.shas.push(sha);
            this.buffer = this.buffer.slice(megabyte);
        }
    }

    this.finalize = function (chunk) {
        if (chunk) this.update(chunk);
        var sha = crypto.createHash('sha256').update(this.buffer).digest();
        this.shas.push(sha);
        // reduce to one single sha to rule them all
        while (this.shas.length > 1) {
          var newShas = [];
          for (i=0; i<this.shas.length; i=i+2) {
              if (this.shas[i+1]) {
                  var sha = crypto.createHash('sha256').update(this.shas[i]).update(this.shas[i+1]).digest();
                  newShas.push(sha);
              } else {
                  newShas.push(this.shas[i]);
              }
            }
            this.shas = newShas;
        }
  
        // convert final sha digest to hex
        var hexSha = '';
        for(var i=0;i<this.shas[0].length;i++) {
            var hexChar = ''+this.shas[0].charCodeAt(i).toString(16);
            if (hexChar.length == 1) hexChar = "0"+hexChar
            hexSha += hexChar
        }
        return hexSha;
    }
    return this;
};

module.exports = new TreeHash();

var getTreeHash = function(buffer) {
  var megabyte = 1024 * 1024;
  var shas = [];
  
  // calculate each megabyte's sha
  for(run=0;(run*megabyte) < buffer.length;run++) {
    var end = (run*megabyte)+megabyte > buffer.length ? buffer.length : (run*megabyte)+megabyte;
    var sha = crypto.createHash('sha256').update(buffer.slice((run*megabyte),end)).digest();
    shas.push(sha);
  }
  
  // reduce to one single sha to rule them all
  while (shas.length > 1) {
    var newShas = [];
    for (i=0; i<shas.length; i=i+2) {
      if (shas[i+1]) {
        var sha = crypto.createHash('sha256').update(shas[i]).update(shas[i+1]).digest();
        newShas.push(sha);
      } else {
        newShas.push(shas[i]);
      }
    }
    shas = newShas;
  }
  
  // convert final sha digest to hex
  var hexSha = '';
  for(var i=0;i<shas[0].length;i++) {
    var hexChar = ''+shas[0].charCodeAt(i).toString(16);
    if (hexChar.length == 1) hexChar = "0"+hexChar
    hexSha += hexChar
  }
  return hexSha;
}
