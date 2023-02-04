
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

import {BsDot} from "react-icons/bs"

import Header from "components/Headers/Header.js";


const Index = (props) => {
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
      <Card className="card-stats ml-4 mt-4 mr-4" style={{border:"0.5px solid silver"}}> 
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className=" mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
              
            
          </Col>
          
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    
                    <h2 className="mb-0">Clients</h2>
                  </div>
                    <div className="col" style={{float:"right"}}>

                      <Link><span className="h5 font-weight-bold mb-0 ml-1">View All</span></Link>
                    </div>
                </Row>
              </CardHeader>
              <CardBody>
                
            
                <div className="chart">
                {
                ["first","second","third","Fourth"].map((data,index)=>(
                      <Row key={index} className="mt-3">
                        <Col xl={3} >
                          <span className="avatar avatar-lg rounded-circle">
                            <img
                              alt="..."
                              src={require("../assets/img/theme/team-4-800x800.jpg")}
                            />
                          </span>
                        </Col>
                        <Col xl={5}>
                          <h3>Jessica</h3>
                          <span className="text-nowrap" style={{ fontSize: "13px" }}>Pilot
                          
                          Flight Crew</span>
                        </Col>

                      </Row>
                ))}
                  
                </div>
              </CardBody>
            </Card>
                        </Col>
        </Row>
<Row className="mt-4">

<Col xl={8}>

          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <Row className="">
                <Col xl={6}>
                  <h2 className="mb-0">Aircraft</h2>
                </Col>
                    <Col xl={6}>

                  <Link><span className="h5 font-weight-bold mb-0 mt-2" style={{float:"right"}}>View All</span></Link>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>


              <div className="chart">
                <Row>
                  {
                    ["first", "second", "third"].map((data, index) => (
                      <Col xl={4} key={index}>

                        <Row className="mt-3">
                          <Col xl={4} >
                            <span className="avatar avatar-md rounded-circle">
                              <img
                                alt="..."
                                src={require("../assets/img/theme/team-4-800x800.jpg")}
                              />
                            </span>
                          </Col>
                          <Col xl={5}>
                            <h5>Jessica</h5>
                            <span className="text-nowrap" style={{ fontSize: "13px" }}>Pilot  Flight Crew</span>
                          </Col>

                        </Row>

                      </Col>
                    ))}
                </Row>
              </div>
            </CardBody>
          </Card>
            </Col>
          </Row>
         
         {/*<Row className="mt-5">
        //   <Col className="mb-5 mb-xl-0" xl="8">
        //     <Card className="shadow">
        //       <CardHeader className="border-0">
        //         <Row className="align-items-center">
        //           <div className="col">
        //             <h3 className="mb-0">Page visits</h3>
        //           </div>
        //           <div className="col text-right">
        //             <Button
        //               color="primary"
        //               href="#pablo"
        //               onClick={(e) => e.preventDefault()}
        //               size="sm"
        //             >
        //               See all
        //             </Button>
        //           </div>
        //         </Row>
        //       </CardHeader>
        //       <Table className="align-items-center table-flush" responsive>
        //         <thead className="thead-light">
        //           <tr>
        //             <th scope="col">Page name</th>
        //             <th scope="col">Visitors</th>
        //             <th scope="col">Unique users</th>
        //             <th scope="col">Bounce rate</th>
        //           </tr>
        //         </thead>
        //         <tbody>
        //           <tr>
        //             <th scope="row">/argon/</th>
        //             <td>4,569</td>
        //             <td>340</td>
        //             <td>
        //               <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
        //             </td>
        //           </tr>
        //           <tr>
        //             <th scope="row">/argon/index.html</th>
        //             <td>3,985</td>
        //             <td>319</td>
        //             <td>
        //               <i className="fas fa-arrow-down text-warning mr-3" />{" "}
        //               46,53%
        //             </td>
        //           </tr>
        //           <tr>
        //             <th scope="row">/argon/charts.html</th>
        //             <td>3,513</td>
        //             <td>294</td>
        //             <td>
        //               <i className="fas fa-arrow-down text-warning mr-3" />{" "}
        //               36,49%
        //             </td>
        //           </tr>
        //           <tr>
        //             <th scope="row">/argon/tables.html</th>
        //             <td>2,050</td>
        //             <td>147</td>
        //             <td>
        //               <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
        //             </td>
        //           </tr>
        //           <tr>
        //             <th scope="row">/argon/profile.html</th>
        //             <td>1,795</td>
        //             <td>190</td>
        //             <td>
        //               <i className="fas fa-arrow-down text-danger mr-3" />{" "}
        //               46,53%
        //             </td>
        //           </tr>
        //         </tbody>
        //       </Table>
        //     </Card>
        //   </Col>
        //   <Col xl="4">
        //     <Card className="shadow">
        //       <CardHeader className="border-0">
        //         <Row className="align-items-center">
        //           <div className="col">
        //             <h3 className="mb-0">Social traffic</h3>
        //           </div>
        //           <div className="col text-right">
        //             <Button
        //               color="primary"
        //               href="#pablo"
        //               onClick={(e) => e.preventDefault()}
        //               size="sm"
        //             >
        //               See all
        //             </Button>
        //           </div>
        //         </Row>
        //       </CardHeader>
        //       <Table className="align-items-center table-flush" responsive>
        //         <thead className="thead-light">
        //           <tr>
        //             <th scope="col">Referral</th>
        //             <th scope="col">Visitors</th>
        //             <th scope="col" />
        //           </tr>
        //         </thead>
        //         <tbody>
        //           <tr>
        //             <th scope="row">Facebook</th>
        //             <td>1,480</td>
        //             <td>
        //               <div className="d-flex align-items-center">
        //                 <span className="mr-2">60%</span>
        //                 <div>
        //                   <Progress
        //                     max="100"
        //                     value="60"
        //                     barClassName="bg-gradient-danger"
        //                   />
        //                 </div>
        //               </div>
        //             </td>
        //           </tr>
        //           <tr>
        //             <th scope="row">Facebook</th>
        //             <td>5,480</td>
        //             <td>
        //               <div className="d-flex align-items-center">
        //                 <span className="mr-2">70%</span>
        //                 <div>
        //                   <Progress
        //                     max="100"
        //                     value="70"
        //                     barClassName="bg-gradient-success"
        //                   />
        //                 </div>
        //               </div>
        //             </td>
        //           </tr>
        //           <tr>
        //             <th scope="row">Google</th>
        //             <td>4,807</td>
        //             <td>
        //               <div className="d-flex align-items-center">
        //                 <span className="mr-2">80%</span>
        //                 <div>
        //                   <Progress max="100" value="80" />
        //                 </div>
        //               </div>
        //             </td>
        //           </tr>
        //           <tr>
        //             <th scope="row">Instagram</th>
        //             <td>3,678</td>
        //             <td>
        //               <div className="d-flex align-items-center">
        //                 <span className="mr-2">75%</span>
        //                 <div>
        //                   <Progress
        //                     max="100"
        //                     value="75"
        //                     barClassName="bg-gradient-info"
        //                   />
        //                 </div>
        //               </div>
        //             </td>
        //           </tr>
        //           <tr>
        //             <th scope="row">twitter</th>
        //             <td>2,645</td>
        //             <td>
        //               <div className="d-flex align-items-center">
        //                 <span className="mr-2">30%</span>
        //                 <div>
        //                   <Progress
        //                     max="100"
        //                     value="30"
        //                     barClassName="bg-gradient-warning"
        //                   />
        //                 </div>
        //               </div>
        //             </td>
        //           </tr>
        //         </tbody>
        //       </Table>
        //     </Card>
        //   </Col>
                        // </Row>*/}
      </Container>
      </Card>
    </>
  );
};

export default Index;
