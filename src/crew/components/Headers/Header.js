
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCrewByName } from "Api/api";
import { getUserById } from "Api/api";
import { TripsBycrewId } from "Api/api";

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
  
  
  return (
    <>
      <div className="header bg-white pb-8 pt-5 ">
        <Container fluid>
          <div className="header-body">
           
            {/* Card stats */}
           <Row>
           <Col xl={6}>
                <Card className="card-stats mb-4 mb-xl-0">
                  <h2 className="ml-3 mt-3">Trips</h2>
                  <CardBody>
                 
                    <p style={{ fontWeight: "600", fontSize: "20px" }}> USA</p>
                    <div className="progress ">
                    
                      <div className="progress-bar bg-gray" style={{width:"63%"}}>63%</div>
                    </div>
                    <p style={{ fontWeight: "600", fontSize: "20px" }} > Uk</p>
                    <div className="progress mt-3 ">

                      <div className="progress-bar bg-gray" style={{ width: "91%" }}>91%</div>
                    </div>
                    <p style={{ fontWeight: "600", fontSize: "20px" }} > Dubai</p>
                    <div className="progress  ">

                      <div className="progress-bar bg-gray" style={{ width: "43%" }}>43%</div>
                    </div>
                  </CardBody>
                  </Card>

                <Card className="card-stats mt-5 mb-xl-0">
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

                 
                    <div className="card ml-2 mt-3 mr-2" key={data} style={{
                      backgroundColor: "#e9ecef", border: "none",
                      borderRadius: "0%"
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
                               {data?.crewMembers?.crewType ? data.crewMembers.crewType:""}
                            </span>
                         </p>
                        </Col>
                      </Row>

                        <Row>
                          <Col xl={5}>
                            <button type="button" className="btn pr-5 mt-3 pl-5" style={{
                              backgroundColor: "white",
                              color: "#adad85",
                              borderRadius: "0%"
                            }}>Accept</button>
                          </Col>
                          <Col xl={5}>
                            <button type="button" className="btn mt-3  pr-5 pl-5" style={{
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
