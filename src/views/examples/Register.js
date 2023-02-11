import React,{ useState } from "react";
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
import { ToastContainer, toast } from 'react-toastify';
import { register } from "Api/api";

const Register = () => {
const [values,setValues]=useState('')
 const reg=async()=>{
  console.log(values,"==========>regValues")
   const { email, password, firstName, phoneNumber, role } = values;
   console.log(email, password,firstName, role, phoneNumber, "======>exValues")
   if (email && password && firstName && role  && phoneNumber) {
    
     await register(values)
       .then((res) => {
        
         if (res.data.message ==="Email already exist") {
          // console.log(res, "regResponse========>");
          alert("Email already exist"); 
          // {
          //    position: "top-center"
          //  })
         }
         else {
           alert("Registered Successfully");
          //    {
          //    position: "top-center"
          //  })
         }
       });
   }
   else {
     alert("Please Complete all fields")
   }
 }
  const handleRegValues=(e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values,"====>values");
  }
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2">
              <small style={{ color: "black" }}>Sign up with</small>
            </div>
            
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small style={{ color: "black" }}>sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Name" name="firstName" onChange={handleRegValues} type="text" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    onChange={handleRegValues}
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
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={handleRegValues}
                    name="password"
                  />
                </InputGroup>
              </FormGroup> <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-phone" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Phone Number"
                    type="number"
                    autoComplete="new-password"
                    onChange={handleRegValues}
                    name="phoneNumber"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-user" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Role"
                    type="select"
                    autoComplete=""
                    name="role"
                    onChange={handleRegValues}
                  ><option value="crew">Crew Member</option>
                    <option value="client">Client</option>
                  
                  </Input>
                </InputGroup>
              </FormGroup>
             
              <div className="text-center">
                <Button className="mt-4" color="dark" type="button" onClick={reg}>
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <ToastContainer />
    </>
  );
};

export default Register;
