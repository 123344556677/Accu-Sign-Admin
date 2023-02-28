
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCrewByName } from "Api/api";
import { getUserById } from "Api/api";
import { TripsBycrewId } from "Api/api";
import { updateTripStatus } from "Api/api";
import Swal from "sweetalert2";

const Header = () => {

  const [crewData,setCrewData]=useState()
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
  const [usersData, setUsersData] = useState();
 

  
  const values = {
    id: role.id
  }
  useEffect(() => {

    getUserById(values)
      .then((res) => {

        setUsersData(res?.data?.data)
        

      })

  }, [])
  console.log(usersData, "userDtaat======>")


  const Values = {
    crewId: role.id
  }
  useEffect(async () => {
    await TripsBycrewId(Values)
      .then((res) => {
        console.log(res, "======>Trips data")
        setCrewData(res?.data?.data)
      })

  }, [])
    console.log(crewData, "crewDtaat======>")
  
  const updateApprovedStatus=(e)=>{
    console.log(e,"data==========>")
    const values = {
      tripId: e,
      crewStatus:"approved"
    }
    updateTripStatus(values)
      .then((res) => {

        if (res.data.message === "Trip status updated") {

          Swal.fire({
            position: "center",
            icon: "success",
            text: "Trip status updated",
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
  const updateRejectededStatus = (e) => {
    console.log(e, "data==========>")
    const values = {
      tripId: e,
      crewStatus: "rejected"
    }
    updateTripStatus(values)
      .then((res) => {

        if (res.data.message === "Trip status updated") {

          Swal.fire({
            position: "center",
            icon: "success",
            text: "Trip status updated",
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
    <>
      <div className="header bg-white pb-8 pt-5 ">
        <Container fluid>
          <div className="header-body">
           
            {/* Card stats */}
           <Row>
           <Col xl={6}>
                <Card className="card-stats mb-4 mb-xl-0" style={{ boxShadow: " 0 0.5rem 1rem rgba(0, 0, 0, 0.1)" }}>
                  <h2 className="ml-3 mt-3">Trips</h2>
                  <CardBody>
                 
                    <p style={{ fontWeight: "600", fontSize: "20px" }}> USA</p>
                    <div className="progress ">
                    
                      <div className="progress-bar bg-gray" style={{width:"0%"}}>0%</div>
                    </div>
                    <p style={{ fontWeight: "600", fontSize: "20px" }} > Uk</p>
                    <div className="progress mt-3 ">

                      <div className="progress-bar bg-gray" style={{ width: "0%" }}>0%</div>
                    </div>
                    <p style={{ fontWeight: "600", fontSize: "20px" }} > Dubai</p>
                    <div className="progress  ">

                      <div className="progress-bar bg-gray" style={{ width: "0%" }}>0%</div>
                    </div>
                  </CardBody>
                  </Card>

                <Card className="card-stats mt-5 mb-xl-0" style={{ boxShadow: " 0 0.5rem 1rem rgba(0, 0, 0, 0.1)" }}>
                <Row>
                <Col>
                  <h2 className="ml-3 mt-4">Bank Information</h2>
                    </Col>
                    <Col>
                      <div className="custom-control custom-switch ml-5 mt-4">
                    {
                     
                        // <input
                        //   type="checkbox"
                        //   className="custom-control-input"
                        //   id="customSwitches"
                        // />
                        // <label className="custom-control-label" for="customSwitches">
                        //   <i className="fa fa-pencil" aria-hidden="true"></i>
                        // </label>
                    }
                        <Link to='/profile' style={{color:"black"}}>
                             <i className="fa fa-pencil-square-o"  aria-hidden="true"></i></Link>
                      </div>
                    
                     
                    </Col>
                  </Row>

                  <hr/>
                  <CardBody>
                  <p style={{fontWeight:"600"}}>Name:
                  <span className="ml-2"style={{ fontWeight: "500" }}>{usersData?.firstName}</span>
                  </p>
                    <p style={{ fontWeight: "600" }}>Bank:
                        <span className="ml-2" style={{ fontWeight: "500" }}>{usersData?.bankName ? usersData?.bankName : "Update Profile"}</span>
                    </p>
                    <p style={{ fontWeight: "600" }}>Account Number:
                      <span className="ml-2" style={{ fontWeight: "500" }}>{usersData?.accountNumber ? usersData?.accountNumber: "Update Profile"}</span>
                    </p>
                    <p style={{ fontWeight: "600" }}>IBAN:
                      <span className="ml-2" style={{ fontWeight: "500" }}>{usersData?.iban ? usersData?.iban : "Update Profile"}</span>
                    </p>
                   
                  </CardBody>
                </Card>
           </Col>

           <Col xl={6}>
                <Card className="card-stats mb-4 mb-xl-0">
                  <h2 className="ml-3 mt-3">Trip Requests</h2>
                  <hr/>
                  {
                    crewData?.length?
                   
                 crewData?.map((data)=>(
                  
                   data?.crewStatus === "pending" &&
                 
                    <div className="card ml-2 mt-3 mr-2 mb-3" key={data} style={{
                      backgroundColor: "#e9ecef", border: "none",
                      borderRadius: "0%",
                       boxShadow: " 0 0.5rem 1rem rgba(0, 0, 0, 0.1)"
                    }} >
                    <div className="card-body">
                       <h3> {data?.tripName}</h3>
                     <h4 className="mt-2">Hotel: {data?.hotelType}</h4>
                      <Row>
                        <Col xl={5}>
                          <p style={{ fontWeight: "600" }} className="ml-1 mt-2">
                          <i class="fa fa-map-marker" aria-hidden="true"></i><span className="ml-2">
                               {data?.destinationFrom} to  {data?.destinationTo}
                          </span>
                          </p>

                        </Col>
                        <Col xl={5}>
                          
                          <p style={{ fontWeight: "600" }} className=" mt-2">
                            <i class="fa fa-user" aria-hidden="true"></i><span className="ml-2">
                               {
                                  // data?.crewMembers[0]?.crewType ? data?.crewMembers[0]?.crewType:""
                                }
                                 {data?.clientName}
                            </span>
                         </p>
                        </Col>
                      </Row>

                        <Row>
                          <Col xl={5}>
                            <button type="button" className="btn pr-5 mt-3 pl-5"
                            onClick={()=>updateApprovedStatus(data._id)}
                            style={{
                              backgroundColor: "white",
                              color: "#adad85",
                              borderRadius: "0%"
                            }}>Accept</button>
                          </Col>
                          <Col xl={5}>
                            <button type="button" className="btn mt-3  pr-5 pl-5"
                               onClick={() => updateRejectededStatus(data._id)}
                            style={{
                              backgroundColor: "white",
                              color: "#adad85",
                              borderRadius: "0%"
                            }}>Reject</button>
                          </Col>
                        </Row>
                     
                    </div>
                      </div>
                  ))
                 
                 
                 :
                 <p className="ml-2">No trip requests available!</p>
                          }
                    
                 
                </Card>
           
           </Col>
           </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
