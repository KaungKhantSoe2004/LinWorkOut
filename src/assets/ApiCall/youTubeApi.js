import axios from "axios";

export const GetVideos = async (url, searchKey) => {
  const options = {
    method: "GET",
    url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
    params: { q: searchKey },
    headers: {
      "X-RapidAPI-Key": "385385755cmsh8a6b09e769de8c0p1e711ejsn1f40922b7b49",
      "X-RapidAPI-Host": "youtube-search-results.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    return error;
  }
};
