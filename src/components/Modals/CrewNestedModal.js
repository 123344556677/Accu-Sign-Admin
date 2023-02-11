import { addCrewToTrips } from 'Api/api';
import { getAllCrew } from 'Api/api';
import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input, FormGroup, Label } from 'reactstrap';

const CrewNestedModal = (props) => {
    const [show, setShow] = useState(false);
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    const [crewData,setCrewData]=useState([])
    const [values, setValues]=useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNestedCrewValues=(e)=>{
        setValues({ ...values, [e.target.name]: e.target.value });
        setValues({ ...values, tripId: props.tripId });
        console.log(values);
    }
    const crewMemberToTrip=async()=>{
        
        const { crewName,
            dailyRateCrew,
            dailyRateClient,
            perDiemsCrew,
            perDiemsClient } = values;
        console.log(crewName,
            dailyRateCrew,
            dailyRateClient,
            perDiemsCrew,
            perDiemsClient, "======>exValues")
        if (crewName,
            dailyRateCrew,
            dailyRateClient,
            perDiemsCrew,
            perDiemsClient) {
      await addCrewToTrips(values)
          .then((res) => {
              console.log(res, "======>crewtableData")
              if (res.data.message === "crew Added") {

                  alert("crew member created");
                  handleClose();
              }
              else {
                  alert("server error");
                  

              }
             
               handleClose();
          })
        }
        else{
            
            alert("please complete all the fields")
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
                          <Input type="select" name="crewName" id="" className='mt-3 ml-2 pr-5 pl-5' onChange={handleNestedCrewValues} placeholder="" >
                          <option>Member</option>
                          {
                            crewData.map((data,index)=>(
                                <option values={ data.firstName }>{data.firstName}</option>
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