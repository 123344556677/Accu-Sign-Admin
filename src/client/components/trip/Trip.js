import React, { useEffect, useState } from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import TripModal from 'components/Modals/TripModal';
import { getAllTrips } from 'Api/api';
import { TripsByclientId } from 'Api/api';
import TripEditModal from 'components/Modals/TripEditModal';
import PaymentModal from 'components/Modals/PaymentModal';
import { deleteTrip } from 'Api/api';
import Swal from "sweetalert2";
const ClientTrip = () => {
    const [TripsData, setTripsData] = useState([]);
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
const values={
    clientId:role.id
}
    useEffect(async() => {
        await TripsByclientId(values)
            .then((res) => {
                console.log(res, "======>Trips data")
                setTripsData(res?.data?.data)
            })

    }, [])
    const deleteTripById = async (e) => {

        await deleteTrip({ e })
            .then((res) => {
                if (res.data.message === "trip deleted") {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        text: "Trip deleted",
                        color: "black",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    window.location.reload();
                }
                else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        text: "Trip not deleted",
                        color: "black",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            })
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
                        <TripModal />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col lg="6" xl="12">
                        <Card className="card-stats mb-4 mb-xl-0" style={{ height: "700px",width:"1000px" }}>
                            <CardBody>

                                <Table className="mt-3" >
                                    <thead>
                                        <tr className='text-center'>
                                            <th style={{ fontSize:"10px", color: "black" }}>#</th>
                                            <th style={{ fontSize: "10px", color: "black" }}> Name</th>
                                            {
                                            // <th style={{ fontSize: "10px", color: "black" }}>Client</th>
                                            }
                                            <th style={{ fontSize: "10px", color: "black" }}> Location</th>
                                            <th style={{ fontSize: "10px", color: "black" }}> Crew member</th>
                                            <th style={{ fontSize: "10px", color: "black" }}>Stats</th>
                                            <th style={{ fontSize: "10px", color: "black" }}> Details</th>
                                            <th style={{ fontSize: "10px", color: "black" }}> Payment</th>
                                              
                                           
                                            <th style={{ fontSize: "10px", color: "black" }}> Actions</th>
                                         
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            TripsData?.length?
                                            TripsData?.map((data, index) => (
                                                <tr className='text-center' >
                                                    <td>{index+1}</td>
                                                    <td>{data?.tripName}</td>
                                                    {
                                                    // <td>Otto</td>
                                                    }
                                                    <td>{data?.destinationTo ? data?.destinationTo : "empty"}</td>
                                                    <td>{data?.crewMembers?.length}</td>
                                                    <td> 
                                                        <h6>
                                                            {data?.status?data?.status:""}
                                                        </h6>
                                                       
                                                    </td>
                                                    <td >
                                                        <TripEditModal tripdata={data} />
                                                    </td>
                                                    <td >
                                                    {
                                                        data.status==="approved"&&
                                                            data.payment === "pending" &&
                                                           

                                                                <PaymentModal tripdata={data} />
                                                            
                                                    }
                                                    {
                                                             data.status==="pending"&&
                                                            

                                                            <h5>pending</h5> 
                                                            
                                                    }
                                                    {
                                                        data.payment === "approved" &&
                                                      

                                                            <h5>paid</h5> 
                                                       
                                                    }
                                                    </td>
                                                    
                                                    <td><i className="fa fa-trash"
                                                        style={{ fontSize: "20px",cursor:"pointer" }} onClick={(e) => deleteTripById(data._id)} aria-hidden="true"></i>
                                                        
                                                        
                                                                
                                                              
                                                       
                                                    </td>
                                                    
                                                </tr>
                                            ))
                                            :
                                            <p>No trips avilable!</p>

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

export default ClientTrip;