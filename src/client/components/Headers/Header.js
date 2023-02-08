import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";
import { getAllClient } from "Api/api";
import { getAllCrew } from "Api/api";
const Header = () => {
  const [clientData, setClientData] = useState([])
  //  const [aircratData, setAircrafttData] = useState([])
  const [crewData, setCrewData] = useState([])

  useEffect(() => {
    getAllClient()
      .then((res) => {
        console.log(res, "======>clientData")
        setClientData(res.data)
      })

  }, [])
  // useEffect(() => {
  //   getAllAircraft()
  //     .then((res) => {
  //       console.log(res, "======>clientData")
  //       setAircratData(res.data)
  //     })

  // }, [])
  useEffect(() => {
    getAllCrew()
      .then((res) => {
        console.log(res, "======>clientData")
        setCrewData(res.data)
      })

  }, [])

  return (
    <>
      <div className="header bg-white pb-8 pt-5 ">
        <Container fluid>
          <div className="header-body">

            {/* Card stats */}
            <Row className="mt-4">
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Clients
                        </CardTitle>

                        <p className="h2 font-weight-bold mt-4" >
                          {clientData?.length}
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
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Trips
                        </CardTitle>
                        <p className="h2 mt-4 font-weight-bold ">2,356</p>
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
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Crew Members
                        </CardTitle>
                        <p className="h2 mt-4 font-weight-bold ">{crewData?.length}</p>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-dark text-white rounded-circle shadow">
                          <i className="fas fa-users" />
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
