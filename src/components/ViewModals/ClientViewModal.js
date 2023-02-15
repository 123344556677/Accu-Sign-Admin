import { getAllAircraft } from 'Api/api';
import { getAllClient } from 'Api/api';
import { addBankDetails } from 'Api/api';
import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { Button, Col, Form, Input, Row } from 'reactstrap';
import Swal from "sweetalert2";

const ClientViewModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [clientData, setClientData] = useState([]);
    useEffect(() => {
        getAllClient()
            .then((res) => {
                console.log(res, "======>clientData")
                setClientData(res?.data)
            })

    }, [])

    return (
        <div>
            <Link><span className="h5 font-weight-bold mb-0 ml-1" style={{ float: "right" }} onClick={handleShow}>View All</span></Link>

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header px-4">
                    <h2 className="modal-title h4 text-dark">Clients</h2>
                    <button
                        type="button"
                        className="bg-white border-0"
                        onClick={handleClose}
                    >

                    </button>
                </div>
                <Modal.Body className="px-4">
                    {
                        clientData.length ?
                            clientData?.map((data, index) => (
                                <Row key={index} className="mt-3">

                                    <Col xl={5} className="ml-1">
                                        <h3>{data?.firstName}</h3>
                                        <span className="text-nowrap" style={{ fontSize: "13px" }}>{data?.country ? data?.country : "Country not added"}</span>
                                    </Col>

                                </Row>
                            ))
                            :
                            <p className='text-center'>No client Available!</p>
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

export default ClientViewModal