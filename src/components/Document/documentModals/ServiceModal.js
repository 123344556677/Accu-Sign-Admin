import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Button, Form, Input } from 'reactstrap';
import FileBase64 from "react-file-base64";
import { addDocument } from 'Api/api';
import Swal from "sweetalert2";

const ServiceModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [pagination,setPagination]=useState('one');
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    console.log(props,"props=============>")
  return (
      <div>
          <button type="button" className={role.role === "admin" ? "btn ml-4 pr-5 mt-1 text-center" :"btn ml-3 pr-4 mt-1 text-center"}
              onClick={handleShow}

              style={{
                  backgroundColor: "white",
                  color: "#adad85",
                  borderRadius: "0%"
              }}>OPEN</button>

          <Modal show={show} onHide={handleClose}>
              <div className="modal-header px-4">
                  <h2 className="modal-title h4 text-dark text-center">Service Agreement</h2>
                  <button
                      type="button"
                      className="bg-white border-0"
                      onClick={handleClose}
                  >

                  </button>
              </div>
              <Modal.Body className="px-4">
              {
                pagination==="one"&&
                  <p style={{fontSize:"13px"}}>THIS SERVICE AGREEMENT (hereinafter the "Agreement") is deemed executed in Dubai, United Arab Emirates
                  <br/><br/>
                      BETWEEN: Matrix Aviation (AircrewConnect), 
                              {props?.tripData?.companyName ? props?.tripData?.companyName :" UAE office address at The One Tower Internet City Teacom Dubai UAE, (hereinafter referred to as the 'Service Provider')"}
                     
                      <br /><br />
                      AND: DC Aviation Al Futtaim LLC, 
                      a corporation having a place 
                      of business incorporated in Dubai, UAE. The “Operator” of Aircraft (hereinafter referred to as "DCAF and / or The Operator")
                      <br /><br />
                      SCOPE: AirCrewConnect 
                      shall provide Type Rated 
                      and Qualified Flight Crew
                              to {props?.tripData?.companyName ? props?.tripData?.companyName : "DCAF"} (defined under 
                              this agreement as the Operator) to be utilised within the {props?.tripData?.companyName ? props?.tripData?.companyName : "DCAF"}  flight operations department under the following terms and conditions.
                      <br /><br />
                      CREW MEMBER : The provided Crew Member as defined in Appendix 1 (hereinafter referred to as "Crew Member")
                      <br /><br />
                      AIRCRAFT ALLOCATION : The Specific aircraft type and registration which the assigned Crew Member is allocated to operate on
                       behalf of the Service Provider for the benefit of the Operator defined in Appendix 1.
                      
                        </p>
                }
                  {
                      pagination === "two" &&
                      <>
                          <h4>Term:</h4>
                      <p style={{ fontSize: "12px" }}>
                              Commencing on {props?.tripData?.startDate? props?.tripData?.startDate :"" } up to and including 23rd
                              {props?.tripData?.startDate ? props?.tripData?.startDate : ""}, pending any 
                               government formalities such as visa processing or licence verification.

                      </p>

                      <h4> 1)	Fees, Rates, Per Diems and Expenses</h4>
                              <ul>
                              <li style={{fontSize:"11px"}}>
                                  For its services while on Assignment (as defined below),{props?.tripData?.companyName ? props?.tripData?.companyName : ""} will pay AirCrewConnect the fee of USD {props?.tripData?.fee ? props?.tripData?.fee : ""} per day, plus a per diem of USD { props?.tripData?.dailyClientRate ? props?.tripData?.dailyClientRate : ""} and any 
                                      reasonable expenses.
                                  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} will also pay AirCrewConnect support fee USD {props?.tripData?.dailyCrewRate ? props?.tripData?.dailyCrewRate : ""} per crew.
                              </li>
                              <br/>
                                  <li style={{ fontSize: "11px" }}>
                                      	Once the Service Provider is hired, 
                                      a notice period of 24hrs must be given to cancel the services, failing to do so will incur the full daily rate plus the support fee (excluding per diems).
                                  </li>
                                  <br />
                                  <li style={{ fontSize: "11px" }}>
                                      The assignment is the service period that starts
                                       when the provided Contractor is dispatched
                                        on the project from his home base until the 
                                        day the Contractor returns to his home base at project completion.
                                  </li>
                                  <br />
                                  <li style={{ fontSize: "11px" }}>
                                      	The Service Providers fees, contractors 
                                      daily rate and per diem are processed and paid within 14 days following
                                  the completion of the support and an invoice provided by the Service Provider to  {props?.tripData?.companyName ? props?.tripData?.companyName : ""}
                                  </li>
                                  <br />
                                  <li style={{ fontSize: "11px" }}>
                                      	Authorized Expenses are those reasonable expenses 
                                        directly related to the performance of the Crew Members services hereunder during Assignment, including but not limited to: hotel, business related ground
                                       transportation, business related calls, airfares (above 4 hours in duration to be in Business class.
                                  </li>
                              </ul>

                              
                     


                      </>
                  }

                  {
                      pagination === "three" &&
                      <>
                          

                          <h4> 2) Independent Contractor/No Benefits</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  	This is an independent Service Agreement for
                                   temporary professional services provided
                                  by a qualified Crew Member identified in Appendix 1. The Service Provider and its Crew Member or any of its agents shall not be engaged as an employee, servants or agent of  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} As such, the Service Provider and Crew Members are not entitled to the status, benefits or 
                                  privileges of a  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} employee. It is the Service Providers responsibility to provide the benefits including, but not limited to the following: workers' compensation, personal accident, injury, death, temporary or permanent disability and/or other insurance; loss of license insurance;
                                    sick leave; superannuating; and
                                     like entitlements, as applicable to the Crew Member. 
                              </li>
                              <br />
                              <li style={{ fontSize: "11px" }}>
                                  b.	All amounts payable under this Agreement are inclusive of any applicable government taxes of whatever nature.
                                   Neither party shall be responsible for the other party's taxes on gross or net income.
                              </li>
                              <br />
                              
                          </ul>
                          <h4>  3)	Liabilities and Indemnity</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  The Service Provider and Crew Members hereby releases from liability and agrees to defend, indemnify and hold harmless  {props?.tripData?.companyName ? props?.tripData?.companyName : ""}, its directors, from and against all claims, damages, liabilities, suits and judgments, including all costs, interests and expenses relating thereto 
                                  which may be suffered by, accrue against or be recoverable from  {props?.tripData?.companyName ? props?.tripData?.companyName : ""}, or it’s directors.
                              </li>
                              <br />
                             
                              <br />

                          </ul>
                          </>
                  }
                  {
                    pagination==="four"&&
                    <>
                          <h4>  4)	Termination </h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  This Agreement may be terminated at any time by either party, with either party giving the notice up to the termination date of the signed agreement or, if the Service Provider or The Operator fails to observe any of the terms of this Agreement, either party will have the right to immediately terminate this Agreement without notice. Such termination will in no way affect the obligation of 
                                  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} to make payments for work performed prior to termination of this Agreement.
                              </li>
                              <br />

                              

                          </ul>
                          <h4>  5)	Service Providers Representations</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  The Service Provider and Crew Members hereby releases from liability and agrees to defend, indemnify and hold harmless {props?.tripData?.companyName ? props?.tripData?.companyName : ""}, its directors, from and against all claims, damages, liabilities, suits and judgments, including all costs, interests and expenses relating thereto
                                  which may be suffered by, accrue against or be recoverable from DCAF, or it’s directors.
                              </li>
                              <br />
                              <li style={{ fontSize: "11px" }}>
                                  	Without limiting the foregoing, the Service Provider shall provide the qualified crew member defined in Appendix 1 with a valid Pilot
                                   license and type rating for the nominated Aircraft defined in Appendix 1 without conditions or limitations, and will maintain them for the duration of this Agreement. 
                              </li>
                              <br />
                              <li style={{ fontSize: "11px" }}>

                                	The Service Provider ensures that the provided Crew Member 
                                    in Appendix 1 has a current, valid 1st class medical
                                     certification and will maintain it for the duration of this Agreement.

                              </li>
                              <br />
                              <li style={{ fontSize: "11px" }}>
                                  The Service Provider will exercise due care and diligence in providing
                                   its services in order to ensure that the requirements of this Agreement are met.
                              </li>
                              <br />

                              

                          </ul>
</>

                  }
                  {
                      pagination === "five" &&
                      <>
                         
                          <h4>  6)	Non-disclosure</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  The Service Provider and  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} must maintain 
                                  the terms and conditions of this Agreement remain confidential.
                              </li>
                              <br />
                              <li style={{ fontSize: "11px" }}>
                                  For clarity, the Service Provider and its provided crew members from Appendix 1 shall not disclose or discuss any of the terms and conditions of this Agreement to crew mates, any other employees or contractors of  {props?.tripData?.companyName ? props?.tripData?.companyName : ""},  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} clients, customers, their
                                   representatives and/or their guests 
                                  or any other third party, without the written permission of  {props?.tripData?.companyName ? props?.tripData?.companyName : ""}.
                              </li>
                              <br />
                              <li style={{ fontSize: "11px" }}>

                                  For clarity,  {props?.tripData?.companyName ? props?.tripData?.companyName : ""}, its employees and/or agents shall
                                   not disclose or discuss any of the terms and conditions of this agreement to crew members, contractors, business partners, competitors, AirCrewConnect's clients, customers, their representatives and/or 
                                  their guests or any other third party, without the written permission of AirCrewConnect.

                              </li>
                              <br />
                             



                          </ul>
                          <h4>  	7)	Worker‘s Compensation Disclaimer</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  The relationship between The Service Provider and the Operator is that of an independent Service Provider and its Crew Members are not employees. Thus, among other things,  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} will have no worker’s compensation liability, state’s or local liability for loss of life or injuries which the Service Providers Crew Member may incur during the term of this Agreement or arising out of this Agreement. Moreover, DCAF will have no obligations or liabilities to the Service Provider under similar social or employment programs which may be available 
                                  to workers in the jurisdictions in which Crew Member lives or performs services for  {props?.tripData?.companyName ? props?.tripData?.companyName : ""}. 
                              </li>
                              <br />
                              
                             </ul>
                             <h4>  	8)	Confidentiality</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  
                                  The Service Provider and  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} agree that they will not at any time during the term of this Agreement or anytime thereafter 
                                  be a disclosure to any person of any information of a confidential nature regarding AirCrewConnect or  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} or the assignment to which the Crew Member is
                                  tasked during the course of this Agreement, including without limitation the terms of any actual or potential commercial transaction between  {props?.tripData?.companyName ? props?.tripData?.companyName : ""}
                                  and any third party. Upon expiry or termination of this Agreement, the Contractor shall return or deliver to  {props?.tripData?.companyName ? props?.tripData?.companyName : ""}
                                   any lists, books, records, digital media and other documents relating to the assignment or any other materials/property belonging to
                                  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} that he has obtained pursuant to or in connection with this Agreement.
                              </li>
                             
                              </ul>
                      </>

                  }
                  {
                  pagination==="six"&&
                  <>
                          <h4>  9)	No solicitation </h4>
                      <ul>
                          <li style={{ fontSize: "11px" }}>
                                  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} agree that they will not 
                                  at any time during the term of this Agreement or within 12 months afterwards contact, engage, solicit, contract or employ the provided Crew Member for
                                   crew support without express permission from AirCrewConnect. Should DCAF or any associated agents or group companies employ or contract the Crew Member within the service agreement or 365 days after the 
                                  completion of this agreement then  {props?.tripData?.companyName ? props?.tripData?.companyName : ""} shall pay AirCrewConnect the following.
                              </li>
                          <br />



                      </ul>
                      <h4>  10)	Service Failure</h4>
                      <ul>
                          <li style={{ fontSize: "11px" }}>
                                	Should a failure of service occur of the provided Crew Member defined in Appendix 1 not be able to complete the assigned contracted support for any reason then it will remain the sole responsibility of 
                                  AirCrewConnect to provide within a reasonable time a suitable replacement crew member.
                          </li>
                          <br />
                         



                      </ul>
                          <h4>  11)	Contractual Agreement </h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  	This agreement is confidential and may not be copied of
                                   modified without express permission of AirCrewConnect and or its Agents.
                              </li>
                              <br />
                            



                          </ul>
                          <h4> 12)	Operational Control </h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  Under the terms of this Service Agreement The Service Provider gives Operational Control of the duties of the Crew Member to The Operator. The Crew Member shall follow The Operation Manuals Part A,B,C & D (where applicable) and any other associated aviation manuals, books or digital allocated material relating to all the rules and regulations
                                   of The Operator governed by its Civil Aviation Authority or regulator.
                              </li>
                              <br />
                              <li style={{ fontSize: "11px" }}>
                                The Crew Member is required to report to the Director of Operations of The Operator.
                              </li>
                              <br />

                              




                          </ul>
                          
                  </>

                  }
                  {
                      pagination === "seven" &&
                      <>

                          <span style={{fontSize:"12px"}}>For on Behalf of the Service Provider:</span>

                          <h6>
                              Matthew Harrison
</h6>
                          <h6>DIRECTOR
                              
</h6>
                          <h6> Date:  {props?.tripData?.startDate ? props?.tripData?.startDate : ""}</h6>
                          <br/>
                          <span style={{ fontSize: "12px" }}>For on Behalf of the Operator:</span>
                          {

                        //   <h6>
                        //       Holger Ostheimer
                        //   </h6>
                          }

                          <h6>Managing Director On behalf of  {props?.tripData?.companyName ? props?.tripData?.companyName : ""}

                          </h6>
                          <h6>Date:  {props?.tripData?.startDate ? props?.tripData?.startDate : ""}</h6>
                             




                          
                      </>

                  }


                      
                  
              </Modal.Body>
              <Modal.Footer className="justify-content-center px-4">
              {
                      <ul className="pagination">
                          
                          <li className="page-item"><a class="page-link" 
                          onClick={()=>setPagination('one')} style={{cursor:"pointer"}}>1</a></li>
                          <li className="page-item"><a class="page-link" 
                              onClick={() => setPagination('two')} style={{ cursor: "pointer" }}>2</a></li>
                          <li className="page-item"><a class="page-link"
                              onClick={() => setPagination('three')} style={{ cursor: "pointer" }} >3</a></li>
                          <li className="page-item"><a class="page-link"
                              onClick={() => setPagination('four')} style={{ cursor: "pointer" }} >4</a></li>
                          <li className="page-item"><a class="page-link"
                              onClick={() => setPagination('five')} style={{ cursor: "pointer" }} >5</a></li>
                          <li className="page-item"><a class="page-link"
                              onClick={() => setPagination('six')} style={{ cursor: "pointer" }} >6</a></li>
                          <li className="page-item"><a class="page-link"
                              onClick={() => setPagination('seven')} style={{ cursor: "pointer" }} >7</a></li>
                         
                      </ul>
                //   <Button className="" color="dark" type="button"
                //      >
                //       Upload
                //   </Button>
                //   <button
                //       className="btn btn-danger"
                //       variant="danger"
                //       onClick={handleClose}
                //   >
                //       Close
                //   </button>
              }
              </Modal.Footer>
          </Modal>

      </div>
  )
}

export default ServiceModal