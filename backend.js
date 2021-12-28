const bodyParser = require('body-parser')
const cors = require('cors');
const mysql = require('mysql');
const express = require('express');

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
        throw err.sqlMessage; //Error connection to db
    }
});

app.use(bodyParser.json());

app.listen(4000, ()=>{
    console.log("Listening on port 4000");
})
app.use(cors());



app.post('/addgame',jsonParser, (req,res)=>{

    connection.query("INSERT INTO GAMES(name,isDiscounted,releaseDate, discountRatio, genre, cost) VALUES(" + "'" + 
    req.body.name + "'" + "," + 
    (req.body.isDiscounted ? 1 : 0) + ",'" + req.body.releaseDate + "'," + req.body.discountRatio+ "," + "'" + req.body.genre + "'," + req.body.cost + ")", 
    (err,results) =>{
        if(err){
            console.log(err?.sqlMessage);
            return res.send(400);
        }
        
        return res.send(200);
    })
})

app.get('/getallgames', (req,res) => {
    connection.query('SELECT * FROM GAMES', (err, results)=>{

        if(err){
            console.log(err?.sqlMessage);
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
            console.log(err?.sqlMessage);
            return res.send(400);
        }

        return res.send(200);
    });
})

app.get('/searchgame', (req,res)=>{

    connection.query("SELECT * FROM GAMES WHERE name LIKE '%" + req.query.gameName + "%'", (err,results)=>{
        if(err){
            console.log(err?.sqlMessage);
            return res.send(400);
        }

        return res.json({
            data: results
        })
    })
})

/* USER STUFF */

app.post('/adduser',jsonParser, (req,res)=>{
    console.log(req.body);

    connection.query("INSERT INTO USERS(email,username,password) VALUES(" + "'" + 
    req.body.email + "'" + "," + "'" + req.body.username + "'," + "'" +  req.body.password + "'" + ")", 
    (err,results) =>{
        if(err){
            console.log(err?.sqlMessage);
            return res.send(400);
        }
        
        return res.send(200);
    })
})

app.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    connection.query(`SELECT * FROM USERS WHERE EMAIL="${email}" and password="${password}"`, (err, results) => {
        if (err) {
            console.log(err?.sqlMessage);
            return res.send(400);
        }

        if (results === []) {
            res.send(404);
        }
        else {
            return res.json({
                data: results
            })
        }
    })

})

app.get('/searchuser', (req,res)=>{

    connection.query("SELECT * FROM USERS WHERE username LIKE '%" + req.query.username + "%'", (err,results)=>{
        if(err){
            console.log(err);
            return res.send(400);
        }

        return res.json({
            data: results
        })
    })
})

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

app.post('/deleteuser',jsonParser, (req,res) =>{
    console.log(req.body);

    connection.query("DELETE FROM USERS WHERE userId="+req.body.userid, (err,results)=>{
        if(err){
            console.log(err)
            return res.send(400);
        }

        return res.send(200);
    });
})

app.post('/buygame', (req,res)=>{

    let totalCost = 0
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const userId = req.body.user['userid'];

    const gameList = [...req.body.games];


    gameList.forEach(game => {

        totalCost += game['cost']

        let query = "INSERT INTO UserOwnsGame(gameid,userid,since,playTime) VALUES ("+game["gameid"] +"," + 
        userId + "," + "'"  + date  + "',0)"

        connection.query(query, (err,results)=>{
            if(err){
                console.log(err.sqlMessage);
                return res.status(400).send(err.sqlMessage);
            }
        });

        let query2 = "DELETE FROM USERWISHESGAME WHERE gameId="+ game['gameid'] + " AND userid="+userId

        connection.query(query2, (err,results)=>{
            if(err){
                console.log(err.sqlMessage);
                return res.status(400).send(err.sqlMessage);
            }
        })
    });


    const invoicesQuery = "INSERT INTO INVOICES(userId, totalCost, invoiceDate) VALUES(" + userId + "," + totalCost + "," + 
    "'" + date + "')"

    connection.query(invoicesQuery, (err,results)=>{
        if(err){
            console.log(err.sqlMessage);
            return res.status(400).send(err.sqlMessage);
        }

        console.log(results);
        const insertedId = results.insertId;

        req.body.games.forEach(game => {

            const invoicesGamesQuery = "INSERT INTO InvoicesGames(invoiceId, gameId) VALUES(" + insertedId + "," + game["gameid"] + ")"
    
            console.log(invoicesGamesQuery);
    
            connection.query(invoicesGamesQuery, (err, results)=>{
                if(err){
                    console.log(err.sqlMessage);
                    return res.status(400).send(err.sqlMessage);
                }
            })
        })
    })

    res.send(200);
})


app.get('/getInvoices', ((req,res) => {

    console.log(typeof req.query.userId)
    connection.query("SELECT * FROM INVOICES WHERE userId=" + req.query.userId, (err,results)=>{
        if(err){
            console.log(err?.sqlMessage);
            return res.send(400);
        }

        return res.json({
            data: results
        })
    })
}))

app.post('/getUnownedGames', (req, res)=>{
    const userId = req.body.userId;

    const query = "SELECT * " +
    "FROM GAMES " +
    "WHERE gameId NOT IN "+
    `(SELECT gameId FROM UserOwnsGame WHERE userId=${userId})`;

    connection.query(query, (err,results)=>{
        if(err){
            console.log(err.sqlMessage);
            return res.status(400).send(err.sqlMessage);
        }

        return res.json({
            data: results
        })
    })
})

app.post('/searchUnownedGames', (req,res)=>{

    const userId = req.body.userId;

    const query = "SELECT * " +
    "FROM GAMES " +
    "WHERE gameId NOT IN "+
    `(SELECT gameId FROM UserOwnsGame WHERE userId=${userId}) and name LIKE "%${req.body.gameName}%"`;

    connection.query(query, (err,results)=>{
        if(err){
            console.log(err.sqlMessage);
            return res.status(400).send(err.sqlMessage);
        }

        return res.json({
            data: results
        })
    })
})

app.post('/getOwnedGames', (req, res) => {
    
    const userId = req.body.userId;

    console.log(req.body);

    const query = `SELECT * FROM Games WHERE Games.gameId IN(SELECT gameid FROM UserOwnsGame WHERE UserOwnsGame.userid=${userId})`;

    connection.query(query, (err, results) => {

        if (err) {
            console.log(err.sqlMessage);
            return res.status(400).send(err.sqlMessage);
        }


        return res.json({
            data: results
        })
    })
    
})

app.post("/getInvoiceGames", (req, res) => {
    
    const invoiceId = req.body.invoiceId;

    const query = `SELECT * FROM Games Where Games.gameId IN (SELECT gameId FROM invoicesgames WHERE invoicesGames.invoiceId=${invoiceId})`;

    connection.query(query, (err, results) => {
        if (err) {
            console.log(err.sqlMessage);
            return res.status(400).send(err.sqlMessage);
        }


        return res.json({
            data: results
        })
    })

})
