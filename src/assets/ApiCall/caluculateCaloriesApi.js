import axios from "axios";
export const getFood = async (type, params) => {
  const options = {
    method: "GET",
    url: `https://fitness-calculator.p.rapidapi.com/${type}`,
    params,
    headers: {
      "X-RapidAPI-Key": "40ca6b9605msh40aaa22932be22dp1d04a3jsn910e8ff7495a",
      "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return error;
  }
};
