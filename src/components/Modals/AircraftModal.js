import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input, Row } from 'reactstrap';
import FileBase64 from "react-file-base64";
import { addaicraftDetails } from 'Api/api';
import Swal from "sweetalert2";
import '../../views/examples/profile.css'

const AircraftModal = () => {
    const [show, setShow] = useState(false);
    const [aircraftPic, setAircraftPic] = useState();
    const [values, setValues] = useState();

    const handleClose = () => { setShow(false); setAircraftPic() }
    const handleShow = () => { setShow(true); setAircraftPic() }
    const handleAircraftValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values);
    }
    const handleAircraftPic=(e)=>{
        setAircraftPic(e.selectedFile.base64);
        // console.log(e.selectedFile.base64);
    }

    const aircraftValues = {
        values: values,
        aircraftPic: aircraftPic
    }
    const aircraftDetails = async () => {
       
       
        const { aircraftOwner, aircraftOperator, type,
            registrationNumber } = aircraftValues.values;
        const { aircraftPic } = aircraftValues;

        console.log(aircraftOwner, aircraftOperator, type,
            registrationNumber, aircraftPic, "======>exValues")

        if (aircraftOwner&& aircraftOperator&& type&&
            registrationNumber&& aircraftPic) {

            await addaicraftDetails(aircraftValues)
                .then((res) => {
                    if (res.data?.message==="Aircraft Details added"){
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
                    }
                    
else{
                       

                        Swal.fire({
                            position: "center",
                            icon: "error",
                            text: "Details not deleted",
                            color: "black",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        setAircraftPic()
}

                });
        }
        else {
            Swal.fire({
                position: "center",
                icon: "warning",
                text: "Please complete all the fields",
                color: "black",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }
  return (
    <div>
          <div>
              <Button color="secondary" size="lg" className="mt-1 mr-3" style={{ float: "right" }}

                  onClick={handleShow}>+ ADD AIRCRAFT</Button>

              <Modal show={show} onHide={handleClose}>
                  <div className="modal-header px-4">
                      <h2 className="modal-title h4 text-dark">Aircraft Details</h2>
                      <button
                          type="button"
                          className="bg-white border-0"
                          onClick={handleClose}
                      >

                      </button>
                  </div>
                  <Modal.Body className="px-4">
                      <Form>
                          <Input type="email" name="aircraftOwner" id="" className='mt-3'
                           placeholder="Aircraft Owner" onChange={handleAircraftValues}  />
                          
                          <Input type="text" name="aircraftOperator" className='mt-3' id=""
                            onChange={handleAircraftValues} placeholder="Aircraft Operator" />
                          <Input type="select" name="type" id=""
                            onChange={handleAircraftValues} className='mt-3' placeholder="Type" >
                              <option>Type</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                          </Input>
                          <Input type="text" name="registrationNumber" id="" className='mt-3'
                            onChange={handleAircraftValues} placeholder="Registration Number" />
                          <div className="mt-3 card">
                          {
                            aircraftPic?
                            <Row className="justify-content-center">
                              <img src={aircraftPic} style={{width:"70%"}} className="mt-5 mb-5" />
                            </Row>
                              :
                                      <div className="mt-5 mb-5">
                                          <div className='text-center '>

                                              <i className="fa fa-upload cloud-icon" style={{ fontSize: "30px" }} aria-hidden="true"></i>
                                              <p className='custom-file-input'>
                                                  <FileBase64
                                                      type="file"
                                                      className="text-center"
                                                      onDone={(base64) => handleAircraftPic({ selectedFile: base64 })}


                                                  />

                                              </p>
                                          </div>
                                      </div>
                          }
                           
                          </div>
                         
                      </Form>
                  </Modal.Body>
                  <Modal.Footer className="justify-content-between px-4">
                      <Button className="" color="dark" type="button"
                          onClick={aircraftDetails}>
                          CREATE
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

          </div>
    </div>
  )
}

export default AircraftModal