import { getUserById } from 'Api/api';
import { addtripDetails } from 'Api/api';
import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { Button, Form, Input, FormGroup,Row,Col, Label, Table } from 'reactstrap';
import CrewNestedModal from './CrewNestedModal';
import Swal from "sweetalert2";
import { getAllAircraft } from 'Api/api';

const TripEditModal = (props) => {
    const [show, setShow] = useState(false);
    const [bar,setBar]=useState("bank");
    const [usersData, setUsersData] = useState();
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
console.log(props,"========>tripData");
    const handleBankBar=()=>{
        setBar("bank")
    }
    const handleRouteBar = () => {
        setBar("route")
    }
    const handleAircraftBar = () => {
        setBar("aircraft")
    }
    const handleCrewBar = () => {
        setBar("crew")
    }
    const [value, setValues] = useState();
    const handleTripValues = (e) => {
        setValues({ ...value, [e.target.name]: e.target.value });
        console.log(values);
    }
    const trip=async()=>{
        setValues({ ...value, clientId: role.id});
        const { tripName,client,fee,
            percentage,description,destinationTo,destinationFrom,
            startDate,endDate,aircraftType,selectAircraft,hotelType, airlineTravel,clientId } = value;
        console.log(tripName, client, fee,
            percentage, description, destinationTo, destinationFrom,
            startDate, endDate, aircraftType, selectAircraft, hotelType, airlineTravel, clientId, "======>exValues")
        if (tripName&& client&& fee,
            percentage, description&& destinationTo&& destinationFrom&&
            startDate&& endDate&& aircraftType, selectAircraft, hotelType&& airlineTravel) {
        await addtripDetails(value)
            .then((res) => {
                handleClose();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Details added",
                    color: "black",
                    showConfirmButton: false,
                    timer: 2000,
                });
                window.location.reload();
                setValues('')

            });
        }
        else {
            handleClose();
            Swal.fire({
                position: "center",
                icon: "warning",
                text: "Please complete all the fields",
                color: "black",
                showConfirmButton: false,
                timer: 2000,
            });
            window.location.reload();
        }
    }
   const handleBasicBarAgain=()=>{
       setBar("route")
    }
    const handleRouteBarAgain = () => {
        setBar("aircraft")
    }
    const handleAircraftBarAgain = () => {
        setBar("crew")
    }

    const values = {
        id: role.id
    }
    useEffect(() => {

        getUserById(values)
            .then((res) => {

                setUsersData(res.data.data)

            })

    }, [])
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
          {
              role.role === "client" ?
                 
                      <button className="btn btn-outline-dark btn-sm"

                       onClick={handleShow} style={{ cursor: "pointer", fontSize: "12px" }}> view Trip</button>
                        
                  :

                  <button className="btn btn-outline-dark btn-sm"

                      onClick={handleShow} style={{ cursor: "pointer", fontSize: "12px" }}> Add </button>
                  
          }

          <Modal show={show} onHide={handleClose}  >
              <div className="modal-header ">
                  <h2 className="modal-title h4 text-dark">Create new trip</h2>
                  
              </div>
              
              <Modal.Body className="px-4" >
                  <Row className='mt-3'>
                      <Col xl={4}>
                          <Link> <h6 className="text-center" value="bankDetail" onClick={handleBankBar}>Bank detail</h6></Link>
                          <div className="progress">
                              <div className="progress-sm-bar bg-dark" style={{width: bar==="bank"? "100%":"0%" }}></div>
                          </div>
                      </Col>
                      <Col xl={4}>
                          <Link> <h6 className="text-center" value="trip" onClick={handleRouteBar} >Date & Route</h6></Link>
                          <div className="progress">
                              <div className="progress-bar bg-dark" style={{ width: bar === "route" ? "100%" : "0%" }}></div>
                          </div>
                      </Col>
                      <Col xl={4}>
                          <Link> <h6 className="text-center" value="trip" onClick={handleAircraftBar}>Aircraft</h6></Link>
                          <div className="progress">
                              <div className="progress-bar bg-dark" style={{ width: bar === "aircraft" ? "100%" : "0%" }}></div>
                          </div>
                      </Col>
                      <Col xl={4}>
                          <Link> <h6 className="text-center" value="trip" onClick={handleCrewBar} >crew member</h6></Link>
                          <div className="progress">
                              <div className="progress-bar bg-dark" style={{ width: bar === "crew" ? "100%" : "0%" }}></div>
                          </div>
                      </Col>
                  </Row> 
                  {bar==="bank"&&
                      <Form>
                          <Input type="text" name="tripName" id="" className='mt-3' value={props?.tripdata?.tripName} onChange={handleTripValues} placeholder="Trip name" />
                          <Input type="select" name="client" id="" className='mt-3' value={props?.tripdata?.client} onChange={handleTripValues} placeholder="Client" >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                          </Input>
                          
                          <Form inline className='mt-3'>


                              <Input type="number" name="Fee" id="exampleEmail" value={props?.tripdata?.Fee} onChange={handleTripValues} placeholder="Fee" />


                              <Input type="text" className='ml-3' name="percentage" value={props?.tripdata?.percentage} onChange={handleTripValues} id="examplePassword" placeholder="Percentage" />
                          </Form>
                          <div className="md-form mt-3">
                              <textarea id="form7" className="md-textarea form-control" value={props?.tripdata?.description} onChange={handleTripValues} name="description" rows="3" placeholder=''></textarea>

                          </div>





                      </Form>
                }
                {
                    bar==="route"&&
                
                  <Form>
                      
                <Form inline className='mt-3'>
                <Row>
                <Col>
                    <Input type="select" name="destinationFrom" value={props?.tripdata?.destinationFrom} onChange={handleTripValues} id="" className='mt-3'  placeholder="Destination from" >
                   <option>Destination from</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
                </Col>
                <Col> 
                    <Input type="select" name="destinationTo" value={props?.tripdata?.destinationTo} onChange={handleTripValues} id="" className='mt-3 ml-5' placeholder="Destination to" >
                    <option>Destination to</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
                </Col>  
                </Row>    
        </Form>

        <Form inline className='mt-3'>
        <Row>
        <Col>
        
        <FormGroup>
        <Label for="exampleDate">Start Date</Label>
        <Input type="date" name="startDate" onChange={handleTripValues} value={props?.tripdata?.startDate} id="exampleDate" placeholder="Start" className='mt-1' />
        </FormGroup>
        </Col>
        <Col>
        <FormGroup>
        <Label for="exampleDate">End Date</Label>
        <Input type="date" name="endDate" onChange={handleTripValues} value={props?.tripdata?.endDate} id="exampleDate" placeholder="End" className='mt-1' />
        </FormGroup>
       </Col>
            </Row>
        </Form>
                      
                      
                     



                  </Form>
                }
                {
                    bar==="aircraft"&&
                    <Form>
                      <Form inline className='mt-3'>
                          
                                  <Input type="select" name="aircraftType" 
                                      onChange={handleTripValues} id="" className='mt-3' value={props?.tripdata?.aircraftType} placeholder="Destination from" >
                                      <option>Aircraft Type</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                  </Input>
                             
                                  <Input type="select" name="selectAircraft"
                                      onChange={handleTripValues} id="" className='mt-3 ml-5' value={props?.tripdata?.selectAircraft} placeholder="Destination to" >
                                      <option>Select aircraft</option>
                                      {
                                          aircraftData.length ?
                                              aircraftData?.map((data, index) => (
                                                  <option>{data.firstName}</option>
                                              ))
                                              :
                                              <option>No aircrafts available</option>
                                      }
                                  </Input>
                              
                          
                      </Form>
                              <Form inline className='mt-3'>

                                  <Input type="select" name="hotelType"
                                    onChange={handleTripValues} id="" className='mt-3' value={props?.tripdata?.hotelType} placeholder="Destination from" >
                                      <option>Hotel type</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                  </Input>

                                  <Input type="select" name="airlineTravel" 
                                      onChange={handleTripValues} id="" className='mt-3 ml-5' value={props?.tripdata?.airlineTravel} placeholder="Destination to" >
                                      <option>Airline travel class</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                  </Input>


                              </Form>
                          </Form>

                }

                {
                    bar==="crew"&&

<Row>
<Col>

<h3 className='mt-3'>Crew member list</h3>
</Col>
{
    role.role==="client"?
    <></>
    :
<Col>

    <CrewNestedModal tripId={props?.tripdata?._id}/>                           
</Col>
}
                              <Table className="mt-3" >
                                  <thead>
                                      <tr>
                                          <th style={{ fontWeight:"700",color: "black", fontSize:"5px"}}>Crew Name</th>
                                          <th style={{ fontWeight: "700",color: "black", fontSize: "5px" }}> Client Rate</th>
                                          <th style={{ fontWeight: "700",color: "black", fontSize: "5px" }}> Per Diems</th>
                                          <th style={{ fontWeight: "700", color: "black", fontSize: "5px" }}>Crew Rate </th>
                                          <th style={{ fontWeight: "700",color: "black", fontSize: "5px" }}> Per Diems</th>
                                         
                                          <th style={{ fontWeight: "700", color: "black", fontSize: "5px" }}> VAT% </th>
                                          <th style={{ fontWeight: "700",color: "black", fontSize: "5px" }}> Actions</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                  {
                                props?.tripdata?.crewMembers.map((data)=>(
                                    <tr>
                                        <td>{data?.crewName}</td>
                                        <td>{data?.dailyRateClient}</td>
                                        
                                        <td>{data?.perDiemsClient}</td>
                                        <td>{data?.dailyRateCrew}</td>
                                        <td>{data?.perDiemsCrew}</td>
                                        <td>10%</td>

                                        <td><i className="fa fa-trash"
                                            style={{ fontSize: "15px" }} aria-hidden="true"></i>
                                            {
                                                role.role === "client" ?
                                                    <></>
                                                    :
                                            <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                            }

                                        </td>
                                    </tr>

                                ))
                                      
                                  }
                                     


                                  </tbody>
                              </Table>
</Row>
                      
                }
              </Modal.Body>
              <Modal.Footer className="justify-content-between px-4">
             
                          <button
                              className="btn btn-danger"
                              variant="danger"
                              onClick={handleClose}
                          >
                              Close
                          </button>
                     
                  
              </Modal.Footer>
          </Modal></div>
  )
}
export default TripEditModal;