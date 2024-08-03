const baseUrlAll = "https://studies.cs.helsinki.fi/restcountries/api/all";
const baseUrlName = "https://studies.cs.helsinki.fi/restcountries/api/name";
import axios from "axios";

const getAll = () => {
  const request = axios.get(baseUrlAll);
  return request.then((response) => response.data);
};

const getName = (name) => {
  const request = axios.get(`${baseUrlName}/${name}`);
  return request.then((response) => response.data);
};

export default {
  getAll, getName
}