import React,{useState,useEffect} from 'react'
// import Tables from 'views/examples/Tables';
// import { Table } from 'react-bootstrap';
import { CardBody, Container, Table,Card,Row,Col,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ClientModal from 'components/Modals/ClientModal';
import { getAllClient } from 'Api/api';



const Clients = () => {
    const [clientData, setClientData] = useState([])

    useEffect(() => {
        getAllClient()
            .then((res) => {
                console.log(res, "======>clientData")
                setClientData(res.data)
            })

    }, [])
  return (
    <div>
    <Container fluid>
    <Row className="mt-3">
    <Col xl={6}>
              <Link
                  className="h2 mt-3 ml-1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
                  to="/"
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
                                      <tr>
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
                                    clientData?.map((data,index=1)=>(
                                        <tr>
                                            <td>{index}</td>
                                            <td>{data.firstName}</td>
                                            <td>{data.companyName?data.companyName:"empty"}</td>
                                            <td>{data.companyName ? data.companyNumber: "empty"}</td>
                                            <td>{data.phoneNumber}</td>
                                            <td>{data.email}</td>
                                            <td><i className="fa fa-trash"
                                                style={{ fontSize: "20px" }} aria-hidden="true"></i>
                                              

                                            </td>
                                        </tr>
                                    ))
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