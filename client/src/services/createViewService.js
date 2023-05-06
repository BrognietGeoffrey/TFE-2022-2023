import axios from 'axios';

const API_URL = '/api/view/'; // Remplacez cette URL par celle de votre backend

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
  getAllView() {
    return axios.get(`${API_URL}`);
  }
}

export default new CustomViewService();