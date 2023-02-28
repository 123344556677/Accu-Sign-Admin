import React,{useState,useEffect}  from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import dummy from './avatrOne.png';
import FileBase64 from "react-file-base64";
import { addDocument } from 'Api/api';
import DocumentModal from 'components/Modals/DocumentModal';
import { getAllDocument } from 'Api/api';
import Swal from "sweetalert2";
import { TripsByclientId } from 'Api/api';
import ServiceModal from 'components/Document/documentModals/ServiceModal';
import service from './ss28.PNG';
import appendix from './ss25.PNG';
import { updateTripDocumentStatus } from 'Api/api';
import { updateTripClientDocumentStatus } from 'Api/api';
import AppendixModal from 'components/Document/documentModals/AppendixModal';
import moment from 'moment';
const ClientDocument = () => {
const [upload,setUpload]=useState(true);
const [Documents,setDocuments]=useState([])
const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))

let documents=[];

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
    const values = {
        clientId: role.id
    }

    useEffect(async () => {
        await TripsByclientId(values)
            .then((res) => {
                console.log(res, "======>Trips data")
               

                    setDocuments(res?.data?.data)

            })

    }, [])

    Documents.map((data)=>{
        if(data.documentStatus==="approved"){
            documents.push(data);
        }
    })

console.log(Documents,"========>documents")
    

    const updateDocumentClientStatus =async (e) => {
        console.log(e, "e============>")
        const Values = {
            tripId: e,
            documentStatus: "approved"
        }
        await updateTripClientDocumentStatus(Values)
            .then((res) => {

                if (res.data.message === "Document Client status updated") {

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        text: "Document status updated",
                        color: "black",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    window.location.reload();
                }
                else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        text: "Document status not updated",
                        color: "black",
                        showConfirmButton: false,
                        timer: 2000,
                    });


                }
            });
    }
// const updateDocumentStatus=async(e)=>{
// console.log(e,"==========>id")

// const Values={
//     tripId:e,
//     documentStatus:"approved"
// }


// await updateTripDocumentStatus(Values)
//     .then((res) => {

//         if (res.data.message === "Document status updated") {

//             Swal.fire({
//                 position: "center",
//                 icon: "success",
//                 text: "Document status updated",
//                 color: "black",
//                 showConfirmButton: false,
//                 timer: 2000,
//             });
//             window.location.reload();
//         }
//         else {
//             Swal.fire({
//                 position: "center",
//                 icon: "error",
//                 text: "Document status not updated",
//                 color: "black",
//                 showConfirmButton: false,
//                 timer: 2000,
//             });


//         }
//     });
// }
    function handleAppendixDownload(props) {
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
    function handleServiceDownload(props) {
        const htmlString = ` 
                
                  <p style={{fontSize:"13px"}}>THIS SERVICE AGREEMENT (hereinafter the "Agreement") is deemed executed in Dubai, United Arab Emirates
                  <br/><br/>
                      BETWEEN: Matrix Aviation (AircrewConnect), 
                              ${props?.companyName ? props?.companyName :" UAE office address at The One Tower Internet City Teacom Dubai UAE, (hereinafter referred to as the 'Service Provider')"}
                     
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
                              Commencing on ${props?.startDate? props?.startDate :"" } up to and including 
                              ${props?.startDate ? props?.startDate : ""}, pending any 
                               government formalities such as visa processing or licence verification.

                      </p>

                      <h4> 1)	Fees, Rates, Per Diems and Expenses</h4>
                              <ul>
                              <li style={{fontSize:"11px"}}>
                                  For its services while on Assignment (as defined below),${props?.tripData?.companyName ? props?.tripData?.companyName : ""} will pay AirCrewConnect the fee of USD ${props?.fee ? props?.fee : ""} per day, plus a per diem of USD ${ props?.dailyClientRate ? props?.dailyClientRate : ""} and any 
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
  
  return (
      <div>
      <Container fluid>
              <Row className="mt-3">
                  <Col xl={6}>
                      <Link
                          className="h2 mt-3 ml-1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
                          to="/"
                      >
                          Documents
                      </Link>
                  </Col>
                  <Col xl={6}>
                      <DocumentModal/>
                     
                      
                  </Col>
              </Row>
              <Card className="card-stats mb-4 mb-xl-0 mt-4" style={{ }}>
        <Row className='mt-3 justify-content-center'>
        {
//         <Col xl={5}>
//                 <Link  onClick={handleBar}> <h3 className="text-center " >Uploaded</h3></Link>
//             <div className="progress ml-3">
//   <div className="progress-bar bg-dark" style={{width:upload ?"100%":"0%"}}></div>
// </div>
                //   </Col>
        }
        <Col xl={8}>
                <Link> <h3 className="text-center" value="trip" onClick={handleBar}>Trip Contracts</h3></Link>
            <div className="progress">
                              <div className="progress-bar bg-dark" style={{ width: upload ? "100%" : "100%" }}></div>
            </div>
        </Col>
          </Row>
                  {
                      documents.length ?
                          upload &&
                              documents?.map((data, index) => (
                            <>
                                 <h1 className='ml-5 mt-2'>Trip {index+1}</h1>
          <Row>
          
               
                <Col xl={5} key={data} className="mt-2">
                    <div className="card mt-3 ml-2 " style={{
                        backgroundColor: "#e9ecef", border: "none",
                        borderRadius: "0%",
                        boxShadow: " 0 0.5rem 1rem rgba(0, 0, 0, 0.1)" 
                    }} >
                                              <img className="card-img-top mt-3 ml-3" src={ service} alt="Card image"

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
                                                      <Col xl={4}>
                                                          <button type="button" className="btn mt-1" style={{
                                                              backgroundColor: "white",
                                                              color: "#adad85",
                                                              borderRadius: "0%"
                                                          }}
                                                          onClick={()=>handleServiceDownload(data)}>DOWNLOAD</button>
                                                      </Col>
                                                          {
                                                              data.documentClientStatus === "pending" &&

                                                          <Col xl={4}>
                                                              <button type="button" className="btn ml-4 mt-1"
                                                              onClick={()=>updateDocumentClientStatus(data._id)}
                                                              
                                                              style={{
                                                                  backgroundColor: "white",
                                                                  color: "#adad85",
                                                                  borderRadius: "0%"
                                                              }}>Accept</button>
                                                          </Col>
                                                            }
                                                      
                                                        
                                                          <Col xl={4}>
                                                              <ServiceModal  tripData={data}/>
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
                          
                {
                    data.status==="approved"&&
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
                                                                onClick={() => updateDocumentClientStatus(data._id)}>DOWNLOAD</button>
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
                                                    }
                                  </Row>
                                  <hr/>
                                  </>
            ))
                                  
           
                    
                              :
                              <p className='mt-3 ml-3'>No documents available!</p>
          
          
          
          
                                }
          </Card>
         </Container>



          </div>
  )
}

export default ClientDocument