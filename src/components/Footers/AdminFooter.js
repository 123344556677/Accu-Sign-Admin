/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  const date = new Date().toLocaleString();
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted ml-4">
            Powered by:
            <a
              className="font-weight-bold ml-1"
              href="https://www.solutioncorridor.com"
              rel="noopener noreferrer"
              target="_blank"

            >
              Solution Corridor (Digital Consultant)

            </a>
          </div>
        </Col>

        <Col xl="6" >
          <Nav className="nav-footer justify-content-center justify-content-xl-end mr-4">
            <NavItem>
              <NavLink
                className="font-weight-bold"
               
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa fa-globe" aria-hidden="true"></i>  1.1.0
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                
                rel="noopener noreferrer"
                target="_blank"
              >15/2/2023 12:30pm
              </NavLink>
            </NavItem>

            

           
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
