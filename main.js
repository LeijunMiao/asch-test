var program = require('commander');
var z_schema = require('z-schema');

process.stdin.resume();
var version = '0.0.1';
program
    .version(version)
    .option('-c, --config <path>', 'Config file path')
    .option('-p, --port <port>', 'Listening port number')
    .option('-a, --address <ip>', 'Listening host name or ip')
    .option('-b, --blockchain <path>', 'Blockchain db path')
    .option('-g, --genesisblock <path>', 'Genesisblock path')
    .option('-x, --peers [peers...]', 'Peers list')
    .option('-l, --log <level>', 'Log level')
    .option('-d, --daemon', 'Run asch node as daemon')
    .option('-e, --execute <path>', 'exe')
    .option('--dapps <dir>', 'DApps directory')
    .option('--base <dir>', 'Base directory')
    .parse(process.argv);
console.log('当前目录：' + process.cwd());
console.log('网络环境：' + (process.env.NET_VERSION || 'localnet'));
console.log('pid：' + process.pid);
console.log('hex：' + new Buffer('test', 'hex').toString());

z_schema.registerFormat("hex", function (str) {
    var b = null
    try {
        b = new Buffer(str, "utf8");
        console.log(b,b.length);
    } catch (e) {
        return false;
    }

    return b && b.length > 0;
});
var data = {};

var validator = new z_schema();
var schema = {
    "type": "string",
    "format": "hex"
};

validator.validate('123',schema, function (err, valid) {
    console.log(err, valid);
});

const buf2 = new Buffer('7468697320697320612074c3a97374', 'hex');

// Prints: this is a tést
console.log(buf2.toString());