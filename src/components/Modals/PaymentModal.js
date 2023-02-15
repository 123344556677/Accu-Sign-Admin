import { addBankDetails } from 'Api/api';
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input } from 'reactstrap';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51MaOSqE6HtvcwmMAdMy883aTXdyWTHnC8vQEIODCdn8OSGY8ePIRmlyGibnWuS9WYw1vqLYLRns32dQHzlmDVFr200yWroca7l');

const PaymentModal = (props) => {



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [values, setValues] = useState();
    const handleBankDetailValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values);
    }
    const details = async () => {
        
        console.log(values, "==========>regValues")
        const { title, bank, accountNumber, iban, bic, address } = values;
        console.log(title, bank, accountNumber, iban, bic, address, "======>exValues")
        if (title, bank, accountNumber, iban, bic, address) {

            await addBankDetails(values)
                .then((res) => {

                    alert("Details added");
                    handleClose();


                });
        }
        else {
            alert("Please Complete all fields")
        }
    }

    return (
        <div>
            <button className="btn btn-outline-dark btn-sm"

                onClick={handleShow} style={{ cursor: "pointer", fontSize: "12px" }}> update payment</button>

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header px-4">
                    <h2 className="modal-title h4 text-dark">Make Payment</h2>
                    <button
                        type="button"
                        className="bg-white border-0"
                        onClick={handleClose}
                    >

                    </button>
                </div>
                <Modal.Body className="px-4">
                    <Form>
                        <Elements stripe={stripePromise} >
                            <CheckoutForm tripdata={props.tripdata} />
                        </Elements>

                                        </Form>
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

export default  PaymentModal;