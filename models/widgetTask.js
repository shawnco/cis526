var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('lifeboard.sqlite3', function(err){
    if(err) console.log(err);
});

function getWidgetTasks(req, res, next) {
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
}

function removeWidgetTasks(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('UPDATE widgets SET task_id = NULL WHERE id = ?', [post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
}

router.get('/widgetTask/:id', getWidgetTasks);
router.post('/widgetTask/remove', removeWidgetTasks);
module.exports = router;