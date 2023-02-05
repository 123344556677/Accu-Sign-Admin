import React from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button } from 'reactstrap';
import { HashRouter, Link } from 'react-router-dom';
import BankModal from 'components/Modals/BankModal';
const BankDetails = () => {
  return (
      <div>
          <Container fluid>
              <Row className="mt-3">
                  <Col xl={6}>
                      <Link
                          className="h2 mt-3 ml-1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
                          to="/"
                      >
                          Bank Detail
                      </Link>
                  </Col>
                  <Col xl={6}>
                      <BankModal/>
                  </Col>
              </Row>
              <Row className="mt-4">
                  <Col lg="6" xl="12">
                      <Card className="card-stats mb-4 mb-xl-0" style={{ height: "700px" }}>
                         <Row xl={12}>
                         <Col xl={4}>
                                  <Card className="card-stats mb-4 mb-xl-0 mt-5 ml-2" style={{ 
                                border:"1px solid black", borderRadius:"0%" }}>
                                      <CardBody className='mt-5'>
                                      <Row className="justify-content-center mt-3">
                                      <Col className="justify-content-center">
                                    <h3 className="text-center">Bank Transfer Details</h3> 
                                      <p style={{fontWeight:"600"}} className="text-center">Standard Chartered</p> 
                                      <p className="text-center"> Last Update 5 days ago</p> 
                                      <hr className="my-3"/>  
                                        <div className="custom-control custom-switch ml-1 text-center">
                                       
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="customSwitches"
                                                style={{ position:"absolute" }}
                                            />
                                        
                                            <label className="custom-control-label" for="customSwitches"
                                            >
                                                Active
                                            </label>
                                       
                                        </div>
                                        </Col>
                                        </Row>
                                      </CardBody>
                                      
                                </Card>

                                  </Col>

                              <Col xl={8}>
                          <CardBody>
                          <Row>
                          <Col>
                            <Link
                                className="h2 mt-2 ml-1 mb-0 text-black  d-none d-lg-inline-block"
                                to="/"
                            >
                                Transition History
                            </Link>
                                </Col>
                                <Col>
                                    <Link
                                        className="h2 mt-2 ml-1 mb-0 text-black  d-none d-lg-inline-block"
                                        to="/"
                                        style={{float:"right"}}
                                    >
                                        Total Amount:1000 USD
                                    </Link>

                                          </Col>
                                      </Row>
                          
                              <table className="table mt-3">
                                  <thead>
                                      <tr>
                                          <th style={{color:"black"}}>Trip name</th>
                                          <th style={{ color: "black" }}>Amount</th>
                                          <th style={{ color: "black" }}>Date</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                          <td>John</td>
                                          <td>Doe</td>
                                          <td>john@example.com</td>
                                      </tr>
                                      <tr>
                                          <td>Mary</td>
                                          <td>Moe</td>
                                          <td>mary@example.com</td>
                                      </tr>
                                      <tr>
                                          <td>July</td>
                                          <td>Dooley</td>
                                          <td>july@example.com</td>
                                      </tr>
                                  </tbody>
                              </table>

                              
                                
                             
                          </CardBody>
                              </Col>
                          </Row>
                            
                      </Card>
                  </Col>
              </Row>

          </Container>
          
      </div>
  )
}

export default BankDetails