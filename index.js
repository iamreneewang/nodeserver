const express = require("express");
const app = express();
var path    = require("path");
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//這一段是給前端
app.use(express.static(path.join(__dirname, 'views')));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', function(req, res){
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', function(req, res){
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/test', function(req, res){
  res.sendFile(path.join(__dirname, 'views', 'test.html'));
});
//這一段是給前端

const db = mysql.createConnection({
  // user: "root",
  // host: "localhost",
  // password: "1207",
  // port:"3307",
  // database: "cv",
  user: "renee2023",
  host: "db4free.net",
  password: "reneewang2023",
  port:"3306",
  database: "renee2023",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL successfully!");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred");
      } else if (result.length > 0) {
        res.send("Login successful");
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
  );
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (email, password) VALUES (?,?)",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/testtest", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
