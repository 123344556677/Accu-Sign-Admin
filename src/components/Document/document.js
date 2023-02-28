import React,{useState,useEffect}  from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import dummy from './avatrOne.png';
import './document.css'
import { addDocument } from 'Api/api';
import DocumentModal from 'components/Modals/DocumentModal';
import { getAllDocument } from 'Api/api';
import Swal from "sweetalert2";
import appendix from './ss25.PNG';
import pilot from './ss31.PNG';
import flight from './ss27.PNG';
import service from './ss28.PNG';
import ServiceModal from './documentModals/ServiceModal';
import FlightModal from './documentModals/FlightModal';
import PilotModal from './documentModals/PilotModal';
import AppendixModal from './documentModals/AppendixModal';
import { getAllTrips } from 'Api/api';
import moment from 'moment';
const Document = () => {
const [upload,setUpload]=useState(true);
const [TripsDocumentData, setTripsDocumentData] = useState(true);
const history=useHistory()
// const [documents,setDocuments]=useState([])

// const [trip, setTrip] = useState('');


    const handleBar = () => {
        setUpload(!upload)
        console.log(upload);

        // if (e.target.value==="upload"){
        //     setUpload('upload');
        // }
        // if (e.target.value === "trip") {
        //     setTrip('trip');
        // }
    }
    function handleClientAppendixDownload(props) {
        console.log("=======>download", props)
        const date1 = moment(props?.endDate);
        const date2 = moment(props?.startDate);
        const finalDate = date2.diff(date1, 'days');
        const htmlString = ` <h5>Assignment#: #ACC120</h5>
                    <h5>Aircraft Type: ${props?.aircraftType}</h5>

                    <h5>Client: ${props?.clientName}</h5>

                    <h5>Role: Captain or Co-captain (TBD by Client)</h5>

                    <h5> Rotation/Dispatch Start Date: ${props?.startDate}</h5>

                    <h5>Agreed upon Rotation / Dispatch Duration: ${finalDate} days</h5 >

                    <h5>Pay Rate: $ ${props?.crewMembers[0]?.dialyRateCrew} USD per day(This is inclusive of any training allowance or charge)</h5 >

                    <h5>Per Diems: ${props?.crewMembers[0]?.perDiemsCrew} USD per diems daily</h5 >

                    <p style={{fontSize:"12px", fontWeight:"600"}}>*If on any given dispatch AirCrewConnect’ client covers the expense for 
                    food and beverages, per diem rates will be adjusted or eliminated accordingly *
                    Rotation/Notice Period: The dispatch/rotation period for 
                    this project will be approximately 
                        for {finalDate} day (extendable) and the Contractor 
                    must be available to provide its services for such a period.
                     Unless otherwise arranged and approved in writing by AirCrewConnect,
                      and except in the case of a medical emergency supported in writing 
                      by a treating licensed medical practitioner, the Contractor will not 
                    suspend, terminate or withdraw its services for a confirmed crew Rotation.</p>

                    <h5>  Accommodations: Hotel ${props?.hotelType}</h5>

                    <h5> Air Travel: ${props?.airlineTravel}</h5>

                            <h5> Aircraft Base: EGJB, Channel Islands</h5>

                                <h5> Important Notes </h5>`;
        // create some sample content for the Word document
        const blob = new Blob([htmlString], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'AppendixAgreement.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    function handleClientServiceDownload(props) {
        const htmlString = ` 
                
                  <p style={{fontSize:"13px"}}>THIS SERVICE AGREEMENT (hereinafter the "Agreement") is deemed executed in Dubai, United Arab Emirates
                  <br/><br/>
                      BETWEEN: Matrix Aviation (AircrewConnect), 
                              ${props?.companyName ? props?.companyName : " UAE office address at The One Tower Internet City Teacom Dubai UAE, (hereinafter referred to as the 'Service Provider')"}
                     
                      <br /><br />
                      AND: DC Aviation Al Futtaim LLC, 
                      a corporation having a place 
                      of business incorporated in Dubai, UAE. The “Operator” of Aircraft (hereinafter referred to as "DCAF and / or The Operator")
                      <br /><br />
                      SCOPE: AirCrewConnect 
                      shall provide Type Rated 
                      and Qualified Flight Crew
                              to ${props?.companyName ? props?.companyName : "DCAF"} (defined under 
                              this agreement as the Operator) to be utilised within the ${props?.companyName ? props?.companyName : "DCAF"}  flight operations department under the following terms and conditions.
                      <br /><br />
                      CREW MEMBER : The provided Crew Member as defined in Appendix 1 (hereinafter referred to as "Crew Member")
                      <br /><br />
                      AIRCRAFT ALLOCATION : The Specific aircraft type and registration which the assigned Crew Member is allocated to operate on
                       behalf of the Service Provider for the benefit of the Operator defined in Appendix 1.
                      
                        </p>
               
                          <h4>Term:</h4>
                      <p style={{ fontSize: "12px" }}>
                              Commencing on ${props?.startDate ? props?.startDate : ""} up to and including 
                              ${props?.startDate ? props?.startDate : ""}, pending any 
                               government formalities such as visa processing or licence verification.

                      </p>

                      <h4> 1)	Fees, Rates, Per Diems and Expenses</h4>
                              <ul>
                              <li style={{fontSize:"11px"}}>
                                  For its services while on Assignment (as defined below),${props?.tripData?.companyName ? props?.tripData?.companyName : ""} will pay AirCrewConnect the fee of USD ${props?.fee ? props?.fee : ""} per day, plus a per diem of USD ${props?.dailyClientRate ? props?.dailyClientRate : ""} and any 
                                      reasonable expenses.
                                  ${props?.companyName ? props?.companyName : ""} will also pay AirCrewConnect support fee USD ${props?.dailyCrewRate ? props?.dailyCrewRate : ""} per crew.
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
                                  the completion of the support and an invoice provided by the Service Provider to  ${props?.companyName ? props?.companyName : ""}
                                  </li>
                                  <br />
                                  <li style={{ fontSize: "11px" }}>
                                      	Authorized Expenses are those reasonable expenses 
                                        directly related to the performance of the Crew Members services hereunder during Assignment, including but not limited to: hotel, business related ground
                                       transportation, business related calls, airfares (above 4 hours in duration to be in Business class.
                                  </li>
                              </ul>

                              
                     


                   
                          

                          <h4> 2) Independent Contractor/No Benefits</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  	This is an independent Service Agreement for
                                   temporary professional services provided
                                  by a qualified Crew Member identified in Appendix 1. The Service Provider and its Crew Member or any of its agents shall not be engaged as an employee, servants or agent of  ${props?.companyName ? props?.companyName : ""} As such, the Service Provider and Crew Members are not entitled to the status, benefits or 
                                  privileges of a  ${props?.companyName ? props?.companyName : ""} employee. It is the Service Providers responsibility to provide the benefits including, but not limited to the following: workers' compensation, personal accident, injury, death, temporary or permanent disability and/or other insurance; loss of license insurance;
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
                                  The Service Provider and Crew Members hereby releases from liability and agrees to defend, indemnify and hold harmless  ${props?.companyName ? props?.companyName : ""}, its directors, from and against all claims, damages, liabilities, suits and judgments, including all costs, interests and expenses relating thereto 
                                  which may be suffered by, accrue against or be recoverable from  ${props?.companyName ? props?.companyName : ""}, or it’s directors.
                              </li>
                              <br />
                             
                              <br />

                          </ul>
                  
                          <h4>  4)	Termination </h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  This Agreement may be terminated at any time by either party, with either party giving the notice up to the termination date of the signed agreement or, if the Service Provider or The Operator fails to observe any of the terms of this Agreement, either party will have the right to immediately terminate this Agreement without notice. Such termination will in no way affect the obligation of 
                                  ${props?.companyName ? props?.companyName : ""} to make payments for work performed prior to termination of this Agreement.
                              </li>
                              <br />

                              

                          </ul>
                          <h4>  5)	Service Providers Representations</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  The Service Provider and Crew Members hereby releases from liability and agrees to defend, indemnify and hold harmless ${props?.companyName ? props?.companyName : ""}, its directors, from and against all claims, damages, liabilities, suits and judgments, including all costs, interests and expenses relating thereto
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


                 
                         
                          <h4>  6)	Non-disclosure</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  The Service Provider and  ${props?.companyName ? props?.companyName : ""} must maintain 
                                  the terms and conditions of this Agreement remain confidential.
                              </li>
                              <br />
                              <li style={{ fontSize: "11px" }}>
                                  For clarity, the Service Provider and its provided crew members from Appendix 1 shall not disclose or discuss any of the terms and conditions of this Agreement to crew mates, any other employees or contractors of  ${props.companyName ? props?.companyName : ""},  ${props?.companyName ? props?.companyName : ""} clients, customers, their
                                   representatives and/or their guests 
                                  or any other third party, without the written permission of  ${props?.companyName ? props?.companyName : ""}.
                              </li>
                              <br />
                              <li style={{ fontSize: "11px" }}>

                                  For clarity,  ${props?.companyName ? props?.companyName : ""}, its employees and/or agents shall
                                   not disclose or discuss any of the terms and conditions of this agreement to crew members, contractors, business partners, competitors, AirCrewConnect's clients, customers, their representatives and/or 
                                  their guests or any other third party, without the written permission of AirCrewConnect.

                              </li>
                              <br />
                             



                          </ul>
                          <h4>  	7)	Worker‘s Compensation Disclaimer</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  The relationship between The Service Provider and the Operator is that of an independent Service Provider and its Crew Members are not employees. Thus, among other things,  ${props?.companyName ? props?.companyName : ""} will have no worker’s compensation liability, state’s or local liability for loss of life or injuries which the Service Providers Crew Member may incur during the term of this Agreement or arising out of this Agreement. Moreover, DCAF will have no obligations or liabilities to the Service Provider under similar social or employment programs which may be available 
                                  to workers in the jurisdictions in which Crew Member lives or performs services for  ${props?.companyName ? props?.companyName : ""}. 
                              </li>
                              <br />
                              
                             </ul>
                             <h4>  	8)	Confidentiality</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  
                                  The Service Provider and  ${props?.companyName ? props?.companyName : ""} agree that they will not at any time during the term of this Agreement or anytime thereafter 
                                  be a disclosure to any person of any information of a confidential nature regarding AirCrewConnect or  ${props?.companyName ? props?.companyName : ""} or the assignment to which the Crew Member is
                                  tasked during the course of this Agreement, including without limitation the terms of any actual or potential commercial transaction between  ${props?.companyName ? props?.companyName : ""}
                                  and any third party. Upon expiry or termination of this Agreement, the Contractor shall return or deliver to  ${props?.companyName ? props?.companyName : ""}
                                   any lists, books, records, digital media and other documents relating to the assignment or any other materials/property belonging to
                                  ${props?.companyName ? props?.companyName : ""} that he has obtained pursuant to or in connection with this Agreement.
                              </li>
                             
                              </ul>
                      

                 
                          <h4>  9)	No solicitation </h4>
                      <ul>
                          <li style={{ fontSize: "11px" }}>
                                  ${props?.companyName ? props?.companyName : ""} agree that they will not 
                                  at any time during the term of this Agreement or within 12 months afterwards contact, engage, solicit, contract or employ the provided Crew Member for
                                   crew support without express permission from AirCrewConnect. Should DCAF or any associated agents or group companies employ or contract the Crew Member within the service agreement or 365 days after the 
                                  completion of this agreement then  ${props?.companyName ? props?.companyName : ""} shall pay AirCrewConnect the following.
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
                          
                

                 

                          <span style={{fontSize:"12px"}}>For on Behalf of the Service Provider:</span>

                          <h6>
                              Matthew Harrison
</h6>
                          <h6>DIRECTOR
                              
</h6>
                          <h6> Date:  ${props?.startDate ? props?.startDate : ""}</h6>
                          <br/>
                          <span style={{ fontSize: "12px" }}>For on Behalf of the Proviedr:</span>
                          

                          <h6>Managing Director On behalf of  ${props?.companyName ? props?.companyName : ""}

                          </h6>
                          <h6>Date:  ${props?.startDate ? props?.startDate : ""}</h6>`;

        // create some sample content for the Word document
        const blob = new Blob([htmlString], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ServiceAgreement.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function handleAppendixDownload() {
        const htmlString = `<h5>Assignment#: #ACC120</h5>
               <h5> Aircraft Type:</h5 >

                    <h5>Client: </h5>

                    <h5>Role: Captain or Co-captain (TBD by Client)</h5>

                    <h5> Rotation/Dispatch Start Date:</h5>

                    <h5>Agreed upon Rotation / Dispatch Duration:  days</h5 >

                    <h5>Pay Rate: $  USD per day(This is inclusive of any training allowance or charge)</h5 >

                    <h5>Per Diems: USD per diems daily</h5 >

                    <p style={{fontSize:"12px", fontWeight:"600"}}>*If on any given dispatch AirCrewConnect’ client covers the expense for 
                    food and beverages, per diem rates will be adjusted or eliminated accordingly *
                    Rotation/Notice Period: The dispatch/rotation period for 
                    this project will be approximately 
                        for {finalDate} day (extendable) and the Contractor 
                    must be available to provide its services for such a period.
                     Unless otherwise arranged and approved in writing by AirCrewConnect,
                      and except in the case of a medical emergency supported in writing 
                      by a treating licensed medical practitioner, the Contractor will not 
                    suspend, terminate or withdraw its services for a confirmed crew Rotation.</p>

                    <h5>  Accommodations: Hotel</h5>

                    <h5> Air Travel: </h5>

                            <h5> Aircraft Base: EGJB, Channel Islands</h5>

                                <h5> Important Notes </h5>`;
        // create some sample content for the Word document
        const blob = new Blob([htmlString], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'AppendixAgreement.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    function handleServiceDownload() {
        const htmlString = `<p style={{fontSize:"13px"}}>THIS SERVICE AGREEMENT (hereinafter the "Agreement") is deemed executed in Dubai, United Arab Emirates
                  <br/><br/>
                      BETWEEN: Matrix Aviation (AircrewConnect), 
                               UAE office address at The One Tower Internet City Teacom Dubai UAE, (hereinafter referred to as the 'Service Provider')
                     
                      <br /><br />
                      AND: DC Aviation Al Futtaim LLC, 
                      a corporation having a place 
                      of business incorporated in Dubai, UAE. The “Operator” of Aircraft (hereinafter referred to as "DCAF and / or The Operator")
                      <br /><br />
                      SCOPE: AirCrewConnect 
                      shall provide Type Rated 
                      and Qualified Flight Crew
                              to  "DCAF" (defined under 
                              this agreement as the Operator) to be utilised within the  "DCAF"  flight operations department under the following terms and conditions.
                      <br /><br />
                      CREW MEMBER : The provided Crew Member as defined in Appendix 1 (hereinafter referred to as "Crew Member")
                      <br /><br />
                      AIRCRAFT ALLOCATION : The Specific aircraft type and registration which the assigned Crew Member is allocated to operate on
                       behalf of the Service Provider for the benefit of the Operator defined in Appendix 1.
                      
                        </p>
               
                   
                      
                          <h4>Term:</h4>
                      <p style={{ fontSize: "12px" }}>
                              Commencing on ""  up to and including 23rd
                               "", pending any 
                               government formalities such as visa processing or licence verification.

                      </p>

                      <h4> 1)	Fees, Rates, Per Diems and Expenses</h4>
                              <ul>
                              <li style={{fontSize:"11px"}}>
                                  For its services while on Assignment (as defined below), will pay AirCrewConnect the fee of USD  per day, plus a per diem of USD and any 
                                      reasonable expenses.
                                   will also pay AirCrewConnect support fee USD  per crew.
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
                                  the completion of the support and an invoice provided by the Service Provider to  
                                  </li>
                                  <br />
                                  <li style={{ fontSize: "11px" }}>
                                      	Authorized Expenses are those reasonable expenses 
                                        directly related to the performance of the Crew Members services hereunder during Assignment, including but not limited to: hotel, business related ground
                                       transportation, business related calls, airfares (above 4 hours in duration to be in Business class.
                                  </li>
                              </ul>

                              
                     


                      </>
                  
                     
                          

                          <h4> 2) Independent Contractor/No Benefits</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  	This is an independent Service Agreement for
                                   temporary professional services provided
                                  by a qualified Crew Member identified in Appendix 1. The Service Provider and its Crew Member or any of its agents shall not be engaged as an employee, servants or agent of   As such, the Service Provider and Crew Members are not entitled to the status, benefits or 
                                  privileges of a   employee. It is the Service Providers responsibility to provide the benefits including, but not limited to the following: workers' compensation, personal accident, injury, death, temporary or permanent disability and/or other insurance; loss of license insurance;
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
                                  The Service Provider and Crew Members hereby releases from liability and agrees to defend, indemnify and hold harmless  , its directors, from and against all claims, damages, liabilities, suits and judgments, including all costs, interests and expenses relating thereto 
                                  which may be suffered by, accrue against or be recoverable from  or it’s directors.
                              </li>
                              <br />
                             
                              <br />

                          </ul>
                          </>
                 
                    
                          <h4>  4)	Termination </h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  This Agreement may be terminated at any time by either party, with either party giving the notice up to the termination date of the signed agreement or, if the Service Provider or The Operator fails to observe any of the terms of this Agreement, either party will have the right to immediately terminate this Agreement without notice. Such termination will in no way affect the obligation of 
                                   to make payments for work performed prior to termination of this Agreement.
                              </li>
                              <br />

                              

                          </ul>
                          <h4>  5)	Service Providers Representations</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  The Service Provider and Crew Members hereby releases from liability and agrees to defend, indemnify and hold harmless , its directors, from and against all claims, damages, liabilities, suits and judgments, including all costs, interests and expenses relating thereto
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

                      
                         
                          <h4>  6)	Non-disclosure</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  The Service Provider and   must maintain 
                                  the terms and conditions of this Agreement remain confidential.
                              </li>
                              <br />
                              <li style={{ fontSize: "11px" }}>
                                  For clarity, the Service Provider and its provided crew members from Appendix 1 shall not disclose or discuss any of the terms and conditions of this Agreement to crew mates, any other employees or contractors of  clients, customers, their
                                   representatives and/or their guests 
                                  or any other third party, without the written permission of .
                              </li>
                              <br />
                              <li style={{ fontSize: "11px" }}>

                                  For clarity,  its employees and/or agents shall
                                   not disclose or discuss any of the terms and conditions of this agreement to crew members, contractors, business partners, competitors, AirCrewConnect's clients, customers, their representatives and/or 
                                  their guests or any other third party, without the written permission of AirCrewConnect.

                              </li>
                              <br />
                             



                          </ul>
                          <h4>  	7)	Worker‘s Compensation Disclaimer</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  The relationship between The Service Provider and the Operator is that of an independent Service Provider and its Crew Members are not employees. Thus, among other things,  will have no worker’s compensation liability, state’s or local liability for loss of life or injuries which the Service Providers Crew Member may incur during the term of this Agreement or arising out of this Agreement. Moreover, DCAF will have no obligations or liabilities to the Service Provider under similar social or employment programs which may be available 
                                  to workers in the jurisdictions in which Crew Member lives or performs services for   
                              </li>
                              <br />
                              
                             </ul>
                             <h4>  	8)	Confidentiality</h4>
                          <ul>
                              <li style={{ fontSize: "11px" }}>
                                  
                                  The Service Provider and   agree that they will not at any time during the term of this Agreement or anytime thereafter 
                                  be a disclosure to any person of any information of a confidential nature regarding AirCrewConnect or  or the assignment to which the Crew Member is
                                  tasked during the course of this Agreement, including without limitation the terms of any actual or potential commercial transaction between  
                                  and any third party. Upon expiry or termination of this Agreement, the Contractor shall return or deliver to  
                                   any lists, books, records, digital media and other documents relating to the assignment or any other materials/property belonging to
                                   that he has obtained pursuant to or in connection with this Agreement.
                              </li>
                             
                              </ul>
                      </>

                  
                          <h4>  9)	No solicitation </h4>
                      <ul>
                          <li style={{ fontSize: "11px" }}>
                                 agree that they will not 
                                  at any time during the term of this Agreement or within 12 months afterwards contact, engage, solicit, contract or employ the provided Crew Member for
                                   crew support without express permission from AirCrewConnect. Should DCAF or any associated agents or group companies employ or contract the Crew Member within the service agreement or 365 days after the 
                                  completion of this agreement then   shall pay AirCrewConnect the following.
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

                 

                          <span style={{fontSize:"12px"}}>For on Behalf of the Service Provider:</span>

                          <h6>
                              Matthew Harrison
</h6>
                          <h6>DIRECTOR
                              
</h6>
                          <h6> Date:  </h6>
                          <br/>
                          <span style={{ fontSize: "12px" }}>For on Behalf of the Operator:</span>
                          

                          <h6>Managing Director On behalf of  

                          </h6>
                          <h6>Date:  </h6>`;
        // create some sample content for the Word document
        const blob = new Blob([htmlString], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ServiceAgreement.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    function handleFlightDownload() {
        const htmlString = `
                        
                        
                        <p style={{ fontSize: "13px" }}>
                                THIS FLIGHT ATTENDANT AGREEMENT (hereinafter the "Agreement")
                                 is deemed executed in Dubai, United Arab Emirates on 16th March 2021
                            <br /><br />
                                BETWEEN: ‘AirCrewConnect’ Matrix Aviation
                                 Limited, registered at 6 Kingsmead Road, Moreton, Wirral, CH461QU, United Kingdom
                            <br /><br />
                                AND: Ouarda Mouloudi, residing at 2 Square Des
                                 Tulipes, 91370, Verrieres-Le-Buisson, France (hereinafter referred to as the "Contractor")
                            <br /><br />
                                Object: AirCrewConnect wishes to retain the services of the Contractor as a flight attendant pursuant to the following terms and conditions. This Agreement will regulate the overall business relationship between AirCrewConnect and the Contractor. For each Dispatch, specific terms and conditions will be specified through an “Appendix A”, which will then form part of this Agreement. Even after signing this Agreement, the Contractor is not obliged to 
                                accept any Dispatch that may be offered by AirCrewConnect during the Term.
                            <br /><br />
                                <h4> 1)	Fees, Rates, Per Diems and Expenses</h4>
                                <ul>
                                    <li style={{ fontSize: "11px" }}>

                                        AircrewConnect will pay Contractor for its services, 
                                        fees, per diem and expenses as they will be 
                                        agreed upon on a case by case basis, prior to
                                         any Dispatch, as stipulated and confirmed 
                                         in e-mails containing an “Appendix “A” for such Dispatch

                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>
                                        	Dispatch is the service period starting
                                         the day the Contractor boards its flight to the assigned project and ends: (i) the day the Contractor’s return flight lands; or (ii) the day 
                                        AirCrewConnect gives a Termination notice to the Contractor, whichever comes first.
                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>
                                        	The Contractor's fees and per diem are processed and paid automatically within 7-10 business
                                         days of the 15th and the last day of each month, based on the Contractor’s days on Dispatch.
                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>

                                        The Contractor's Authorized Expenses 
                                        
                                        (as defined below) are processed and reimbursed 
                                        within 7-10 business days of AirCrewConnect’s 
                                        receipt of a duly completed AirCrewConnect 
                                        Expense Report with all receipts and proof 
                                        of payments required. Expense Reports must 
                                        be submitted within 14 days of incurring an 
                                        expense. It is understood that AirCrewConnect 
                                        may decline to reimburse any expense submitted
                                         more than 14 days after they have been incurred given that 
                                         AirCrewConnect may itself be precluded from seeking a reimbursement from its client after this period.

                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>
                                    	Authorized Expenses are reasonable expenses directly related to the performance of the Contractor’s services hereunder during Dispatch, such as, lodging accommodations, crew uniform laundry, business related ground transportation, calls, faxes and e-mails. Airfares to and from Dispatch are normally prepaid by AirCrewConnect, as per Section 2 below. Food and beverages are not considered as Authorized Expenses since they are covered by the per diem paid to the Contractor. 
                                        Transport to and from Dispatch, including car parking, are at Contractor’s sole expense.
                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>
                                        	Prior to submitting its first expense report, the Contractor agrees to schedule and undergo a training session via teleconference to review AirCrewConnect policies 
                                        and procedures in regard to expense submissions, unless waived by AirCrewConnect.
                                    </li>
                                    <br />
                                </ul>
                            

                        </p>
                   
                            

                            <h5> 2) Dispatch Conditions and Periods, and Aircraft Operational Rules</h5>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    	The Contractor recognizes that the execution of this Agreement does not constitute a guarantee or promise of work being offered to the Contractor.
                                     If a Dispatch is offered to Contractor, Contractor is not obliged to accept.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	Notwithstanding any other provision herein, AirCrewConnect reserves all its rights to shorten, extend or otherwise modify a Dispatch period, at any time; crew Dispatch
                                     dates are approximate and may be subject to short notice modifications or cancellations.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	Unless otherwise arranged and approved in writing by AirCrewConnect, for example, in the case of a family or personal emergency, the Contractor will not, under any circumstances, except in the case of a medical emergency supported in writing by a treating licensed medical practitioner, withdraw its services for a confirmed Dispatch, terminate its Dispatch, suspend its services or otherwise leave the aircraft prior to the 
                                    arrival of a replacement crew and proper hand-off of the aircraft and related paperwork.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor is responsible for respecting the travel arrangements made by AirCrewConnect and will not make its own, unless otherwise agreed upon in writing by AirCrewConnect. AirCrewConnect may hold the Contractor liable for costs and
                                     expenses incurred by AirCrewConnect as a result of the Contractor missing a flight without just cause.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	If dispatched to a Client whose aircraft is not operated by AirCrewConnect, the Contractor will follow the Client’s operational standards, policies and procedures for the aircraft operations, always remaining within  established safety regulations and other operational 
                                    requirements of the civil aviation authorities having jurisdiction over the aircraft.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    If dispatched to an AirCrewConnect operated aircraft:
                                    <br/>
                                    <ul>
                                        <li style={{ fontSize: "11px" }}>
                                            Contractor hereby agrees and promises to follow AirCrewConnect’ Policies and 
                                            Procedures for aircraft operations, as found in the AirCrewConnect aircraft manuals;
                                    </li>
                                    <br/>
                                        <li style={{ fontSize: "11px" }}>
                                            
                                                Contractor hereby agrees and promises to follow AirCrewConnect’ Policies and
                                                Procedures for aircraft operations, as found in the AirCrewConnect aircraft manuals;
                                            
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            Contractor will provide AirCrewConnect with all requested documents and 
                                            reports, including but not limited to documentation, aircraft logs and post flight reports.
                                        </li>
                                        <br />
                                    </ul>
                                </li>
                            </ul>





                      


                            <h4> 3) Incident Reports</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    	While on Dispatch or otherwise providing its services, Contractor agrees to immediately report any incident which involves them, crew mates or the aircraft and/or its passengers, whether or not the incident is the fault of the Contractor or another flight attendant, another aircraft or any other party. Such report should be a complete written explanation of the incident from the Contractor’s point of view and shall be forwarded immediately by email to AirCrewConnect’s Dubai office. Any report made and/or addressed to an 
                                    AirCrewConnect client directly shall include a copy to AirCrewConnect (admin@aircrewconnect.com).
                                </li>
                                <br />

                            </ul>
                            <h4>  4) Independent Contractor/No Benefits/Income Taxes</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    This is an independent contractor Agreement for temporary professional services and the Contractor is not engaged as an employee, servant or agent of AirCrewConnect. As such, the Contractor is not entitled to the status, benefits or privileges of an AirCrewConnect employee. All amounts payable under this Agreement are inclusive of any applicable taxes of whatever nature,
                                     and neither party shall be responsible for the other party’s taxes on gross or net income.
                                </li>
                                <br />

                                

                            </ul>
                            <h4>  5)	Liability and Indemnity/Workers Compensation Insurance</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor hereby releases from liability and agrees to defend, indemnify and hold harmless AirCrewConnect, its directors, officers, employees, agents and other contractors from and against all claims, damages, liabilities, suits and judgments, including all costs, interests and expenses relating thereto which may be suffered by, accrue against or be recoverable from AirCrewConnect, its directors, officers, employees, agents or other contractors by reason of injury to or death of the Contractor (including, if the Contractor is a corporation, any director, officer, employee or agent of the Contractor) or by reason of damage to or loss of property of the Contractor (including, if the Contractor is a corporation, any director, officer, employee or agent of the Contractor) occurring during a Dispatch
                                     or otherwise as a result of or during the provision of services by the Contractor.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	Without limiting the foregoing, while actively “on-duty” during a Dispatch, the Contractor may be covered by 
                                    the applicable aircraft insurance policy for the aircraft concerned by the Dispatch.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                     Notwithstanding the previous paragraph, the Contractor remains solely responsible to subscribe to or obtain any desired benefits including, but not limited to the following: workers’ compensation, personal accident, injury, death, temporary or permanent disability and/or other insurance; loss of license insurance; sick leave; superannuating; and like entitlements, as applicable or desirable for the Contractor. AirCrewConnect is not responsible for
                                     and will not subscribe to any of the aforementioned benefits or coverage for the Contractor.
                                </li>
                                <br />

                                

                            </ul>
                            <h4>  6) Contractor Representations</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor represents and warrants to AirCrewConnect that the Contractor possesses all skills, licenses, certifications and qualifications
                                     necessary to enable the Contractor to perform the services required hereunder.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    6.2	Without limiting the foregoing, the Contractor has a current, valid flight attendant license and type rating for the Aircraft without conditions or limitations, or will have same prior to Dispatch as well as a valid 
                                    1st class medical certification and will maintain them for the duration of this Agreement.
                                </li>
                                <br />

                               

                            </ul>
                            <h4>  7)
                                	Medical/Training Costs
 </h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor is responsible to pay for its own medical certification,
                                     inoculations and Initial and/or Recurrent training costs and all related expenses.
                                </li>
                                <br />



                            </ul>
                     
                            <h5>  8) Non-employment/Non-solicitation/Non-communication Rules</h5>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    	With any AirCrewConnect client and/or client's guests and/or client's end user or own customer to which AirCrewConnect has dispatched or has offered to dispatch the Contractor or on any aircraft (identified by serial number) the Contractor has
                                     supplied its services pursuant to the present Agreement, the Contractor is prohibited from:
                                
                               
                               
                                
                                    <li style={{ fontSize: "11px" }}>
                                        
                                        
                                            <li style={{ fontSize: "11px" }}>
                                                	Soliciting, accepting or undertaking, directly or indirectly, a full or part time employment or contractor position in any capacity related to crew or aircraft support services (including but not limited to charter, leasing, management, 
                                                    interim lift and aircraft sales/acquisitions services);
                                            </li>
                                            <br />
                                            <li style={{ fontSize: "11px" }}>

                                                 	Referring or suggesting a party other than AirCrewConnect for the provision of any crew or aircraft support services (including but not limited to charter, leasing,
                                                     management, interim lift, sale and acquisitions of aircraft services);

                                            </li>
                                            <br />
                                            <li style={{ fontSize: "11px" }}>
                                                	Communicating with crew mates and/or AirCrewConnect client, client representatives or guests about the terms and conditions of this
                                                 Agreement and the payment to the Contractor of fees, per diem and/or expenses;
                                            </li>
                                            <br />
                                            <li style={{ fontSize: "11px" }}>
                                                Soliciting payment from an AirCrewConnect client, client representative and/or guests.
                                            </li>
                                            <br />
                                            <li style={{ fontSize: "11px" }}>
                                                	Distributing and/or publishing in any format or form, including but not limited to any public forums, billboards, websites, Twitter™, MySpace™, Youtube™, Facebook™, Instagram™, Snapchat™, bulletin boards, or likewise, any photos, videos, descriptions, anecdotes, essays or other of the Aircraft,
                                                 AirCrewConnect, AirCrewConnect' client and/or client's guests.
                                            </li>
                                            <br />
                                       
                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>

                                        	The prohibitions above also apply to all aircraft manufacturers' end-users and their guests if the Contractor is on a Dispatch for 
                                        an assignment where the aircraft manufacturer is AirCrewConnect' client.

                                    </li>
                                    <br />
                                    
                                 </li>
 </ul>
                            <h4>  9) Non-disclosure</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor must maintain the terms and conditions of this Agreement confidential.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	Notwithstanding the foregoing, the Contractor may discuss 
                                    and review this Agreement with his attorney and/or accountant/personal banker.
                                </li>
                                <br />
                                



                            </ul>
                       
                            <h5>  10) Default and Penalties </h5>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor is 
                                    responsible for AirCrewConnect 
                                   or Client property used by the Contractor 
                                   during its Dispatch, (such as mobile phones, tablets, laptops, etc.) and may be held responsible for the replacement cost of such items should the Contractor damage them, lose them or fail to return them in good working order.
                                    </li>
                                    <br/>
                                  <li style={{ fontSize: "11px" }}>
                                    The Contractor may also be held liable for unjustified costs incurred by AirCrewConnect or the Client for excessive or non-duty related use by the Contractor of services such as Satcom or Wi-Fi, or
                                    carelessness in the use of such similar services or subscriptions.
                                    </li>
                                <br />
                                     <li style={{ fontSize: "11px" }}>
                                    A Default is defined as any breach of this Agreement by the Contractor and, without limiting 
                                    the generality of the foregoing, includes but is not limited to,
                                    <br/>
                                    <ul>
                                    
                                    <li style={{ fontSize: "11px" }}>
                                    arriving or setting off to a Dispatch without proper, valid documentation (flight attendant license, medical certificate, passport, visas, validations and any other mandatory required documentation, etc.);
                                    </li>
                                    <br />
                                        <li style={{ fontSize: "11px" }}>
                                            improper or impolite conduct with crew mates, AirCrewConnect representatives and/or AirCrewConnect’s client, client’s representatives and/or guests 
                                            for which the Contractor has been previously notified to correct and/or remedy.
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            	material dishonesty;
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            	material violation of Dispatch or AirCrewConnect instructions;
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            intemperance and/or dissipation which may reasonably impact the performance of this Agreement;
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                        non-performance of services or willful neglect in the performance of services hereunder; and
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            a breach of any Section of this Agreement.
                                        </li>

                                        <br />


                                    </ul>

                                    </li>
                                <br />
                                    
                                <li style={{ fontSize: "11px" }}>
                                    <li style={{ fontSize: "11px" }}>
                                        	For each breach of a Section and/or Subsection 
                                            of the present heading, the Contractor is liable
                                            
                                            and will pay AirCrewConnect all direct and consequential damages, suffered by AirCrewConnect and, without limiting the generality of the foregoing, such damages are hereby set at a minimum amount of 25,000.00$USD.
                                    </li>
                                    
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                	Should the Contractor be approached for an employment or contractor position by an AirCrewConnect client or AirCrewConnect client’s guest, the Contractor shall notify AirCrewConnect so as to permit it to enter discussions with said AirCrewConnect client or client’s guest and evaluate the possibility of 
                                    providing the Contractor a release from all or part of the conditions of the present heading.
                                </li>
                                <br />
                                
                            </ul>

                            <h4>  11) Term and Termination of Agreement</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    	This Agreement shall remain valid for a period of 
                                    three (3) years (the “Term”), unless otherwise terminated pursuant to the terms herein.
                                  
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	If the Term ends during a Dispatch, the parties hereby agree to automatically extend
                                     the Term until completion of that Dispatch, under the same terms and conditions herein.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>

                                    AirCrewConnect may terminate this 
                                    Agreement for Default, as defined in section 10.3 above, effective immediately upon written notice.

                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>


                                    Except for Subsections 8.1.3, 8.1.4 and 8.1.5 which shall survive 
                                    indefinitely, the Sections and Subsections under the present heading
                                    
                                    shall apply during the Term of this Agreement, as well as any extension 
                                    thereof, and for an additional period of twelve (12) months thereafter.


                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	AirCrewConnect may also immediately terminate a Dispatch and/or this Agreement without cause if AirCrewConnect’ client gives AirCrewConnect a notice of 
                                    termination or suspension of the project to which the Contractor was assigned
                                  

                                </li>
                                <br />




                            </ul>
                           
                        

                  
                            <h4>  12)		Notifications </h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    AirCrewConnect communications with and 
                                    notifications to the Contractor will be validly conducted and delivered by email to the following e-mail address (the “Contractor’s Notification Address”).
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    
                                        AirCrewConnect communications with and
                                        notifications to the Contractor will be validly conducted and delivered by email to the following e-mail address (the “Contractor’s Notification Address”).
                                   
                                    <br />
                                </li>
                                <br />



                            </ul>
                            <h4>  13)		Miscellaneous</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    Applicable Law. This Agreement is deemed to have been signed and executed by the parties in Dubai, United Arab Emirates, and will be governed by the laws
                                     of United Arab Emirates applicable therein, without regard to conflict of law provisions.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                   
                                        Should a failure of service occur of the provided Crew Member defined in Appendix 1 not be able to complete the assigned contracted support for any reason then it will remain the sole responsibility of
                                        AirCrewConnect to provide within a reasonable time a suitable replacement crew member.
                                    
                                   
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Exclusive Jurisdiction. The Contractor accepts and acknowledges that the Courts of the United Arab Emirates, as the case may be, have exclusive, non-revocable jurisdiction concerning any dispute, claim or controversy between the parties to this Agreement arising from the application, interpretation, breach or performance of this Agreement. However, AirCrewConnect may institute proceedings in any jurisdiction should it seek an injunctive relief or order against the Contractor or
                                     seek foreign enforcement of a final order or judgment issued by the jurisdiction above.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Notwithstanding the foregoing, AirCrewConnect may elect to sell convey and/or transfer any of its claims herein to a collection agency, at AirCrewConnect’ 
                                    sole discretion, in which case such a collection agency will not be bound by Subsection 
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    This Agreement is the only agreement between the parties and replaces and/or supersedes any previous agreement between
                                     the parties, unless otherwise specifically provided herein.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	Language. The parties have requested that this Agreement
                                     and all notices, documents or court proceedings thereto related be drafted in English. 
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    IN WITNESS WHEREOF, the parties are deemed to have
                                     executed this Agreement in Dubai, UAE as of the date first mentioned hereinabove.
                                </li>
                                <br />




                            </ul>
                            






                            

                     

                            <h3 className='text-center'>Authorization Form</h3>
                            <p className='text-center' style={{fontSize:"13px"}}>
                                (in support to Support Services Agreement)
                            </p>

                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    This Authorization Form is in support to the 19th January, 2022 Pilot Services Agreement between Matrix Aviation Limited ‘AirCrewConnect’ and Anne Lohmann (the "Agreement"). Unless otherwise defined, 
                                    capitalized terms herein have the same meaning as in the Agreement.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	The Contractor hereby authorizes AirCrewConnect to request and obtain copies of its full training records from any training facility including but not limited to the make and model of flight training equipment used; evaluation of performance on each lesson and the name of the instructor providing instruction; results of each end-of-course practical test and the name of the evaluator conducting the test; and 
                                    the number of hours of additional training accomplished after any unsatisfactory practical test.
                                  

                                   
                                </li>
                                <br/>
                                <li style={{ fontSize: "11px" }}>

                                    The Contractor hereby further instructs such facility to comply with AirCrewConnect' request in a timely fashion without the necessity
                                     to notify the Contractor, and as if the Contractor had made the request itself


                                </li>
                                <br />
                                



                            </ul>
                            <p className='text-center' style={{ fontSize: "12px" }}>
                                IN WITNESS WHEREOF, the parties are deemed to have executed this 
                                Authorization Form in Dubai, UAE, as of the same date of execution as the Agreement.
                            </p>

                            <Row>
                            <Col>
                            <h5>
                                        AirCrewConnect.
                                        
                                        <hr mt-3 />

                            </h5>
                                    
                                    <h4>
                                        MATTHEW HARRISON 


                                    </h4>
                            </Col>
                                <Col>
                                    <h5>
                                        CONTRACTOR: Ouarda Mouloudi
                                        <hr mt-3 />
                                    </h5>
                                    
                                </Col>
                            </Row>







                        

                    `;
        // create some sample content for the Word document
        const blob = new Blob([htmlString], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'FlightAgreement.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    function handlePilotDownload() {
        const htmlString = `
                        
                        
                        <p style={{ fontSize: "13px" }}>
                                THIS FLIGHT ATTENDANT AGREEMENT (hereinafter the "Agreement")
                                 is deemed executed in Dubai, United Arab Emirates on 16th March 2021
                            <br /><br />
                                BETWEEN: ‘AirCrewConnect’ Matrix Aviation
                                 Limited, registered at 6 Kingsmead Road, Moreton, Wirral, CH461QU, United Kingdom
                            <br /><br />
                                AND: Ouarda Mouloudi, residing at 2 Square Des
                                 Tulipes, 91370, Verrieres-Le-Buisson, France (hereinafter referred to as the "Contractor")
                            <br /><br />
                                Object: AirCrewConnect wishes to retain the services of the Contractor as a flight attendant pursuant to the following terms and conditions. This Agreement will regulate the overall business relationship between AirCrewConnect and the Contractor. For each Dispatch, specific terms and conditions will be specified through an “Appendix A”, which will then form part of this Agreement. Even after signing this Agreement, the Contractor is not obliged to 
                                accept any Dispatch that may be offered by AirCrewConnect during the Term.
                            <br /><br />
                                <h4> 1)	Fees, Rates, Per Diems and Expenses</h4>
                                <ul>
                                    <li style={{ fontSize: "11px" }}>

                                        AircrewConnect will pay Contractor for its services, 
                                        fees, per diem and expenses as they will be 
                                        agreed upon on a case by case basis, prior to
                                         any Dispatch, as stipulated and confirmed 
                                         in e-mails containing an “Appendix “A” for such Dispatch

                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>
                                        	Dispatch is the service period starting
                                         the day the Contractor boards its flight to the assigned project and ends: (i) the day the Contractor’s return flight lands; or (ii) the day 
                                        AirCrewConnect gives a Termination notice to the Contractor, whichever comes first.
                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>
                                        	The Contractor's fees and per diem are processed and paid automatically within 7-10 business
                                         days of the 15th and the last day of each month, based on the Contractor’s days on Dispatch.
                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>

                                        The Contractor's Authorized Expenses 
                                        
                                        (as defined below) are processed and reimbursed 
                                        within 7-10 business days of AirCrewConnect’s 
                                        receipt of a duly completed AirCrewConnect 
                                        Expense Report with all receipts and proof 
                                        of payments required. Expense Reports must 
                                        be submitted within 14 days of incurring an 
                                        expense. It is understood that AirCrewConnect 
                                        may decline to reimburse any expense submitted
                                         more than 14 days after they have been incurred given that 
                                         AirCrewConnect may itself be precluded from seeking a reimbursement from its client after this period.

                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>
                                    	Authorized Expenses are reasonable expenses directly related to the performance of the Contractor’s services hereunder during Dispatch, such as, lodging accommodations, crew uniform laundry, business related ground transportation, calls, faxes and e-mails. Airfares to and from Dispatch are normally prepaid by AirCrewConnect, as per Section 2 below. Food and beverages are not considered as Authorized Expenses since they are covered by the per diem paid to the Contractor. 
                                        Transport to and from Dispatch, including car parking, are at Contractor’s sole expense.
                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>
                                        	Prior to submitting its first expense report, the Contractor agrees to schedule and undergo a training session via teleconference to review AirCrewConnect policies 
                                        and procedures in regard to expense submissions, unless waived by AirCrewConnect.
                                    </li>
                                    <br />
                                </ul>
                            

                        </p>
                   
                            

                            <h5> 2) Dispatch Conditions and Periods, and Aircraft Operational Rules</h5>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    	The Contractor recognizes that the execution of this Agreement does not constitute a guarantee or promise of work being offered to the Contractor.
                                     If a Dispatch is offered to Contractor, Contractor is not obliged to accept.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	Notwithstanding any other provision herein, AirCrewConnect reserves all its rights to shorten, extend or otherwise modify a Dispatch period, at any time; crew Dispatch
                                     dates are approximate and may be subject to short notice modifications or cancellations.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	Unless otherwise arranged and approved in writing by AirCrewConnect, for example, in the case of a family or personal emergency, the Contractor will not, under any circumstances, except in the case of a medical emergency supported in writing by a treating licensed medical practitioner, withdraw its services for a confirmed Dispatch, terminate its Dispatch, suspend its services or otherwise leave the aircraft prior to the 
                                    arrival of a replacement crew and proper hand-off of the aircraft and related paperwork.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor is responsible for respecting the travel arrangements made by AirCrewConnect and will not make its own, unless otherwise agreed upon in writing by AirCrewConnect. AirCrewConnect may hold the Contractor liable for costs and
                                     expenses incurred by AirCrewConnect as a result of the Contractor missing a flight without just cause.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	If dispatched to a Client whose aircraft is not operated by AirCrewConnect, the Contractor will follow the Client’s operational standards, policies and procedures for the aircraft operations, always remaining within  established safety regulations and other operational 
                                    requirements of the civil aviation authorities having jurisdiction over the aircraft.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    If dispatched to an AirCrewConnect operated aircraft:
                                    <br/>
                                    <ul>
                                        <li style={{ fontSize: "11px" }}>
                                            Contractor hereby agrees and promises to follow AirCrewConnect’ Policies and 
                                            Procedures for aircraft operations, as found in the AirCrewConnect aircraft manuals;
                                    </li>
                                    <br/>
                                        <li style={{ fontSize: "11px" }}>
                                            
                                                Contractor hereby agrees and promises to follow AirCrewConnect’ Policies and
                                                Procedures for aircraft operations, as found in the AirCrewConnect aircraft manuals;
                                            
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            Contractor will provide AirCrewConnect with all requested documents and 
                                            reports, including but not limited to documentation, aircraft logs and post flight reports.
                                        </li>
                                        <br />
                                    </ul>
                                </li>
                            </ul>





                      


                            <h4> 3) Incident Reports</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    	While on Dispatch or otherwise providing its services, Contractor agrees to immediately report any incident which involves them, crew mates or the aircraft and/or its passengers, whether or not the incident is the fault of the Contractor or another flight attendant, another aircraft or any other party. Such report should be a complete written explanation of the incident from the Contractor’s point of view and shall be forwarded immediately by email to AirCrewConnect’s Dubai office. Any report made and/or addressed to an 
                                    AirCrewConnect client directly shall include a copy to AirCrewConnect (admin@aircrewconnect.com).
                                </li>
                                <br />

                            </ul>
                            <h4>  4) Independent Contractor/No Benefits/Income Taxes</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    This is an independent contractor Agreement for temporary professional services and the Contractor is not engaged as an employee, servant or agent of AirCrewConnect. As such, the Contractor is not entitled to the status, benefits or privileges of an AirCrewConnect employee. All amounts payable under this Agreement are inclusive of any applicable taxes of whatever nature,
                                     and neither party shall be responsible for the other party’s taxes on gross or net income.
                                </li>
                                <br />

                                

                            </ul>
                            <h4>  5)	Liability and Indemnity/Workers Compensation Insurance</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor hereby releases from liability and agrees to defend, indemnify and hold harmless AirCrewConnect, its directors, officers, employees, agents and other contractors from and against all claims, damages, liabilities, suits and judgments, including all costs, interests and expenses relating thereto which may be suffered by, accrue against or be recoverable from AirCrewConnect, its directors, officers, employees, agents or other contractors by reason of injury to or death of the Contractor (including, if the Contractor is a corporation, any director, officer, employee or agent of the Contractor) or by reason of damage to or loss of property of the Contractor (including, if the Contractor is a corporation, any director, officer, employee or agent of the Contractor) occurring during a Dispatch
                                     or otherwise as a result of or during the provision of services by the Contractor.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	Without limiting the foregoing, while actively “on-duty” during a Dispatch, the Contractor may be covered by 
                                    the applicable aircraft insurance policy for the aircraft concerned by the Dispatch.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                     Notwithstanding the previous paragraph, the Contractor remains solely responsible to subscribe to or obtain any desired benefits including, but not limited to the following: workers’ compensation, personal accident, injury, death, temporary or permanent disability and/or other insurance; loss of license insurance; sick leave; superannuating; and like entitlements, as applicable or desirable for the Contractor. AirCrewConnect is not responsible for
                                     and will not subscribe to any of the aforementioned benefits or coverage for the Contractor.
                                </li>
                                <br />

                                

                            </ul>
                            <h4>  6) Contractor Representations</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor represents and warrants to AirCrewConnect that the Contractor possesses all skills, licenses, certifications and qualifications
                                     necessary to enable the Contractor to perform the services required hereunder.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    6.2	Without limiting the foregoing, the Contractor has a current, valid flight attendant license and type rating for the Aircraft without conditions or limitations, or will have same prior to Dispatch as well as a valid 
                                    1st class medical certification and will maintain them for the duration of this Agreement.
                                </li>
                                <br />

                               

                            </ul>
                            <h4>  7)
                                	Medical/Training Costs
 </h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor is responsible to pay for its own medical certification,
                                     inoculations and Initial and/or Recurrent training costs and all related expenses.
                                </li>
                                <br />



                            </ul>
                     
                            <h5>  8) Non-employment/Non-solicitation/Non-communication Rules</h5>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    	With any AirCrewConnect client and/or client's guests and/or client's end user or own customer to which AirCrewConnect has dispatched or has offered to dispatch the Contractor or on any aircraft (identified by serial number) the Contractor has
                                     supplied its services pursuant to the present Agreement, the Contractor is prohibited from:
                                
                               
                               
                                
                                    <li style={{ fontSize: "11px" }}>
                                        
                                        
                                            <li style={{ fontSize: "11px" }}>
                                                	Soliciting, accepting or undertaking, directly or indirectly, a full or part time employment or contractor position in any capacity related to crew or aircraft support services (including but not limited to charter, leasing, management, 
                                                    interim lift and aircraft sales/acquisitions services);
                                            </li>
                                            <br />
                                            <li style={{ fontSize: "11px" }}>

                                                 	Referring or suggesting a party other than AirCrewConnect for the provision of any crew or aircraft support services (including but not limited to charter, leasing,
                                                     management, interim lift, sale and acquisitions of aircraft services);

                                            </li>
                                            <br />
                                            <li style={{ fontSize: "11px" }}>
                                                	Communicating with crew mates and/or AirCrewConnect client, client representatives or guests about the terms and conditions of this
                                                 Agreement and the payment to the Contractor of fees, per diem and/or expenses;
                                            </li>
                                            <br />
                                            <li style={{ fontSize: "11px" }}>
                                                Soliciting payment from an AirCrewConnect client, client representative and/or guests.
                                            </li>
                                            <br />
                                            <li style={{ fontSize: "11px" }}>
                                                	Distributing and/or publishing in any format or form, including but not limited to any public forums, billboards, websites, Twitter™, MySpace™, Youtube™, Facebook™, Instagram™, Snapchat™, bulletin boards, or likewise, any photos, videos, descriptions, anecdotes, essays or other of the Aircraft,
                                                 AirCrewConnect, AirCrewConnect' client and/or client's guests.
                                            </li>
                                            <br />
                                       
                                    </li>
                                    <br />
                                    <li style={{ fontSize: "11px" }}>

                                        	The prohibitions above also apply to all aircraft manufacturers' end-users and their guests if the Contractor is on a Dispatch for 
                                        an assignment where the aircraft manufacturer is AirCrewConnect' client.

                                    </li>
                                    <br />
                                    
                                 </li>
 </ul>
                            <h4>  9) Non-disclosure</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor must maintain the terms and conditions of this Agreement confidential.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	Notwithstanding the foregoing, the Contractor may discuss 
                                    and review this Agreement with his attorney and/or accountant/personal banker.
                                </li>
                                <br />
                                



                            </ul>
                       
                            <h5>  10) Default and Penalties </h5>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    The Contractor is 
                                    responsible for AirCrewConnect 
                                   or Client property used by the Contractor 
                                   during its Dispatch, (such as mobile phones, tablets, laptops, etc.) and may be held responsible for the replacement cost of such items should the Contractor damage them, lose them or fail to return them in good working order.
                                    </li>
                                    <br/>
                                  <li style={{ fontSize: "11px" }}>
                                    The Contractor may also be held liable for unjustified costs incurred by AirCrewConnect or the Client for excessive or non-duty related use by the Contractor of services such as Satcom or Wi-Fi, or
                                    carelessness in the use of such similar services or subscriptions.
                                    </li>
                                <br />
                                     <li style={{ fontSize: "11px" }}>
                                    A Default is defined as any breach of this Agreement by the Contractor and, without limiting 
                                    the generality of the foregoing, includes but is not limited to,
                                    <br/>
                                    <ul>
                                    
                                    <li style={{ fontSize: "11px" }}>
                                    arriving or setting off to a Dispatch without proper, valid documentation (flight attendant license, medical certificate, passport, visas, validations and any other mandatory required documentation, etc.);
                                    </li>
                                    <br />
                                        <li style={{ fontSize: "11px" }}>
                                            improper or impolite conduct with crew mates, AirCrewConnect representatives and/or AirCrewConnect’s client, client’s representatives and/or guests 
                                            for which the Contractor has been previously notified to correct and/or remedy.
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            	material dishonesty;
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            	material violation of Dispatch or AirCrewConnect instructions;
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            intemperance and/or dissipation which may reasonably impact the performance of this Agreement;
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                        non-performance of services or willful neglect in the performance of services hereunder; and
                                        </li>
                                        <br />
                                        <li style={{ fontSize: "11px" }}>
                                            a breach of any Section of this Agreement.
                                        </li>

                                        <br />


                                    </ul>

                                    </li>
                                <br />
                                    
                                <li style={{ fontSize: "11px" }}>
                                    <li style={{ fontSize: "11px" }}>
                                        	For each breach of a Section and/or Subsection 
                                            of the present heading, the Contractor is liable
                                            
                                            and will pay AirCrewConnect all direct and consequential damages, suffered by AirCrewConnect and, without limiting the generality of the foregoing, such damages are hereby set at a minimum amount of 25,000.00$USD.
                                    </li>
                                    
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                	Should the Contractor be approached for an employment or contractor position by an AirCrewConnect client or AirCrewConnect client’s guest, the Contractor shall notify AirCrewConnect so as to permit it to enter discussions with said AirCrewConnect client or client’s guest and evaluate the possibility of 
                                    providing the Contractor a release from all or part of the conditions of the present heading.
                                </li>
                                <br />
                                
                            </ul>

                            <h4>  11) Term and Termination of Agreement</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    	This Agreement shall remain valid for a period of 
                                    three (3) years (the “Term”), unless otherwise terminated pursuant to the terms herein.
                                  
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	If the Term ends during a Dispatch, the parties hereby agree to automatically extend
                                     the Term until completion of that Dispatch, under the same terms and conditions herein.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>

                                    AirCrewConnect may terminate this 
                                    Agreement for Default, as defined in section 10.3 above, effective immediately upon written notice.

                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>


                                    Except for Subsections 8.1.3, 8.1.4 and 8.1.5 which shall survive 
                                    indefinitely, the Sections and Subsections under the present heading
                                    
                                    shall apply during the Term of this Agreement, as well as any extension 
                                    thereof, and for an additional period of twelve (12) months thereafter.


                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	AirCrewConnect may also immediately terminate a Dispatch and/or this Agreement without cause if AirCrewConnect’ client gives AirCrewConnect a notice of 
                                    termination or suspension of the project to which the Contractor was assigned
                                  

                                </li>
                                <br />




                            </ul>
                           
                        

                  
                            <h4>  12)		Notifications </h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    AirCrewConnect communications with and 
                                    notifications to the Contractor will be validly conducted and delivered by email to the following e-mail address (the “Contractor’s Notification Address”).
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    
                                        AirCrewConnect communications with and
                                        notifications to the Contractor will be validly conducted and delivered by email to the following e-mail address (the “Contractor’s Notification Address”).
                                   
                                    <br />
                                </li>
                                <br />



                            </ul>
                            <h4>  13)		Miscellaneous</h4>
                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    Applicable Law. This Agreement is deemed to have been signed and executed by the parties in Dubai, United Arab Emirates, and will be governed by the laws
                                     of United Arab Emirates applicable therein, without regard to conflict of law provisions.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                   
                                        Should a failure of service occur of the provided Crew Member defined in Appendix 1 not be able to complete the assigned contracted support for any reason then it will remain the sole responsibility of
                                        AirCrewConnect to provide within a reasonable time a suitable replacement crew member.
                                    
                                   
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Exclusive Jurisdiction. The Contractor accepts and acknowledges that the Courts of the United Arab Emirates, as the case may be, have exclusive, non-revocable jurisdiction concerning any dispute, claim or controversy between the parties to this Agreement arising from the application, interpretation, breach or performance of this Agreement. However, AirCrewConnect may institute proceedings in any jurisdiction should it seek an injunctive relief or order against the Contractor or
                                     seek foreign enforcement of a final order or judgment issued by the jurisdiction above.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    Notwithstanding the foregoing, AirCrewConnect may elect to sell convey and/or transfer any of its claims herein to a collection agency, at AirCrewConnect’ 
                                    sole discretion, in which case such a collection agency will not be bound by Subsection 
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    This Agreement is the only agreement between the parties and replaces and/or supersedes any previous agreement between
                                     the parties, unless otherwise specifically provided herein.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	Language. The parties have requested that this Agreement
                                     and all notices, documents or court proceedings thereto related be drafted in English. 
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    IN WITNESS WHEREOF, the parties are deemed to have
                                     executed this Agreement in Dubai, UAE as of the date first mentioned hereinabove.
                                </li>
                                <br />




                            </ul>
                            






                            

                     

                            <h3 className='text-center'>Authorization Form</h3>
                            <p className='text-center' style={{fontSize:"13px"}}>
                                (in support to Support Services Agreement)
                            </p>

                            <ul>
                                <li style={{ fontSize: "11px" }}>
                                    This Authorization Form is in support to the 19th January, 2022 Pilot Services Agreement between Matrix Aviation Limited ‘AirCrewConnect’ and Anne Lohmann (the "Agreement"). Unless otherwise defined, 
                                    capitalized terms herein have the same meaning as in the Agreement.
                                </li>
                                <br />
                                <li style={{ fontSize: "11px" }}>
                                    	The Contractor hereby authorizes AirCrewConnect to request and obtain copies of its full training records from any training facility including but not limited to the make and model of flight training equipment used; evaluation of performance on each lesson and the name of the instructor providing instruction; results of each end-of-course practical test and the name of the evaluator conducting the test; and 
                                    the number of hours of additional training accomplished after any unsatisfactory practical test.
                                  

                                   
                                </li>
                                <br/>
                                <li style={{ fontSize: "11px" }}>

                                    The Contractor hereby further instructs such facility to comply with AirCrewConnect' request in a timely fashion without the necessity
                                     to notify the Contractor, and as if the Contractor had made the request itself


                                </li>
                                <br />
                                



                            </ul>
                            <p className='text-center' style={{ fontSize: "12px" }}>
                                IN WITNESS WHEREOF, the parties are deemed to have executed this 
                                Authorization Form in Dubai, UAE, as of the same date of execution as the Agreement.
                            </p>

                            <Row>
                            <Col>
                            <h5>
                                        AirCrewConnect.
                                        
                                        <hr mt-3 />

                            </h5>
                                    
                                    <h4>
                                        MATTHEW HARRISON 


                                    </h4>
                            </Col>
                                <Col>
                                    <h5>
                                        CONTRACTOR: Ouarda Mouloudi
                                        <hr mt-3 />
                                    </h5>
                                    
                                </Col>
                            </Row>







                        

                    `;
        // create some sample content for the Word document
        const blob = new Blob([htmlString], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'PilotAgreement.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
// useEffect(async() => {
    
//     await getAllDocument()
//     .then((res)=>{
//    setDocuments(res.data);
//     })
// }, [])
let documents=[];
    useEffect(() => {
        getAllTrips()
            .then((res) => {
                console.log(res, "======>Trips data")
                setTripsDocumentData(res?.data)
            });
       

    }, [])
    documents = [

        {
            title: "Appendix 'A'",
            documentPic: appendix,
            url: "/appendix"
        },
        {
            title: "Pilot Agreement",
            documentPic: pilot,
            url: "/pilotAgreement"
        },
        {
            title: "Flight Attendant Agreement",
            documentPic: flight,
            url: "/flightAttendant"
        },
        {
            title: "Service Agreement",
            documentPic: service,
            url: "/admin/serviceAgreement"
        }
    ]

console.log(documents,"========>documents")
  
  return (
      <div>
      <Container fluid>
              <Row className="mt-3">
                  <Col xl={6}>
                      <Link
                          className="h2 mt-3 ml-1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
                          
                      >
                         Document
                      </Link>
                  </Col>
                  <Col xl={6}>
                      <DocumentModal/>
                     
                      
                  </Col>
              </Row>
              <Card className="card-stats mb-4 mb-xl-0 mt-4" style={{ }}>
        <Row className='mt-3'>
        <Col xl={5}>
                <Link  onClick={handleBar}> <h3 className="text-center " >Uploaded</h3></Link>
            <div className="progress ml-3">
  <div className="progress-bar bg-dark" style={{width:upload ?"100%":"0%"}}></div>
</div>
                  </Col>
        <Col xl={5}>
                <Link> <h3 className="text-center" value="trip" onClick={handleBar}>Trip Contracts</h3></Link>
            <div className="progress">
                              <div className="progress-bar bg-dark" style={{ width: upload ? "0%" : "100%" }}></div>
            </div>
        </Col>
          </Row>

          <Row>
          {
      
            upload===true&&
            documents?.map((data)=>(
                <Col xl={4}  className="  ">
                    <div className="card mt-3  " style={{
                        backgroundColor: "#e9ecef", border: "none",
                        borderRadius: "0%",
                        boxShadow: " 0 0.5rem 1rem rgba(0, 0, 0, 0.1)" 
                    }} >
                        <img className="card-img-top mt-3 ml-3" src={data.documentPic? data.documentPic:dummy} alt="Card image"

                            style={{ width: "90%",height:"170px" }} />
                        <div className="card-body">
                            <h4 className="card-title">{data.title ? data.title:"No Title"}</h4>
                            <hr />
{
                            // <div className="custom-control custom-switch ml-1">
                            //     <input
                            //         type="checkbox"
                            //         className="custom-control-input"
                            //         id="customSwitches"
                            //     />
                            //     <label className="custom-control-label" for="customSwitches" style={{fontSize:"15px"}}>
                            //         Auto Attach with all trips
                            //     </label>
                            // </div>
                            // <hr />
                        }
                            <Row>
                                <Col xl={5}  >
                                {
                                    data.title==="Appendix 'A'"&&
                                    <button type="button" className="btn mt-1 " style={{
                                        backgroundColor: "white",
                                        color: "#adad85",
                                        borderRadius: "0%"
                                        
                                    }}  
                                    
                                      
                                     onClick={handleAppendixDownload}>DOWNLOAD</button>
                                }
                                    {
                                        data.title === "Pilot Agreement" &&
                                        <button type="button" className="btn mt-1 " style={{
                                            backgroundColor: "white",
                                            color: "#adad85",
                                            borderRadius: "0%"

                                        }}


                                            onClick={handlePilotDownload}>DOWNLOAD</button>
                                    }
                                    {
                                        data.title === "Flight Attendant Agreement" &&
                                        <button type="button" className="btn mt-1 " style={{
                                            backgroundColor: "white",
                                            color: "#adad85",
                                            borderRadius: "0%"

                                        }}


                                            onClick={handleFlightDownload}>DOWNLOAD</button>
                                    }
                                    {
                                        data.title === "Service Agreement" &&
                                        <button type="button" className="btn mt-1 " style={{
                                            backgroundColor: "white",
                                            color: "#adad85",
                                            borderRadius: "0%"

                                        }}


                                            onClick={handleServiceDownload}>DOWNLOAD</button>
                                    }
                                    
                                </Col>
                                {
                                    data.title==="Service Agreement"&&
                                <Col xl={5} >
                                   <ServiceModal/>
                                </Col>
                                }
                                {
                                    data.title === "Flight Attendant Agreement" &&
                                    <Col xl={5}>
                                        <FlightModal />
                                    </Col>
                                }
                                {
                                    data.title === "Pilot Agreement" &&
                                    <Col xl={5}>
                                        <PilotModal />
                                    </Col>
                                }
                                {
                                    data.title === "Appendix 'A'" &&
                                    <Col xl={5}>
                                        <AppendixModal />
                                    </Col>
                                }
                            </Row>
                        </div>
                    </div>
                </Col>
            ))
                            }

            </Row>
                            {
           upload===false&&
                              TripsDocumentData?.map((data,index) => (
                                <>
                                      <h1 className='ml-5 mt-2'>Trip {index + 1}</h1>
                                <Row className='ml-3'>
                                          
                                  <Col xl={5} key={data}>
                                             
                                      <div className="card mt-3 " style={{
                                          backgroundColor: "#e9ecef", border: "none",
                                          borderRadius: "0%",
                                          boxShadow: " 0 0.5rem 1rem rgba(0, 0, 0, 0.1)" 
                                      }} >
                                          <img className="card-img-top mt-3 ml-3" src={service} alt="Card image"

                                              style={{ width: "90%", height: "170px" }} />
                                          <div className="card-body">
                                              <h4 className="card-title">Service Agreement</h4>
                                              <hr />
                                              {
                                                  // <div className="custom-control custom-switch ml-1">
                                                  //     <input
                                                  //         type="checkbox"
                                                  //         className="custom-control-input"
                                                  //         id="customSwitches"
                                                  //     />
                                                  //     <label className="custom-control-label" for="customSwitches" style={{fontSize:"15px"}}>
                                                  //         Auto Attach with all trips
                                                  //     </label>
                                                  // </div>
                                                  // <hr />
                                              }
                                              <Row>
                                                  <Col xl={5}>
                                                      <button type="button" className="btn" style={{
                                                          backgroundColor: "white",
                                                          color: "#adad85",
                                                          borderRadius: "0%"
                                                      }}
                                                      
                                                      onClick={()=>handleClientServiceDownload(data)}>DOWNLOAD</button>
                                                  </Col>
                                                  
                                                     
                                                      <Col xl={5}>
                                                          <ServiceModal tripData={data} />
                                                      </Col>
                                                  
                                                      
                                                  
                                                      
                                                  
                                              </Row>
                                          </div>
                                         
                                      </div>
                                  </Col>
                                   <Col xl={5} key={data} className="mt-2">
                                              <div className="card mt-3 ml-2 " style={{
                                                  backgroundColor: "#e9ecef", border: "none",
                                                  borderRadius: "0%",
                                                  boxShadow: " 0 0.5rem 1rem rgba(0, 0, 0, 0.1)"
                                              }} >
                                                  <img className="card-img-top mt-3 ml-3" src={appendix} alt="Card image"

                                                      style={{ width: "90%", height: "170px" }} />
                                                  <div className="card-body">
                                                      <h4 className="card-title">Appendix 'A'</h4>
                                                      <hr />
                                                      {
                                                          // <div className="custom-control custom-switch ml-1">
                                                          //     <input
                                                          //         type="checkbox"
                                                          //         className="custom-control-input"
                                                          //         id="customSwitches"
                                                          //     />
                                                          //     <label className="custom-control-label" for="customSwitches" style={{fontSize:"15px"}}>
                                                          //         Auto Attach with all trips
                                                          //     </label>
                                                          // </div>
                                                          // <hr />
                                                      }
                                                      <Row>
                                                          <Col xl={4}>
                                                              <button type="button" className="btn mt-1" style={{
                                                                  backgroundColor: "white",
                                                                  color: "#adad85",
                                                                  borderRadius: "0%"
                                                              }}
                                                                  onClick={() => handleClientAppendixDownload(data)}>DOWNLOAD</button>
                                                          </Col>
                                                          
                                                          
{
                                                        //   <Col xl={4}>
                                                        //       <button type="button" className="btn ml-4 mt-1"
                                                        //           onClick={() => updateDocumentClientStatus(data._id)}

                                                        //           style={{
                                                        //               backgroundColor: "white",
                                                        //               color: "#adad85",
                                                        //               borderRadius: "0%"
                                                        //           }}>Accept</button>
                                                        //   </Col>
                                                                }
                                                                


                                                          <Col xl={4}>
                                                              <AppendixModal tripData={data} />
                                                          </Col>
                                                          
                                                      </Row>
                                                      {
                                                          // <div className="custom-control custom-switch ml-1">
                                                          //     <input
                                                          //         type="checkbox"
                                                          //         className="custom-control-input"
                                                          //         id="customSwitches"
                                                          //     />
                                                          //     <label className="custom-control-label" for="customSwitches" style={{fontSize:"15px"}}>
                                                          //         Auto Attach with all trips
                                                          //     </label>
                                                          // </div>
                                                          // <hr />


                                                          // <Row>
                                                          //     <Col xl={5}>
                                                          //         <button type="button" className="btn" style={{
                                                          //             backgroundColor: "white",
                                                          //             color: "#adad85",
                                                          //             borderRadius: "0%"
                                                          //         }}>DOWNLOAD</button>
                                                          //     </Col>
                                                          //     <Col xl={5}>
                                                          //         <button type="button" className="btn  pr-5 ml-4 " style={{
                                                          //             backgroundColor: "white",
                                                          //             color: "#adad85",
                                                          //             borderRadius: "0%"
                                                          //         }}>OPEN</button>
                                                          //     </Col>
                                                          // </Row>
                                                      }
                                                  </div>
                                              </div>
                                          </Col>
                                         
                                          </Row>
                                      <hr />
                                  </>
                              ))
                             
          }
          
          
          
          </Card>
         </Container>



          </div>
  )
}

export default Document