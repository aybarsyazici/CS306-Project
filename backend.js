const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cs306'
});

connection.connect(err => {
    if(err){
        return err;
    }
});

app.listen(4000, ()=>{
    console.log("Listening on port 4000");
})
app.use(cors());

app.get('/getallusers', (req,res) => {
    connection.query('SELECT * FROM USERS', (err, results)=>{

        if(err){
            console.log(err);
            return;
        }
        
        return res.json({
            data: results
        })
    });
});
