
import { Api } from './environment';
import { useState, useEffect } from 'react';
import {TextField, FormGroup, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import './styles/games.scss';
import { LoadingButton } from '@mui/lab';
import { User } from './types/user';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function Users() {

  const [userArray, setUserArray] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState("");

  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const onSubmit = (data:any) => {
    setLoading(true);
    Api.post('/adduser', data).then((e)=>{
      Api.get('/getallusers').then((e)=>{setUserArray(e.data.data)});
    }).catch(err=>console.log(err));
    setLoading(false);
  }

  const deleteUser = (userid:any)=>{
    Api.post('/deleteuser', {userid}).then((e)=>{
      Api.get('/getallUsers').then((e)=>{setUserArray(e.data.data)});
    }).catch((err)=>{console.log(err)});
  }

  useEffect(() => {
    Api.get('/getallusers').then((e)=>{setUserArray(e.data.data)});
  }, []);

  useEffect(() => {

    if(userSearch === ""){
      Api.get('/getallusers').then((e)=>{setUserArray(e.data.data)});
    }
    else{
      Api.get('/searchUser?username='+userSearch).then(e=>{
          console.log(e.data.data)
        setUserArray(e.data.data);
      })
    }

  }, [userSearch]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          id="outlined-required"
          label="User name"
          defaultValue=""
          {...register("username")}
        />
        <TextField
          required
          id="outlined-required"
          label="email"
          type="email"
          defaultValue=""
          {...register("email")}
        />
        <TextField
          required
          id="outlined-required"
          label="password"
          defaultValue=""
          type="password"
          {...register("password")}
        />
        <FormGroup>
        {loading ? <LoadingButton loading variant="outlined" color="primary">
        Loading
      </LoadingButton> : <Button color="primary" variant="outlined" type="submit" style={{width:"200px"}}>Add User</Button>}
        </FormGroup>

    </form>
    <div className="search">
    <TextField label="Search a username" color="warning" focused value={userSearch} onChange={(e)=>setUserSearch(e.target.value)} />
    </div>
    <div className="userTable">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Id</TableCell>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userArray ? (userArray.map((user) => (
            <TableRow
              key={user.userid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={(e)=>{
                navigate('/invoices?userId='+user.userid);
              }}
            >
              <TableCell component="th" scope="row">
                {user.userid}
              </TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                <DeleteIcon className="deleteIcon"
                  onClick={(e)=>{deleteUser(user.userid);}}
                />
              </TableCell>
            </TableRow>
          ))) : null}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    {userArray && userArray.length > 0 ? null : <Alert severity="error">No user found</Alert>}
    </div>
  );
}

export default Users;
