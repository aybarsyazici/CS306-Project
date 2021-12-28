import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { User } from './types/user';
import { Api } from './environment';
import './styles/buygame.scss'
import { Game } from './types/game';
import { Alert, TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import { CheckCircleOutline } from '@mui/icons-material';
import { AdminNavBar } from './components/adminNavbar'
  
export function BuyGame() {

    const [state, setState] = useState(1);
    const [userArray, setUserArray] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [gameArray, setGameArray] = useState<Game[]>([]);
    const [search, setsearch] = useState("");
    const [selectedGames, setSelectedGames] = useState<Game[]>([]);
    const [err, seterr] = useState("")


    const buyGame = () =>{

        seterr("");

        console.log(selectedUser);
        console.log(selectedGames);
        

        if(!selectedGames || selectedGames?.length === 0){
            seterr("Please select games to buy.");
        }

        Api.post('/buygame', {user: selectedUser, games: selectedGames}).then(e=>{
            console.log(e);
            setState(3);
        }).catch(e=>{
            seterr("Some error occured..." + e);
        })
        
    }

    const wishGame = () =>{

        seterr("");

        console.log(selectedUser);
        console.log(selectedGames);

        if(selectedGames?.length === 0){
            seterr("Please select games to wish.");
        }
    }


    useEffect(()=>{
        if(state === 1)
            Api.get('/getallusers').then((e)=>{setUserArray(e.data.data)})
        else if(state === 2 )
            Api.post('/getUnownedGames', {userId: selectedUser?.userid}).then((e)=>{setGameArray(e.data.data)})
    },[state])

    useEffect(() => {
        switch (state) {
            case 1:{
                if(search === ""){
                    Api.get('/getallusers').then((e)=>{setUserArray(e.data.data)});
                  }
                  else{
                    Api.get('/searchUser?username='+search).then(e=>{
                        console.log(e.data.data)
                      setUserArray(e.data.data);
                    })
                  }
                break;
            }
            case 2:{
                if(search === ""){
                    Api.get('/getallgames').then((e)=>{setGameArray(e.data.data)});
                }
                else{
                    Api.get('/searchgame?gameName='+search).then(e=>{
                    setGameArray(e.data.data);
                    })
                }
                break;
            }
            default:
                break;
        }
    }, [search])

    return (
        <>
        <AdminNavBar/>
        <div className="buygame">
        <TextField label="Search" color="warning" focused value={search} onChange={(e)=>setsearch(e.target.value)} />
        { state === 1 && (
            <div className="buygame__state1">
                <Alert severity="info">Please choose a user</Alert>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>User Id</TableCell>
                    <TableCell align="right">User Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userArray ? (userArray.map((user) => (
                    <TableRow
                        key={user.userid}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        onClick={(e)=>{
                            setSelectedUser(user);
                            setsearch("");
                            setState(2);
                        }}
                    >
                        <TableCell component="th" scope="row">
                        {user.userid}
                        </TableCell>
                        <TableCell align="right">{user.username}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                    </TableRow>
                    ))) : null}
                </TableBody>
                </Table>
            </TableContainer>
          </div>
        )}
        { state === 2 && (
        <div className="buygame__state2">
            <Alert severity="info">Please choose game(s) you want to buy/wish</Alert>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Game Name</TableCell>
                        <TableCell align="right">Genre</TableCell>
                        <TableCell align="right">Release Date</TableCell>
                        <TableCell align="right">Cost</TableCell>
                        <TableCell align="right">DiscountRatio</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {gameArray ? (gameArray.map((game) => (
                        <TableRow
                        key={game.gameid}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        className="gameRow"
                        onClick={(e)=>{
                            if(!e.currentTarget.classList.contains("gameRow--selected")){
                                e.currentTarget.classList.add("gameRow--selected");
                                const newSelectedGames = selectedGames;
                                newSelectedGames?.push(game)
                                setSelectedGames(newSelectedGames)
                            }
                            else{
                                e.currentTarget.classList.remove("gameRow--selected");
                                const newSelectedGames = selectedGames?.filter(item=> item !== game);
                                setSelectedGames(newSelectedGames);
                            }
                        }}
                        >
                        <TableCell component="th" scope="row">
                            {game.name}
                        </TableCell>
                        <TableCell align="right">{game.genre}</TableCell>
                        <TableCell align="right">{game.releaseDate.toString().substring(0,10)}</TableCell>
                        <TableCell align="right">{game.cost}</TableCell>
                        <TableCell align="right">{game.discountRatio}</TableCell>
                        </TableRow>
                    ))) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            {err !== "" && <div className="buygame__state2__err">
                <Alert severity="error">{err}</Alert>
            </div>}
            <div className="buygame__state2__buttons">
                <Button color="primary" variant="outlined" onClick={()=>buyGame()}>Buy</Button>
                <Button color="secondary" variant="outlined" onClick={()=>wishGame()}>Wish</Button>
            </div>
        </div>
        )}
        { state === 3 && (
            <Alert
                iconMapping={{
                success: <CheckCircleOutline fontSize="inherit" />,
                }}
            >
                Order successfull!
            </Alert>
        )}
            </div>
            </>
    );
}
  
export default BuyGame;
  