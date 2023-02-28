import { getAllAircraft } from 'Api/api';
import { TripsByclientId } from 'Api/api';
import { getPaymentByClientId } from 'Api/api';
import { addBankDetails } from 'Api/api';
import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Button, Col, Form, Input, Row } from 'reactstrap';
import Swal from "sweetalert2";

const InvoiceModal = () => {



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [paymentData, setPaymentData] = useState([]);
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
   
    const [TripsData, setTripsData] = useState([]);


    const Values = {
        clientId: role.id
    }
    useEffect(async () => {
        await TripsByclientId(Values)
            .then((res) => {
                console.log(res, "======>Trips data")
                setTripsData(res?.data?.data)
            })

    }, [])

    useEffect(() => {
        getPaymentByClientId(Values)
            .then((res) => {
                console.log(res, "======>paymentData")
                setPaymentData(res.data)
            })

    }, [])

    return (
        <div>
            <Link><span className="h5 font-weight-bold  ml-1" style={{ float: "right" }} onClick={handleShow}>View All</span></Link>

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header px-4">
                    <h2 className="modal-title h4 text-dark">Pending Invoices</h2>
                    <button
                        type="button"
                        className="bg-white border-0"
                        onClick={handleClose}
                    >

                    </button>
                </div>
                <Modal.Body className="px-4">
                    {
                        TripsData.length ?
                            TripsData?.map((data, index) => (

                               data?.payment==="pending"&&
                 
                                    <Row className="mt-3">
                                        <Col xl={12} key={index} >
                                        
                                       
                                            <h3 className="">{data?.Fee?data?.Fee:"0 USD"}</h3>
                                            <p style={{ fontWeight: "600", fontSize: "15px" }}>{data?.tripName}</p>
                                            {
                                            // <span style={{ fontWeight: "600", fontSize: "15px" }}>Generated: {date.toLocaleDateString("en-US")}</span>
                                            }
                                            <span style={{ fontWeight: "600", fontSize: "15px" }}>Generated: <Moment format="MM/DD/YYYY">{data?.date}</Moment></span>
                                            <hr />
                                       </Col>
                                    </Row>


                                
                            ))
                            :
                            <p className='text-center'>No payment Invoices available!</p>
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

export default InvoiceModal;