import React,{useState}  from 'react'
import { CardBody, Container, Table, Card, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import dummy from './avatrOne.png'

const Document = () => {
const [upload,setUpload]=useState(true);
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
  return (
      <div>
      <Container fluid>
              <Row className="mt-3">
                  <Col xl={6}>
                      <Link
                          className="h2 mt-3 ml-1 mb-0 text-black text-uppercase d-none d-lg-inline-block"
                          to="/"
                      >
                          AIRCRAFT list
                      </Link>
                  </Col>
                  <Col xl={6}>
                      <Button color="secondary" size="lg" className="mt-1 mr-3" style={{ float: "right" }} >UPLOAD</Button>
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
            upload?
            ["one","two","three","four"].map((data)=>(
                <Col xl={4} key={data}>
                    <div className="card mt-3 " style={{
                        backgroundColor: "#e9ecef", border: "none",
                        borderRadius: "0%"
                    }} >
                        <img className="card-img-top mt-3 ml-2" src={dummy} alt="Card image"

                            style={{ width: "200px" }} />
                        <div className="card-body">
                            <h4 className="card-title">Service Agreement LOl</h4>
                            <hr />

                            <div className="custom-control custom-switch ml-1">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customSwitches"
                                />
                                <label className="custom-control-label" for="customSwitches" style={{fontSize:"15px"}}>
                                    Auto Attach with all trips
                                </label>
                            </div>
                            <hr />
                            <Row>
                                <Col xl={5}>
                                    <button type="button" className="btn" style={{
                                        backgroundColor: "white",
                                        color: "#adad85",
                                        borderRadius: "0%"
                                    }}>DOWNLOAD</button>
                                </Col>
                                <Col xl={5}>
                                    <button type="button" className="btn  pr-3 " style={{
                                        backgroundColor: "white",
                                        color: "#adad85",
                                        borderRadius: "0%"
                                    }}>OPEN</button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            ))
            :
                ["one", "two", "three", "four"].map((data) => (
                    <Col xl={4} key={data}>
                        <div className="card  mt-3" style={{
                            backgroundColor: "#e9ecef", border: "none",
                            borderRadius: "0%"
                        }} >
                            <img className="card-img-top mt-3 ml-2" src={dummy} alt="Card image"

                                style={{ width: "200px" }} />
                            <div className="card-body">
                                <h4 className="card-title">Service Agreement LOl</h4>
                                <hr />

                                <div className="custom-control custom-switch ml-1">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customSwitches"
                                    />
                                    <label className="custom-control-label" for="customSwitches" style={{fontSize:"15px"}}>
                                        Auto Attach with all trips
                                    </label>
                                </div>
                                <hr />
                                <Row>
                                    <Col xl={5}>
                                        <button type="button" className="btn" style={{
                                            backgroundColor: "white",
                                            color: "#adad85",
                                            borderRadius: "0%"
                                        }}>DOWNLOAD</button>
                                    </Col>
                                    <Col xl={5}>
                                        <button type="button" className="btn pr-3 " style={{
                                            backgroundColor: "white",
                                            color: "#adad85",
                                            borderRadius: "0%"
                                        }}>OPEN</button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                ))
          }
          
          
          </Row>
          </Card>
         </Container>



          </div>
  )
}

export default Document