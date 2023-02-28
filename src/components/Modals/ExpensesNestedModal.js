import { createClient } from 'Api/api';
import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input, FormGroup, Label, Table } from 'reactstrap';
import FileBase64 from "react-file-base64";
import Swal from "sweetalert2";
import { getCrewExpense } from 'Api/api';
import Moment from 'react-moment';

const ExpensesNestedModal = (props) => {
    const [show, setShow] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(props,"===========>id");
    let total=0;
    const values = {
        crewId: props?.crewId,
        tripId: props?.tripId
    }
useEffect(async()=>{
    
    await getCrewExpense(values)
        .then((res) => {
           setExpenseData(res?.data?.data)
        })

},[])



  return (
      <div>
          
          <i className="fa fa-arrow-down"
              style={{ fontSize: "15px" }} onClick={handleShow} aria-hidden="true"></i>

          <Modal show={show} onHide={handleClose}>
              <div className="modal-header px-4">
                  <h2 className="modal-title h4 text-dark">Crew Expenses</h2>
                  <button
                      type="button"
                      className="bg-white border-0"
                      onClick={handleClose}
                  >

                  </button>
              </div>
              <Modal.Body className="px-4">
                  <Table className="mt-3" >
                      <thead>
                          <tr>
                              <th style={{ fontWeight: "700", color: "black" }}>Title</th>
                              <th style={{ fontWeight: "700", color: "black"}}> Merchant</th>
                              <th style={{ fontWeight: "700", color: "black" }}> Invoice</th>
                              <th style={{ fontWeight: "700", color: "black" }}> Amount</th>
                              <th style={{ fontWeight: "700", color: "black" }}>Date</th>
                              {
                            //   <th style={{ fontWeight: "700", color: "black", fontSize: "5px" }}> Per Diems</th>

                            //   <th style={{ fontWeight: "700", color: "black", fontSize: "5px" }}> VAT% </th>
                            //   <th style={{ fontWeight: "700", color: "black", fontSize: "5px" }}> Actions</th>
                              }
                          </tr>
                      </thead>
                      <tbody>
                          {
                           
                            expenseData?.length?
                              expenseData?.map((data) => (
                                <>
                                    <p style={{display:"none"}}>  {  total+= parseInt(data?.amount) }</p>
                                  
                                  <tr>
                                      <td className=''>{data?.title}</td>
                                      <td className=''>{data?.merchant}</td>
                                      
                                      <td ><img style={{ width: "100%" }} src={data.expensePic}/></td>
                                      <td className=''> {data?.amount}</td>
                                     
                                      <td className=''>  <Moment format="MM/DD/YYYY">{data?.date}</Moment></td>
                                     

                                     
                                  </tr>
                                  </>

                              ))
                              
                                 
                                      
                              :
                              
                                  <p>No Expenses Available!</p>
                                  
                                  

                          }
                          < tr >
                              <th className=''>Total</th>
                              <td className=''>-</td>

                              <td >-</td>
                              <td className=''>{total}</td>
                              
                              <td>-</td>



                          </tr>



                      </tbody>
                  </Table>
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

export default ExpensesNestedModal