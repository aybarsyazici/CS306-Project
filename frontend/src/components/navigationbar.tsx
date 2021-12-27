import { ShoppingCart } from "@mui/icons-material";
import { FunctionComponent } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavbarProps {
  setSearchVar?: React.Dispatch<React.SetStateAction<string>>;
}

export const NavigationBar: FunctionComponent<NavbarProps> = ({setSearchVar = () => null}) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">CS 306 Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/my-games">My Games</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="Search a game"
              className="me-2"
              aria-label="Search"

              onChange={(e)=>setSearchVar(e.currentTarget.value)}
            />
          </Form>
          <Link to="/cart">
            <ShoppingCart></ShoppingCart>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
