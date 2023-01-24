import axios from "axios";
import {config} from "../../config";
import {getToken} from "../../utils/auth";

const token = getToken();
export const api = axios.create({baseURL:config.server,  headers: {Authorization: token}})

api.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export const setAxiosToken = (token:string) => {
  api.defaults.headers.Authorization = token
}
