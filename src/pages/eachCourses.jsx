import { useEffect, useState } from "react";
import { getAllExerciseCourses } from "../store/action/courseExercises";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ExerciseBox from "../components/exerciseBox";

const EachCoursePage = () => {
  // pagination
  const [arrayIndex, setArrayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const splitArray = (array, size) => {
    let result = [];
    for (let i = 0; i < array?.length; i += size) {
      let chunk = array.slice(i, i + size);
      result.push(chunk);
    }
    return result;
  };

  const dispatch = useDispatch();
  const { name } = useParams();

  useEffect(() => {
    dispatch(getAllExerciseCourses(name));
  }, []);

  const state = useSelector((state) =>
    splitArray(state.courseExercises[0], 40)
  );
  const all = useSelector((state) => state.courseExercises);

  return (
    <div className=" col-12 pt-5 mt-5 row aboutPage">
      <div className=" pt-5 mt-5 col-12 aboutContainer">
        <h2 className=" aboutLin col-12 text-center pt-5  mt-5 position-absolute about">
          Exercises for {name.toUpperCase()}
        </h2>
      </div>
      <div>
        <h3 className=" ms-5 aboutLin">Total - {all[0]?.length}</h3>
      </div>

      {isLoading ? (
        <div className=" m-5 p-5">
          <h3 className=" aboutLin text-center">Loading</h3>
        </div>
      ) : (
        <div className=" text-white">
          {state === null || state === undefined || state.length === 0 ? (
            <div className=" text-danger">No Data</div>
          ) : (
            <div className="  bodyPartExerciseContainer">
              {state[0]?.map((ob, index) => (
                <ExerciseBox data={ob} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
      <div>
        {all[0]?.length > 40 && (
          <div className=" d-flex justify-content-center ms-5 mt-4">
            <nav aria-label="Page navigation example">
              <ul class="pagination my-3">
                {state?.slice(0, 15).map((item, index) => (
                  <li class="page-item ">
                    <button
                      onClick={() => {
                        console.log(index);

                        setArrayIndex(index);
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                        }, 2000);
                      }}
                      class="page-link p-1 p-md-3"
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};
export default EachCoursePage;
