import { apiCall } from "../../assets/ApiCall/exerciseApi";

export const allFavorites = (data) => {
  return async (dispatch) => {
    //  try {

    //   } catch (error) {
    //     console.error("Error during API call:", error);
    //   }
    dispatch({
      type: "favorites",
      payload: data,
    });
  };
};
