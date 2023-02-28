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
import { TripsBycrewId } from 'Api/api';
import moment from 'moment';
const CrewDocument = () => {
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
        crewId: role.id
    }

    useEffect(async () => {
        await TripsBycrewId(values)
            .then((res) => {
                console.log(res, "======>Trips crew data")
               

                    setDocuments(res?.data?.data)

            })

    }, [])

    Documents.map((data)=>{
        if(data.status==="approved"){
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
              <Card className="card-stats mb-4 mb-xl-0 mt-4">
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
          {
               
//                 <Col xl={5} key={data} className="mt-2">
//                     <div className="card mt-3 ml-2 " style={{
//                         backgroundColor: "#e9ecef", border: "none",
//                         borderRadius: "0%",
//                         boxShadow: " 0 0.5rem 1rem rgba(0, 0, 0, 0.1)" 
//                     }} >
//                                               <img className="card-img-top mt-3 ml-3" src={ service} alt="Card image"

//                                                   style={{ width: "90%", height: "170px" }} />
//                                               <div className="card-body">
//                                                   <h4 className="card-title">Service Agreement</h4>
//                                                   <hr />
//                                                   {
//                                                       // <div className="custom-control custom-switch ml-1">
//                                                       //     <input
//                                                       //         type="checkbox"
//                                                       //         className="custom-control-input"
//                                                       //         id="customSwitches"
//                                                       //     />
//                                                       //     <label className="custom-control-label" for="customSwitches" style={{fontSize:"15px"}}>
//                                                       //         Auto Attach with all trips
//                                                       //     </label>
//                                                       // </div>
//                                                       // <hr />
//                                                   }
//                                                   <Row>
//                                                       <Col xl={4}>
//                                                           <button type="button" className="btn mt-1" style={{
//                                                               backgroundColor: "white",
//                                                               color: "#adad85",
//                                                               borderRadius: "0%"
//                                                           }}>DOWNLOAD</button>
//                                                       </Col>
//                                                           {
//                                                               data.documentClientStatus === "pending" &&

//                                                           <Col xl={4}>
//                                                               <button type="button" className="btn ml-4 mt-1"
//                                                               onClick={()=>updateDocumentClientStatus(data._id)}
                                                              
//                                                               style={{
//                                                                   backgroundColor: "white",
//                                                                   color: "#adad85",
//                                                                   borderRadius: "0%"
//                                                               }}>Accept</button>
//                                                           </Col>
//                                                             }
                                                      
                                                        
//                                                           <Col xl={4}>
//                                                               <ServiceModal  tripData={data}/>
//                                                           </Col>
//                                                           </Row>
// {
//                             // <div className="custom-control custom-switch ml-1">
//                             //     <input
//                             //         type="checkbox"
//                             //         className="custom-control-input"
//                             //         id="customSwitches"
//                             //     />
//                             //     <label className="custom-control-label" for="customSwitches" style={{fontSize:"15px"}}>
//                             //         Auto Attach with all trips
//                             //     </label>
//                             // </div>
//                             // <hr />
                        
                        
//                             // <Row>
//                             //     <Col xl={5}>
//                             //         <button type="button" className="btn" style={{
//                             //             backgroundColor: "white",
//                             //             color: "#adad85",
//                             //             borderRadius: "0%"
//                             //         }}>DOWNLOAD</button>
//                             //     </Col>
//                             //     <Col xl={5}>
//                             //         <button type="button" className="btn  pr-5 ml-4 " style={{
//                             //             backgroundColor: "white",
//                             //             color: "#adad85",
//                             //             borderRadius: "0%"
//                             //         }}>OPEN</button>
//                             //     </Col>
//                             // </Row>
//                         }
//                         </div>
//                     </div>
//                 </Col>
                    }
                          
                
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
                                                              onClick={()=>handleAppendixDownload(data)}>DOWNLOAD</button>
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

export default CrewDocument