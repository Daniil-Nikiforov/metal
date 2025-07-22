import axios from "axios";

export const fetchMetalSubType = (subType) => {
  return axios.get(`http://localhost:3000/api/metals/${subType}`);
};

export const fetchMetalType = (type) => {
  return axios.get(`http://localhost:3000/api/${type}`);
};

export const fetchSingleMetal = (url) => {
  return axios.get(`http://localhost:3000/api/metal/${url}`);
};
