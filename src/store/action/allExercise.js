import { apiCall } from "../../assets/ApiCall/exerciseApi";

export const getAllExercise = (data) => {
  return async (dispatch) => {
    //  try {

    //   } catch (error) {
    //     console.error("Error during API call:", error);
    //   }
    dispatch({
      type: "allExercises",
      payload: data,
    });
  };
};

// try {
//     const resultArray = await apiCall(
//       "https://exercisedb.p.rapidapi.com/exercises"
//     );
//     setAllExercise(resultArray);

//     let arr = allExercise.filter((eachObj) => eachObj.target === "abs");
//   } catch (error) {
//     console.error("Error during API call:", error);
//   }
