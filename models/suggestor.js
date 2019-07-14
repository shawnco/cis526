var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('lifeboard.sqlite3', function(err){
    if(err) console.log(err);
});

function suggest(req, res, next) {
    // First get all the leaf nodes, i.e. they're not a parent id.
    db.all('SELECT * FROM tasks WHERE id NOT IN (SELECT parent_id FROM tasks)', function(err, rows){
        if(err){
            console.log(err);
            res.end(JSON.stringify(false));
        }else{
            var count = rows.length - 1;
            var choice = Math.floor(Math.random()*count);
            res.end(JSON.stringify(rows[choice]));
        }
    });
}

router.get('/suggest', suggest);
module.exports = router;