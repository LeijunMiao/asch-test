global.env = process.env.NODE_ENV || 'development';

global.config = require('./config/config');
// require('./connect');
var port = config.port || 8312;

// *******************************
// Configure Express
// *******************************
var http = require('http');
var express = require('express');
var app = express();


console.log(app.get('env'), __dirname);
app.use(express.favicon());
// app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.compress());
app.use(express.methodOverride());

app.use(express.static(__dirname+ '/src'));
var swig = require('swig');
var cons = require('consolidate');
swig.setDefaults({
    varControls: ['{=', '=}']
});

app.engine('html', cons.swig);
app.engine('ejs', cons.ejs);
app.set('views', __dirname + '/src/views');
app.set('view engine', 'html');
var server = http.createServer(app).listen(port, function () {
    console.log('listening on *:' + port);
});

console.log(config);


app.get('/', function (req, res) {
    res.render('index',{service: config.service});;
});

app.use(express.static(__dirname + '/src'));
