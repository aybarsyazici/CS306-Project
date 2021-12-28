import { FunctionComponent } from "react";
import React, { useState } from "react";
import { Button, Container, Form, FormControl, InputGroup, Row,Col} from "react-bootstrap";
import { Api } from "../environment";
import { useStore } from "../stores/userStore";
import { runInAction } from "mobx";
import { User } from "../types/user";
import { Link, useNavigate } from "react-router-dom";

interface LoginPageProps {}


const LoginForm = React.memo(() => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userStore = useStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    Api.post('/login', { email: email, password: password }).then((response) => {
      console.log(response.data.data[0]);
      const tempUser = response.data.data[0] as User;
      runInAction(() => { userStore.email = email; userStore.userid = tempUser.userid; userStore.username = tempUser.username; userStore.isAdmin = tempUser.isAdmin});
      navigate("/");
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
  <Container>
    <Row style={{height:"100vh"}}>
      <Col></Col>
      <Col style={{alignSelf:"center"}}>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.currentTarget.value)}}></input>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => { setPassword(e.currentTarget.value) }}></input>
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e)=>{handleLogin(e)}}>Submit</button>
          </form>
          <p>Not a member? {' '}
            <Link to='/register'>
              Sign up.
          </Link>
          </p>
        </Col>
      <Col></Col>
    </Row>

  </Container>  
  );
});
//export default login

const LoginPage: FunctionComponent<LoginPageProps> = (prop) => {
  return (
    <div>
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
