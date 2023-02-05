import React from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import CrewModal from 'components/Modals/CrewModal';
const Crew = () => {
  return (
      <div>
          <Container fluid>
              <Row className="mt-3">
                  <Col xl={6}>
                      <Link
                          className="h2 mt-3 ml-1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
                          to="/"
                      >
                          Crew list
                      </Link>
                  </Col>
                  <Col xl={6}>
                      <CrewModal/>
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
                                          <th style={{ color: "black" }}>Type</th>
                                          <th style={{ color: "black" }}> Phone Number</th>
                                          <th style={{ color: "black" }}> Email</th>
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
                                          
                                          <td><i className="fa fa-trash"
                                              style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                              <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px" }} aria-hidden="true"></i>

                                          </td>
                                      </tr>
                                      <tr>
                                          <td>1</td>
                                          <td>Mark</td>
                                          <td>Otto</td>
                                          <td>@mdo</td>
                                          
                                          <td>Otto</td>
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

export default Crew;