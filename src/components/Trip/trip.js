import React,{useEffect,useState} from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import TripModal from 'components/Modals/TripModal';
import { getAllTrips } from 'Api/api';
import { deleteTrip } from 'Api/api';
import TripEditModal from 'components/Modals/TripEditModal';
import { updateTripStatus } from 'Api/api';
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
                    alert("trip deleted");
                    window.location.reload();
                }
                else {
                    alert("trip not deleted");
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

                alert("Trip status updated");

            }
            else {
                alert("Trip status not updated");
                

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
                                  {
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
                                          {
                                            //   Pending <i className="fa fa-circle ml-1 mb-5"
                                            //       style={{ fontSize: "5px" }} aria-hidden="true"></i>
                                            //   <span className="ml-2">  Date </span>
                                          }
                                          </td>
                                          <td><i className="fa fa-trash"
                                              onClick={(e) => deleteTripById(data._id)}
                                              style={{ fontSize: "20px", cursor: "pointer" }} aria-hidden="true"></i>
                                              <UncontrolledDropdown setActiveFromChild>
                                                  <DropdownToggle tag="a" className="nav-link" caret>
                                                      <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px", cursor: "pointer", position: "absolute!important", marginBottom: "50px!important" }} aria-hidden="true"></i>
                                                  </DropdownToggle>
                                                  <DropdownMenu>
                                                     <TripEditModal tripdata={data}  />
                                                      <DropdownItem  style={{ cursor: "pointer" }} onClick={()=>updateStatus(data._id)} value="approved">Update Status</DropdownItem>
                                                  </DropdownMenu>
                                              </UncontrolledDropdown>
                                         

                                          </td>
                                      </tr>
                                  ))
                                     
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