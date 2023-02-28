import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Col, Form, Input, Row } from 'reactstrap';
import FileBase64 from "react-file-base64";
import { addDocument } from 'Api/api';
import Swal from "sweetalert2";
import moment from 'moment';

const AppendixModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [pagination, setPagination] = useState('one');
    const date1 = moment(props?.tripData?.endDate);
    const date2 = moment(props?.tripData?.startDate);
    const finalDate = date2.diff(date1, 'days');
    return (
        <div>
            <button type="button" className="btn  pr-5 mt-1 ml-4"
                onClick={handleShow}

                style={{
                    backgroundColor: "white",
                    color: "#adad85",
                    borderRadius: "0%"
                }}>OPEN</button>

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header px-4">
                    <h2 className="modal-title h4 text-dark text-center">Appendix 'A'</h2>
                   
                </div>
                <Modal.Body className="px-4">
                    <h5>Assignment#: #ACC120</h5>
                    <h5>Aircraft Type: {props?.tripData?.aircraftType}</h5>

                    <h5>Client: {props?.tripData?.clientName}</h5>

                    <h5>Role: Captain or Co-captain (TBD by Client)</h5>

                    <h5> Rotation/Dispatch Start Date: {props?.tripData?.startDate}</h5>

                    <h5>Agreed upon Rotation / Dispatch Duration: {finalDate} days</h5 >

                    <h5>Pay Rate: $ { props?.tripData?.crewMembers[0]?.dialyRateCrew} USD per day(This is inclusive of any training allowance or charge)</h5 >

                    <h5>Per Diems: {props?.tripData?.crewMembers[0]?.perDiemsCrew} USD per diems daily</h5 >

                    <p style={{fontSize:"12px", fontWeight:"600"}}>*If on any given dispatch AirCrewConnect’ client covers the expense for 
                    food and beverages, per diem rates will be adjusted or eliminated accordingly *
                    Rotation/Notice Period: The dispatch/rotation period for 
                    this project will be approximately 
                        for {finalDate} day (extendable) and the Contractor 
                    must be available to provide its services for such a period.
                     Unless otherwise arranged and approved in writing by AirCrewConnect,
                      and except in the case of a medical emergency supported in writing 
                      by a treating licensed medical practitioner, the Contractor will not 
                    suspend, terminate or withdraw its services for a confirmed crew Rotation.</p>

                    <h5>  Accommodations: Hotel { props?.tripData?.hotelType}</h5>

                    <h5> Air Travel: {props?.tripData?.airlineTravel}</h5>

                            <h5> Aircraft Base: EGJB, Channel Islands</h5>

                                <h5> Important Notes </h5>





                </Modal.Body>
                <Modal.Footer className="justify-content-end px-4">
                    {
                        
                        //   <Button className="" color="dark" type="button"
                        //      >
                        //       Upload
                        //   </Button>
                          <button
                              className="btn btn-danger"
                              variant="danger"
                              onClick={handleClose}
                              style={{float:"right"}}
                          >
                              Close
                          </button>
                    }
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AppendixModal