"use strict";

const PORT = 3123;

var fs = require('fs');
var http = require('http');
var express = require('express');
var migration = require('./libs/migration');
var path = require('path');
var qs = require('querystring');

var app = express();
var sqlite3 = require('sqlite3').verbose();

// Static
app.use(express.static('src'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Set up the database 
var db = new sqlite3.Database('lifeboard.sqlite3', function(err){
    if(err) console.log(err);
});
migration(db);

var Dashboard = require('./models/dashboard');
var Widgets = require('./models/widgets');
var Task = require('./models/task');
var WidgetTask = require('./models/widgetTask');
var Notifications = require('./models/notification');
var Suggestor = require('./models/suggestor');

app.use(Dashboard);
app.use(Widgets);
app.use(Task);
app.use(WidgetTask);
app.use(Notifications);
app.use(Suggestor);

// Route to the main page
app.get('/', function(req, res){
    res.sendFile('./src/index.html');
});

// Launch the server
app.listen(PORT, function(){
    console.log('Lifeboard is launched on port ' + PORT);
});