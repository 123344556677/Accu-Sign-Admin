import { createClient } from 'Api/api';
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input,FormGroup } from 'reactstrap';
import Swal from "sweetalert2";

const ClientModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
      const [values,setValues]=useState();
    const handleClientValues=(e)=>{
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values);
    }
    const client= async () => {
        console.log(values, "==========>regValues")
        const { firstName, lastName, phoneNumber, email, registrationNumber } = values;
        console.log(firstName, lastName, phoneNumber, email, registrationNumber,"======>exValues")
        if (firstName&& lastName&& phoneNumber&& email&& registrationNumber) {

            await createClient(values)
                .then((res) => {

                    if (res.data.message === "Email Sent") {
                        
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            text: "Email sent to client",
                            color: "black",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                       
                    }
                    else {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            text: "Email not sent to client",
                            color: "black",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        
                        
                        
                    }
                });
        }
        else {
            handleClose();
            Swal.fire({
                position: "center",
                icon: "error",
                text: "Please complete all th field",
                color: "black",
                showConfirmButton: false,
                timer: 2000,
            });
            handleClose();
        }
    }
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
                          
                              
                              <Input type="text" name="firstName" id="exampleEmail" placeholder="First name" onChange={handleClientValues} />
                        
                              
                          <Input type="text" className='ml-3' name="lastName" id="examplePassword" placeholder="Last name" onChange={handleClientValues} />
                              
                              

                          
                      </Form>
                      <Input type="number" name="phoneNumber" id="" className='mt-3' placeholder="Phone Number" onChange={handleClientValues} />
                      <Input type="email" name="email" id="" className='mt-3' placeholder="Email" onChange={handleClientValues} />
                      <Input type="number" name="registrationNumber" id="" className='mt-3' placeholder="Registration Number" onChange={handleClientValues} />
                      
                     
                  </Form>
              </Modal.Body>
              <Modal.Footer className="justify-content-between px-4">
                  <Button className="" color="dark" type="button"
                      onClick={client}>
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