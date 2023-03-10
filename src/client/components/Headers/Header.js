import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";
import { getAllClient } from "Api/api";
import { getAllCrew } from "Api/api";
import { getAllTrips } from "Api/api";
import { getPaymentByClientId } from "Api/api";
import { TripsByclientId } from "Api/api";
const Header = () => {
  const [clientData, setClientData] = useState([])
  //  const [aircratData, setAircrafttData] = useState([])
  const [crewData, setCrewData] = useState([])
  const [TripsData, setTripsData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))

  
  const Values = {
    clientId: role.id
  }
  useEffect(() => {
    TripsByclientId(Values)
      .then((res) => {
        console.log(res, "======>Trips data")
        setTripsData(res?.data)
      })

  }, [])

  
  useEffect(() => {
    getPaymentByClientId(Values)
      .then((res) => {
        console.log(res, "======>paymentData")
        setPaymentData(res?.data)
      })

  }, [])

  return (
    <>
      <div className="header bg-white pb-8 pt-5 ">
        <Container fluid>
          <div className="header-body">

            {/* Card stats */}
            <Row className="mt-4">
              <Col lg="6" xl="6">
                <Card className="card-stats mb-4 mb-xl-0" style={{ boxShadow:" 0 0.5rem 1rem rgba(0, 0, 0, 0.1)"}}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Paid Invoices
                        </CardTitle>

                        <p className="h2 font-weight-bold mt-4" >
                          {paymentData?.data?.length ? paymentData?.data?.length:"0"}
                        </p>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-dark text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>

                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="6">
                <Card className="card-stats mb-4 mb-xl-0" style={{ boxShadow: " 0 0.5rem 1rem rgba(0, 0, 0, 0.1)" }}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Trips
                        </CardTitle>
                        <p className="h2 mt-4 font-weight-bold ">{TripsData?.data?.length}</p>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-dark text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>

                  </CardBody>
                </Card>
              </Col>
             

            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
