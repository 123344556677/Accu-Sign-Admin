import React from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import TripModal from 'components/Modals/TripModal';
const Trip = () => {
  return (
      <div>
          <Container fluid>
              <Row className="mt-3">
                  <Col xl={6}>
                      <Link
                          className="h2 mt-3 ml-1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
                          to="/"
                      >
                          Trip list
                      </Link>
                  </Col>
                  <Col xl={6}>
                     <TripModal/>
                  </Col>
              </Row>
              <Row className="mt-4">
                  <Col lg="6" xl="12">
                      <Card className="card-stats mb-4 mb-xl-0" style={{ height: "700px" }}>
                          <CardBody>

                              <Table className="mt-3" >
                                  <thead>
                                      <tr>
                                          <th style={{ color: "black" }}>#</th>
                                          <th style={{ color: "black" }}> Name</th>
                                          <th style={{ color: "black" }}>Client</th>
                                          <th style={{ color: "black" }}> Location</th>
                                          <th style={{ color: "black" }}> Total crew member</th>
                                          <th style={{ color: "black" }}>Stats</th>
                                          <th style={{ color: "black" }}> Actions</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                          <td>1</td>
                                          <td>Mark</td>
                                          <td>Otto</td>
                                          <td>@mdo</td>
                                          <td>@mdo</td>
                                          <td>  <UncontrolledDropdown setActiveFromChild>
                                              <DropdownToggle tag="a" className="nav-link" caret>
                                                  Active
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                  <DropdownItem tag="a" href="/blah" active>Link</DropdownItem>
                                              </DropdownMenu>
                                          </UncontrolledDropdown>
                                              Pending <i className="fa fa-circle ml-1 mb-5" 
                                              style={{fontSize:"5px"}} aria-hidden="true"></i>
                                              <span className="ml-2">  Date </span>
                                          </td>
                                          <td><i className="fa fa-trash"
                                              style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                              <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px" }} aria-hidden="true"></i>

                                          </td>
                                      </tr>
                                      <tr>
                                          <td>2</td>
                                          <td>Mark</td>
                                          <td>Otto</td>
                                          <td>@mdo</td>
                                          <td>@mdo</td>
                                          <td>  <UncontrolledDropdown setActiveFromChild>
                                              <DropdownToggle tag="a" className="nav-link" >
                                                  Active
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                  <DropdownItem tag="a" href="/blah" active>Link</DropdownItem>
                                              </DropdownMenu>
                                          </UncontrolledDropdown>
                                              Pending <i className="fa fa-circle ml-1 mb-5"
                                                  style={{ fontSize: "5px" }} aria-hidden="true"></i>
                                              <span className="ml-2">  Date </span>
                                          </td>
                                          <td><i className="fa fa-trash"
                                              style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                              <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px" }} aria-hidden="true"></i>

                                          </td>



                                      </tr>


                                  </tbody>
                              </Table>
                          </CardBody>
                      </Card>
                  </Col>
              </Row>

          </Container>
      </div>
  )
}

export default Trip;