import { apiCall } from "../../assets/ApiCall/exerciseApi";

export const getSearchExercise = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "searchExercise",
      payload: data,
    });
  };
};
