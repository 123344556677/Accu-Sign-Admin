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

const ForgetPasswordLink = () => {
  const [email,setEmail]=useState('')
  const values={
    email:email
  }
  const sendLink=async()=>{
    sendForgetLink(values)
    .then((res)=>{
      if (res.data.message ==="Email Sent"){
        alert("Link sent to given email")
      }
      if (res.data.message === "Email not exist") {
        alert("Email not exist")
      }
    })
  }
  return (
    <Col lg="6" md="8">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-muted text-center mt-2">
            <small style={{ color: "black" }}>Forget Password Link </small>
          </div>

        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small style={{ color: "black" }}>Generate Link</small>
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