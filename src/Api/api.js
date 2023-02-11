import axios from 'axios'

const url = 'http://localhost:5000';
// const url = 'https://accu-backend-production.up.railway.app';

//auth
export const register = async (values) => {
    return await axios.post(`${url}/reg`, values);
}
export const login = async (values) => {
    return await axios.post(`${url}/log`, values);
}
export const getAllUsers = async () => {
    return await axios.get(`${url}/getAllUsers`);
}
export const getUserById = async (values) => {
    return await axios.post(`${url}/userById`, values);
}
export const forgetPassword = async (values) => {
    return await axios.post(`${url}/forgetPassword`, values);
}
export const updateUser= async (values) => {
    return await axios.put(`${url}/updateUser`, values);
}



//client

export const createClient= async (values) => {
    return await axios.post(`${url}/createClient`, values);
}
export const getAllClient = async () => {
    return await axios.get(`${url}/getAllClients`);
}
export const deleteClient = async (id) => {
    return await axios.post(`${url}/deleteClientById`,id);
}

//crew

export const createCrew = async (values) => {
    return await axios.post(`${url}/createCrew`, values);
}
export const getAllCrew = async () => {
    return await axios.get(`${url}/getAllCrews`);
}
export const deleteCrew = async (id) => {
    return await axios.post(`${url}/deleteCrewById`, id);
}
export const sendForgetLink = async (email) => {
    return await axios.post(`${url}/forgetLink`, email);
}

//bankDetails

export const addBankDetails = async (values) => {
    return await axios.post(`${url}/addBankDetails`, values);
}

//aircraft
export const addaicraftDetails = async (values) => {
    return await axios.post(`${url}/addAircraftDetails`, values);
}
export const getAllAircraft = async () => {
    return await axios.get(`${url}/getAllAircrafts`);
}
export const deleteAircraft = async (id) => {
    return await axios.post(`${url}/deleteAircraftById`, id);
}
//trip

export const addtripDetails = async (values) => {
    return await axios.post(`${url}/addTripDetails`, values);
}
export const getAllTrips = async () => {
    return await axios.get(`${url}/getAllTrips`);
}
export const TripsByclientId = async (values) => {
    return await axios.post(`${url}/getAllTripsByClientId`,values);
}
export const deleteTrip = async (id) => {
    return await axios.post(`${url}/deleteTripById`, id);
}
export const addCrewToTrips = async (values) => {
    return await axios.post(`${url}/addCrewToTrips`, values);
}
export const updateTripStatus = async (values) => {
    return await axios.put(`${url}/updateTripStatus`, values);
}


//document
export const addDocument = async (values) => {
    return await axios.post(`${url}/addDocument`, values);
}
export const getAllDocument = async () => {
    return await axios.get(`${url}/getAllDocuments`);
}

//stripe
export const makePayment= async (values) => {
    return await axios.post(`${url}/stripPayment`,values);
}