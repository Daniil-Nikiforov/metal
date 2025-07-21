import axios from "axios";

export const fetchMetalSubType = (subType) => {
  return axios.get(`http://localhost:3000/api/metals/${subType}`);
};
