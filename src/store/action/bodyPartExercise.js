import { apiCall } from "../../assets/ApiCall/exerciseApi";

export const getAllExerciseBodyPart = (data) => {
  return async (dispatch) => {
    //  try {

    //   } catch (error) {
    //     console.error("Error during API call:", error);
    //   }
    dispatch({
      type: "bodyPartExercises",
      payload: data,
    });
  };
};
