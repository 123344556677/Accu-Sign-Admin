import React,{useEffect,useState} from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import CrewModal from 'components/Modals/CrewModal';
import { getAllCrew } from 'Api/api';
import { deleteCrew } from 'Api/api';
import Swal from "sweetalert2";
import { getCrewByKey } from 'Api/api';
import { deleteUser } from 'Api/api';
const Crew = () => {
    const [crewData, setCrewData] = useState([])

    useEffect(() => {
        getCrewByKey()
            .then((res) => {
                console.log(res, "======>crewauthData")
                setCrewData(res?.data?.data)

            })

    }, [])
    const deleteCrewById = async (e) => {

        await deleteUser({ e })
            .then((res) => {
                if (res.data.message === "user deleted") {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        text: "Crew deleted",
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
                        text: "Crew not deleted",
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
                                      <tr className='text-center'>
                                          <th style={{ color: "black" }}>#</th>
                                          <th style={{ color: "black" }}> Name</th>
                                          {
                                            // <th style={{ color: "black" }}>Type</th>
                                        }
                                          <th style={{ color: "black" }}> Phone Number</th>
                                          <th style={{ color: "black" }}> Email</th>
                                          <th style={{ color: "black" }}> Actions</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                  {
                                          crewData?.length?
                                    crewData?.map((data,index)=>(
                                        <tr className='text-center'>
                                            <td>{index+1}</td>
                                            <td>{data.firstName}</td>
                                            { 
                                            // <td>{data.crewType?data.crewType:"empty"}</td>
                                        }
                                            <td>{data.phoneNumber}</td>
                                            <td>{data.email}</td>

                                            <td><i className="fa fa-trash"
                                                style={{ fontSize: "20px", cursor: "pointer" }} aria-hidden="true"
                                                onClick={(e) => deleteCrewById(data._id)}></i>
                                              {  // <i className="fa fa-ellipsis-v ml-3" 
                                                // style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                            }

                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <p>No crew Available!</p>
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

export default Crew;