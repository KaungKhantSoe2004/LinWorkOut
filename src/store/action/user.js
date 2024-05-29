// import { apiCall } from "../../assets/ApiCall/exerciseApi";

export const user = (data) => {
  return async (dispatch) => {
    //  try {

    //   } catch (error) {
    //     console.error("Error during API call:", error);
    //   }
    dispatch({
      type: "user",
      payload: data,
    });
  };
};
