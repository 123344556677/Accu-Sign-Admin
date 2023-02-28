import { getUserById } from 'Api/api';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import './MainNavbar.css'
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
    Media,
    Row
} from "reactstrap";

const MainNavbar = () => {
    const [usersData, setUsersData] = useState();
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    const history = useHistory();
    const logOut = () => {
        localStorage.clear();
        history.push('/');
      
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
      <div className='' >
      
          <nav className="navbar bg-white    " style={{ justifyContent: "flex-end" }}  >

              <Row className='justify-content-end' >
          
              {
                //   <h4 className=' mt-2 mr-5 user-role'>
                //      <i className='fa fa-user mr-1'></i> {usersData?.role}
                //   </h4> 
              }
                  {
                //   <h4 className='mt-2 mr-5 inner-password' style={{cursor:"pointer"}} onClick={()=>{history.push('/updatePassword')}}>
                //       <i className="ni ni-lock-circle-open" />   Update password 
                //   </h4>
                  }
                  <Nav className="align-items-center d-none d-md-flex mr-5" navbar >

                      <UncontrolledDropdown nav className=''>
                          <DropdownToggle className="" nav >
                              <Row>
                                  <span className="avatar avatar-sm rounded-circle">
                                      <img
                                          alt="..."
                                          src={usersData?.profilePic ? usersData?.profilePic:`${require("../../assets/img/theme/team-4-800x800.jpg")}`}
                                      />
                                      {
                                //   <button className='btn btn-outline-dark navbar-name'>
                                //       {usersData?.firstName} <i className="fa fa-caret-down"></i>
                                //   </button>
                                      }
                                      </span>

                              </Row>

                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" style={{marginRight:"160px"}}  >
                              <DropdownItem className="noti-title" header tag="div">
                                  <h6 className="text-overflow m-0">Welcome! {usersData?.firstName}</h6>
                              </DropdownItem>
                              {
                                  usersData?.role === "admin" &&
                                  <Link to='/admin/profile'> <DropdownItem to="/admin/profile"  tag={Link}>
                                  <i className="ni ni-single-02" />
                                  <span>My profile</span>
                              </DropdownItem>
                              </Link>
                              }
                              {
                                  usersData?.role === "crew" &&
                                  <Link to='/crew/profile'> <DropdownItem to="/crew/profile" tag={Link}>
                                      <i className="ni ni-single-02" />
                                      <span>My profile</span>
                                  </DropdownItem>
                                  </Link>
                              }
                              {
                                  usersData?.role === "client" &&
                                  <Link to='/client/profile'> <DropdownItem to="/client/profile" tag={Link}>
                                      <i className="ni ni-single-02" />
                                      <span>My profile</span>
                                  </DropdownItem>
                                  </Link>
                              }
                              {
                                usersData?.role==="admin"&&
                              <DropdownItem to="/admin/updatePassword" tag={Link}>
                                  <i className="ni ni-lock-circle-open" />
                                  <span>Update password</span>
                              </DropdownItem>
                              }
                              {
                                  usersData?.role === "crew" &&
                                  <DropdownItem to="/crew/updatePassword" tag={Link}>
                                      <i className="ni ni-lock-circle-open" />
                                      <span>Update password</span>
                                  </DropdownItem>
                              }
                              {
                                  usersData?.role === "client" &&
                                  <DropdownItem to="/client/updatePassword" tag={Link}>
                                      <i className="ni ni-lock-circle-open" />
                                      <span>Update password</span>
                                  </DropdownItem>
                              }
                              <DropdownItem tag={Link}>
                                  <i className="fa fa-user" />
                                  <span>{usersData?.role}</span>
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem href="" onClick={logOut}>
                                  <i className="ni ni-user-run" />
                                  <span >Logout</span>

                              </DropdownItem>
                          </DropdownMenu>
                      </UncontrolledDropdown>
                  </Nav>
        </Row>

      </nav>
         
          </div>
  )
}

export default MainNavbar