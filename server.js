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

// Update the dashboard
app.post('/dashboard/update/:id', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        console.log(post);
        db.run('UPDATE dashboards SET name = ? WHERE id = ?', [post.name, post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                console.log('Updated dashboard: ' + post.name);
                res.end(JSON.stringify(true));
            }
        });
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
                res.end(JSON.stringify(false));
            }else{
                console.log('Added dashboard: ' + post.name);
                res.end(JSON.stringify(true));
            }
        });
    });
});

// Delete a dashboard
app.post('/dashboard/delete/:id', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        console.log(post);
        db.run('DELETE FROM dashboards WHERE id = ?', [post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                console.log('Deleted dashboard: ' + post.name);
            }
        })
    })
})

// -------- WIDGETS --------

// Get widgets of a dashboard
app.get('/widgets/get/id', function(req, res){
    db.all('SELECT * FROM widgets WHERE dashboard_id = ?', [req.params.id], function(err, row){
        if(err) return console.log(err);
        res.end(JSON.stringify(row));
    });
});

// Add a widget to a dashboard
app.post('/widget/add', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        console.log(post);
        db.run('INSERT INTO widgets (title, dashboard_id, content, refresh_rate, task_id, api) VALUES (?, ?, ?, ?, ?, ?)' [post.title, post.dashboard_id, post.content, post.refresh_rate, post.task_id, post.api], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                console.log('Added widget: ' + post.title);
                res.end(JSON.stringify(true));
            }
        });
    });
});

// Update widget
app.post('/widget/update/:id', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        console.log(post);
        db.run('UPDATE widgets SET title = ?, dashboard_id = ? , content = ?, refresh_rate = ?, task_id = ?, api = ? WHERE id = ?', [post.title, post.dashboard_id, post.content, post.refresh_rate, post.task_id, post.api, post.id], function(err, row){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(row));
            }
        });
    });
});

// Delete widget
app.post('/widget/delete/:id', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        console.log(post);
        db.run('DELETE FROM widgets WHERE = ?', [post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                console.log('Deleted widget: ' + post.title);
                res.end(JSON.stringify(true));
            }
        })
    });
});

// -------- TASKS --------

// Add a task
app.post('/task/add', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        console.log(post);
        db.run('INSERT INTO tasks (parent_id, text, due_date, difficulty) VALUES (?, ?, ?, ?)', [post.parent_id, post.text, post.due_date, post.difficulty], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                console.log('Added task: ' + post.text);
                res.end(JSON.stringify(true));
            }
        });
    });
});

// Get task
app.get('/task/:id', function(req, res){
    db.all('SELECT * FROM tasks WHERE id = ?', [req.body.id], function(err, row){
        if(err){
            console.log(err);
            res.end(JSON.stringify(false));
        }else{
            res.end(row);
        }
    });
});

// Update task 
app.post('/task/add', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        console.log(post);
        db.run('UPDATE tasks SET parent_id = ?, text = ?, due_date = ?, difficulty = ? WHERE id = ?', [post.parent_id, post.text, post.due_date, post.difficulty, post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                console.log('Added task: ' + post.text);
                res.end(JSON.stringify(true));
            }
        });
    });
});

// Delete task
app.post('/task/delete/:id', function(req, res){
    var body = '';
    req.on('data', function(data){
        var post = JSON.parse(body);
        console.log(post);
        db.run('DELETE FROM tasks WHERE id = ?', [post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                console.log('Deleted task: ' + post.text);
                res.end(JSON.stringify(true));
            }
        });
    });
});

// -------- General Routing --------

// Route to the main page
app.get('/', function(req, res){
    res.sendFile('./src/index.html');
})

// Launch the server
app.listen(PORT, function(){
    console.log('Lifeboard is launched on port ' + PORT);
});