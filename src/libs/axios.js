import Axios from "axios";

// Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const axios = Axios.create({
  baseURL: "http://localhost:8888",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,// クッキー認証の許可
});


export default axios;