import axios from 'axios'

const url = 'http://localhost:5000';
// const url = 'http://accusign.zeeshou.com';

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

//crew

export const createCrew = async (values) => {
    return await axios.post(`${url}/createCrew`, values);
}

//bankDetails

export const addBankDetails = async (values) => {
    return await axios.post(`${url}/addBankDetails`, values);
}