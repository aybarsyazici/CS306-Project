
import { Api } from './environment';
import { useState, useEffect } from 'react';
import { User } from './types/user';
import {TextField, Checkbox, FormGroup, FormControlLabel, Alert } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { Button, Slider } from '@material-ui/core';
import './styles/games.scss';
import { LoadingButton } from '@mui/lab';
import { Game } from './types/game';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Search } from '@mui/icons-material';

function Games() {

  const [gameArray, setGameArray] = useState<Game[]>([]);
  const [gameSearch, setGameSearch] = useState("");


  const [date, setDate] = useState(dayjs());
  const { register, handleSubmit } = useForm();
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discountRatio, setDiscountRatio] = useState(0)

  const onSubmit = (data:any) => {
    setLoading(true);
    var newDate = date.format('YYYY-MM-DD')
    Api.post('/addgame', {...data, isDiscounted: isDiscounted, releaseDate: newDate, discountRatio: (isDiscounted ? discountRatio : 0)}).then((e)=>{
      Api.get('/getallgames').then((e)=>{setGameArray(e.data.data)});
    }).catch(err=>console.log(err));
    setLoading(false);
  }


  const handleChange = (newValue: any) => {
    setDate(newValue);
  };

  const handleCheckbox = (newValue: React.ChangeEvent<HTMLInputElement>) => {
    setIsDiscounted(!isDiscounted);
  }

  const handleSlider = (event:any, newValue:any) => {
    setDiscountRatio(newValue);
  };

  const deleteGame = (gameId:any)=>{
    Api.post('/deletegame', {gameId}).then((e)=>{
      Api.get('/getallgames').then((e)=>{setGameArray(e.data.data)});
    }).catch((err)=>{console.log(err)});
  }

  useEffect(() => {
    Api.get('/getallgames').then((e)=>{setGameArray(e.data.data)});
  }, []);

  useEffect(() => {

    if(gameSearch === ""){
      Api.get('/getallgames').then((e)=>{setGameArray(e.data.data)});
    }
    else{
      Api.get('/searchgame?gameName='+gameSearch).then(e=>{
        setGameArray(e.data.data);
      })
    }

  }, [gameSearch]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          id="outlined-required"
          label="Game name"
          defaultValue=""
          {...register("name")}
        />
        <TextField
          required
          id="outlined-required"
          label="Cost"
          type="number"
          defaultValue="0"
          {...register("cost")}
        />
        <TextField
          required
          id="outlined-required"
          label="Genre"
          defaultValue="0"
          {...register("genre")}
        />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            label="Release Date"
            inputFormat="DD/MM/YYYY"
            value={date}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <FormGroup>
        <FormControlLabel control={<Checkbox value={isDiscounted} onChange={handleCheckbox}/>} label="Discount?" />
        {isDiscounted ? 
        <Slider
        aria-label="Discount Ratio"
        defaultValue={30}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={100}
        value={discountRatio}
        onChange={handleSlider}
      />  : null
      }
        </FormGroup>

      {loading ? <LoadingButton loading variant="outlined" color="primary">
        Loading
      </LoadingButton> : <Button color="primary" variant="outlined" type="submit">Add Game</Button>}
    </form>
    <div className="search">
    <TextField label="Search a game" color="warning" focused value={gameSearch} onChange={(e)=>setGameSearch(e.target.value)} />
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Game Name</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Release Date</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">DiscountRatio</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gameArray ? (gameArray.map((game) => (
            <TableRow
              key={game.gameid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {game.name}
              </TableCell>
              <TableCell align="right">{game.genre}</TableCell>
              <TableCell align="right">{game.releaseDate.toString().substring(0,10)}</TableCell>
              <TableCell align="right">{game.cost}</TableCell>
              <TableCell align="right">{game.discountRatio}</TableCell>
              <TableCell align="right">
                <DeleteIcon className="deleteIcon"
                  onClick={(e)=>{deleteGame(game.gameid);}}
                />
              </TableCell>
            </TableRow>
          ))) : null}
        </TableBody>
      </Table>
    </TableContainer>
    {gameArray && gameArray.length > 0 ? null : <Alert severity="error">No game found</Alert>}
    </div>
  );
}

export default Games;
