import { createCrew } from 'Api/api';
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input, FormGroup } from 'reactstrap';

const CrewModal = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [values, setValues] = useState();
    const handleCrewValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values);
    }
    const crew = async () => {
        console.log(values, "==========>regValues")
        const { firstName, lastName, phoneNumber, email, bank } = values;
        console.log(firstName, lastName, phoneNumber, email, bank, "======>exValues")
        if (firstName, lastName, phoneNumber, email, bank) {

            await createCrew(values)
                .then((res) => {

                    if (res.data.message === "Email already exist") {

                        alert("Email already exist");

                    }
                    else {
                        alert("Crew member created");
                        handleClose();

                    }
                });
        }
        else {
            alert("Please Complete all fields")
        }
    }
  return (
    <div>
          <div>
              <Button color="secondary" size="lg" className="mt-1 mr-3" style={{ float: "right" }}

                  onClick={handleShow}>+ CREATE CREW
             </Button>

              <Modal show={show} onHide={handleClose}>
                  <div className="modal-header px-4">
                      <h2 className="modal-title h4 text-dark">Create Crew Account</h2>
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


                              <Input type="text" name="firstName"
                               id="exampleEmail" placeholder="First name" onChange={handleCrewValues} />


                              <Input type="text" className='ml-3' name="lastName" 
                                  id="examplePassword" placeholder="Last name" onChange={handleCrewValues} />




                          </Form>
                          <Input type="select" name="bank" id="" className='mt-3' placeholder="Bank" onChange={handleCrewValues} >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                          </Input>
                          <Input type="number" name="phoneNumber" id="" className='mt-3' placeholder="Phone Number" onChange={handleCrewValues} />
                          <Input type="email" name="email" id="" className='mt-3' placeholder="Email" onChange={handleCrewValues} />
                          


                      </Form>
                  </Modal.Body>
                  <Modal.Footer className="justify-content-between px-4">
                      <Button className="" color="dark" type="button"
                          onClick={crew}>
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

export default CrewModal