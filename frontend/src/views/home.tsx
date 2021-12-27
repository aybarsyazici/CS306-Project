import { Container, Row, Col, Button } from "react-bootstrap";
import { NavigationBar } from "../components/navigationbar";
import { observer } from "mobx-react-lite";
import { Api } from "../environment";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Game } from "../types/game";
import { useState, memo, useEffect } from "react";
import "./home.scss";
import gameIcon from "../assets/gameicon.jpg";
import { useStore,} from "../stores/userStore";

const GameList = memo((props:{games: Game[]}) => {
  const user = useStore();
  return (
    <Row style={{ rowGap: "2em" }}>
      {props.games.map((game, index) => {
        return (
          <Col xs={12} md={6} lg={4} xl={3} key={index}>
            <Card sx={{ maxWidth: 345, height: 350 }}>
              <CardMedia
                component="img"
                height="140"
                image={gameIcon}
                alt="Game Icon"
                style={{ objectFit: "contain" }}
              />
              <CardContent style={{ height: 125 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {game.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {game.cost}$
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outline-success"
                  onClick={(e) => {
                     user.addToCart(game)
                  }}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
});

export const HomePage = () => {

  
  const [search, setSearch] = useState("");

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    if (search === "") {
      Api.get("/getallgames").then((response) => {
        setGames(response.data.data);
      });
    }
    else {
      Api.get('/searchgame?gameName='+search).then(e=>{
        setGames(e.data.data);
      })
    }
  }, [search]);

  return (
    <>
      <NavigationBar setSearchVar={setSearch}/>
      <Container style={{ marginTop: "2em" }}>
        <GameList games={games}/>
      </Container>
    </>
  );
};

export default(HomePage);
