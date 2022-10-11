import axios from "axios";

const API_Service = {
    async GetService(endpoint, token = null) {
        try {
            let customHeader = "";
            if (token != null) {
                customHeader = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                };
            }
            const result = await axios.get(
                `http://localhost:7151/api/${endpoint}`,
                customHeader
            );
            if (result.status === 200) {
                return result;
            }
        } catch (e) {
            console.log(e);
        }
    },
    async PostService(endpoint, body, token = null) {
        try {
          let customHeader = "";
          if (token != null) {
            customHeader = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };
        }
            const result = await axios.post(
                `http://localhost:7151/api/${endpoint}`,
                body,
                customHeader,
                
            );
            if (result.status === 200) {
                return result.data;
            }
        } catch (e) {
            console.log(e);
        }
    },
    async PutService(endpoint, body, token = null) {
        try {
          let customHeader = "";
          if (token != null) {
            customHeader = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };
        }
            const result = await axios.put(
                `http://localhost:7151/api/${endpoint}`,
                body,
                customHeader
            );
            if (result.status === 200) {
                return result;
            }
        } catch (e) {
            console.log(e);
        }
    },
    async DeleteService(endpoint, body, token = null) {
        try {
          let customHeader = "";
          if (token != null) {
            customHeader = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            };
        }
            const result = await axios.delete(
                `http://localhost:7151/api/${endpoint}`,
                body,
                customHeader
            );
            if (result.status === 200) {
                return result;
            }
        } catch (e) {
            console.log(e);
        }
    },
};

export default API_Service;
