import { addBankDetails } from 'Api/api';
import React,{useState} from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input } from 'reactstrap';
import Swal from "sweetalert2";

const BankModal = () => {
   
    
   
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
        const { title,bank,accountNumber,iban,bic,address } = values;
        console.log(title, bank, accountNumber, iban, bic, address, "======>exValues")
        if (title&& bank&& accountNumber&& iban&& bic&& address) {

            await addBankDetails(values)
                .then((res) => {
                    handleClose();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        text: "Details added",
                        color: "black",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    window.location.reload();
                        

                    
                });
        }
        else {
            handleClose();
            Swal.fire({
                position: "center",
                icon: "error",
                text: "Please complete all the fields",
                color: "black",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }
  
    return (
      <div>
            <Button color="secondary" size="lg" className="mt-1 mr-3" style={{ float: "right" }}

                onClick={handleShow}>+ ADD NEW BANK DETAIL</Button>

            <Modal show={show} onHide={handleClose}>
                <div className="modal-header px-4">
                    <h2 className="modal-title h4 text-dark">Bank Details</h2>
                    <button
                        type="button"
                        className="bg-white border-0"
                        onClick={handleClose}
                    >
                        
                    </button>
                </div>
                <Modal.Body className="px-4">
                   <Form>
                        <Input type="email" name="title" id="" className='mt-3' placeholder="Title" 
                        onChange={handleBankDetailValues}
                         />
                        <Input type="select" name="bank" id="" className='mt-3' placeholder="Bank" onChange={handleBankDetailValues} >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </Input>
                        <Input type="number" name="accountNumber" className='mt-3'
                        onChange={handleBankDetailValues} id="" placeholder="Account Number" />
                        <Input type="number" name="iban" id="" className='mt-3'
                        onChange={handleBankDetailValues} placeholder="IBAN" />
                        <Input type="number" name="bic" id="" className='mt-3'
                        onChange={handleBankDetailValues} placeholder="BIC Code" />
                        <Input type="text" name="address" className='mt-3' id=""
                        onChange={handleBankDetailValues} placeholder="Address" />
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

export default BankModal;