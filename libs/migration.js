'use strict';

module.exports = function(db) {
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS dashboards ( id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) )");
    db.run("CREATE TABLE IF NOT EXISTS widgets (id INTEGER PRIMARY KEY AUTOINCREMENT, dashboard_id INT, title VARCHAR(100), content VARCHAR(225), task_id INT, api VARCHAR(255), refresh_rate INT) ");
    db.run("CREATE TABLE IF NOT EXISTS tasks ( id INTEGER PRIMARY KEY AUTOINCREMENT, parent_id INT, text VARCHAR(255), due_date DATE, difficulty INT) ");
  });
}