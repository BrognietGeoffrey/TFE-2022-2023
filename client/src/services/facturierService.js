import axios from "axios"
import { BASIC_HEADERS } from "../reducers/headers";
const API_URL = "/api/facturiers/";


class facturierService {
    
    async getAll(async = true) {
        console.log(BASIC_HEADERS, "BASIC_HEADERS");
        return axios.get(API_URL, { headers: BASIC_HEADERS, async: async });
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
    update(id, data) {
        return axios.put(API_URL + id, data, { headers: BASIC_HEADERS });
    }
    deleteFacturier(id) {
        return axios.delete(API_URL + id);
    }





}

export default new facturierService();