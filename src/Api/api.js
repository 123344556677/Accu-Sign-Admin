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

//client

export const createClient= async (values) => {
    return await axios.post(`${url}/createClient`, values);
}
export const getAllClient = async (values) => {
    return await axios.get(`${url}/getAllClients`, values);
}

//crew

export const createCrew = async (values) => {
    return await axios.post(`${url}/createCrew`, values);
}
export const getAllCrew = async (values) => {
    return await axios.get(`${url}/getAllCrews`, values);
}

//bankDetails

export const addBankDetails = async (values) => {
    return await axios.post(`${url}/addBankDetails`, values);
}

//aircraft
export const addaicraftDetails = async (values) => {
    return await axios.post(`${url}/addAircraftDetails`, values);
}
export const getAllAircraft = async (values) => {
    return await axios.get(`${url}/getAllAircrafts`, values);
}