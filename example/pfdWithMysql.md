## Generate PDF using Mysql Database

#### Students table

| student_id | first_name | last_name | age | address  |
| :--------- | :--------- | :-------- | :-- | :------- |
| 1          | Jhon       | Doe       | 20  | London   |
| 2          | Chuck      | Noris     | 24  | New york |
| 3          | Mike       | Roy       | 21  | Mumbai   |

## Package used

express, mysql, pdf-master

```js
const express = require("express");
const mysql = require("mysql");
const pdfMaster = require("pdf-master");
const app = express();
const port = 3000;

//DB connection details
let connection = mysql.createConnection({
  host: localhost,
  database: testDB,
  user: root,
  password: root
});

// data object passing to html(.hbs) template
let data = {};

//Get data of students from DB
async function getStudentData() {
  let sqlquery = `SELECT * FROM Students WHERE student_id = 1`;
  return new Promise((resolve, reject) => {
    connection.query(sqlquery, (err, result) => {
      if (err) {
        reject(err);
      }
      let StudentData = {
        student: {
          firstName: result[0].first_name,
          lastName: result[0].last_name,
          age: result[0].age,
          address: result[0].address
        }
      };
      resolve(StudentData);
    });
  });
}

//call getStudentData
async function getData() {
  const studentData = await getStudentData();
  return new Promise((resolve, reject) => {
    data = {
      ...studentData
    };
    resolve(data);
  });
}

app.get("", async (req, res) => {
  getData().then(async (data) => {
    let PDF = await pdfMaster.generatePdf("template.hbs", data);
    res.contentType("application/pdf");
    res.status(200).send(PDF);
  });
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}!`);
  connection.connect((err) => {
    if (!err) {
      console.log("DB Connected successfully");
    } else {
      console.log(err);
    }
  });
});
```

#### template.hbs

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <h1>Student</h1>
    <ul>
      <li>First Name: {{student.firstName}}</li>
      <li>Last Name: {{student.lastName}}</li>
      <li>Age: {{student.age}}</li>
      <li>Address: {{student.address}}</li>
      <br />
    </ul>
  </body>
</html>
```
