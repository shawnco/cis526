var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('lifeboard.sqlite3', function(err){
    if(err) console.log(err);
});

function addTask(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('INSERT INTO tasks (parent_id, text, due_date, difficulty, completed) VALUES (?, ?, ?, ?, ?)', [post.parent_id, post.text, post.due_date, post.difficulty, 0], function(err, row){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                var id = this.lastID;
                if(post.widget_id){
                    db.run('UPDATE widgets SET task_id = ? WHERE id = ?', [this.lastID, post.widget_id], function(err){
                        if(err){
                            console.log(err);
                            res.end(JSON.stringify(false));
                        }
                    })
                }
                res.end(JSON.stringify(true));
            }
        });
    });
}

function getTask(req, res, next) {
    db.all('SELECT * FROM tasks WHERE id = ?', [req.params.id], function(err, row){
        if(err){
            console.log(err);
            res.end(JSON.stringify(false));
        }else{
            res.end(row);
        }
    });
}

function updateTask(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('UPDATE tasks SET parent_id = ?, text = ?, due_date = ?, difficulty = ? WHERE id = ?', [post.parent_id, post.text, post.due_date, post.difficulty, post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
}

function deleteTask(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('DELETE FROM tasks WHERE id = ?', [post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
}

function getTaskChildren(req, res, next) {
    db.all('SELECT * FROM tasks WHERE parent_id = ?', [req.params.id], function(err, rows){
        if(err){
            console.log(err);
            res.end(JSON.stringify(false));
        }else{
            res.end(JSON.stringify(rows));
        }
    });
}

function toggleTask(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('UPDATE tasks SET completed = ? WHERE id = ?', [post.completed, post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
}

router.post('/task/add', addTask);
router.get('/task/:id', getTask);
router.post('/task/update', updateTask);
router.post('/task/delete/:id', deleteTask);
router.get('/task/children/:id', getTaskChildren);
router.post('/task/toggle', toggleTask);
module.exports = router;