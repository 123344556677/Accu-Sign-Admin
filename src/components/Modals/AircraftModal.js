import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input } from 'reactstrap';
import FileBase64 from "react-file-base64";

const AircraftModal = () => {
    const [show, setShow] = useState(false);
    const [currPPic, setPPic] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                          <Input type="email" name="title" id="" className='mt-3' placeholder="Aircraft Owner" />
                          
                          <Input type="number" name="accountNumber" className='mt-3' id="" placeholder="Aircraft Operator" />
                          <Input type="select" name="bank" id="" className='mt-3' placeholder="Type" >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                          </Input>
                          <Input type="number" name="iban" id="" className='mt-3' placeholder="Registration Number" />
                          <div className="mt-3">
                          <FileBase64
                              type="file"
                              onDone={(base64) => setPPic({ selectedFile: base64 })}
                              

                          />
                          </div>
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
    </div>
  )
}

export default AircraftModal