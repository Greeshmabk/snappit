"use strict"
var express = require('express')
var program = require('commander')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var path = require('path')
var logger = require('morgan')
var helmet = require('helmet')

var routes = require('./routes/index')
var docs = require('./routes/docs');
program
    .version('0.0.1')
    .option('-p ,--port <number>', "PORT", parseInt)
    .parse(process.argv)

var app = express()
var db = mongoose.connection

var config = require('./config').config[app.get('env')]
var PORT = program.port || process.env.PORT || 3000

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'../client/views'))
app.use(express.static(path.join(__dirname,'../client/public/')))
app.use(logger('dev'))
app.use(helmet())

mongoose.connect(config.dbHost)
db.on('error', console.error.bind(console, 'connection error : '))
db.once('open', function(callback) {
    console.log('Connected to : ' + config.dbHost)
})

app.use(bodyParser.urlencoded({
    extended: true
}))
//not loading if used
//app.use(bodyParser.json)

app.get('/', function(req, res) {
    res.render('index')
});

app.use('/docs', docs);
app.use('/', routes);

app.listen(PORT, function(err) {
    console.log('Listening to port : ' + PORT)
})
