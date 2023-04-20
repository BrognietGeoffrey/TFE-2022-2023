import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/';
// Ajouter les token dans les headers


const BASIC_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem("access_token")
}

const getAllView = async () => {
    const response = await axios.get(API_URL + "getViews", { headers: BASIC_HEADERS });
    return response.data;
}

export default {
    getAllView
}

