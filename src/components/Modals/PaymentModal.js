import { addBankDetails } from 'Api/api';
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input } from 'reactstrap';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51MaOSqE6HtvcwmMAdMy883aTXdyWTHnC8vQEIODCdn8OSGY8ePIRmlyGibnWuS9WYw1vqLYLRns32dQHzlmDVFr200yWroca7l');
// let options = {
//     // passing the client secret obtained from the server
//     clientSecret: 'sk_test_51MaOSqE6HtvcwmMAEFBEcSwTQIBNvQVzAXJc1cnrFoKIQbIH7i7KfcjxtB0DsRiRECgIaGb30vlq4fVSB6uaHsP400S1cZv15n',
// };
const PaymentModal = () => {



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
            <h4 onClick={handleShow} className="ml-4" style={{cursor:"pointer"}}>update payment</h4>

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
                            <CheckoutForm />
                        </Elements>

                                        </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-between px-4">
                    <Button className="" color="dark" type="button"
                        onClick={details}>
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

export default  PaymentModal;