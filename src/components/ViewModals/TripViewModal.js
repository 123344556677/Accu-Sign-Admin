import { getAllAircraft } from 'Api/api';
import { TripsByclientId } from 'Api/api';
import { getPaymentByClientId } from 'Api/api';
import { addBankDetails } from 'Api/api';
import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { Button, Col, Form, Input, Row } from 'reactstrap';
import Swal from "sweetalert2";

const TripViewModal = () => {



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [tripsData, setTripsData] = useState([]);
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))


    const Values = {
        clientId: role.id
    }


    useEffect(() => {
        TripsByclientId(Values)
            .then((res) => {
                console.log(res, "======>TripsData")
                setTripsData(res.data)
            })

    }, [])

    return (
        <div>
            <Link><span className="h5 font-weight-bold mb-0 ml-1" style={{ float: "right" }} onClick={handleShow}>View All</span></Link>

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header px-4">
                    <h2 className="modal-title h4 text-dark">Trips</h2>
                    <button
                        type="button"
                        className="bg-white border-0"
                        onClick={handleClose}
                    >

                    </button>
                </div>
                <Modal.Body className="px-4">
                    {
                        tripsData.data?.length ?
                            tripsData?.data?.map((data, index) => (
                                <Col key={index}>

                                    <>
                                        <h3 className="">{data.tripName}</h3>
                                        <p style={{ fontWeight: "600", fontSize: "15px" }}>{data?.destinationFrom} to {data?.destinationTo}</p>
                                        <span style={{ fontWeight: "600", fontSize: "15px" }}>Status: {data?.status}</span>
                                        <hr />
                                    </>

                                </Col>
                            ))
                            :
                            <p className='text-center'>No trips available!</p>
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

export default TripViewModal;