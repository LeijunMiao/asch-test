var os = require('os');
var ip = require('ip');

function getPublicIp() { //获取公网IP
    var publicIp = null;
    try {
      var ifaces = os.networkInterfaces();
      Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
          if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
          }
          if (!ip.isPrivate(iface.address)) {
            publicIp = iface.address;
          }
        });
      });
    } catch (e) {
    }
    return publicIp;
  }

  console.log(getPublicIp());