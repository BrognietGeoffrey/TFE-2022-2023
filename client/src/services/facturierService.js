import axios from "axios"
import { BASIC_HEADERS } from "../reducers/headers";
const API_URL = "/api/facturiers/";


class facturierService {
    
    async getAll(async = true) {
        console.log(BASIC_HEADERS, "BASIC_HEADERS");
        return axios.get(API_URL, { headers: BASIC_HEADERS, async: async });
    }


    getFacturierById(id) {
        return axios.get(API_URL + id, { headers: BASIC_HEADERS });
    }
    // find by description
    findByDescription(description) {
        return axios.get(API_URL + "?description=" + description, { headers: BASIC_HEADERS });
    }

    create(facturier) {
        return axios.post(API_URL, facturier, { headers: BASIC_HEADERS });

    }
    update(id, data) {
        return axios.put(API_URL + id, data, { headers: BASIC_HEADERS });
    }
    deleteFacturier(id) {
        return axios.delete(API_URL + id, { headers: BASIC_HEADERS });
    }





}

export default new facturierService();