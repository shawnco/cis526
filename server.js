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
app.post('/dashboard/update', function(req, res){
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
app.post('/dashboard/delete', function(req, res){
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
                res.end(JSON.stringify(true));
            }
        })
    })
})

// -------- WIDGETS --------

// Get widgets of a dashboard
app.get('/widgets/get/:id', function(req, res){
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
        db.run('INSERT INTO widgets (title, dashboard_id, content, refresh_rate, task_id, api) VALUES (?, ?, ?, ?, ?, ?)', [post.title, post.dashboard_id, post.content, post.refresh_rate, post.task_id, post.api], function(err){
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
app.post('/widget/update', function(req, res){
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
                res.end(JSON.stringify(true));
            }
        });
    });
});

// Delete widget
app.post('/widget/remove', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        console.log(post);
        db.run('DELETE FROM widgets WHERE id = ?', [post.id], function(err){
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
        db.run('INSERT INTO tasks (parent_id, text, due_date, difficulty, completed) VALUES (?, ?, ?, ?, ?)', [post.parent_id, post.text, post.due_date, post.difficulty, 0], function(err, row){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                var id = this.lastID;
                if(post.widget_id){
                    console.log('this goes to widget ' + post.widget_id);
                    db.run('UPDATE widgets SET task_id = ? WHERE id = ?', [this.lastID, post.widget_id], function(err){
                        if(err){
                            console.log(err);
                            res.end(JSON.stringify(false));
                        }
                    })
                }
                console.log('Added task: ' + post.text);
                res.end(JSON.stringify(true));
            }
        });
    });
});

// Get task
app.get('/task/:id', function(req, res){
    db.all('SELECT * FROM tasks WHERE id = ?', [req.params.id], function(err, row){
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
        body += data;
    });
    req.on('end', function(){
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

// Get children for a task
app.get('/task/children/:id', function(req, res){
    db.all('SELECT * FROM tasks WHERE parent_id = ?', [req.params.id], function(err, rows){
        if(err){
            console.log(err);
            res.end(JSON.stringify(false));
        }else{
            res.end(JSON.stringify(rows));
        }
    });
});

app.post('/task/toggle', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        console.log(post);
        db.run('UPDATE tasks SET completed = ? WHERE id = ?', [post.completed, post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
})

// -------- Widget Tasks --------

// Get task belonging to widget
app.get('/widgetTask/:id', function(req, res){
    console.log('widget id is ' + req.params.id);
    db.all('SELECT * FROM tasks WHERE id = (SELECT task_id FROM widgets WHERE id = ?)', [req.params.id], function(err, row){
        if(err){
            console.log(err);
            res.end(JSON.stringify(false));
        }else{
            if(row.length === 0){
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(row[0]));
            }
        }
    });
});

// Remove a widget's task
app.post('/widgetTask/remove', function(req, res){
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        console.log(post);
        db.run('UPDATE widgets SET task_id = NULL WHERE id = ?', [post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                console.log('Widget task removed!');
                res.end(JSON.stringify(true));
            }
        });
    });
});

// -------- Suggestor --------
app.get('/suggest', function(req, res){
    // First get all the leaf nodes, i.e. they're not a parent id.
    db.all('SELECT * FROM tasks WHERE id NOT IN (SELECT parent_id FROM tasks)', function(err, rows){
        if(err){
            console.log(err);
            res.end(JSON.stringify(false));
        }else{
            var count = rows.length - 1;
            var choice = Math.floor(Math.random()*count);
            console.log(rows, count);
            res.end(JSON.stringify(rows[count]));
        }
    });
});

// -------- API Routing --------
app.get('/number', function(req, res){
    res.end(JSON.stringify({number: Math.random()*50}));
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