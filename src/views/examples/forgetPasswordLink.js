import { sendForgetLink } from 'Api/api';
import React, { useState } from 'react'
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

const ForgetPasswordLink = () => {
  const [email,setEmail]=useState('')
  const values={
    email:email
  }
  const sendLink=async()=>{
    sendForgetLink(values)
    .then((res)=>{
      if (res.data.message ==="Email Sent"){
       
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Link sent to given email",
          color: "black",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      if (res.data.message === "Email not exist") {
        Swal.fire({
          position: "center",
          icon: "error",
          text: "Email nor Sent",
          color: "black",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
  }
  return (
    <Col lg="6" md="8">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent">
          <div className="text-muted text-center mt-2">
            <small style={{ color: "black", fontWeight: "700", fontSize: "16px" }}>Forgot Password Link </small>
          </div>

        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small style={{ color: "black", fontSize: "15px" }}>Generate Link</small>
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
                  placeholder="Email"
                  type="email"
                  autoComplete="new-email"
                  name="email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            



            <div className="text-center">
              <Button className="mt-4" color="dark" type="button" onClick={sendLink} >
               Generate Link to Update Passowrd
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ForgetPasswordLink