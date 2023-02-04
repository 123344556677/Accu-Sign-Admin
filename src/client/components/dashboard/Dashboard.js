
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components

import { Link } from "react-router-dom";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2
} from "variables/charts.js";

import { BsDot } from "react-icons/bs"

import Header from "../Headers/Header.js";


const Dashboard = () => {
    const [activeNav, setActiveNav] = useState(1);
    const [chartExample1Data, setChartExample1Data] = useState("data1");

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };
    return (
        <>
            <Link
                className="h2 ml-1 mb-0 mt-4 ml-4 text-black text-uppercase d-none d-lg-inline-block"
                to="/"
            >
                Dashboard
            </Link>
            <Card className=" ml-4 mt-4 mr-4" style={{ border: "0.5px solid silver" }}>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        

                        <Col xl="4">
                            <Card className="shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">

                                            <h2 className="mb-0">Trips</h2>
                                        </div>
                                        <div className="col">

                                            <Link><span className="h5 font-weight-bold mb-0 ml-2 ">View All</span></Link>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>


                                    <div className="chart">
                                        {
                                            ["first", "second"].map((data, index) => (
                                                <>
                                               <h3 className="">Name</h3>
                                               <p style={{fontWeight:"600",fontSize:"15px"}}>UK to USA</p>
                                                <span style={{ fontWeight: "600", fontSize: "15px" }}>Status:Pending on Route</span>
                                                <hr/>
                                                </>
                                            ))}

                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="4">
                            <Card className="shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">

                                            <h2 className="mb-0">Aircraft</h2>
                                        </div>
                                        <div className="col" >

                                            <Link><span className="h5 font-weight-bold mb-0 ml-2 ">View All</span></Link>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>


                                    <div className="chart">
                                        {
                                            ["first", "second", "third"].map((data, index) => (
                                                <Row key={index} className="mt-3">
                                                    <Col xl={3} >
                                                        <span className="avatar avatar-lg rounded">
                                                            <img
                                                                alt="..."
                                                                src={require("../../../assets/img/theme/team-4-800x800.jpg")
                                                            
                                                            }
                                                                style={{ height: "" }}
                                                            />
                                                        </span>
                                                    </Col>
                                                    <Col xl={5} className="ml-3">
                                                        <h4 className="">Name</h4>
                                                        <h5 style={{ fontWeight: "600", fontSize: "12px" }}>Type</h5>
                                                        <h6 style={{ fontWeight: "600", fontSize: "10px" }}>Registration</h6>
                                                    </Col>

                                                </Row>
                                            ))}

                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="4">
                            <Card className="shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">

                                            <h4 className="mb-0" 
                                            >Pending invoice</h4>
                                        </div>
                                        <div className="col" style={{ float: "right" }}>

                                            <Link><span className="h5 font-weight-bold mb-0 ">View All</span></Link>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>


                                    <div className="chart">
                                        {
                                            ["first", "second"].map((data, index) => (
                                               
                                                    
                                                    
                                                    <>
                                                        <h3 className="">USD 20,4000</h3>
                                                        <p style={{ fontWeight: "600", fontSize: "15px" }}>Trip name</p>
                                                        <span style={{ fontWeight: "600", fontSize: "15px" }}>Generated:30 Jan 2022</span>
                                                        <hr/>
                                                    </>

                                                
                                            ))}

                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    

                    
                </Container>
            </Card>
        </>
    );
};

export default Dashboard;
