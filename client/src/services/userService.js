import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';

const API_URL = '/api/test/';
const API_URL2 = '/api/users/';

class UserService {
  // getPublicContent() {
  //   return axios.get(API_URL + 'all');
  // }

  // getUserBoard() {
  //   return axios.get(API_URL + 'user', { headers: authHeader() });
  // }

  // getModeratorBoard() {
  //   return axios.get(API_URL + 'mod', { headers: authHeader() });
  // }

  // getAdminBoard() {
  //   return axios.get(API_URL + 'admin', { headers: authHeader() });
  // }

  getAll () {
    return axios.get(API_URL2 , { headers: BASIC_HEADERS });
  }

  update (id, data) {
    return axios.put(`${API_URL2}` + id, data, { headers: BASIC_HEADERS });
  }

}

export default new UserService();
