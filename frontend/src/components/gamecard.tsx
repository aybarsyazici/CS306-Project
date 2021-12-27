import { FunctionComponent } from "react";
import { Button, Card } from "react-bootstrap";

interface GameCardProps {
    gameTitle: string;
    gameGenre: string;
    gameReleaseDate: string;
    gameCost: number;
}

const GameCard: FunctionComponent<GameCardProps> = (props) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{props.gameTitle}</Card.Title>
          <Card.Text>
            {props.gameCost}
        </Card.Text>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
