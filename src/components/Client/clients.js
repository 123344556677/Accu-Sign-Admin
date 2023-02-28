import React,{useState,useEffect} from 'react'
// import Tables from 'views/examples/Tables';
// import { Table } from 'react-bootstrap';
import { CardBody, Container, Table,Card,Row,Col,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ClientModal from 'components/Modals/ClientModal';
import { getAllClient } from 'Api/api';
import { deleteClient } from 'Api/api';
import Swal from "sweetalert2";
import { getClientByKey } from 'Api/api';
import { deleteUser } from 'Api/api';



const Clients = () => {
    const [clientData, setClientData] = useState([])

    useEffect(() => {
        getClientByKey()
            .then((res) => {
                console.log(res, "======>clientData")
                setClientData(res?.data?.data)

            })

    }, [])

    const deleteClientById=async(e)=>{
   
        await deleteUser({e})
        .then((res)=>{
            if (res.data.message === "user deleted") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Client deleted",
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
                    text: "Client not deleted",
                    color: "black",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        })
    }
  return (
    <div>
    <Container fluid>
    <Row className="mt-3">
    <Col xl={6}>
              <Link
                  className="h2 mt-3 ml-1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
                 
              >
                  Client list
              </Link>
                  </Col>
                  <Col xl={6}>   
              <ClientModal/>
                      </Col>
              </Row>
              <Row className="mt-4">
                  <Col lg="6" xl="12">
                      <Card className="card-stats mb-4 mb-xl-0" style={{ height: "700px" }}>
                          <CardBody>
                          
                              <Table className="mt-3" >
                                  <thead>
                                      <tr className='text-center'>
                                          <th style={{color:"black"}}>#</th>
                                          <th style={{ color: "black" }}> Name</th>
                                          <th style={{ color: "black" }}>Company</th>
                                          <th style={{ color: "black" }}>Company Registration</th>
                                          <th style={{ color: "black" }}> Phone Number</th>
                                          <th style={{ color: "black" }}> Email</th>
                                          <th style={{ color: "black" }}> Actions</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                  {
                                          clientData?.length?
                                    clientData?.map((data,index=1)=>(
                                        <tr className='text-center'>
                                            <td>{index+1}</td>
                                            <td>{data.firstName}</td>
                                            <td>{data.companyName?data.companyName:"empty"}</td>
                                            <td>{data.companyName ? data.companyNumber: "empty"}</td>
                                            <td>{data.phoneNumber}</td>
                                            <td>{data.email}</td>
                                            <td><i className="fa fa-trash"
                                                onClick={(e)=>deleteClientById(data._id)}
                                                style={{ fontSize: "20px",cursor:"pointer" }} aria-hidden="true"></i>
                                              

                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <p>No clients Available!</p>
                                  }
                                      
                                    
                                     
                                      
                                  </tbody>
                              </Table>
                          </CardBody>
                          </Card>
                          </Col>
                          </Row>
          
          </Container>
    </div>
  )
}

export default Clients;