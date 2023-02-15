import React,{ useState,useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import FileBase64 from "react-file-base64";
import dummy from './avatrOne.png';
import { getAllUsers } from "Api/api";
import { getUserById } from "Api/api";
import { updateUser } from "Api/api";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";

const Profile = () => {
  

  const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
  const [usersData, setUsersData] = useState();
  
  const[email,setEmail]=useState(usersData?.email)
  const [firstName, setFirstName] = useState(usersData?.firstName)
  const [phoneNumber, setphoneNumber] = useState(usersData?.phoneNumber)
  const [adress, setAdress] = useState(usersData?.adress)
  const [country, setCountry] = useState(usersData?.country)
  const [lastName, setLastName] = useState(usersData?.lastName)
  const [visaPic, setVisaPic] = useState(usersData?.visaPic)
  const [aboutMe, setAboutMe] = useState(usersData?.aboutMe)
  const [bankName, setbankName] = useState(usersData?.bankName)
  const [bankAdress, setbankAdress] = useState(usersData?.bankAdress)
  const [accountNumber, setAccountNumber] = useState(usersData?.accountNumber)
  const [iban, setiban] = useState(usersData?.iban)
  const [institute, setInstitute] = useState(usersData?.institute)
  const [degree, setDegree] = useState(usersData?.degree)
  const [year, setYear] = useState(usersData?.year)
  const [passportPic, setPassportPic] = useState(usersData?.year)
  

  // const handleProfileValues=(e)=>{
  //   setValues({ ...value, [e.target.name]: e.target.value });
  //   console.log(value,"=========>val")
  // }
  const handleVisaPic=(e)=>{
    setVisaPic(e.selectedFile.base64)
  }
  const handlePassportPic = (e) => {
    setPassportPic(e.selectedFile.base64)
  }
  
  const values = {
    id: role.id
  }
  useEffect(()=> {

    getUserById(values)
      .then((res) => {

        setUsersData(res.data.data)
        
      })

  }, [])
  // console.log(usersData, "=====>data")
  

  
  // console.log(usersData?.email,"===========>email")

const profileValue={
  firstName:firstName,
  id:role.id,
  email:email,
  adress:adress,
  phoneNumber:phoneNumber,
  country: country,
  lastName: lastName,
  visaPic: visaPic,
  aboutMe: aboutMe,
  bankName: bankName,
  bankAdress: bankAdress,
  accountNumber: accountNumber,
  iban:iban,
  institute:institute,
  degree:degree,
  year:year,
  passportPic:passportPic

}
  const profile=()=>{
    console.log(profileValue);

    updateUser(profileValue)
    .then((res)=>{
      if (res.data.message ==="user updated "){
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Profile updated",
          color: "black",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      else{
      Swal.fire({
          position: "center",
          icon: "error",
          text: "Profile not updated",
          color: "black",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    })
  }
 
  const history = useHistory();
  const backToHome = () => {
    if (role.role === "admin") {


      history.push('/admin/index');
    }
    if (role.role === "crew") {

      history.push('/crew/crewIndex');
    }
    if (role.role === "client") {

      history.push('/client/clientIndex');
    }
  }
  // console.log(values,"========>userdata")
  return (
    <>
     
      <Container className="mt--7" fluid>
      {
        role.role==="admin"&&
          <Row className="justify-content-center">
        {
          // <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          //   <Card className="card-profile shadow">
          //     <Row className="justify-content-center">
          //       <Col className="order-lg-2" lg="3">
          //         <div className="card-profile-image">
          //           <a href="#pablo" onClick={(e) => e.preventDefault()}>
          //             <img
          //               alt="..."
          //               className="rounded-circle"
          //               src={require("../../assets/img/theme/team-4-800x800.jpg")}
          //             />
          //           </a>
          //         </div>
          //       </Col>
          //     </Row>
          //     <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          //       <div className="d-flex justify-content-between">
          //         <Button
          //           className="mr-4"
          //           color="info"
          //           href="#pablo"
          //           onClick={(e) => e.preventDefault()}
          //           size="sm"
          //         >
          //           Connect
          //         </Button>
          //         <Button
          //           className="float-right"
          //           color="default"
          //           href="#pablo"
          //           onClick={(e) => e.preventDefault()}
          //           size="sm"
          //         >
          //           Message
          //         </Button>
          //       </div>
          //     </CardHeader>
          //     <CardBody className="pt-0 pt-md-4">
                
          //           <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      
          //           </div>
                 
                
          //       <div className="text-center">
          //         <h3>
          //           Jessica Jones
          //           <span className="font-weight-light">, 27</span>
          //         </h3>
          //         <div className="h5 font-weight-300">
          //           <i className="ni location_pin mr-2" />
          //           Bucharest, Romania
          //         </div>
                
          //       </div>
          //     </CardBody>
          //   </Card>
          // </Col>
        }
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                        <Link onClick={backToHome}> Dashboard</Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                            
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={usersData?.firstName}
                            id="input-username"
                            placeholder=""
                            type="text"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            // placeholder={usersData?.email}
                            defaultValue={usersData?.email}
                            onChange={(e)=>setEmail(e.target.value)}
                            type="email"
                            name="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                                defaultValue={usersData?.adress ? usersData?.adress:""}
                            id="input-address"
                            //  placeholder={usersData?.data.adress}
                                onChange={(e) => setAdress(e.target.value)}
                            type="text"
                            name="adress"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={usersData?.phoneNumber}
                            id="input-address"
                            placeholder="Phone Number"
                            onChange={(e) => setphoneNumber(e.target.value)}
                            type="number"
                            name="phoneNumber"
                          />
                        </FormGroup>  
                        </Col>
                    </Row>
                  </div>
                  
                  {/* Description */}
                      <div className="text-center">
                        <Button className="mt-4" color="dark" type="button" onClick={profile}>
                          Update Profile
                        </Button>
                      </div>
                  
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
  }
        {
        role.role === "client" &&
          <Row className="justify-content-center">
              {
                // <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                //   <Card className="card-profile shadow">
                //     <Row className="justify-content-center">
                //       <Col className="order-lg-2" lg="3">
                //         <div className="card-profile-image">
                //           <a href="#pablo" onClick={(e) => e.preventDefault()}>
                //             <img
                //               alt="..."
                //               className="rounded-circle"
                //               src={require("../../assets/img/theme/team-4-800x800.jpg")}
                //             />
                //           </a>
                //         </div>
                //       </Col>
                //     </Row>
                //     <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                //       <div className="d-flex justify-content-between">
                //         <Button
                //           className="mr-4"
                //           color="info"
                //           href="#pablo"
                //           onClick={(e) => e.preventDefault()}
                //           size="sm"
                //         >
                //           Connect
                //         </Button>
                //         <Button
                //           className="float-right"
                //           color="default"
                //           href="#pablo"
                //           onClick={(e) => e.preventDefault()}
                //           size="sm"
                //         >
                //           Message
                //         </Button>
                //       </div>
                //     </CardHeader>
                //     <CardBody className="pt-0 pt-md-4">

                //           <div className="card-profile-stats d-flex justify-content-center mt-md-5">

                //           </div>


                //       <div className="text-center">
                //         <h3>
                //           Jessica Jones
                //           <span className="font-weight-light">, 27</span>
                //         </h3>
                //         <div className="h5 font-weight-300">
                //           <i className="ni location_pin mr-2" />
                //           Bucharest, Romania
                //         </div>

                //       </div>
                //     </CardBody>
                //   </Card>
                // </Col>
              }
         
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                        <Link onClick={backToHome}> Dashboard</Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                               defaultValue={usersData?.firstName ? usersData?.firstName:""}
                                onChange={(e) => setFirstName(e.target.value)}
                               
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={usersData?.lastName ? usersData?.lastName : ""}
                              onChange={(e) => setLastName(e.target.value)}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    <Row>
                      
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            defaultValue={usersData?.email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                          />
                            
                        </FormGroup>

                      </Col><Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-last-name"
                                >
                                  Country
                                </label>
                                <Input
                                  className="form-control-alternative"
                                defaultValue={usersData?.country ? usersData?.country : ""}
                                onChange={(e) => setCountry(e.target.value)}
                                  id="input-last-name"
                                  placeholder="Country"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                    </Row>
                    
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={usersData?.adress? usersData?.adress : ""}
                            onChange={(e) => setAdress(e.target.value)}
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                      <Row>
                        <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={usersData?.phoneNumber}
                            onChange={(e) => setphoneNumber(e.target.value)}
                            id="input-address"
                            placeholder="Phone Number"
                            type="number"
                          />
                        </FormGroup>
                        </Col>
                    </Row>
                    
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                       defaultValue={usersData?.aboutMe ? usersData?.aboutMe : ""}
                        onChange={(e) => setAboutMe(e.target.value)}
                       
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">Bank Information</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                               Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                  defaultValue={usersData?.firstName ? usersData?.firstName:""}
                                  onChange={(e) => setFirstName(e.target.value)}
                                id="input-address"
                                placeholder="name"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Bank
                              </label>
                              <Input
                                className="form-control-alternative"
                                  defaultValue={usersData?.bankName ? usersData?.bankName : ""}
                                  onChange={(e) => setbankName(e.target.value)}
                                id="input-address"
                                placeholder="Bank"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Bank Adress
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={usersData?.bankAdress ? usersData?.bankAdress : ""}
                                onChange={(e) => setbankAdress(e.target.value)}
                                id="input-address"
                                placeholder="Bank adress"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Account Number 
                              </label>
                              <Input
                                className="form-control-alternative"
                                  defaultValue={usersData?.accountNumber? usersData?.accountNumber : ""}
                                  onChange={(e) => setAccountNumber(e.target.value)}
                                id="input-address"
                                placeholder="Account Number"
                                type="number"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                IBAN
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={usersData?.iban ? usersData?.iban : ""}
                                onChange={(e) => setiban(e.target.value)}
                                id="input-address"
                                placeholder="IBAN"
                                type="number"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </FormGroup>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      VISAs
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                            <img src={usersData?.visaPic ? usersData?.visaPic : dummy} style={{width:"600px"}}/>
                        </Col>
                      {
                        // <Button color="secondary" size="lg" className="mt-1 mr-3 mt-3" 

                        //   >UPLOAD</Button>
                        <FileBase64
                          type="file"

                          onDone={(base64) => handleVisaPic({ selectedFile: base64 })}


                        />
                      }
                      </Row>
                      

                    </div>
                      <div className="text-center">
                        <Button className="mt-4" color="dark" type="button" onClick={profile}>
                          Update Profile
                        </Button>
                      </div>
                </Form>

              </CardBody>
            </Card>
          </Col>
        </Row>
  }
        {
          role.role === "crew" &&
          <Row className="justify-content-center">
              {
                // <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                //   <Card className="card-profile shadow">
                //     <Row className="justify-content-center">
                //       <Col className="order-lg-2" lg="3">
                //         <div className="card-profile-image">
                //           <a href="#pablo" onClick={(e) => e.preventDefault()}>
                //             <img
                //               alt="..."
                //               className="rounded-circle"
                //               src={require("../../assets/img/theme/team-4-800x800.jpg")}
                //             />
                //           </a>
                //         </div>
                //       </Col>
                //     </Row>
                //     <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                //       <div className="d-flex justify-content-between">
                //         <Button
                //           className="mr-4"
                //           color="info"
                //           href="#pablo"
                //           onClick={(e) => e.preventDefault()}
                //           size="sm"
                //         >
                //           Connect
                //         </Button>
                //         <Button
                //           className="float-right"
                //           color="default"
                //           href="#pablo"
                //           onClick={(e) => e.preventDefault()}
                //           size="sm"
                //         >
                //           Message
                //         </Button>
                //       </div>
                //     </CardHeader>
                //     <CardBody className="pt-0 pt-md-4">

                //           <div className="card-profile-stats d-flex justify-content-center mt-md-5">

                //           </div>


                //       <div className="text-center">
                //         <h3>
                //           Jessica Jones
                //           <span className="font-weight-light">, 27</span>
                //         </h3>
                //         <div className="h5 font-weight-300">
                //           <i className="ni location_pin mr-2" />
                //           Bucharest, Romania
                //         </div>

                //       </div>
                //     </CardBody>
                //   </Card>
                // </Col>
              }

            <Col className="order-xl-1 mt-5" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                        <Link onClick={backToHome}> Dashboard</Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={usersData?.firstName ? usersData?.firstName : ""}
                              onChange={(e) => setFirstName(e.target.value)}

                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={usersData?.lastName ? usersData?.lastName : ""}
                              onChange={(e) => setLastName(e.target.value)}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="jesse@example.com"
                              defaultValue={usersData?.email}
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                            />

                          </FormGroup>

                        </Col><Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={usersData?.country ? usersData?.country : ""}
                              onChange={(e) => setCountry(e.target.value)}
                              id="input-last-name"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={usersData?.adress ? usersData?.adress : ""}
                              onChange={(e) => setAdress(e.target.value)}
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Phone Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={usersData?.phoneNumber}
                              onChange={(e) => setphoneNumber(e.target.value)}
                              id="input-address"
                              placeholder="Phone Number"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                    </div>
          
                      <hr className="my-4" />
                      {/* Description */}
                      <h6 className="heading-small text-muted mb-4">Education</h6>
                      <div className="pl-lg-4">
                        
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Institute
                                </label>
                                <Input
                                  className="form-control-alternative"
                                defaultValue={usersData?.institute ? usersData?.institute:""}
                                  id="input-address"
                                  placeholder="Institute"
                                  type="text"
                                onChange={(e) => setInstitute(e.target.value)}
                                />
                                </FormGroup>
                                </Col>
                                </Row>
                                <Row>
                                  <Col md="12">
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="input-address"
                                      >
                                        Deagree
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        defaultValue={usersData?.degree ? usersData?.degree : ""}
                                        id="input-address"
                                        placeholder="Degree"
                                        onChange={(e) => setDegree(e.target.value)}
                                        type="text"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Year
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={usersData?.year? usersData?.year : ""}
                                onChange={(e) => setYear(e.target.value)}
                                id="input-address"
                                placeholder="Year"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                              
                          
                      </div>
                    <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">About me</h6>
                      <div className="pl-lg-4">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            className="form-control-alternative"
                            placeholder="A few words about you ..."
                            rows="4"
                            defaultValue={usersData?.aboutMe ? usersData?.aboutMe : ""}
                            onChange={(e) => setAboutMe(e.target.value)}

                            type="textarea"
                          />
                        </FormGroup>
                      </div>
                      <hr className="my-4" />
                      {/* Description */}
                      <h6 className="heading-small text-muted mb-4">Bank Information</h6>
                      <div className="pl-lg-4">
                        <FormGroup>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Name
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={usersData?.firstName ? usersData?.firstName : ""}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  id="input-address"
                                  placeholder="name"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Bank
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={usersData?.bankName ? usersData?.bankName : ""}
                                  onChange={(e) => setbankName(e.target.value)}
                                  id="input-address"
                                  placeholder="Bank"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Bank Adress
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={usersData?.bankAdress ? usersData?.bankAdress : ""}
                                  onChange={(e) => setbankAdress(e.target.value)}
                                  id="input-address"
                                  placeholder="Bank adress"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Account Number
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={usersData?.accountNumber ? usersData?.accountNumber : ""}
                                  onChange={(e) => setAccountNumber(e.target.value)}
                                  id="input-address"
                                  placeholder="Account Number"
                                  type="number"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  IBAN
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={usersData?.iban ? usersData?.iban : ""}
                                  onChange={(e) => setiban(e.target.value)}
                                  id="input-address"
                                  placeholder="IBAN"
                                  type="number"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </FormGroup>
                      </div>
                      <hr className="my-4" />
                      {/* Address */}
                      <h6 className="heading-small text-muted mb-4">
                        Passport
                      </h6>
                      <div className="pl-lg-4">
                        <Row >
                          <Col md="12">
                            <img src={usersData?.passportPic ? usersData?.passportPic : dummy} style={{ width: "400px" }} />
                          </Col>
                          {
                            // <Button color="secondary" size="lg" className="mt-1 mr-3 mt-3" 

                            //   >UPLOAD</Button>
                            <FileBase64
                              type="file"

                              onDone={(base64) => handlePassportPic({ selectedFile: base64 })}


                            />
                          }
                        </Row>


                      </div>
                      <div className="text-center">
                        <Button className="mt-4" color="dark" type="button" onClick={profile}>
                          Update Profile
                        </Button>
                      </div>
                    {/* Description */}
                    
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        }
      </Container>
    </>
  );
};

export default Profile;
