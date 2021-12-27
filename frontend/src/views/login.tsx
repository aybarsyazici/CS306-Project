import { FunctionComponent } from "react";
import React, { useState } from "react";
import { Button, Container, Form, FormControl, InputGroup, Row,Col} from "react-bootstrap";

interface LoginPageProps {}
const adminUser = {
  email: "admin@admin.com",
  password: "admin123",
};

const Login = (details: any) => {
  console.log(details);
};
const LogOut = (details: any) => {
  console.log(details);
};

const LoginForm = React.memo(() => {
  return (
  <Container>
    <Row style={{height:"100vh"}}>
      <Col></Col>
      <Col style={{alignSelf:"center"}}>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ></input>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </Col>
      <Col></Col>
    </Row>

  </Container>  
  );
});
//export default login

const LoginPage: FunctionComponent<LoginPageProps> = (prop) => {
  const [user, setUser] = useState({ name: "yarrak", email: "" });
  const [error, setError] = useState();
  return (
    <div>
      {" "}
      {user.email != "" ? (
        <div>
          className ="welcome"
          <h2>
            Welcome, <span> {user.name}</span>
          </h2>
          <Button>logout</Button>
        </div>
      ) : (
        <LoginForm/>
      )}
    </div>
  );
};

export default LoginPage;
