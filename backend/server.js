const  express = require('express');
const mysql  = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'logowanie_02_react'
})

app.post('/login', (req, res) =>{
    const sql = 'SELECT name, surname FROM data WHERE user=? AND password=?';
   
    db.query(sql, [req.body.user, req.body.password ], (err, data) =>{
        if(err) return res.json({success:false, message:'Błąd logowania'});            
        if(data.length>0) return res.json({success:true,data:data});
        else return res.json({success:false, message:'Błędny login lub hasło'})
    })

});

app.post('/register', (req, res)=>{
    let sql = "INSERT INTO data (user, hashedPass, name, surname) VALUES (?, ?, ?, ?)";
    db.query(sql, [req.body.user, req.body.hashedPass, req.body.name, req.body.surname], (err) =>{
        if(err) return res.json({success:false, message:'Wystapił błąd'}); 
        else return res.json({success:true, message:'Rejestracja powiodła się'}); 
    })

});

app.listen(8081, () => {
    console.log('Nasłuchuję na porcie 8081...');
});

