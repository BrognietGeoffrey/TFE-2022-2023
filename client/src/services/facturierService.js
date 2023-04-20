import axios from "axios"

const API_URL = "/api/facturiers/";


const BASIC_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem("access_token")
}
class facturierService {
    
    async getAll() {
        console.log(localStorage.access_token, "token");
        const response = await axios.get(API_URL, {headers: BASIC_HEADERS});
        
        return response.data;
        
    }

    getFacturierById(id) {
        return axios.get(API_URL + id);
    }
    // find by description
    findByDescription(description) {
        return axios.get(API_URL + "?description=" + description);
    }

    create(facturier) {
        return axios.post(API_URL, facturier);

    }
    update(id, estpaye) {
        return axios.put(API_URL + id, estpaye);
    }
    deleteFacturier(id) {
        return axios.delete(API_URL + id);
    }





}

export default new facturierService();