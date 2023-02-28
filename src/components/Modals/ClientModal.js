import { createClient } from 'Api/api';
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input,FormGroup, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import Swal from "sweetalert2";

const ClientModal = () => {
    const countryCodes = [
        { value: '+1', label: '+1' },
        { value: '+7', label: '+7' },
        { value: '+20', label: '+20' },
        { value: '+27', label: '+27' },
        { value: '+30', label: '+30' },
        { value: '+31', label: '+31' },
        { value: '+32', label: '+32' },
        { value: '+33', label: '+33' },
        { value: '+34', label: '+34' },
        { value: '+36', label: '+36' },
        { value: '+39', label: '+39' },
        { value: '+40', label: '+40' },
        { value: '+41', label: '+41' },
        { value: '+43', label: '+43' },
        { value: '+44', label: '+44' },
        { value: '+45', label: '+45' },
        { value: '+46', label: '+46' },
        { value: '+47', label: '+47' },
        { value: '+48', label: '+48' },
        { value: '+49', label: '+49' },
        { value: '+51', label: '+51' },
        { value: '+52', label: '+52' },
        { value: '+53', label: '+53' },
        { value: '+54', label: '+54' },
        { value: '+55', label: '+55' },
        { value: '+56', label: '+56' },
        { value: '+57', label: '+57' },
        { value: '+58', label: '+58' },
        { value: '+60', label: '+60' },
        { value: '+61', label: '+61' },
        { value: '+91', label: '+91' },
        { value: '+92', label: '+92' },
        { value: '+93', label: '+93' },
        { value: '+94', label: '+94' },
        { value: '+95', label: '+95' },
        { value: '+96', label: '+96' },
        { value: '+97', label: '+97' },
        { value: '+98', label: '+98' },
        { value: '+99', label: '+99' },
    ];
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const [countryCode, setCountryCode] = useState(countryCodes[0].value);

    const handleCountryCodeChange = (event) => {
        setCountryCode(event.target.value);
    };
      const [values,setValues]=useState();

    const handleClientValues=(e)=>{
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values);
    }
    const client= async () => {
        console.log(values, "==========>regValues")
        const { firstName, lastName, phoneNumber, email, companyName, registrationNumber,countryCode } = values;
        console.log(firstName, lastName, phoneNumber, email, registrationNumber,"======>exValues")
        if (firstName&& lastName&& phoneNumber&& email&& registrationNumber) {

            const Values={
                firstName:firstName,
                lastName:lastName,
                phoneNumber:phoneNumber + countryCode,
                email:email,
                registrationNumber:registrationNumber,
                companyName:companyName
            }

            await createClient(Values)
                .then((res) => {

                    if (res.data.message === "Email Sent") {
                        handleClose();
                        
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
                        handleClose();
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
                      <InputGroup className='mt-3'>
                          <select
                              name="countryCode"
                              className="dropDownIcon border p-2 "
                              aria-label="Default select example"
                              onChange={handleClientValues}
                              
                              
                          >
                              {countryCodes.map((countryCode) => (
                                  <option
                                      key={countryCode.value}
                                      value={countryCode.value}
                                      
                                  >
                                      {countryCode.label}
                                  </option>
                              ))}
                              

                          </select>
                          <Input placeholder="Phone Number" name="phoneNumber" />
                      </InputGroup>





                     
                      <Input type="email" name="email" id="" className='mt-3' placeholder="Email" onChange={handleClientValues} />
                      <Input type="text" name="companyName" id="" className='mt-3' placeholder="Comapny name" onChange={handleClientValues} />
                      <Input type="text" name="registrationNumber" id="" className='mt-3' placeholder="Company registration number" onChange={handleClientValues} />
                      
                     
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