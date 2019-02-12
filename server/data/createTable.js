const sqlite3 = require('sqlite3');

let db = new sqlite3.Database("./mydb.sqlite3", (err) => {
    if (err) {
        console.log('Error when creating the database', err)
    } else {
        console.log('Database created!')
        /* Put code to create table(s) here */
        createTable()
    }
})

const createTable = () => {
    console.log("create database table contacts");
    db.run("CREATE TABLE IF NOT EXISTS employeesDB(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,code TEXT,profession TEXT,  color TEXT,city TEXT,branch TEXT,assigned BOOLEAN)",  insertData);
}

const insertData = () =>{
    console.log("Insert data");
    db.all('SELECT * FROM employeesDB',(err,employees) => {
      if(employees.length==0){

          db.run('INSERT INTO employeesDB (name,code,profession,color,city,branch,assigned) VALUES (?,?,?,?,?,?,?)', ["Kyle Lowry","F100","Drywall Installer","#FF6600","Brampton","Abacus",true]);
          db.run('INSERT INTO employeesDB (name,code,profession,color,city,branch,assigned) VALUES (?,?,?,?,?,?,?)', ["DeMar DeRozan","F101","Drywall Installer","yellow","Brampton", "Pillsworth",false]);
          db.run('INSERT INTO employeesDB (name,code,profession,color,city,branch,assigned) VALUES (?,?,?,?,?,?,?)', ["Fred Van Vleet","F102","Drywall Installer","#FF6600","Bolton","Abacus",true]);
          db.run('INSERT INTO employeesDB (name,code,profession,color,city,branch,assigned) VALUES (?,?,?,?,?,?,?)', ["Jonas Valanciunas","F103","Drywall Installer","#FF6600","Bolton","Pillsworth",false]);
          db.run('INSERT INTO employeesDB (name,code,profession,color,city,branch,assigned) VALUES (?,?,?,?,?,?,?)', ["Chris Bosh","F104","Drywall Installer","#FF6600","Brampton","Abacus",true]);
          db.run('INSERT INTO employeesDB (name,code,profession,color,city,branch,assigned) VALUES (?,?,?,?,?,?,?)', ["Marcus Camby","F105","Runner","#FF6600","Brampton","Pillsworth",true]);
          db.run('INSERT INTO employeesDB (name,code,profession,color,city,branch,assigned) VALUES (?,?,?,?,?,?,?)', ["Vince Carter","F106","Half man, half amazing","#FF6600","Toronto","Abacus",false]);
          db.run('INSERT INTO employeesDB (name,code,profession,color,city,branch,assigned) VALUES (?,?,?,?,?,?,?)', ["Khawi Leonard","F107","The Klaw","#FF6600","Scarborough","Mornginside",false]);
          db.run('INSERT INTO employeesDB (name,code,profession,color,city,branch,assigned) VALUES (?,?,?,?,?,?,?)', ["Marc Gasol","F108","The Hail Mary","#FF6600","Toronto","lakeshore",true]);

        }
    });
}

db.close();
