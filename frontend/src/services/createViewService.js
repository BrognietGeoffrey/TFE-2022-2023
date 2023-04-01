import axios from 'axios';

const API_URL = '/api/view/createView'; // Remplacez cette URL par celle de votre backend

class CustomViewService {
  createView(table, filters, joins, view_name) {
    const data = {
      table,
      filters,
      joins,
      view_name
    };
    console.log(data);
    return axios.post(`${API_URL}`, data);
    
  }
}

export default new CustomViewService();