
import { login } from 'Api/api';
import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

const Login = () => {
const [values, setValues] = useState('')
const handleLogValues=(e)=>{
  setValues({ ...values, [e.target.name]: e.target.value });
  console.log(values, "====>Logvalues");
}
const history=useHistory();
  const log = async () => {

    const { email, password } = values;
    console.log(email);
    if (email && !password) {
     alert("Please enter the password")
    }
    if (!email && password) {
      alert("Please enter the email")

    }
    if (!email && !password) {
      alert("Please complete all the fields")

    }
    if (email && password) {
      
      await login(values)
        .then(res => {


          console.log(res.data);
          if (res.data.data) {
           alert("Login Successful");
            // localStorage.setItem("key", JSON.stringify({  }));
            if (res.data.data.role==="admin"){
              const role = res.data.data.role;
              const id = res.data.data._id;
              // localStorage.setItem("id", JSON.stringify({ id }));
              localStorage.setItem("keys", JSON.stringify({role,id}));
             
              history.push('/admin/index');
            }
            if (res.data.data.role === "crew") {
              const role = res.data.data.role;
              const id = res.data.data._id;
              localStorage.setItem("keys", JSON.stringify({ role, id }));
              history.push('/crew/crewIndex');
            }
            if (res.data.data.role === "client") {
              const role = res.data.data.role;
              const id = res.data.data._id;
              localStorage.setItem("keys", JSON.stringify({ role, id }));
              history.push('/client/clientIndex');
            }
          }
          if (res.data.message === "incorrect password") {
            alert("Password is invalid")
          }

          if (res.data.message === "user not registered") {
            alert("User not registered")
          }
         



        });
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 ">
              <small style={{ color: "black" }}>LOGIN</small>
            </div>
            
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small style={{ color: "black" }}> sign in with credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name='email'
                    onChange={handleLogValues}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                  onChange={handleLogValues}
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                  />
                </InputGroup>
              </FormGroup>
              <a
                className="text-light"
                href="#pablo"
               
                onClick={(e) => e.preventDefault()}
              >
                <small style={{ color: "black" }}>Forgot password?</small>
              </a>

              <Link ><Button className="" color="dark" type="button"
                onClick={log} style={{float:"right"}}>
                LOGIN
              </Button></Link>
             
            </Form>
          </CardBody>
        </Card>
        {
        //   <Row className="mt-3">
        //   <Col xs="3">
        //     <Link ><Button className="" color="dark" type="button"
        //     onClick={log}>
        //       ADMIN
        //     </Button></Link>

        //   </Col>
        //   <Col className="text-right" xs="3">
         
        //     <Link >  <Button className="ml-4" color="dark" type="button"
        //       onClick={log}>
        //      CLIENT
        //     </Button></Link>
         
        //   </Col>
        //   <Col className="text-right" xs="6">
          
        //     <Link> <Button className="" color="dark" type="button"
        //       onClick={log}>
        //       CREW MEMBER
        //     </Button>
        //     </Link>

            
        //   </Col>
        // </Row>
      }
      </Col>
    </>
  );
};

export default Login;
