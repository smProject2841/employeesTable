const express = require('express')
const cors = require('cors')
const app = express()
// const employees = require('./data/employees.json');
const createInsertDB = require('./data/createTable'); //intial creates table and insert default data, insert data only when the table is empty and created
const sqlite3_DB = require('sqlite3').verbose();
let employeesDB = new sqlite3_DB.Database("./mydb.sqlite3");
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


var corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 200
}

app.all('/api/*', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();

});

app.get('/api/employees', cors(corsOptions), (req, res, next) => {
  employeesDB.all('SELECT * FROM employeesDB',(err,employees) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.json(employees);
    });
});
//maxID is not been used anymore
app.get('/api/maxID', cors(corsOptions), (req, res, next) => {
  employeesDB.all('SELECT MAX(id) as id FROM employeesDB',(err,id) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.json(id);
    });
});

app.post('/api/employees', cors(), (req, res, next) => {
  employeesDB.run(`INSERT INTO employeesDB (name, code, profession, color, city, branch, assigned)
  VALUES (?,?,?,?,?,?,?)`,['','','','','','',''],(err,result) => {
    if (err!==null){
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.json({text: 'fail'});
    }else{
      employeesDB.all('SELECT MAX(id) as id FROM employeesDB',(err,id) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200);
          res.json(id);
        });
    }


    // if (err){
    //   res.setHeader('Content-Type', 'application/json');
    //   res.status(200);
    //   res.json({text: 'fail'});
    // }else{
    //   conosle.log(this.lastID);
    //   res.setHeader('Content-Type', 'application/json');
    //   res.status(200);
    //   res.json({text: 'success', id: this.lastID});
    // }
    });
});


app.put('/api/employees/:id',cors(corsOptions), (req, res,next) => {

  updateColumnName= Object.keys(req.body)[0];
  employeesDB.run(`UPDATE employeesDB SET ${updateColumnName} = ? WHERE id = ?`, [req.body[updateColumnName], req.params.id],(err,employees) => {
    if (err){
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.json({text: 'fail'});
    }else{
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.json({text: 'success', id: req.params.id});
    }
    });
});

app.delete('/api/employees/:id',cors(corsOptions), (req, res,next) => {

  employeesDB.run(`DELETE FROM employeesDB WHERE id = ?`, [req.params.id],(err,employees) => {
    if (err){
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.json({text: 'fail'});
    }else{
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.json({text: 'success', id: req.params.id});
    }
    });
});

app.delete('/api/employees/:id',cors(corsOptions), (req, res,next) => {

  employeesDB.run(`DELETE FROM employeesDB WHERE id = ?`, [req.params.id],(err,employees) => {
    if (err){
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.json({text: 'fail'});
    }else{
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.json({text: 'success', id: req.params.id});
    }
    });
});

app.listen(8080, () => console.log('Job Dispatch API running on port 8080!'))
