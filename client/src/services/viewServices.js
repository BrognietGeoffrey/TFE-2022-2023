import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL = '/api/';
// Ajouter les token dans les headers


class viewService {
    getAllView() {
        return axios.get(API_URL + 'getViews', { headers: BASIC_HEADERS });
    }
    createView(table, filters, joins, view_name) {
        const data = {
          table,
          filters,
          joins,
          view_name
        };
        console.log(data);
        return axios.post(`${API_URL}`+ 'createView', data, { headers: BASIC_HEADERS });
        
      }
    
      deleteView(view_name) {
        return axios.delete(`${API_URL}`+ 'deleteView', { headers: BASIC_HEADERS, data: { view_name } });
      }
}

export default new viewService();

