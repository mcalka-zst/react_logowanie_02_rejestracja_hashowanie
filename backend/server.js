const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "logowanie_02_react",
});
//-----------------------------------------------------------------------------
app.post("/login", (req, res) => {
  const sql = "SELECT user, hashedPass, name, surname FROM data WHERE user=?";
  db.query(sql, [req.body.user], (err, data) => {
    if (err) return res.json({ success: false, message: "Błąd logowania" });
    if (data.length > 0) {
      console.log(data);
      console.log(req.body.password);
      console.log(data[0].hashedPass);
      bcrypt.compare(req.body.password, data[0].hashedPass, (err, result) => {
        if (err) {
            // console.error('Błąd porównywania haseł:', err);
            return res.json({ success: false, message: "Błąd porównywania haseł" });
        }
        if (result)
          return res.json({
            success: true,
            name: data[0].name,
            surname: data[0].surname,
          });
        else return res.json({ success: false, message: "Błędne hasło!" });
      });
    } else return res.json({ success: false, message: "Błędny login!" });
  });
});
//-------------------------------------------------------------------
app.post("/register", (req, res) => {
  let sql = "SELECT user FROM data WHERE user=?";
  db.query(sql, [req.body.user], (err, data) => {
    if (err) return res.json({ success: false, message: "Wystapił błąd" });
    if (data.length > 0)
      return res.json({
        success: false,
        message: "Taki użytkownik już istnieje!",
      });
    else {
      sql =
        "INSERT INTO data (user, hashedPass, name, surname) VALUES (?, ?, ?, ?)";
      db.query(
        sql,
        [req.body.user, req.body.hashedPass, req.body.name, req.body.surname],
        (err) => {
          if (err)
            return res.json({ success: false, message: "Wystapił błąd" });
          else
            return res.json({
              success: true,
              message: "Rejestracja powiodła się",
            });
        }
      );
    }
  });
});

app.listen(8081, () => {
  console.log("Nasłuchuję na porcie 8081...");
});
