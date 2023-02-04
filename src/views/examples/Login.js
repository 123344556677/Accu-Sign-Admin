
import { Link } from "react-router-dom";
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
             
              <div className="" style={{float:"right"}}>
                <Button className="my-4" color="secondary" type="button">
                   LOGIN
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="3">
            <Link to="/admin/adminIndex"><Button className="" color="dark" type="button">
              ADMIN
            </Button></Link>

          </Col>
          <Col className="text-right" xs="3">
         
            <Link to="/client/clientIndex">  <Button className="ml-4" color="dark" type="button">
             CLIENT
            </Button></Link>
         
          </Col>
          <Col className="text-right" xs="6">
          
            <Link to="/crew/crewIndex"> <Button className="" color="dark" type="button">
              CREW MEMBER
            </Button>
            </Link>

            
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
