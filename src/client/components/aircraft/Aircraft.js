import React, { useEffect, useState } from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AircraftModal from 'components/Modals/AircraftModal';
import { getAllAircraft } from 'Api/api';
const Aircraft = () => {
    const [aircraftData, setAircratData] = useState([]);
    useEffect(() => {
        getAllAircraft()
            .then((res) => {
                console.log(res, "======>airtabletData")
                setAircratData(res.data)
            })

    }, [])
    return (
        <div>
            <Container fluid>
                <Row className="mt-3">
                    <Col xl={6}>
                        <Link
                            className="h2 mt-3 ml-1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
                            to="/"
                        >
                            AIRCRAFT list
                        </Link>
                    </Col>
                    <Col xl={6}>
                    {
                        // <AircraftModal />
                    }
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col lg="6" xl="12">
                        <Card className="card-stats mb-4 mb-xl-0" style={{ height: "700px" }}>
                            <CardBody>

                                <Table className="mt-3" >
                                    <thead>
                                        <tr>
                                            
                                            
                                            <th style={{ color: "black" }}>Owner</th>
                                            <th style={{ color: "black" }}>Operator</th>
                                           
                                            <th style={{ color: "black" }}> Type</th>
                                            <th style={{ color: "black" }}> Registration number</th>
                                            <th style={{ color: "black" }}> Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            aircraftData?.lenght?
                                            aircraftData?.map((data, index) => (
                                                <tr>
                                                {
                                                    // <td>
                                                    //     <span className="avatar avatar-sm rounded-circle">
                                                    //         <img
                                                    //             alt="..."
                                                    //             src={data.aircraftPic ? data.aircraftPic : require
                                                    //                 ("../../assets/img/theme/team-4-800x800.jpg")}
                                                    //         />
                                                    //     </span>
                                                    // </td>

                                                    // <td>{data.aircraftClient ? data.aircraftClient : "empty"}</td>
                                                }
                                                    <td>{data.aircraftOwner}</td>
                                                    <td>{data.aircraftOperator}</td>
                                                    <td>{data.type}</td>
                                                    <td>{data.registrationNumber}</td>
                                                    
                                                    {
                                                    // <td>{data.registrationNumber}</td>
                                                    }
                                                    <td><i className="fa fa-trash"
                                                        style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                                        {
                                                            // <i className="fa fa-ellipsis-v ml-3"
                                                            //  style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                                        }

                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <p className='mt-2'>No aircrafts available!</p>
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

export default Aircraft