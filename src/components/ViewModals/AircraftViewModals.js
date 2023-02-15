import { getAllAircraft } from 'Api/api';
import { addBankDetails } from 'Api/api';
import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { Button, Col, Form, Input, Row } from 'reactstrap';
import Swal from "sweetalert2";

const AircraftViewModal = () => {



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [aircraftData, setAircratData] = useState([]);
    useEffect(() => {
        getAllAircraft()
            .then((res) => {
                console.log(res, "======>airtabletData")
                setAircratData(res?.data)
            })

    }, [])

    return (
        <div>
            <Link><span className="h5 font-weight-bold mb-0 ml-1" style={{ float: "right" }} onClick={handleShow}>View All</span></Link>

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header px-4">
                    <h2 className="modal-title h4 text-dark">Aircrafts</h2>
                    <button
                        type="button"
                        className="bg-white border-0"
                        onClick={handleClose}
                    >

                    </button>
                </div>
                <Modal.Body className="px-4">
                    {
                        aircraftData.length ?
                        aircraftData?.map((data, index) => (
                            <Col  key={index}>

                                <Row className="mt-3">
                                    <Col xl={4} >


                                        <span className="avatar avatar-md rounded-circle">
                                            <img
                                                alt="..."
                                                src={data.aircraftPic ? data.aircraftPic
                                                    : require("../../assets/img/theme/team-4-800x800.jpg")}
                                            />
                                        </span>


                                    </Col>
                                    <Col xl={5} className="">
                                        <h5>{data.aircraftOwner}</h5>
                                        <span className="text-nowrap" style={{ fontSize: "13px" }}>{data?.aircraftType ? data?.aircraftType : ""}</span>
                                    </Col>

                                </Row>

                            </Col>
                        ))
                        :
                        <p className=''>No aircrafts Available!</p>
                              }
                </Modal.Body>
                <Modal.Footer className="justify-content-between px-4">
                   
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

export default AircraftViewModal;