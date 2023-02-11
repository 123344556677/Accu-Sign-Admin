import { addtripDetails } from 'Api/api';
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { Button, Form, Input, FormGroup,Row,Col, Label, Table } from 'reactstrap';
import CrewNestedModal from './CrewNestedModal';

const TripModal = () => {
    const [show, setShow] = useState(false);
    const [bar,setBar]=useState("bank");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
    const [values, setValues] = useState();
    const handleTripValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values);
    }
    const trip=async()=>{
        const { tripName,client,fee,
            percentage,description,destinationTo,destinationFrom,
            startDate,endDate,aircraftType,selectAircraft,hotelType, airlineTravel } = values;
        console.log(tripName, client, fee,
            percentage, description, destinationTo, destinationFrom,
            startDate, endDate, aircraftType, selectAircraft, hotelType, airlineTravel, "======>exValues")
        if (tripName, client, fee,
            percentage, description, destinationTo, destinationFrom,
            startDate, endDate, aircraftType, selectAircraft, hotelType, airlineTravel) {
        await addtripDetails(values)
            .then((res) => {

                alert("Details added");
                setValues('')

            });
        }
        else {
            alert("Please Complete all fields")
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
  return (
      <div><Button color="secondary" size="lg" className="mt-1 mr-3" style={{ float: "right" }}

          onClick={handleShow}>+ CREATE NEW TRIP
      </Button>

          <Modal show={show} onHide={handleClose} >
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
                          <Input type="text" name="tripName" id="" className='mt-3' onChange={handleTripValues} placeholder="Trip name" />
                          <Input type="select" name="client" id="" className='mt-3' onChange={handleTripValues} placeholder="Client" >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                          </Input>
                          
                          <Form inline className='mt-3'>


                              <Input type="number" name="Fee" id="exampleEmail" onChange={handleTripValues} placeholder="Fee" />


                              <Input type="text" className='ml-3' name="percentage" onChange={handleTripValues} id="examplePassword" placeholder="Percentage" />
                          </Form>
                          <div className="md-form mt-3">
                              <textarea id="form7" className="md-textarea form-control" onChange={handleTripValues} name="description" rows="3" placeholder=''></textarea>

                          </div>





                      </Form>
                }
                {
                    bar==="route"&&
                
                  <Form>
                      
                <Form inline className='mt-3'>
                <Row>
                <Col>
                    <Input type="select" name="destinationFrom" onChange={handleTripValues} id="" className='mt-3'  placeholder="Destination from" >
                   <option>Destination from</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
                </Col>
                <Col> 
                    <Input type="select" name="destinationTo" onChange={handleTripValues} id="" className='mt-3 ml-5' placeholder="Destination to" >
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
        <Input type="date" name="startDate" onChange={handleTripValues} id="exampleDate" placeholder="Start" className='mt-1' />
        </FormGroup>
        </Col>
        <Col>
        <FormGroup>
        <Label for="exampleDate">End Date</Label>
        <Input type="date" name="endDate" onChange={handleTripValues} id="exampleDate" placeholder="End" className='mt-1' />
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
                                      onChange={handleTripValues} id="" className='mt-3' placeholder="Destination from" >
                                      <option>Aircraft Type</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                  </Input>
                             
                                  <Input type="select" name="selectAircraft"
                                    onChange={handleTripValues} id="" className='mt-3 ml-5' placeholder="Destination to" >
                                      <option>Select aircraft</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                  </Input>
                              
                          
                      </Form>
                              <Form inline className='mt-3'>

                                  <Input type="select" name="hotelType"
                                    onChange={handleTripValues} id="" className='mt-3' placeholder="Destination from" >
                                      <option>Hotel type</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                  </Input>

                                  <Input type="select" name="airlineTravel" 
                                    onChange={handleTripValues} id="" className='mt-3 ml-5' placeholder="Destination to" >
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
<Col>

       <CrewNestedModal/>                           
</Col>
                              <Table className="mt-3" >
                                  <thead>
                                      <tr>
                                          <th style={{ color: "black", fontSize:"8px"}}>Crew Name</th>
                                          <th style={{ color: "black", fontSize: "8px" }}> Client Appendix 1</th>
                                          <th style={{ color: "black", fontSize: "8px" }}>Crew Appendix 1 </th>
                                          <th style={{ color: "black", fontSize: "8px" }}> VAT% </th>
                                          <th style={{ color: "black", fontSize: "8px" }}> Actions</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                          <td>1</td>
                                          <td>Mark</td>
                                          <td>Otto</td>
                                          <td>@mdo</td>
                                          

                                          <td><i className="fa fa-trash"
                                              style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                              <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px" }} aria-hidden="true"></i>

                                          </td>
                                      </tr>
                                      <tr>
                                          <td>1</td>
                                          <td>Mark</td>
                                          <td>Otto</td>
                                          <td>@mdo</td>

                                         
                                          <td><i className="fa fa-trash"
                                              style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                              <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px" }} aria-hidden="true"></i>

                                          </td>



                                      </tr>


                                  </tbody>
                              </Table>
</Row>
                      
                }
              </Modal.Body>
              <Modal.Footer className="justify-content-between px-4">
              {
                
                      bar === "route"&&
                          <>
                  <Button className="" color="dark" type="button"
                      onClick={handleRouteBarAgain}>
                      SAVE
                  </Button>
                  <button
                      className="btn btn-danger"
                      variant="danger"
                      onClick={handleClose}
                  >
                      Close
                  </button>
                  </>
              }
                  {

                      bar === "aircraft" &&
                      <>
                          <Button className="" color="dark" type="button"
                              onClick={handleAircraftBarAgain}>
                              SAVE
                          </Button>
                          <button
                              className="btn btn-danger"
                              variant="danger"
                              onClick={handleClose}
                          >
                              Close
                          </button>
                      </>
                  }
                  {bar === "bank"&&
                  <>
                  <Button className="" color="dark" type="button"
                      onClick={handleBasicBarAgain}>
                      CREATE
                  </Button>
                  <button
                      className="btn btn-danger"
                      variant="danger"
                      onClick={handleClose}
                  >
                      Close
                  </button>
                      </>
              }
                  {bar === "crew" &&
                      <>
                          <Button className="" color="dark" type="button"
                              onClick={trip}>
                              CREATE
                          </Button>
                          <button
                              className="btn btn-danger"
                              variant="danger"
                              onClick={handleClose}
                          >
                              Close
                          </button>
                      </>
                  }
              </Modal.Footer>
          </Modal></div>
  )
}
export default TripModal;