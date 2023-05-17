import axios from 'axios';
import { BASIC_HEADERS } from '../reducers/headers';
const API_URL2 = '/api/users/';

class UserService {
  getAll () {
    return axios.get(API_URL2 , { headers: BASIC_HEADERS });
  }

  update (id, data) {
    return axios.put(API_URL2 + id, data, { headers: BASIC_HEADERS });
  }

}

export default new UserService();
