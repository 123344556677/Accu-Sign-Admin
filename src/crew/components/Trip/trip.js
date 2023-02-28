import React, { useEffect, useState } from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { TripsBycrewId } from 'Api/api';
import TripExpensesModal from 'components/Modals/TripExpensesModal';
const CrewTrip = () => {
    const [crewTripData, setCrewTripData] = useState()
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    const [usersData, setUsersData] = useState();
    const Values = {
        crewId: role.id
    }
    useEffect(async () => {
        await TripsBycrewId(Values)
            .then((res) => {
                console.log(res, "======>Trips data")
                setCrewTripData(res?.data?.data)
            })

    }, [])
    console.log(crewTripData, "crewDtaat======>")
    const addingExpensesToTrip=()=>{

    }
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
                     
                  </Col>
              </Row>
              <Row className="mt-4">
                  <Col lg="6" xl="12">
                      <Card className="card-stats mb-4 mb-xl-0" style={{ height: "700px" }}>
                          <CardBody>

                              <Table className="mt-3" >
                                  <thead>
                                      <tr className='text-center'>
                                          <th style={{ color: "black" }}>#</th>
                                          <th style={{ color: "black" }}> Name</th>
                                          <th style={{ color: "black" }}>Client</th>
                                          <th style={{ color: "black" }}> Location</th>
                                          <th style={{ color: "black" }}> Total crew member</th>
                                          <th style={{ color: "black" }}> Trip Expenses</th>
                                          <th style={{ color: "black" }}>Stats</th>
                                          {
                                        //   <th style={{ color: "black" }}> Actions</th>
                                          }
                                      </tr>
                                  </thead>
                                  <tbody>
                                  {
                                          crewTripData?.length?
                                    
                                                  
                                    
                                   
                                    crewTripData?.map((data,index)=>(
                                        
                                        data?.crewStatus === "approved"&&
                                        <tr className='text-center'>
    
                                            <td>{index+1}</td>
                                            <td>{data?.tripName}</td>
                                            <td>{data?.clientName}</td>
                                            <td>{data?.destinationFrom}</td>
                                            <td>{data?.crewMembers?.length}</td>
                                                <td>
                                                {
                                                    data?.status === "approved"?
                                                <TripExpensesModal tripId={data._id}/>
                                                :
                                                    <h5>pending</h5> 
                                                }
                                                </td>

                                            <td> {data?.status}
                                            
                                            {
                                            //  <UncontrolledDropdown setActiveFromChild>
                                            //     <DropdownToggle tag="a" className="nav-link" caret>
                                            //         Active
                                            //     </DropdownToggle>
                                            //     <DropdownMenu>
                                            //         <DropdownItem tag="a" href="/blah" active>Link</DropdownItem>
                                            //     </DropdownMenu>
                                            // </UncontrolledDropdown>
                                            //     Pending <i className="fa fa-circle ml-1 mb-5"
                                            //         style={{ fontSize: "5px" }} aria-hidden="true"></i>
                                            //     <span className="ml-2">  Date </span>
                                            }
                                            </td>
                                            {
                                            // <td><i className="fa fa-trash"
                                            //     style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                            //     <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px" }} aria-hidden="true"></i>

                                            // </td>
                                            }
                                        </tr>
                                        
                                    ))
                                    
                                        
                                    :
                                    <p className='mt-3'>No trips available!</p>
                                  }
                                      


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

export default CrewTrip;