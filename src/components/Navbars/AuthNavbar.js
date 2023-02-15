import React,{useState} from 'react'
import { Link, useHistory } from "react-router-dom";
import logo from './Accu Sign.png'
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

const AuthNavbar = () => {
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
  const history = useHistory();
const backToHome=()=>{
  if (role.role === "admin") {
    

    history.push('/admin/index');
  }
  if (role.role === "crew") {
    
    history.push('/crew/crewIndex');
  }
  if (role.role === "client") {
   
    history.push('/client/clientIndex');
  }
}

  return (
    <>
      <Navbar className=" navbar-horizontal " expand="md" >
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={logo}
            />
          </NavbarBrand>
          <button className="navbar-toggler " id="navbar-collapse-main">
            <i className="navbar-toggler-icon fa fa-bars" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={logo}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6" >
                  <button className="navbar-toggler " id="navbar-collapse-main" >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthNavbar;
