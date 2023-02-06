import React from 'react'
import { Link, useHistory } from "react-router-dom";
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Media
} from "reactstrap";

const MainNavbar = () => {
    const history = useHistory();
    const logOut = () => {
        localStorage.clear();
        history.push('/auth/login');
      
    }
  return (
      <div className='' style={{justifyContent:"end"}}>
      
      <nav class="navbar navbar-expand-sm bg-white  ">

          
          <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                  <DropdownToggle className="pr-0" nav>
                      <Media className="align-items-center">
                          <span className="avatar avatar-sm rounded-circle">
                              <img
                                  alt="..."
                                  src={require("../../assets/img/theme/team-4-800x800.jpg")}
                              />
                          </span>
                          
                      </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem className="noti-title" header tag="div">
                          <h6 className="text-overflow m-0">Welcome!</h6>
                      </DropdownItem>
                      <DropdownItem to="/admin/user-profile" tag={Link}>
                          <i className="ni ni-single-02" />
                          <span>My profile</span>
                      </DropdownItem>
                    
                      <DropdownItem divider />
                          <DropdownItem href="" onClick={logOut}>
                          <i className="ni ni-user-run" />
                          <span >Logout</span>

                      </DropdownItem>
                  </DropdownMenu>
              </UncontrolledDropdown>
          </Nav>

      </nav>
         
          </div>
  )
}

export default MainNavbar