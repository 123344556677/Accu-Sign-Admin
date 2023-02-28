
import { login } from 'Api/api';
import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import LoginFooter from "../../components/Footers/AuthFooter";
import logo from './Accu Sign.png'
import Swal from "sweetalert2";

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
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "Please enter password",
        color: "black",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    if (!email && password) {
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "Please enter email",
        color: "black",
        showConfirmButton: false,
        timer: 2000,
      });

    }
    if (!email && !password) {
      Swal.fire({
        position: "center",
        icon: "warning",
        text: "Please complete all the fields",
        color: "black",
        showConfirmButton: false,
        timer: 2000,
      });

    }
    if (email && password) {
      
      await login(values)
        .then(res => {


          console.log(res.data);
          if (res?.data?.data) {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Login Succesful",
              color: "black",
              showConfirmButton: false,
              timer: 2000,
            });
          
            // localStorage.setItem("key", JSON.stringify({  }));
            if (res?.data?.data?.role==="admin"){
              const role = res.data.data.role;
              const id = res.data.data._id;
              // localStorage.setItem("id", JSON.stringify({ id }));
              localStorage.setItem("keys", JSON.stringify({role,id}));
              
             
              history.push('/admin/index')
            }
            if (res?.data?.data?.role === "crew") {
              const role = res.data.data.role;
              const id = res.data.data._id;
              const firstName = res.data.data._id;
              localStorage.setItem("keys", JSON.stringify({ role, id,firstName }));
              history.push('/crew/crewIndex');
            }
            if (res?.data?.data?.role === "client") {
              const role = res.data.data.role;
              const id = res.data.data._id;
              localStorage.setItem("keys", JSON.stringify({ role, id }));
              history.push('/client/clientIndex');
            }
          }
          if (res.data.message === "incorrect password") {
            Swal.fire({
              position: "center",
              icon: "error",
              text: "Password is invalid",
              color: "black",
              showConfirmButton: false,
              timer: 2000,
            });
          }

          if (res.data.message === "user not registered") {
            Swal.fire({
              position: "center",
              icon: "error",
              text: "user not registered",
              color: "black",
              showConfirmButton: false,
              timer: 2000,
            });
          }
         



        });
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border">
          <CardHeader className="bg-transparent ">
            <img
              alt="..."
              src={logo}
            />
            <div className="text-muted text-center mt-2 ">
              <small style={{ color: "black", fontWeight: "700", fontSize: "16px" }}>LOGIN</small>
            </div>
            
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small style={{ color: "black", fontSize: "15px" }}> Sign in with credentials</small>
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
                href=""
               
                onClick={() => history.push('/forgetPasswordLink')}
              >
                <small style={{ color: "black" }}>Forgot password?</small>
              </a>
              
              

              <Link ><Button className="" color="dark" type="button"
                onClick={log} style={{float:"right"}}>
                LOGIN
              </Button></Link>
              
              
             
            </Form>
            {
            // <a
            //   className="text-light mt-5 "
            //   href=""



            // >
            //   <small style={{ color: "black" }}>Not registered?
            //     <a className='ml-2' style={{ color: "blue" }} onClick={() => history.push('/register')}>Register</a></small>
            // </a>
            }
            
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
        <LoginFooter/>
      </Col>
    </>
  );
};

export default Login;
