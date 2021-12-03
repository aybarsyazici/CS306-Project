const express = require('express');
var bodyParser = require('body-parser')
const cors = require('cors');
const mysql = require('mysql');

const app = express();
var jsonParser = bodyParser.json()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cs306'
});

connection.connect(err => {
    if(err){
        throw err; //Error connection to db
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

app.post('/addgame',jsonParser, (req,res)=>{
    console.log(req.body);

    connection.query("INSERT INTO GAMES(name,isDiscounted,releaseDate, discountRatio, genre, cost) VALUES(" + "'" + 
    req.body.name + "'" + "," + 
    (req.body.isDiscounted ? 1 : 0) + ",'" + req.body.releaseDate + "'," + req.body.discountRatio+ "," + "'" + req.body.genre + "'," + req.body.cost + ")", 
    (err,results) =>{
        if(err){
            console.log(err);
            return res.send(400);
        }
        
        return res.send(200);
    })
})

app.get('/getallgames', (req,res) => {
    connection.query('SELECT * FROM GAMES', (err, results)=>{

        if(err){
            console.log(err);
            return;
        }
        
        return res.json({
            data: results
        })
    });
})


app.post('/deletegame',jsonParser, (req,res) =>{
    console.log(req.body);

    connection.query("DELETE FROM GAMES WHERE gameId="+req.body.gameId, (err,results)=>{
        if(err){
            console.log(err)
            return res.send(400);
        }

        return res.send(200);
    });
})


app.get('/searchgame', (req, res)=>{

    connection.query("SELECT * FROM GAMES WHERE name LIKE '%" + req.query.gameName + "%'", (err,results)=>{
        if(err){
            console.log(err);
            return res.send(400);
        }

        return res.json({
            data: results
        })
    })
})