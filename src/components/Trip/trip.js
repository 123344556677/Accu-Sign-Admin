import React,{useEffect,useState} from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import TripModal from 'components/Modals/TripModal';
import { getAllTrips } from 'Api/api';
import { deleteTrip } from 'Api/api';
import TripEditModal from 'components/Modals/TripEditModal';
import { updateTripStatus } from 'Api/api';
import Swal from "sweetalert2";
const Trip = () => {
    const [TripsData, setTripsData] = useState([]);
    const [status,setStatus]=useState('')
   

    useEffect(() => {
        getAllTrips()
            .then((res) => {
                console.log(res, "======>Trips data")
                setTripsData(res.data)
            })

    }, [])
    const deleteTripById = async (e) => {

        await deleteTrip({ e })
            .then((res) => {
                if (res.data.message === "trip deleted") {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        text: "Trip  deleted",
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
                        text: "Trip  not deleted",
                        color: "black",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            })
    }
    
const handlePending=()=>{
    setStatus("pending")
    console.log(status, "==>status")
}
 const handleApproved = () => {
        setStatus("approved")
    }
const updateStatus=(e)=>{
    console.log(e,"====>id")
    const values={
        tripId:e,
        status:status
    }
    updateTripStatus(values)
        .then((res) => {

            if (res.data.message === "Trip status updated") {

                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Trip status updted",
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
                    text: "Trip status not updated",
                    color: "black",
                    showConfirmButton: false,
                    timer: 2000,
                });
                

            }
        });

}
  return (
      <div>
          <Container fluid>
              <Row className="mt-3">
                  <Col xl={6}>
                      <Link
                          className="h2 mt-3 ml-1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
                          
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
                      <Card className="card-stats mb-4 mb-xl-0" style={{ height: "700px",width:"1000px" }}>
                          <CardBody>

                              <Table className="mt-3" >
                                  <thead>
                                      <tr>
                                          <th style={{ fontSize:"10px", color: "black" }}>#</th>
                                          <th style={{ fontSize: "10px", color: "black" }}> Name</th>
                                          <th style={{ fontSize: "10px", color: "black" }}>Client</th>
                                          <th style={{ fontSize: "10px", color: "black" }}> Location</th>
                                          <th style={{ fontSize: "10px", color: "black" }}> Crew member</th>
                                          <th style={{ fontSize: "10px", color: "black" }}>Stats</th>
                                          <th style={{ fontSize: "10px", color: "black" }}>Add member</th>
                                          <th style={{ fontSize: "10px", color: "black" }}>update status</th>
                                          
                                          <th style={{ color: "black" }}> Actions</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                  {
                                          TripsData?.length?
                                  TripsData?.map((data,index)=>(
                                      <tr>
                                          <td>{index}</td>
                                          <td>{data?.tripName}</td>
                                          <td>Otto</td>
                                          <td>{data?.destinationTo ? data?.destinationTo:"empty"}</td>
                                          <td>{data?.crewMembers?.length}</td>
                                          
                                          
                                          
                                          <td>  <UncontrolledDropdown  >
                                              <DropdownToggle tag="a" className="nav-link" caret >
                                                  {data?.status ? data?.status:"status"}
                                              </DropdownToggle>
                                              <DropdownMenu>
                                                  <DropdownItem tag="a" style={{cursor:"pointer"}} onClick={handlePending} value="pending">pending</DropdownItem>
                                                  <DropdownItem tag="a" style={{cursor:"pointer"}} onClick={handleApproved} value="approved">approved</DropdownItem>
                                              </DropdownMenu>
                                          </UncontrolledDropdown>
                                         
                                          </td>
                                          
                                          <td><TripEditModal tripdata={data} /></td>
                                          <td><button className="btn btn-outline-dark btn-sm" onClick={() => updateStatus(data._id)}

                                               style={{ cursor: "pointer", fontSize: "12px" }}> Update</button></td>

                                          <td><i className="fa fa-trash"
                                              onClick={(e) => deleteTripById(data._id)}
                                              style={{ fontSize: "20px", cursor: "pointer" }} aria-hidden="true"></i>
                                              
                                         

                                          </td>
                                      </tr>
                                  ))
                                     :
                                     <p>No trips Available!</p>
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

export default Trip;