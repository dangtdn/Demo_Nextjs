import axios from "axios";
import { token } from "../../configs/settings";

const client = axios.create({ 
  baseURL: "https://dev-api.hexabase.com/api/v0/",
});

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authrization = `Bear ${token}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log("Error: ", error);
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};

// Examples:
// const fetchData = (value) => {
//   return request({ url: '/get-data' });
//   return request({ url: 'add-data', method: 'post', data: value});
// }