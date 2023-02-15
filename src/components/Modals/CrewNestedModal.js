import { getCrewByKey } from 'Api/api';
import { addTripWithCrew } from 'Api/api';
import { addCrewToTrips } from 'Api/api';
import { getAllCrew } from 'Api/api';
import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input, FormGroup, Label } from 'reactstrap';
import Swal from "sweetalert2";
const CrewNestedModal = (props) => {
    const [show, setShow] = useState(false);
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    const [crewData,setCrewData]=useState([])
    const [crewAuthData, setCrewAuthData] = useState([])
    const [values, setValues]=useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
console.log(props,"=============>tripvalues")
    const handleNestedCrewValues=(e)=>{
        setValues({ ...values, [e.target.name]: e.target.value });
        
        console.log(values,"==========>nestedvalues");
    }
    const crewMemberToTrip=async()=>{
        if (props?.tripId) {
            setValues({ ...values, tripId: props?.tripId });
            const { crewId,
                dailyRateCrew,
                dailyRateClient,
                perDiemsCrew,
                perDiemsClient,crewType } = values;
            console.log(crewId,
                dailyRateCrew,
                dailyRateClient,
                perDiemsCrew,
                perDiemsClient, crewType , "======>exValues")
            if (crewId &&
                dailyRateCrew &&
                dailyRateClient &&
                perDiemsCrew &&
                crewType &&
                perDiemsClient) {
                await addCrewToTrips(values)
                    .then((res) => {
                        console.log(res, "======>crewtableData")
                        if (res.data.message === "crew Added") {
                            handleClose();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                text: "Crew added",
                                color: "black",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                            window.location.reload();
                            

                        }
                        else {
                            handleClose();
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                text: "Crew member not added",
                                color: "black",
                                showConfirmButton: false,
                                timer: 2000,
                            });


                        }

                        
                    })
            }
            else {
                handleClose();
                Swal.fire({
                    position: "center",
                    icon: "error",
                    text: "Please complete all the fields",
                    color: "black",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        }
        else{
            const { crewId,
                dailyRateCrew,
                dailyRateClient,
                perDiemsCrew,
                perDiemsClient, crewType } = values;
            const Values={
                tripName: props?.crewValues?.tripName, client: props?.crewValues?.client, fee: props?.crewValues?.fee,
                percentage: props?.crewValues?.percentage, description: props?.crewValues?.description,
                destinationTo: props?.crewValues?.destinationTo, destinationFrom: props?.crewValues?.destinationFrom,
                startDate: props?.crewValues?.startDtae, endDate: props?.crewValues?.client, aircraftType: props?.crewValues?.client, selectAircraft: props.crewValues.client,
                hotelType: props?.crewValues?.client, airlineTravel: props?.crewValues?.client,
                crewId:crewId,
                dailyRateCrew:dailyRateCrew,
                dailyRateClient:dailyRateClient,
                perDiemsCrew:perDiemsCrew,
                perDiemsClient:perDiemsClient,
                crewType:crewType 
            }
            addTripWithCrew(Values)
                .then((res) => {
                    console.log(res, "======>crewtableData")
                    if (res.data.message === "Trip Details added") {
                        handleClose();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            text: "Trip added",
                            color: "black",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        
                        window.location.reload();
                    }
                    else {
                        handleClose();
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            text: "Trip not added",
                            color: "black",
                            showConfirmButton: false,
                            timer: 2000,
                        });


                    }

                    handleClose();
                })

        }
        
        
    }
    console.log(props,"=========>tripid")
    useEffect(() => {
        getAllCrew()
            .then((res) => {
                console.log(res, "======>crewtableData")
                setCrewData(res.data)

            })

    }, [])
    useEffect(() => {
        getCrewByKey()
            .then((res) => {
                console.log(res, "======>crewauthData")
                setCrewAuthData(res?.data)

            })

    }, [])
  return (
      <div><div>
          <Button color="secondary" size="lg" className="mt-1 mr-3" style={{ float: "right" }}

              onClick={handleShow}>+ ADD MEMBER
          </Button>

          <Modal show={show} onHide={handleClose}>
              <div className="modal-header px-4">
                  <h2 className="modal-title h4 text-dark">Add crew member</h2>
                  <button
                      type="button"
                      className="bg-white border-0"
                      onClick={handleClose}
                  >

                  </button>
              </div>
              <Modal.Body className="px-4">
                  <Form>
                  <Form inline>
                      <Input type="select" name="crewType" id="" className='mt-3 pr-5 pl-5' placeholder="" onChange={handleNestedCrewValues} >
                          <option>Type</option>
                          <option value="flightCrew">Flight Crew</option>
                          <option value="cabinCrew">Cabin Crew</option>
                          <option value="maintenance">Maintenance</option>
                         
                      </Input>
                          <Input type="select" name="crewId" id="" className='mt-3 ml-2 pr-5 pl-5' onChange={handleNestedCrewValues} placeholder="" >
                          <option>Member</option>
                          
                              {
                                  crewAuthData?.data?.map((data, index) => (
                                      <option value={data?._id} key={index}>{data?.firstName}</option>
                                  ))
                              }
                          
                          
                      </Input>
                      </Form>
                      <Label for="exampleDate" className='mt-3 ml-2' style={{ fontSize: "15px" }}>Crew Members Appendex A</Label>
                      <Form inline>
                    
                    <Input type="number" name="dailyRateCrew" className='' onChange={handleNestedCrewValues} id="" placeholder="Daily Rate" />
                    <Input type="number" name="perDiemsCrew" id="" className=' ml-2' onChange={handleNestedCrewValues} placeholder="Per Diems" />
                     
                      </Form>
                      <Label for="exampleDate" className='mt-3 ml-2' style={{ fontSize: "15px" }}>Clients Appendex 1</Label>
                      <Form inline>
                          <Input type="number" name="dailyRateClient" className='' onChange={handleNestedCrewValues}  id="" placeholder="Daily Rate" />
                          <Input type="number" name="perDiemsClient" id="" className=' ml-2' onChange={handleNestedCrewValues} placeholder="Per Diems" />

                      </Form>
                      
                  </Form>
              </Modal.Body>
              <Modal.Footer className="justify-content-between px-4">
                  <Button className="" color="dark" type="button"
                      onClick={crewMemberToTrip}>
                      SAVE
                  </Button>
                  <button
                      className="btn btn-danger"
                      variant="danger"
                      onClick={handleClose}
                  >
                      Close
                  </button>
              </Modal.Footer>
          </Modal>

      </div></div>
  )
}

export default CrewNestedModal