
import { useEffect, useState } from "react";
import { NavLink as NavLinkRRD, Link, useHistory } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import Logo from './Accu Sign.png'
import './sidebar.css'

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col
} from "reactstrap";
import { getUserById } from "Api/api";

var ps;

const CrewSidebar = (props) => {
    const [collapseOpen, setCollapseOpen] = useState();
    const [usersData, setUsersData] = useState();
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    const values = {
        id: role.id
    }
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    // toggles collapse between opened and closed (true/false)
    const toggleCollapse = () => {
        setCollapseOpen((data) => !data);
    };
    // closes the collapse
    const closeCollapse = () => {
        setCollapseOpen(false);
    };

    // creates the links that appear in the left menu / Sidebar
    const createLinks = (routes) => {
        return routes.map((prop, key) => {
            return (
                <NavItem key={key}>
                    {

                        prop.name !== "updatePassowrd" &&
                        prop.name !== "Profile" &&
                        <>
                    <NavLink
                        to={prop.layout + prop.path}
                        tag={NavLinkRRD}
                        onClick={closeCollapse}
                        activeClassName="active"
                    >
                        <i className={prop.icon} />
                        {prop.name}
                    </NavLink>
                    <hr className="my-3" />
                        </>
                    }
                </NavItem>

            );
        });
    };

    const { bgColor, routes, logo } = props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
        navbarBrandProps = {
            to: logo.innerLink,
            tag: Link
        };
    } else if (logo && logo.outterLink) {
        navbarBrandProps = {
            href: logo.outterLink,
            target: "_blank"
        };
    }
    const history = useHistory();
    const logOut = () => {
        localStorage.clear();
        history.push('/auth/login');

    }
    useEffect(() => {

        getUserById(values)
            .then((res) => {

                setUsersData(res.data.data)

            })

    }, [])


    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
        >
            <Container fluid>
                {/* Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                {/* Brand */}
                {logo ? (
                    <NavbarBrand className="pt-0" {...navbarBrandProps}>
                        <img
                            alt={logo.imgAlt}
                            className="navbar-brand-img"
                            src={Logo}
                        />
                    </NavbarBrand>
                ) : null}
                {/* User */}
                <Nav className="align-items-center d-md-none">
                    <UncontrolledDropdown nav>


                        <DropdownMenu
                            aria-labelledby="navbar-default_dropdown_1"
                            className="dropdown-menu-arrow"
                            right
                        >

                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav>
                        <DropdownToggle nav>
                            <Media className="align-items-center">
                                <span className="avatar avatar-sm rounded-circle">
                                    <img
                                        alt="..."
                                        src={usersData?.profilePic ? usersData?.profilePic : `${require("../../assets/img/theme/team-4-800x800.jpg")}`}
                                    
                                    />
                                </span>
                                {

                                    // <span className="avatar avatar-lg rounded-circle name-span " 
                                    //   >

                                    //   <span className="name">{usersData?.firstName} <i className="fa fa-caret-down"></i></span>

                                    // </span>
                                }
                            </Media>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem className="noti-title" header tag="div">
                                <h6 className="text-overflow m-0">Welcome!</h6>
                            </DropdownItem>
                            <DropdownItem tag={Link}>
                                <i className="fa fa-user" />
                                <span>{usersData?.role}</span>
                            </DropdownItem>
                            {
                                usersData?.role === "admin" &&
                                <Link to='/admin/profile'> <DropdownItem to="/admin/profile" tag={Link}>
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
                                usersData?.role === "admin" &&
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

                            <DropdownItem divider />
                            <DropdownItem href="" onClick={logOut}>
                                <i className="ni ni-user-run" />
                                <span>Logout</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                {/* Collapse */}
                <Collapse navbar isOpen={collapseOpen}>
                    {/* Collapse header */}
                    <div className="navbar-collapse-header d-md-none">
                        <Row>
                            {logo ? (
                                <Col className="collapse-brand" xs="6">
                                    {logo.innerLink ? (
                                        <Link to={logo.innerLink}>
                                            <img alt={logo.imgAlt} src={logo.imgSrc} />
                                        </Link>
                                    ) : (
                                        <a href={logo.outterLink}>
                                            <img alt={logo.imgAlt} src={logo.imgSrc} />
                                        </a>
                                    )}
                                </Col>
                            ) : null}
                            <Col className="collapse-close" xs="6">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={toggleCollapse}
                                >
                                    <span />
                                    <span />
                                </button>
                            </Col>
                        </Row>
                    </div>
                    {/* Form */}


                    <Nav navbar>{createLinks(routes)}</Nav>
                    {/* Divider */}

                    {/* Heading */}
                    {/*<h6 className="navbar-heading text-muted">Documentation</h6>
          {/* Navigation */}
                    {/*<Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem>
                  </Nav>*/}
                    {/*<Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Upgrade to PRO
              </NavLink>
            </NavItem>
                </Nav>*/}
                </Collapse>
            </Container>
        </Navbar>
    );
};

CrewSidebar.defaultProps = {
    routes: [{}]
};

CrewSidebar.propTypes = {
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app
        // it will be rendered as <Link to="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app
        // it will be rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the image src of the logo
        imgSrc: PropTypes.string.isRequired,
        // the alt for the img
        imgAlt: PropTypes.string.isRequired
    })
};

export default CrewSidebar;
