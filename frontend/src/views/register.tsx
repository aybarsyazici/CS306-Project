import { FunctionComponent } from "react";
import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { Api } from "../environment";
import { useStore } from "../stores/userStore";
import { runInAction } from "mobx";
import { User } from "../types/user";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const RegisterForm = React.memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const userStore = useStore();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    Api.post("/adduser", {
      email: email,
      password: password,
      username: username,
    })
      .then((response) => {
        Api.post("/login", { email: email, password: password })
          .then((response) => {
            const tempUser = response.data.data[0] as User;
            runInAction(() => {
              userStore.email = email;
              userStore.userid = tempUser.userid;
              userStore.username = tempUser.username;
              userStore.isAdmin = tempUser.isAdmin;
            });
              navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row style={{ height: "100vh" }}>
        <Col></Col>
        <Col style={{ alignSelf: "center" }}>
          {err !== "" && <Alert>{err}</Alert>}
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.currentTarget.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              ></input>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                handleLogin(e);
              }}
              style={{ marginTop: "1rem" }}
            >
              Submit
            </button>
          </form>
          <p>
            Already a member?
            <Link to="/login">Log in.</Link>
          </p>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
});
//export default login

const RegisterPage = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
