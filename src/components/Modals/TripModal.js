import { getUserById } from 'Api/api';
import { addtripDetails } from 'Api/api';
import React, { useEffect, useMemo, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import { Button, Form, Input, FormGroup,Row,Col, Label, Table } from 'reactstrap';
import CrewNestedModal from './CrewNestedModal';
import Swal from "sweetalert2";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { getAllAircraft } from 'Api/api';
import { getClientByKey } from 'Api/api';

const TripModal = () => {
   
    const [show, setShow] = useState(false);
    const [bar,setBar]=useState("bank");
    const [usersData, setUsersData] = useState();
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [clientData, setClientData] = useState([])

    const handleBankBar=()=>{
        setBar("bank")
    }
    const handleRouteBar = () => {
        setBar("route")
    }
    const handleAircraftBar = () => {
        setBar("aircraft")
    }
    const handleCrewBar = () => {
        setBar("crew")
    }
    const [value, setValues] = useState();
    const handleTripValues = (e) => {
        setValues({ ...value, [e.target.name]: e.target.value });
        console.log(values);
    }
    useEffect(() => {
        getClientByKey()
            .then((res) => {
                console.log(res, "======>clientData")
                setClientData(res?.data?.data)

            })

    }, [])
    const trip=async()=>{
        
        const { tripName,client,fee,
            percentage,description,destinationTo,destinationFrom,
            startDate,endDate,aircraftType,selectAircraft,hotelType, airlineTravel } = value;
        console.log(tripName, client, fee,
            percentage, description, destinationTo, destinationFrom,
            startDate, endDate, aircraftType, selectAircraft, hotelType, airlineTravel, "======>exValues")

        if (tripName&& client&&  description&& destinationTo&& destinationFrom&&
            startDate&& endDate&& aircraftType, selectAircraft, hotelType&& airlineTravel) {
                const Value={
                    tripName:tripName, client:client, fee:fee,
                    percentage: percentage, description: description, destinationTo: destinationTo, destinationFrom: destinationFrom,
                    startDate: startDate, endDate: endDate, aircraftType: aircraftType, selectAircraft: selectAircraft, hotelType: hotelType, airlineTravel: airlineTravel,
                     clientId: role.id,
                }
        await addtripDetails(Value)
            .then((res) => {
                handleClose();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    text: "Details added",
                    color: "black",
                    showConfirmButton: false,
                    timer: 2000,
                });
                window.location.reload();
                setValues('')

            });
        }
        else {
            handleClose();
            Swal.fire({
                position: "center",
                icon: "warning",
                text: "Please complete all the fields",
                color: "black",
                showConfirmButton: false,
                timer: 2000,
            });
            window.location.reload();
        }
    }
   const handleBasicBarAgain=()=>{
       setBar("route")
    }
    const handleRouteBarAgain = () => {
        setBar("aircraft")
    }
    const handleAircraftBarAgain = () => {
        setBar("crew")
    }

    const values = {
        id: role.id
    }
    useEffect(() => {

        getUserById(values)
            .then((res) => {

                setUsersData(res.data.data)

            })

    }, [])
    const [aircraftData, setAircratData] = useState([]);
    useEffect(() => {
        getAllAircraft()
            .then((res) => {
               
                setAircratData(res.data)
            })

    }, [])
    console.log(aircraftData, "======>airtabletData")
    const options = useMemo(() => countryList().getData(), [])
  return (
      <div><Button color="secondary" size="lg" className="mt-1 mr-3" style={{ float: "right" }}

          onClick={handleShow}>+ CREATE NEW TRIP
      </Button>

          <Modal show={show} onHide={handleClose}  >
              <div className="modal-header ">
                  <h2 className="modal-title h4 text-dark">Create new trip</h2>
                  
              </div>
              
              <Modal.Body className="px-4" >
                  <Row className='mt-3'>
                      <Col xl={4}>
                          <Link> <h6 className="text-center" value="bankDetail" onClick={handleBankBar}>Trip Details</h6></Link>
                          <div className="progress">
                              <div className="progress-sm-bar bg-dark" style={{width: bar==="bank"? "100%":"0%" }}></div>
                          </div>
                      </Col>
                      <Col xl={4}>
                          <Link> <h6 className="text-center" value="trip" onClick={handleRouteBar} >Date & Route</h6></Link>
                          <div className="progress">
                              <div className="progress-bar bg-dark" style={{ width: bar === "route" ? "100%" : "0%" }}></div>
                          </div>
                      </Col>
                      <Col xl={4}>
                          <Link> <h6 className="text-center" value="trip" onClick={handleAircraftBar}>Aircraft</h6></Link>
                          <div className="progress">
                              <div className="progress-bar bg-dark" style={{ width: bar === "aircraft" ? "100%" : "0%" }}></div>
                          </div>
                      </Col>
                      <Col xl={4}>
                          <Link> <h6 className="text-center" value="trip" onClick={handleCrewBar} >crew member</h6></Link>
                          <div className="progress">
                              <div className="progress-bar bg-dark" style={{ width: bar === "crew" ? "100%" : "0%" }}></div>
                          </div>
                      </Col>
                  </Row> 
                  {bar==="bank"&&
                      <Form>
                          <Input type="text" name="tripName" id="" className='mt-3' onChange={handleTripValues} placeholder="Trip name" />
{
    role.role==="admin"&&
                          <Input type="select" name="client" id="" className='mt-3' onChange={handleTripValues} placeholder="Client" >
                              <option>client</option>
                              {
                                clientData?.map((data)=>(
                                    <>
                                        <option value={data._id}>{data?.firstName}</option>
                                    
                                    </>
                                ))
                              }
                          </Input>
  }
                          {
                        //   <Form inline className='mt-3'>
                         


                        //       <Input type="number" style={{ cursor: role.role==="client"?"not-allowed":""}} name="fee" id="exampleEmail" onChange={handleTripValues} placeholder="Fee" />


                        //       <Input type="text" className='ml-3' style={{ cursor: role.role === "client" ? "not-allowed" : "" }}  name="percentage" onChange={handleTripValues} id="examplePassword" placeholder="Percentage" />
                        //   </Form>
                          }
                          <div className="md-form mt-3">
                              <textarea id="form7" className="md-textarea form-control" 
                              defaultValue={"Description"}
                              onChange={handleTripValues} name="description" rows="3" placeholder=''></textarea>

                          </div>





                      </Form>
                }
                {
                    bar==="route"&&
                
                  <Form>
                      
                <Form inline className='mt-3'>
                <Row>
                <Col >
                    <Input type="select" style={{width:"158px"}} name="destinationFrom" onChange={handleTripValues} id="" className='mt-3'  placeholder="Destination from" >
                    <Select options={options} name="destinationFrom" value={value} onChange={handleTripValues} />
                   <option>Destination from</option>
                                              <option value="Afghanistan">Afghanistan</option>
                                              <option value="Albania">Albania</option>
                                              <option value="Algeria">Algeria</option>
                                              <option value="Andorra">Andorra</option>
                                              <option value="Angola">Angola</option>
                                              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                              <option value="Argentina">Argentina</option>
                                              <option value="Armenia">Armenia</option>
                                              <option value="Australia">Australia</option>
                                              <option value="Austria">Austria</option>
                                              <option value="Azerbaijan">Azerbaijan</option>
                                              <option value="Bahamas">Bahamas</option>
                                              <option value="Bahrain">Bahrain</option>
                                              <option value="Bangladesh">Bangladesh</option>
                                              <option value="Barbados">Barbados</option>
                                              <option value="Belarus">Belarus</option>
                                              <option value="Belgium">Belgium</option>
                                              <option value="Belize">Belize</option>
                                              <option value="Benin">Benin</option>
                                              <option value="Bhutan">Bhutan</option>
                                              <option value="Bolivia">Bolivia</option>
                                              <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                              <option value="Botswana">Botswana</option>
                                              <option value="Brazil">Brazil</option>
                                              <option value="Brunei">Brunei</option>
                                              <option value="Bulgaria">Bulgaria</option>
                                              <option value="Burkina Faso">Burkina Faso</option>
                                              <option value="Burundi">Burundi</option>
                                              <option value="Cambodia">Cambodia</option>
                                              <option value="Cameroon">Cameroon</option>
                                              <option value="Canada">Canada</option>
                                              <option value="Cape Verde">Cape Verde</option>
                                              <option value="Central African Republic">Central African Republic</option>
                                              <option value="Chad">Chad</option>
                                              <option value="Chile">Chile</option>
                                              <option value="China">China</option>
                                              <option value="Colombia">Colombia</option>
                                              <option value="Comoros">Comoros</option>
                                              <option value="Congo (Brazzaville)">Congo (Brazzaville)</option>
                                              <option value="Congo (Kinshasa)">Congo (Kinshasa)</option>
                                              <option value="Costa Rica">Costa Rica</option>
                                              <option value="Croatia">Croatia</option>
                                              <option value="Cuba">Cuba</option>
                                              <option value="Cyprus">Cyprus</option>
                                              <option value="Czech Republic">Czech Republic</option>
                                              <option value="Denmark">Denmark</option>
                                              <option value="Djibouti">Djibouti</option>
                                              <option value="Dominica">Dominica</option>
                                              <option value="Dominican Republic">Dominican Republic</option>
                                              <option value="Ecuador">Ecuador</option>
                                              <option value="Egypt">Egypt</option>
                                              <option value="El Salvador">El Salvador</option>
                                              <option value="Equatorial Guinea">Equatorial Guinea</option>
                                              <option value="Eritrea">Eritrea</option>
                                              <option value="Estonia">Estonia</option>
                                              <option value="Eswatini (Swaziland)">Eswatini (Swaziland)</option>
                                              <option value="Ethiopia">Ethiopia</option>
                                              <option value="Fiji">Fiji</option>
                                              <option value="Finland">Finland</option>
                                              <option value="France">France</option>
                                              <option value="Gabon">Gabon</option>
                                              <option value="Gambia">Gambia</option>
                                              <option value="Georgia">Georgia</option>
                                              <option value="Germany">Germany</option>
                                              <option value="Ghana">Ghana</option>
                                              <option value="Greece">Greece</option>
                                              <option value="Grenada">Grenada</option>
                                              <option value="Guatemala">Guatemala</option>
                                              <option value="Guinea">Guinea</option>
                                              <option value="Guinea-Bissau">Guinea-Bissau</option>
                                              <option value="Guyana">Guyana</option>
                                              <option value="Haiti">Haiti</option>
                                              <option value="Honduras">Honduras</option>
                                              <option value="Hungary">Hungary</option>
                                              <option value="Iceland">Iceland</option>
                                              <option value="India">India</option>
                                              <option value="Indonesia">Indonesia</option>
                                              <option value="Iran">Iran</option>
                                              <option value="Iraq">Iraq</option>
                                              <option value="Ireland">Ireland</option>
                                              <option value="Israel">Israel</option>
                                              <option value="Italy">Italy</option>
                                              <option value="Jamaica">Jamaica</option>
                                              <option value="Japan">Japan</option>
                                              <option value="Jordan">Jordan</option>
                                              <option value="Kazakhstan">Kazakhstan</option>
                                              <option value="Kenya">Kenya</option>
                                              <option value="Kiribati">Kiribati</option>
                                              <option value="Kosovo">Kosovo</option>
                                              <option value="Kuwait">Kuwait</option>
                                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                                              <option value="Laos">Laos</option>
                                              <option value="Latvia">Latvia</option>
                                              <option value="Lebanon">Lebanon</option>
                                              <option value="Lesotho">Lesotho</option>
                                              <option value="Liberia">Liberia</option>
                                              <option value="Libya">Libya</option>
                                              <option value="Liechtenstein">Liechtenstein</option>
                                              <option value="Lithuania">Lithuania</option>
                                              <option value="Luxembourg">Luxembourg</option>
                                              <option value="Madagascar">Madagascar</option>
                                              <option value="Malawi">Malawi</option>
                                              <option value="Malaysia">Malaysia</option>
                                              <option value="Maldives">Maldives</option>
                                              <option value="Mali">Mali</option>
                                              <option value="Malta">Malta</option>
                                              <option value="Marshall Islands">Marshall Islands</option>
                                              <option value="Mauritania">Mauritania</option>
                                              <option value="Mauritius">Mauritius</option>
                                              <option value="Mexico">Mexico</option>
                                              <option value="Micronesia">Micronesia</option>
                                              <option value="Moldova">Moldova</option>
                                              <option value="Monaco">Monaco</option>
                                              <option value="Mongolia">Mongolia</option>
                                              <option value="Montenegro">Montenegro</option>
                                              <option value="Morocco">Morocco</option>
                                              <option value="Mozambique">Mozambique</option>
                                              <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                                              <option value="Namibia">Namibia</option>
                                              <option value="Nauru">Nauru</option>
                                              <option value="Nepal">Nepal</option>
                                              <option value="Netherlands">Netherlands</option>
                                              <option value="New Zealand">New Zealand</option>
                                              <option value="Nicaragua">Nicaragua</option>
                                              <option value="Niger">Niger</option>
                                              <option value="Nigeria">Nigeria</option>
                                              <option value="North Korea">North Korea</option>
                                              <option value="North Macedonia (formerly Macedonia)">North Macedonia (formerly Macedonia)</option>
                                              <option value="Norway">Norway</option>
                                              <option value="Oman">Oman</option>
                                              <option value="Pakistan">Pakistan</option>
                                              <option value="Palau">Palau</option>
                                              <option value="Panama">Panama</option>
                                              <option value="Papua New Guinea">Papua New Guinea</option>
                                              <option value="Paraguay">Paraguay</option>
                                              <option value="Peru">Peru</option>
                                              <option value="Philippines">Philippines</option>
                                              <option value="Poland">Poland</option>
                                              <option value="Portugal">Portugal</option>
                                              <option value="Qatar">Qatar</option>
                                              <option value="Romania">Romania</option>
                                              <option value="Russia">Russia</option>
                                              <option value="Rwanda">Rwanda</option>
                                              <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                              <option value="Saint Lucia">Saint Lucia</option>
                                              <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                                              <option value="Samoa">Samoa</option>
                                              <option value="San Marino">San Marino</option>
                                              <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                              <option value="Saudi Arabia">Saudi Arabia</option>
                                              <option value="Senegal">Senegal</option>
                                              <option value="Serbia">Serbia</option>
                                              <option value="Seychelles">Seychelles</option>
                                              <option value="Sierra Leone">Sierra Leone</option>
                                              <option value="Singapore">Singapore</option>
                                              <option value="Slovakia">Slovakia</option>
                                              <option value="Slovenia">Slovenia</option>
                                              <option value="Solomon Islands">Solomon Islands</option>
                                              <option value="Somalia">Somalia</option>
                                              <option value="South Africa">South Africa</option>
                                              <option value="South Korea">South Korea</option>
                                              <option value="South Sudan">South Sudan</option>
                                              <option value="Spain">Spain</option>
                                              <option value="Sri Lanka">Sri Lanka</option>
                                              <option value="Sudan">Sudan</option>
                                              <option value="Suriname">Suriname</option>
                                              <option value="Sweden">Sweden</option>
                                              <option value="Switzerland">Switzerland</option>
                                              <option value="Syria">Syria</option>
                                              <option value="Taiwan">Taiwan</option>
                                              <option value="Tajikistan">Tajikistan</option>
                                              <option value="Tanzania">Tanzania</option>
                                              <option value="Thailand">Thailand</option>
                                              <option value="Timor-Leste (East Timor)">Timor-Leste (East Timor)</option>
                                              <option value="Togo">Togo</option>
                                              <option value="Tonga">Tonga</option>
                                              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                              <option value="Tunisia">Tunisia</option>
                                              <option value="Turkey">Turkey</option>
                                              <option value="Turkmenistan">Turkmenistan</option>
                                              <option value="Tuvalu">Tuvalu</option>
                                              <option value="Uganda">Uganda</option>
                                              <option value="Ukraine">Ukraine</option>
                                              <option value="United Arab Emirates (UAE)">United Arab Emirates (UAE)</option>
                                              <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                                              <option value="United States of America (USA)">United States of America (USA)</option>
                                              <option value="Uruguay">Uruguay</option>
                                              <option value="Uzbekistan">Uzbekistan</option>
                                              <option value="Vanuatu">Vanuatu</option>
                                              <option value="Vatican City (Holy See)">Vatican City (Holy See)</option>
                                              <option value="Venezuela">Venezuela</option>
                                              <option value="Vietnam">Vietnam</option>
                                              <option value="Yemen">Yemen</option>
                                              <option value="Zambia">Zambia</option>
                                              <option value="Zimbabwe">Zimbabwe</option>
                </Input>
                </Col>
                <Col > 
                <Input type="select" style={{ width: "158px" }} name="destinationTo" onChange={handleTripValues} id="" className='mt-3 ml-5' placeholder="Destination to" >
                    <option>Destination to</option>
                                              <option value="Afghanistan">Afghanistan</option>
                                              <option value="Albania">Albania</option>
                                              <option value="Algeria">Algeria</option>
                                              <option value="Andorra">Andorra</option>
                                              <option value="Angola">Angola</option>
                                              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                              <option value="Argentina">Argentina</option>
                                              <option value="Armenia">Armenia</option>
                                              <option value="Australia">Australia</option>
                                              <option value="Austria">Austria</option>
                                              <option value="Azerbaijan">Azerbaijan</option>
                                              <option value="Bahamas">Bahamas</option>
                                              <option value="Bahrain">Bahrain</option>
                                              <option value="Bangladesh">Bangladesh</option>
                                              <option value="Barbados">Barbados</option>
                                              <option value="Belarus">Belarus</option>
                                              <option value="Belgium">Belgium</option>
                                              <option value="Belize">Belize</option>
                                              <option value="Benin">Benin</option>
                                              <option value="Bhutan">Bhutan</option>
                                              <option value="Bolivia">Bolivia</option>
                                              <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                              <option value="Botswana">Botswana</option>
                                              <option value="Brazil">Brazil</option>
                                              <option value="Brunei">Brunei</option>
                                              <option value="Bulgaria">Bulgaria</option>
                                              <option value="Burkina Faso">Burkina Faso</option>
                                              <option value="Burundi">Burundi</option>
                                              <option value="Cambodia">Cambodia</option>
                                              <option value="Cameroon">Cameroon</option>
                                              <option value="Canada">Canada</option>
                                              <option value="Cape Verde">Cape Verde</option>
                                              <option value="Central African Republic">Central African Republic</option>
                                              <option value="Chad">Chad</option>
                                              <option value="Chile">Chile</option>
                                              <option value="China">China</option>
                                              <option value="Colombia">Colombia</option>
                                              <option value="Comoros">Comoros</option>
                                              <option value="Congo (Brazzaville)">Congo (Brazzaville)</option>
                                              <option value="Congo (Kinshasa)">Congo (Kinshasa)</option>
                                              <option value="Costa Rica">Costa Rica</option>
                                              <option value="Croatia">Croatia</option>
                                              <option value="Cuba">Cuba</option>
                                              <option value="Cyprus">Cyprus</option>
                                              <option value="Czech Republic">Czech Republic</option>
                                              <option value="Denmark">Denmark</option>
                                              <option value="Djibouti">Djibouti</option>
                                              <option value="Dominica">Dominica</option>
                                              <option value="Dominican Republic">Dominican Republic</option>
                                              <option value="Ecuador">Ecuador</option>
                                              <option value="Egypt">Egypt</option>
                                              <option value="El Salvador">El Salvador</option>
                                              <option value="Equatorial Guinea">Equatorial Guinea</option>
                                              <option value="Eritrea">Eritrea</option>
                                              <option value="Estonia">Estonia</option>
                                              <option value="Eswatini (Swaziland)">Eswatini (Swaziland)</option>
                                              <option value="Ethiopia">Ethiopia</option>
                                              <option value="Fiji">Fiji</option>
                                              <option value="Finland">Finland</option>
                                              <option value="France">France</option>
                                              <option value="Gabon">Gabon</option>
                                              <option value="Gambia">Gambia</option>
                                              <option value="Georgia">Georgia</option>
                                              <option value="Germany">Germany</option>
                                              <option value="Ghana">Ghana</option>
                                              <option value="Greece">Greece</option>
                                              <option value="Grenada">Grenada</option>
                                              <option value="Guatemala">Guatemala</option>
                                              <option value="Guinea">Guinea</option>
                                              <option value="Guinea-Bissau">Guinea-Bissau</option>
                                              <option value="Guyana">Guyana</option>
                                              <option value="Haiti">Haiti</option>
                                              <option value="Honduras">Honduras</option>
                                              <option value="Hungary">Hungary</option>
                                              <option value="Iceland">Iceland</option>
                                              <option value="India">India</option>
                                              <option value="Indonesia">Indonesia</option>
                                              <option value="Iran">Iran</option>
                                              <option value="Iraq">Iraq</option>
                                              <option value="Ireland">Ireland</option>
                                              <option value="Israel">Israel</option>
                                              <option value="Italy">Italy</option>
                                              <option value="Jamaica">Jamaica</option>
                                              <option value="Japan">Japan</option>
                                              <option value="Jordan">Jordan</option>
                                              <option value="Kazakhstan">Kazakhstan</option>
                                              <option value="Kenya">Kenya</option>
                                              <option value="Kiribati">Kiribati</option>
                                              <option value="Kosovo">Kosovo</option>
                                              <option value="Kuwait">Kuwait</option>
                                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                                              <option value="Laos">Laos</option>
                                              <option value="Latvia">Latvia</option>
                                              <option value="Lebanon">Lebanon</option>
                                              <option value="Lesotho">Lesotho</option>
                                              <option value="Liberia">Liberia</option>
                                              <option value="Libya">Libya</option>
                                              <option value="Liechtenstein">Liechtenstein</option>
                                              <option value="Lithuania">Lithuania</option>
                                              <option value="Luxembourg">Luxembourg</option>
                                              <option value="Madagascar">Madagascar</option>
                                              <option value="Malawi">Malawi</option>
                                              <option value="Malaysia">Malaysia</option>
                                              <option value="Maldives">Maldives</option>
                                              <option value="Mali">Mali</option>
                                              <option value="Malta">Malta</option>
                                              <option value="Marshall Islands">Marshall Islands</option>
                                              <option value="Mauritania">Mauritania</option>
                                              <option value="Mauritius">Mauritius</option>
                                              <option value="Mexico">Mexico</option>
                                              <option value="Micronesia">Micronesia</option>
                                              <option value="Moldova">Moldova</option>
                                              <option value="Monaco">Monaco</option>
                                              <option value="Mongolia">Mongolia</option>
                                              <option value="Montenegro">Montenegro</option>
                                              <option value="Morocco">Morocco</option>
                                              <option value="Mozambique">Mozambique</option>
                                              <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                                              <option value="Namibia">Namibia</option>
                                              <option value="Nauru">Nauru</option>
                                              <option value="Nepal">Nepal</option>
                                              <option value="Netherlands">Netherlands</option>
                                              <option value="New Zealand">New Zealand</option>
                                              <option value="Nicaragua">Nicaragua</option>
                                              <option value="Niger">Niger</option>
                                              <option value="Nigeria">Nigeria</option>
                                              <option value="North Korea">North Korea</option>
                                              <option value="North Macedonia (formerly Macedonia)">North Macedonia (formerly Macedonia)</option>
                                              <option value="Norway">Norway</option>
                                              <option value="Oman">Oman</option>
                                              <option value="Pakistan">Pakistan</option>
                                              <option value="Palau">Palau</option>
                                              <option value="Panama">Panama</option>
                                              <option value="Papua New Guinea">Papua New Guinea</option>
                                              <option value="Paraguay">Paraguay</option>
                                              <option value="Peru">Peru</option>
                                              <option value="Philippines">Philippines</option>
                                              <option value="Poland">Poland</option>
                                              <option value="Portugal">Portugal</option>
                                              <option value="Qatar">Qatar</option>
                                              <option value="Romania">Romania</option>
                                              <option value="Russia">Russia</option>
                                              <option value="Rwanda">Rwanda</option>
                                              <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                              <option value="Saint Lucia">Saint Lucia</option>
                                              <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                                              <option value="Samoa">Samoa</option>
                                              <option value="San Marino">San Marino</option>
                                              <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                              <option value="Saudi Arabia">Saudi Arabia</option>
                                              <option value="Senegal">Senegal</option>
                                              <option value="Serbia">Serbia</option>
                                              <option value="Seychelles">Seychelles</option>
                                              <option value="Sierra Leone">Sierra Leone</option>
                                              <option value="Singapore">Singapore</option>
                                              <option value="Slovakia">Slovakia</option>
                                              <option value="Slovenia">Slovenia</option>
                                              <option value="Solomon Islands">Solomon Islands</option>
                                              <option value="Somalia">Somalia</option>
                                              <option value="South Africa">South Africa</option>
                                              <option value="South Korea">South Korea</option>
                                              <option value="South Sudan">South Sudan</option>
                                              <option value="Spain">Spain</option>
                                              <option value="Sri Lanka">Sri Lanka</option>
                                              <option value="Sudan">Sudan</option>
                                              <option value="Suriname">Suriname</option>
                                              <option value="Sweden">Sweden</option>
                                              <option value="Switzerland">Switzerland</option>
                                              <option value="Syria">Syria</option>
                                              <option value="Taiwan">Taiwan</option>
                                              <option value="Tajikistan">Tajikistan</option>
                                              <option value="Tanzania">Tanzania</option>
                                              <option value="Thailand">Thailand</option>
                                              <option value="Timor-Leste (East Timor)">Timor-Leste (East Timor)</option>
                                              <option value="Togo">Togo</option>
                                              <option value="Tonga">Tonga</option>
                                              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                              <option value="Tunisia">Tunisia</option>
                                              <option value="Turkey">Turkey</option>
                                              <option value="Turkmenistan">Turkmenistan</option>
                                              <option value="Tuvalu">Tuvalu</option>
                                              <option value="Uganda">Uganda</option>
                                              <option value="Ukraine">Ukraine</option>
                                              <option value="United Arab Emirates (UAE)">United Arab Emirates (UAE)</option>
                                              <option value="United Kingdom (UK)">United Kingdom (UK)</option>
                                              <option value="United States of America (USA)">United States of America (USA)</option>
                                              <option value="Uruguay">Uruguay</option>
                                              <option value="Uzbekistan">Uzbekistan</option>
                                              <option value="Vanuatu">Vanuatu</option>
                                              <option value="Vatican City (Holy See)">Vatican City (Holy See)</option>
                                              <option value="Venezuela">Venezuela</option>
                                              <option value="Vietnam">Vietnam</option>
                                              <option value="Yemen">Yemen</option>
                                              <option value="Zambia">Zambia</option>
                                              <option value="Zimbabwe">Zimbabwe</option>
                </Input>
                </Col>  
                </Row>    
        </Form>

        <Form inline className='mt-3'>
        <Row>
        <Col>
        
        <FormGroup>
        <Label for="exampleDate">Start Date</Label>
        <Input type="date" name="startDate" onChange={handleTripValues} id="exampleDate" placeholder="Start" className='mt-1' />
        </FormGroup>
        </Col>
        <Col>
        <FormGroup>
        <Label for="exampleDate">End Date</Label>
        <Input type="date" name="endDate" onChange={handleTripValues} id="exampleDate" placeholder="End" className='mt-1' />
        </FormGroup>
       </Col>
            </Row>
        </Form>
                      
                      
                     



                  </Form>
                }
                {
                    bar==="aircraft"&&
                    <Form>
                      <Form inline className='mt-3'>
                          
                                  <Input type="select" name="aircraftType" 
                                      onChange={handleTripValues} id="" className='mt-3' placeholder="Destination from" >
                                      <option>Aircraft Type</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                  </Input>
                             
                                  <Input type="select" name="selectAircraft"
                                      
                                    onChange={handleTripValues} id="" className='mt-3 ml-3 pr-5' placeholder="Destination to" >
                                      <option>Select aircraft</option>
                                      {
                                          aircraftData.length ?
                                              aircraftData?.map((data, index) => (
                                                  <option>{data.aircraftOwner}</option>
                                              ))
                                              :
                                              <option>No aircrafts available</option>
                                      }

                                  </Input>
                              
                          
                      </Form>
                              <Form inline className='mt-3'>

                                  <Input type="select" name="hotelType" style={{paddingRight:"30px"}}
                                    onChange={handleTripValues} id="" className='mt-3' placeholder="Destination from" >
                                      <option>Hotel type</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                  </Input>

                                  <Input type="select" name="airlineTravel" style={{paddingRight:"30px"}}
                                    onChange={handleTripValues} id="" className='mt-3 ml-2' placeholder="Destination to" >
                                      <option>Airline travel class</option>
                                      <option value="Economy Class">Economy Class</option>
                                      <option value="Premium Economy Class">Premium Economy Class</option>
                                      <option value="Business Class">Business Class</option>
                                      <option value="First Class">First Class</option>
                                      <option value="Domestic Class">Domestic Class</option>
                                      <option value="International Class">International Class</option>
                                      
                                  </Input>


                              </Form>
                          </Form>

                }

                {
                    bar==="crew"&&

<Row>
<Col>

{
// <h3 className='mt-3'>Crew member list</h3>
}
</Col>
{
    role.role==="client"?
    <></>
    :
<Col>

       <CrewNestedModal crewValues={value}/>                           
</Col>
}
{
                            //   <Table className="mt-3" >
                            //       <thead>
                            //           <tr>
                            //               <th style={{ color: "black", fontSize:"8px"}}>Crew Name</th>
                            //               <th style={{ color: "black", fontSize: "8px" }}> Client Appendix 1</th>
                            //               <th style={{ color: "black", fontSize: "8px" }}>Crew Appendix 1 </th>
                            //               <th style={{ color: "black", fontSize: "8px" }}> VAT% </th>
                            //               <th style={{ color: "black", fontSize: "8px" }}> Actions</th>
                            //           </tr>
                            //       </thead>
                            //       <tbody>
                            //           <tr>
                            //               <td>1</td>
                            //               <td>Mark</td>
                            //               <td>Otto</td>
                            //               <td>@mdo</td>
                                          

                            //               <td><i className="fa fa-trash"
                            //                   style={{ fontSize: "20px" }} aria-hidden="true"></i>
                            //                   <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px" }} aria-hidden="true"></i>

                            //               </td>
                            //           </tr>
                            //           <tr>
                            //               <td>1</td>
                            //               <td>Mark</td>
                            //               <td>Otto</td>
                            //               <td>@mdo</td>

                                         
                            //               <td><i className="fa fa-trash"
                            //                   style={{ fontSize: "20px" }} aria-hidden="true"></i>
                            //                   <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px" }} aria-hidden="true"></i>

                            //               </td>



                            //           </tr>
                            //           <tr>
                            //               <td>1</td>
                            //               <td>Mark</td>
                            //               <td>Otto</td>
                            //               <td>@mdo</td>


                            //               <td><i className="fa fa-trash"
                            //                   style={{ fontSize: "20px" }} aria-hidden="true"></i>
                            //                   <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px" }} aria-hidden="true"></i>

                            //               </td>



                            //           </tr>
                            //           <tr>
                            //               <td>1</td>
                            //               <td>Mark</td>
                            //               <td>Otto</td>
                            //               <td>@mdo</td>

                                         
                            //               <td><i className="fa fa-trash"
                            //                   style={{ fontSize: "20px" }} aria-hidden="true"></i>
                            //                   <i className="fa fa-ellipsis-v ml-3" style={{ fontSize: "20px" }} aria-hidden="true"></i>

                            //               </td>



                            //           </tr>


                            //       </tbody>
                            //   </Table>
                              }
</Row>
                      
                }
              </Modal.Body>
              <Modal.Footer className="justify-content-between px-4">
              {
                
                      bar === "route"&&
                          <>
                  <Button className="" color="dark" type="button"
                      onClick={handleRouteBarAgain}>
                      SAVE
                  </Button>
                  <button
                      className="btn btn-danger"
                      variant="danger"
                      onClick={handleClose}
                  >
                      Close
                  </button>
                  </>
              }
                  {

                      bar === "aircraft" &&
                      <>
                          <Button className="" color="dark" type="button"
                              onClick={handleAircraftBarAgain}>
                              SAVE
                          </Button>
                          <button
                              className="btn btn-danger"
                              variant="danger"
                              onClick={handleClose}
                          >
                              Close
                          </button>
                      </>
                  }
                  {bar === "bank"&&
                  <>
                  <Button className="" color="dark" type="button"
                      onClick={handleBasicBarAgain}>
                      CREATE
                  </Button>
                  <button
                      className="btn btn-danger"
                      variant="danger"
                      onClick={handleClose}
                  >
                      Close
                  </button>
                      </>
              }
                  {bar === "crew" &&
                      <>
                          <Button className="" color="dark" type="button"
                              onClick={trip}>
                              CREATE
                          </Button>
                          <button
                              className="btn btn-danger"
                              variant="danger"
                              onClick={handleClose}
                          >
                              Close
                          </button>
                      </>
                  }
              </Modal.Footer>
          </Modal></div>
  )
}
export default TripModal;


