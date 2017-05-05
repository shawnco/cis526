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

// -------- DASHBOARDS --------

// Get all dashboards
app.get('/dashboards/list', function(req, res){
    db.all('SELECT * FROM dashboards', function(err, rows){
        if(err) return console.log(err);
        res.end(JSON.stringify(rows));
    });
});

// Get a single dashboard
app.get('/dashboards/get/:id', function(req, res){
    db.get('SELECT * FROM dashboards WHERE id = ?', [req.params.id], function(err, row){
        if(err) return console.log(err);
        res.end(JSON.stringify(row));
    });
});

// Add a dashboard
app.post('/dashboard/add', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        console.log(post.name);
        db.run('INSERT INTO dashboards (name) VALUES (?)', [post.name], function(err){
            if(err){
                console.log(err);
                return false;
            }else{
                console.log('Added dashboard: ' + post.name);
                return true;
            }
        });
    });
});

// -------- WIDGETS --------

app.get('/widgets/get/id', function(req, res){
    db.all('SELECT * FROM widgets WHERE dashboard_id = ?', [req.params.id], function(err, row){
        if(err) return console.log(err);
        res.end(JSON.stringify(row));
    });
});

// Route to the main page
app.get('/', function(req, res){
    res.sendFile('./src/index.html');
})

// Launch the server
app.listen(PORT, function(){
    console.log('Lifeboard is launched on port ' + PORT);
});