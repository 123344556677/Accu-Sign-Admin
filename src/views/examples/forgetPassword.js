import { forgetPassword } from 'Api/api';
import { register } from 'Api/api';
import React,{useState} from 'react'
import { useParams } from 'react-router-dom';
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
import Swal from 'sweetalert2';
const ForgetPassword = () => {
    const [value, setValue] = useState('')
    const {email}=useParams();


    const forget = async () => {
        console.log(value)
        const {  password,confirmPassword } = value;
        console.log(email, password,confirmPassword,"======>exValues")
        if ( password && confirmPassword) {
            if(password===confirmPassword){
                const values={
                    email:email,
                    password:password,
                   
                }
            await forgetPassword(values)
                .then((res) => {

                    if (res.data.message === "user does not exist") {
                      
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            text: "user does not exist",
                            color: "black",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        
                    }
                    else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            text: "Passowrd updated successfully",
                            color: "black",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        
                    }
                });
            }
            else{
               
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    text: "password and confirm password must be equal",
                    color: "black",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }
        else {
            
            Swal.fire({
                position: "center",
                icon: "warning",
                text: "Please Complete all fields",
                color: "black",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }
    const handleforgetValues = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        console.log(value, "====>values");
    }
    console.log(email, "email")
  return (
      
     
      <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent ">
                  <div className="text-muted text-center mt-2">
                      <small style={{ color: "black", fontWeight: "700", fontSize: "16px" }}>Forgot Password </small>
                  </div>

              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                      <small style={{ color: "black", fontSize: "15px" }}>Update Password</small>
                  </div>
                  <Form role="form">
                     
                      <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                      <i className="ni ni-email-83" />
                                  </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                  value={email}
                                  type="email"
                                  autoComplete="new-email"
                                  name="email"
                                  
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
                                  onChange={handleforgetValues}
                                  name="password"
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
                                  placeholder="Confirm Password"
                                  type="password"
                                  autoComplete=""
                                  onChange={handleforgetValues}
                                  name="confirmPassword"
                              />
                          </InputGroup>
                      </FormGroup>
                       
                      

                      <div className="text-center">
                          <Button className="mt-4" color="dark" type="button" onClick={forget}>
                             Update Passowrd
                          </Button>
                      </div>
                  </Form>
              </CardBody>
          </Card>
      </Col>
          
  )
}

export default ForgetPassword