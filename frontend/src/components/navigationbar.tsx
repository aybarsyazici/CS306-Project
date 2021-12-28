import { AdminPanelSettings, Logout, ShoppingCart } from "@mui/icons-material";
import { observable, runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../stores/userStore";
import "./navigationbar.scss";

interface NavbarProps {
  setSearchVar?: React.Dispatch<React.SetStateAction<string>>;
}

export const NavigationBar: FunctionComponent<NavbarProps> = observer(
  ({ setSearchVar = () => null }) => {
    const userStore = useStore();

    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">CS 306 Project</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/">Home</Link>
              <Link to="/my-games">My Games</Link>
              <Link to="/my-invoices">My Invoices</Link>
            </Nav>
            Welcome {userStore.username}
            <Form className="d-flex">
              <FormControl
                type="text"
                placeholder="Search a game"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearchVar(e.currentTarget.value)}
              />
            </Form>
            <Link to="/cart">
              <ShoppingCart></ShoppingCart>
            </Link>
            {
              userStore.isAdmin && (
                <Link to="/admin-games">
                <AdminPanelSettings/>
                </Link>
              )
            }
            <Logout
              className="logoutButton"
              onClick={(e) => {
                runInAction(() => {
                  userStore.email = "";
                  userStore.userid = null;
                  userStore.email = null;
                  userStore.password = null;
                  userStore.cart = observable.map();
                  userStore.username = "";
                });
              }}
            ></Logout>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
);

export default NavigationBar;
