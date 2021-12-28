
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import NavigationBar from "../components/navigationbar";
import { useStore } from "../stores/userStore";
import Paper from "@mui/material/Paper";
import { Api } from "../environment";
import { useEffect, useState } from "react";
import { Game } from "../types/game";
 
const MyGames = observer(() => {

    const userStore = useStore();

    const [gameList, setGameList] = useState<Game[]>([]);

    useEffect(() => {
        Api.post('/getOwnedGames', { userId: userStore.userid }).then((e) => {
            setGameList(e.data.data);
        });
    },[])

    return (
        <>
  <NavigationBar />
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Game Name</TableCell>
                <TableCell align="right">Genre</TableCell>
                <TableCell align="right">Release Date</TableCell>
                <TableCell align="right">Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gameList.map((game) => (
                <TableRow
                  key={game.gameid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {game.name}
                  </TableCell>
                  <TableCell align="right">{game.genre}</TableCell>
                  <TableCell align="right">
                    {game.releaseDate.toString().substring(0, 10)}
                  </TableCell>
                  <TableCell align="right">{game.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
                </TableContainer>
        </Container>        
        </>
    )
})
 
export default MyGames;