import { createClient } from 'Api/api';
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input, FormGroup, Label } from 'reactstrap';
import FileBase64 from "react-file-base64";
import Swal from "sweetalert2";
import { addTripExpenses } from 'Api/api';

const TripExpensesModal = (props) => {
    const [show, setShow] = useState(false);
    const [expensePic, setExpensePic] = useState(false);
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [values, setValues] = useState();
    const handleExpensesValues = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values);
    }
    console.log(props,"=======>tripId")
    const handleExpensePic = (e) => {
        setExpensePic(e.selectedFile.base64);
        // console.log(e.selectedFile.base64);
    }
    const expense = async () => {
        console.log(values, "==========>regValues")
        const { title,merchant,amount,date } = values;
        console.log(title,merchant,amount,date, "======>exValues")

        const expenseValues = {
            values: values,
            expensePic: expensePic,
            tripId:props.tripId,
            crewId:role.id,
            
        }

        if (title&& merchant&& amount&&date) {

            await addTripExpenses(expenseValues)
                .then((res) => {

                    if (res.data.message === "Expense Added") {
                        handleClose();

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            text: "Expense Added",
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
                            text: "Expense not Added",
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
                icon: "warning",
                text: "Please complete all the field",
                color: "black",
                showConfirmButton: false,
                timer: 2000,
            });
          
        }
    }
    return (
        <div>
            <button className="btn btn-outline-dark btn-sm" onClick={handleShow}

                style={{ cursor: "pointer", fontSize: "12px" }}> Upload</button>

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header px-4">
                    <h2 className="modal-title h4 text-dark">Add Expenses</h2>
                    <button
                        type="button"
                        className="bg-white border-0"
                        onClick={handleClose}
                    >

                    </button>
                </div>
                <Modal.Body className="px-4">
                    <Form>
                        


                     <Input type="text" name="title" id="exampleEmail" placeholder="title" onChange={handleExpensesValues} />
                       <Input type="text" name="merchant" id="" className='mt-3' placeholder="merchant" onChange={handleExpensesValues} />
                        <Input type="text" name="amount" id="" className='mt-3' placeholder="amount" onChange={handleExpensesValues} />
                        <Input type="date" name="date" id="" className='mt-3' placeholder="amount" onChange={handleExpensesValues} />
                        <Label className='mt-3' style={{fontWeight:"700"}}>Upload Invoice</Label> <br/>
                        <FileBase64
                            className='mt-3' 
                            type="file"
                            onDone={(base64) => handleExpensePic({ selectedFile: base64 })}

                            


                        />


                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-between px-4">
                    <Button className="" color="dark" type="button"
                        onClick={expense}>
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

export default TripExpensesModal