import React, { useEffect, useState } from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button } from 'reactstrap';
import { HashRouter, Link } from 'react-router-dom';
import BankModal from 'components/Modals/BankModal';
import { getAllPayments } from 'Api/api';
import bank from './image 25.png'
import Moment from 'react-moment';
const BankDetails = () => {
    const [paymentData, setPaymentData] = useState([])
    let payment=0;
    useEffect(() => {
        getAllPayments()
            .then((res) => {
                console.log(res, "======>allPaymentsData")
                setPaymentData(res?.data)
            })
        
        paymentData?.map((data) => {
            payment += parseInt(data?.payment);
           
        })

    }, [])

   
    
  return (
      <div>
          <Container fluid>
              <Row className="mt-3">
                  <Col xl={6}>
                      <Link
                          className="h2 mt-3 ml-1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
                          
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
                                      <CardBody className='mt-3'>
                                      <Row className=" ">
                                              <Col className="col-4">
                                              <img src={bank}/>
                                              </Col>
                                      <Col className="col-8">
                                    <h6 className="">Bank Transfer Details</h6> 
                                      <span style={{fontWeight:"600"}} className="">Standard Chartered</span> 
                                    <p className="mt-2" style={{ fontSize: "12px" }}> Last Update 5 days ago</p> 
                                     
                                        
                                                  
                                        </Col>
                                              
                                        
                                        </Row>
                                          <hr className="my-3" />  
                                          {
                                        //   <div className="custom-control custom-switch ml-1 text-center">

                                        //       <input
                                        //           type="checkbox"
                                        //           className="custom-control-input"
                                        //           id="customSwitches"
                                        //           style={{ position: "absolute" }}
                                        //       />

                                        //       <label className="custom-control-label" for="customSwitches"
                                        //       >
                                        //           Active
                                        //       </label>

                                        //   </div>
                                          }
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
                                Transaction History
                            </Link>
                                </Col>
                                <Col>
                                    <Link
                                        className="h2 mt-2 ml-1 mb-0 text-black  d-none d-lg-inline-block"
                                        to="/"
                                        style={{float:"right"}}
                                    >
                                        Total Amount:{payment?payment:"0"} USD
                                    </Link>

                                          </Col>
                                      </Row>
                          
                              <table className="table mt-3">
                                  <thead>
                                              <tr className='text-center'>
                                          <th style={{color:"black"}}>Trip name</th>
                                          <th style={{ color: "black" }}>Amount</th>
                                          <th style={{ color: "black" }}>Date</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                  {
                                    paymentData?.length?
                                    paymentData?.map((data,key)=>(

                                  
                                        <tr className='text-center'>
                                      
                                            <td>{data?.tripDetails[0].tripName ? data?.tripDetails[0].tripName : "empty"}</td>
                                          <td>{data?.payment?data.payment:"empty"}</td>
                                            <td> <Moment format="MM/DD/YYYY">{data?.date}</Moment></td>
                                      </tr>
                                    ))
                                    :
                                    <p>No transactions Available!</p>
                                              }
                                      
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