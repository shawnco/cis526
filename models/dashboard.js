var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('lifeboard.sqlite3', function(err){
    if(err) console.log(err);
});

function listDashboards(req, res, next) {
    db.all('SELECT * FROM dashboards', function(err, rows){
        if(err) return console.log(err);
        res.end(JSON.stringify(rows));
    });    
}

function getDashboard(req, res, next) {
    db.get('SELECT * FROM dashboards WHERE id = ?', [req.params.id], function(err, row){
        if(err) return console.log(err);
        res.end(JSON.stringify(row));
    });
}

function updateDashboard(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('UPDATE dashboards SET name = ? WHERE id = ?', [post.name, post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
}

function addDashboard(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('INSERT INTO dashboards (name) VALUES (?)', [post.name], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        });
    });
}

function deleteDashboard(req, res, next) {
    var body = '';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = JSON.parse(body);
        db.run('DELETE FROM dashboards WHERE id = ?', [post.id], function(err){
            if(err){
                console.log(err);
                res.end(JSON.stringify(false));
            }else{
                res.end(JSON.stringify(true));
            }
        })
    })
}

router.get('/dashboards/list', listDashboards);
router.get('/dashboards/get/:id', getDashboard);
router.post('/dashboard/update', updateDashboard);
router.post('/dashboard/add', addDashboard);
router.post('/dashboard/delete', deleteDashboard);
module.exports = router;