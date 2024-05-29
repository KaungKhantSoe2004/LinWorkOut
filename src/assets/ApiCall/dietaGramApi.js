import axios from "axios";
export const getFoodCalory = async (food) => {
  const options = {
    method: "GET",
    url: "https://dietagram.p.rapidapi.com/apiFood.php",
    params: {
      name: food,
      lang: "pl",
    },
    headers: {
      "X-RapidAPI-Key": "32d47728a0mshd6dfc6b9e131414p1e0c3ajsn83167a48d21d",
      "X-RapidAPI-Host": "dietagram.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    return error;
  }
};
