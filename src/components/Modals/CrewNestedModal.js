import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input, FormGroup } from 'reactstrap';

const CrewNestedModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                      <Input type="select" name="bank" id="" className='mt-3 pr-5 pl-5' placeholder="" >
                          <option>Type</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                      </Input>
                      <Input type="select" name="bank" id="" className='mt-3 ml-5 pr-5 pl-5' placeholder="" >
                          <option>Member</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                      </Input>
                      </Form>
                      <Form inline>
                      <Input type="number" name="dailyRate" className='mt-3' id="" placeholder="Daily Rate" />
                      <Input type="number" name="perDiemsCrew" id="" className='mt-3 ml-2' placeholder="Per Diems" />
                     
                      </Form>

                      <Form inline>
                          <Input type="number" name="dailyRate" className='mt-3' id="" placeholder="Daily Rate" />
                          <Input type="number" name="perDiemsClient" id="" className='mt-3 ml-2' placeholder="Per Diems" />

                      </Form>
                      
                  </Form>
              </Modal.Body>
              <Modal.Footer className="justify-content-between px-4">
                  <Button className="" color="dark" type="button"
                      onClick={handleClose}>
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