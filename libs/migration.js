'use strict';

module.exports = function(db) {
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS dashboards ( id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) )");
    db.run("CREATE TABLE IF NOT EXISTS widgets (id INTEGER PRIMARY KEY AUTOINCREMENT, dashboard_id INTEGER, title VARCHAR(100), content VARCHAR(225), task_id INTEGER, api VARCHAR(255), refresh_rate INTEGER) ");
    db.run("CREATE TABLE IF NOT EXISTS tasks ( id INTEGER PRIMARY KEY AUTOINCREMENT, parent_id INTEGER, text VARCHAR(255), due_date DATE, difficulty INTEGER, completed INTEGER) ");
    db.run("CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, widget_id INTEGER, type VARCHAR(10), threshold INTEGER)");
  });
}