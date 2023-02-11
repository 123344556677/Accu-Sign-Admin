import { getUserById } from 'Api/api';
import React, { useEffect, useState } from 'react'
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
    const [usersData, setUsersData] = useState();
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    const history = useHistory();
    const logOut = () => {
        localStorage.clear();
        history.push('/auth/login');
      
    }
    const values = {
        id: role.id
    }
    useEffect(() => {

        getUserById(values)
            .then((res) => {

                setUsersData(res.data.data)

            })

    }, [])
  return (
      <div className='' style={{justifyContent:"end"}}>
      
          <nav class="navbar navbar-expand-sm bg-white" >

          
              <Nav className="align-items-center d-none d-md-flex" navbar style={{ color: "black" }}>
              <UncontrolledDropdown nav>
                  <DropdownToggle className="" nav>
                      
                          <button className='btn btn-outline-dark '>
                              {usersData?.firstName} <i className="fa fa-caret-down"></i>
                          </button>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right >
                      <DropdownItem className="noti-title" header tag="div">
                          <h6 className="text-overflow m-0">Welcome!</h6>
                      </DropdownItem>
                          <Link to='/auth/profile'> <DropdownItem to="/auth/profile" tag={Link}>
                          <i className="ni ni-single-02" />
                          <span>My profile</span>
                      </DropdownItem>
                          </Link> 
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