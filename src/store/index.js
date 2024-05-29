import { init } from "aos";
import { applyMiddleware, legacy_createStore as createStore } from "redux";

import { thunk } from "redux-thunk";
const initialState = {
  user: {},
  allExercises: [],
  searchExercises: [],
  bodyPartExercises: [],
  courseExercises: [],
  recommendedExercises: [],
  favorites: [],
};

function reducer(initialState, action) {
  switch (action.type) {
    case "allExercises":
      console.log("allExercises");
      console.log(action.payload, "is All exercises");
      return {
        ...initialState,
        allExercises: [action.payload],
      };
    case "searchExercise":
      console.log(initialState.allExercises);
      let searchData = initialState.allExercises[0].filter((item) =>
        item.name.includes(action.payload)
      );

      return {
        ...initialState,
        searchExercises: searchData,
      };
    case "bodyPartExercises":
      const bodyData = initialState.allExercises[0].filter(
        (item) => item.bodyPart === action.payload
      );
      console.log(bodyData, "is Data", action.payload);
      return {
        ...initialState,
        bodyPartExercises: [bodyData],
      };
    case "courseExercises":
      const courseData = initialState.allExercises[0].filter(
        (item) => item.equipment === action.payload
      );
      // console.log(courseData, "is Data", action.payload);
      return {
        ...initialState,
        courseExercises: [courseData],
      };
    case "recommendedExercises":
      return {
        ...initialState,
        recommendedExercises: [
          ...initialState.recommendedExercises,
          action.payload,
        ],
      };
    case "user":
      return { ...initialState, user: action.payload };
    case "favorites":
      return { ...initialState, favorites: action.payload };
    default:
      return initialState;
  }
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
