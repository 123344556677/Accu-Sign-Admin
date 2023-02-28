
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const LoginFooter = () => {
  return (
    <>
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted ml-4" style={{ fontSize: "12px" }} >
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
            <Nav className="nav-footer justify-content-center justify-content-xl-end mr-4" >
              <NavItem>
                <NavLink
                  className="font-weight-bold"
                
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ fontSize: "12px" }}
                >
                  <i className="fa fa-globe" aria-hidden="true"></i>  1.1.0
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://www.creative-tim.com/presentation?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ fontSize: "12px" }}
                >23/2/2023 5:20 pm
                </NavLink>
              </NavItem>




            </Nav>
          </Col>
        </Row>
      </footer>
    </>
  );
};

export default LoginFooter;
