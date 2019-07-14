var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('lifeboard.sqlite3', function(err){
    if(err) console.log(err);
});

function listWidgets(req, res, next) {
    db.all('SELECT * FROM widgets WHERE dashboard_id = ?', [req.params.id], function(err, rows){
        if(err) return console.log(err);
        res.end(JSON.stringify(rows));
    });
}

function addWidget(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('INSERT INTO widgets (title, dashboard_id, content, refresh_rate, task_id, api) VALUES (?, ?, ?, ?, ?, ?)', [post.title, post.dashboard_id, post.content, post.refresh_rate, post.task_id, post.api], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
}

function updateWidget(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('UPDATE widgets SET title = ?, dashboard_id = ? , content = ?, refresh_rate = ?, task_id = ?, api = ? WHERE id = ?', [post.title, post.dashboard_id, post.content, post.refresh_rate, post.task_id, post.api, post.id], function(err, row){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
}

function deleteWidget(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('DELETE FROM widgets WHERE id = ?', [post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        })
    });
}

router.get('/widgets/get/:id', listWidgets);
router.post('/widget/add', addWidget);
router.post('/widget/update', updateWidget);
router.post('/widget/remove', deleteWidget);
module.exports = router;