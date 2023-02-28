import React,{useEffect,useState} from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AircraftModal from 'components/Modals/AircraftModal';
import { getAllAircraft } from 'Api/api';
import { deleteAircraft } from 'Api/api';
import Swal from "sweetalert2";
const Aircraft = () => {
    const [aircraftData, setAircratData] = useState([]);
    useEffect(() => {
        getAllAircraft()
            .then((res) => {
                console.log(res, "======>airtabletData")
                setAircratData(res.data)
            })

    }, [])
    const deleteAircraftById = async (e) => {

        await deleteAircraft({ e })
            .then((res) => {
                if (res.data.message === "aircraft deleted") {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        text: "Aircraft deleted ",
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
                        text: "Aircraft not deleted",
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
                          
                      >
                          AIRCRAFT list
                      </Link>
                  </Col>
                  <Col xl={6}>
                     <AircraftModal/>
                  </Col>
              </Row>
              <Row className="mt-4">
                  <Col lg="6" xl="12">
                      <Card className="card-stats mb-4 mb-xl-0" style={{ height: "700px" }}>
                          <CardBody>

                              <Table className="mt-3" >
                                  <thead>
                                      <tr className='text-center'>
                                          <th style={{ color: "black" }}>Photo</th>
                                          {
                                        //   <th style={{ color: "black" }}> client</th>
                                          }
                                          <th style={{ color: "black" }}>Owner</th>
                                          <th style={{ color: "black" }}>Operator</th>
                                          <th style={{ color: "black" }}> Phone Number</th>
                                          <th style={{ color: "black" }}> Type</th>
                                          <th style={{ color: "black" }}> Registration number</th>
                                          <th style={{ color: "black" }}> Actions</th>
                                      </tr>
                                  </thead>
                                  <tbody>

                                {
                                          aircraftData.length ?
                                    aircraftData?.map((data,index)=>(
                                        <tr className='text-center'>
                                            <td>
                                                <span className="avatar avatar-sm rounded-circle">
                                                    <img
                                                        alt="..."
                                                        src={data.aircraftPic? data.aircraftPic: require
                                                            ("../../assets/img/theme/team-4-800x800.jpg")}
                                                    />
                                                </span>
                                            </td>
                                            
                                            {
                                            // <td>{data.aircraftClient ? data.aircraftClient:"empty"}</td>
                                            }
                                            <td>{data.aircraftOwner}</td>
                                            <td>{data.aircraftOperator}</td>
                                            <td>{data.registrationNumber}</td>
                                            <td>{data.type}</td>
                                            <td>{data.registrationNumber}</td>
                                            <td><i className="fa fa-trash"
                                                onClick={(e) => deleteAircraftById(data._id)}
                                                style={{ fontSize: "20px", cursor: "pointer" }} aria-hidden="true"></i>
                                       {
                            // <i className="fa fa-ellipsis-v ml-3"
                            //  style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                       }

                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <p >No aircrafts Available!</p>
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