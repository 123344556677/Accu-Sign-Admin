import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input,FormGroup } from 'reactstrap';

const ClientModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div>
          <Button color="secondary" size="lg" className="mt-1 mr-3" style={{ float: "right" }}

              onClick={handleShow}>+ CREATE CLIENT</Button>

          <Modal show={show} onHide={handleClose}>
              <div className="modal-header px-4">
                  <h2 className="modal-title h4 text-dark">Create Client Account</h2>
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
                          
                              
                              <Input type="text" name="firstName" id="exampleEmail" placeholder="First name" />
                        
                              
                              <Input type="text" className='ml-3' name="lastName" id="examplePassword" placeholder="Last name" />
                              
                              

                          
                      </Form>
                      <Input type="number" name="phoneNumber" id="" className='mt-3' placeholder="Phone Number" />
                      <Input type="email" name="email" id="" className='mt-3' placeholder="Email" />
                      <Input type="number" name="registrationNumber" id="" className='mt-3' placeholder="Registration Number" />
                      
                     
                  </Form>
              </Modal.Body>
              <Modal.Footer className="justify-content-between px-4">
                  <Button className="" color="dark" type="button"
                      onClick={handleClose}>
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
  )
}

export default ClientModal