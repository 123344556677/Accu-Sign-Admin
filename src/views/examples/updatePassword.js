import { forgetPassword } from 'Api/api';
import { register } from 'Api/api';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
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
import { Container } from 'react-bootstrap';
const UpdatePassword = () => {
    const [value, setValue] = useState('')
   


    const forget = async () => {
        console.log(value)
        const {email, password, confirmPassword } = value;
        console.log(email, password, confirmPassword, "======>exValues")
        if (email&&password && confirmPassword) {
            if (password === confirmPassword) {
                
                await forgetPassword(value)
                    .then((res) => {

                        if (res.data.message === "user does not exist") {

                            Swal.fire({
                                position: "center",
                                icon: "error",
                                text: "user not registered",
                                color: "black",
                                showConfirmButton: false,
                                timer: 2000,
                            });

                        }
                        else {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                text: "Password updated",
                                color: "black",
                                showConfirmButton: false,
                                timer: 2000,
                            });

                        }
                    });
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    text: "Passowrd and confirm password must be same",
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
                text: "Please complete all the fields",
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
   
    return (

<Row className='justify-content-center mt-3'>
        <Col lg="6" md="8">
            <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent ">
                    <div className="text-muted text-center mt-2">
                        <small style={{ color: "black", fontWeight: "700", fontSize: "16px" }}>Change Password </small>
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
                                    onChange={handleforgetValues}
                                 
                                    type="email"
                                    autoComplete="new-email"
                                    name="email"
                                    placeholder='email'

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
        </Row>
       

    )
}

export default UpdatePassword