var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('lifeboard.sqlite3', function(err){
    if(err) console.log(err);
});

function addNotification(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('INSERT INTO notifications (widget_id, type, threshold) VALUES (?, ?, ?)', [post.widget_id, post.type, post.threshold], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
}

function removeNotification(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('DELETE FROM notifications WHERE id = ?', [post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
}

function updateNotification(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('UPDATE notifications SET widget_id = ?, type = ?, threshold = ? WHERE id = ?', [post.widget_id, post.type, post.threshold, post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
}

function getNotification(req, res, next) {
    db.all('SELECT * FROM notifications WHERE widget_id = ?', [req.params.id], function(err, rows){
        if(err){
            console.log(err);
            res.end(JSON.stringify(false));
        }else{
            res.end(JSON.stringify(rows));
        }
    });
}

router.post('/notification/add', addNotification);
router.post('/notification/remove', removeNotification);
router.post('/notification/update', updateNotification);
router.get('/notifications/:id', getNotification);
module.exports = router;