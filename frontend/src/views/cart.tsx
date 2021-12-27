import { observer } from "mobx-react-lite";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import NavigationBar from "../components/navigationbar";
import { useStore } from "../stores/userStore";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Alert } from "@mui/material";
import { Api } from "../environment";
import {User} from '../types/user'
import { useEffect, useState } from "react";

interface CartPageProps {}

const CartPage = observer(() => {
  const userStore = useStore();
  const [err, seterr] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const castedUser = {
    userid: userStore.userid,
    email: userStore.email,
    username: userStore.username,
    password: "",
  } as User;

  useEffect(() => {
    console.log(castedUser)
  }, [castedUser])

  const buyGame = () => {
    Api.post("/buygame", { user: castedUser, games: userStore.gameList })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        seterr("Some error occured..." + e);
      });
  };

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
                <TableCell align="right">DiscountRatio</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userStore.gameList.map((game) => (
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
                  <TableCell align="right">{game.discountRatio}</TableCell>
                  <TableCell align="right">
                    <DeleteIcon
                      className="deleteIcon"
                      onClick={(e) => {
                        userStore.removeFromCart(game);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Row style={{ justifyContent: "flex-end" }}>
          <Button
            variant="success"
            style={{ width: "120px", marginTop: "1em" }}
          >
            BUY GAME
          </Button>
        </Row>
        {err !== "" && (
          <div>
            <Alert severity="error">{err}</Alert>
          </div>
        )}
      </Container>
    </>
  );
});

export default CartPage;
