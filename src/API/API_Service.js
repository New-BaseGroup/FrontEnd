import axios from 'axios';

const API_Service = {
    async GetService(endpoint) {
      try {
        const result = await axios.get(`http://localhost:7151/api/${endpoint}`);
        if (result.status === 200) {
            return result;
          }
    } catch (e) {
        console.log(e);
      }
    },
    async PostService(endpoint, body) {
      try {
        const result = await axios.post(`http://localhost:7151/api/${endpoint}`, body);
        if (result.status === 200) {
            return result.data;
          }
      } catch (e) {
        console.log(e);
      }
    },
    async PutService(endpoint, body) {
      try {
        const result = await axios.put(`http://localhost:7151/api/${endpoint}`, body);
        if (result.status === 200) {
            return result;
          }
      }
      catch (e) {
        console.log(e);
      }
    },
    async DeleteService(endpoint, body) {
      try {
        const result = await axios.delete(`http://localhost:7151/api/${endpoint}`, body);
        if (result.status === 200) {
            return result;
          }
      }
      catch (e) {
        console.log(e);
      }
    }
  }

export default API_Service;