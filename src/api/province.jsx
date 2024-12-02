import axios from "axios";

const provinceApi = axios.create({
  baseURL: "https://esgoo.net/api-tinhthanh/1/0.htm",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
const districtApi = (id) => {
  return axios.create({
    baseURL: `https://esgoo.net/api-tinhthanh/2/${id}.htm`,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const wardApi = (id) => {
  return axios.create({
    baseURL: `https://esgoo.net/api-tinhthanh/3/${id}.htm`,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { provinceApi, districtApi, wardApi };
