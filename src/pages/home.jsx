import ".././assets/css/home.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiCall } from "../assets/ApiCall/exerciseApi.js";
import ExerciseBox from "../components/exerciseBox.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllExercise } from "../store/action/allExercise.js";
import { getSearchExercise } from "../store/action/searchExercise.js";

function Home() {
  // dispatch
  const dispatch = useDispatch();

  // more Function
  const [isClassesMore, setIsClassesMore] = useState(false);
  const [isPartsMore, setIsPartsMore] = useState(false);

  // bodyParts name and course Name and recommended Exe
  const [bodyPartArr, setBodyPartArr] = useState([]);
  const [courseArr, setCourseArr] = useState([]);
  const [recommendedExercise, setRecommendedExercise] = useState([]);

  // all Exe
  const [allExercise, setAllExercise] = useState([]);

  // paginator and search
  const splitArray = (array, size) => {
    let result = [];
    for (let i = 0; i < array.length; i += size) {
      let chunk = array.slice(i, i + size);
      result.push(chunk);
    }
    return result;
  };
  const arrays = useSelector((store) => store.favorites);
  console.log(arrays);
  const [arrayIndex, setArrayIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const searchData = useSelector((store) =>
    splitArray(store.searchExercises, 40)
  );
  const all = useSelector((store) => store.searchExercises);

  // search Function and setinputValue Function
  const search = async () => {
    if (searchKey === "" || searchKey === "undefined" || searchKey === null) {
      setIsSearch(false);
      return;
    } else {
      dispatch(getSearchExercise(searchKey));
      setIsSearch(true);
      setInputVal("");
    }
  };

  const setValue = (e) => {
    setSearchKey(e.target.value);
    setInputVal(e.target.value);
  };

  // fetchData Function
  let fetchData = async () => {
    try {
      const resultArray = await apiCall(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList"
      );
      setBodyPartArr(resultArray);
    } catch (error) {
      console.error("Error during API call:", error);
    }

    try {
      const resultArray = await apiCall(
        "https://exercisedb.p.rapidapi.com/exercises/equipmentList"
      );
      setCourseArr(resultArray);
    } catch (error) {
      console.log(error);
    }

    const resultArray = await apiCall(
      "https://exercisedb.p.rapidapi.com/exercises"
    );

    dispatch(getAllExercise(resultArray));
    setAllExercise(resultArray);

    try {
      const resultArray = await apiCall(
        `https://exercisedb.p.rapidapi.com/exercises/target/abs`
      );
      setRecommendedExercise(resultArray);

      console.log(recommendedExercise);
    } catch (error) {
      console.log(error);
    }
  };

  // clases More and body Parts More Function
  const classesMore = () => {
    setIsClassesMore(!isClassesMore);
  };
  const partsMore = () => {
    setIsPartsMore(!isPartsMore);
  };

  // useEffect
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" homePage">
      <div className=" mt-5  position-relative imgContainer">
        <img
          src="https://c1.wallpaperflare.com/path/782/470/535/adult-barbell-body-bodybuilding-212e99ae58018ed48a35a5ce9ef066ae.jpg"
          className=" image"
          alt="d"
        />
      </div>
      <div className=" position-absolute absoluteText text-white">
        <h4 className=" d-flex ">
          <span className=" dot ">________</span>

          <span className="mt-3 ms-2">WITH KURONA KAISER </span>
        </h4>
        <h1 className=" gap-4 ">
          <div>BUILD PERFECT BODY</div>
          <div>SHAPE FOR GOOD</div>
          <div>AND HEALTHY LIFE</div>
        </h1>
      </div>

      <div className="my-5 recommended pt-5 ms-3">
        <h4 className=" mt-3 chooseText text-center">Search Exercises</h4>

        <div className=" d-flex col-12 row   mt-4 ">
          <div className=" offset-md-3 offset-2 col-7  col-md-5 ">
            <input
              type="text"
              className=" col-12 form-control"
              placeholder=" Search Exercises"
              onChange={setValue}
              value={inputVal}
            />
          </div>
          <div className=" col-1">
            <button
              onClick={search}
              className=" btn pt-1  bg-white  border-0 rounded-1"
            >
              <FaSearch />
            </button>
          </div>
        </div>
        <div className=" my-5">
          {isSearch && searchData.length !== 0 && (
            <h3 className=" text-center aboutLin">Total - {all.length}</h3>
          )}

          {isSearch && (
            <h5 className=" ms-5 aboutLin">Search Key - {searchKey} </h5>
          )}

          {isSearch && searchData.length === 0 && (
            <h2 className=" text-center ms-5 text-danger">There is No Data</h2>
          )}

          {isLoading ? (
            <div>
              <h3 className=" aboutLin text-center ms-5">Loading</h3>
            </div>
          ) : (
            <div className=" recommendedContainer">
              {isSearch
                ? searchData[arrayIndex]?.map((ob, index) => (
                    <ExerciseBox data={ob} key={index} />
                  ))
                : allExercise
                    ?.slice(0, 20)
                    .map((ob, index) => <ExerciseBox data={ob} key={index} />)}
            </div>
          )}
          {searchData.length !== 0 && isSearch === true && (
            <div className=" d-flex justify-content-center ms-5 mt-4">
              <nav aria-label="Page navigation example">
                <ul class="pagination my-3">
                  {searchData?.slice(0, 15).map((item, index) => (
                    <li class="page-item ">
                      <button
                        onClick={() => {
                          console.log(index);
                          console.log(searchData[index]);
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

      <div className=" my-5 ms-md-4 ms-0 bodyContainer">
        <div className=" ms-3">
          <h4 className=" text-center chooseText">View Our Courses</h4>
          <div className=" motherCoursesBox">
            <div
              className={` mt-4 coursesBoxContainer ${isClassesMore && "show"}`}
            >
              {courseArr?.map((ob, index) => (
                <Link
                  to={`/course/${ob}`}
                  className={`me-md-4 text-decoration-none me-3 rounded-2 ms-2 servicesBox text-white ${
                    !isClassesMore && index > 7 && "d-none"
                  }`}
                >
                  <h4 className=" servicesLogo my-2 text-center">
                    {/* <FaWeightHanging /> */}
                    <img
                      src={require(`../assets/${ob}.jpg`)}
                      alt=""
                      className=" aboutLin bodyPartImg"
                    />
                  </h4>
                  <h6 className=" my-2 text-center">{ob.toUpperCase()}</h6>
                  <div className=" m-2 text-white-50">
                    {index} Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Quae voluptatum vitae nobis
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="   mt-4 d-flex justify-content-center">
            <button
              onClick={classesMore}
              className=" rounded-1 p-2 viewMoreBtn"
            >
              {isClassesMore ? (
                <div>
                  Show Less <FaArrowUp className=" pb-1" />
                </div>
              ) : (
                <div>
                  {" "}
                  View More <FaArrowDown className=" pb-1" />{" "}
                </div>
              )}
            </button>
          </div>
        </div>

        <div className=" mt-5 recommended pt-5 ms-3">
          <h4 className=" mt-3 chooseText text-center">
            Do Some Exercises for body Parts !
          </h4>
          <div className=" motherCoursesBox">
            <div
              className={` mt-4 coursesBoxContainer ${isPartsMore && "show"}`}
            >
              {bodyPartArr?.map((ob, index) => (
                <Link
                  to={`/bodyPart/${ob}`}
                  className={` text-decoration-none  me-md-4 me-3 rounded-2 ms-2 servicesBox text-white ${
                    !isPartsMore && index > 7 && "d-none"
                  }`}
                >
                  <h4 className=" servicesLogo my-2 text-center">
                    <img
                      src={require(`../assets/bodyParts/${ob}.png`)}
                      className=" bg-white bodyPartImg"
                      alt=""
                    />
                  </h4>
                  <h6 className=" my-2 text-center">{ob.toUpperCase()}</h6>
                  <div className=" m-2 text-white-50">
                    &nbsp; &nbsp; &nbsp; Lorem, ipsum dolor sit amet consectetur
                    adipisicing elit. Quae voluptatum vitae nobis
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="   mt-4 d-flex justify-content-center">
            <button onClick={partsMore} className=" rounded-1 p-2 viewMoreBtn">
              {isPartsMore ? (
                <div>
                  Show Less <FaArrowUp className=" pb-1" />
                </div>
              ) : (
                <div>
                  {" "}
                  View More <FaArrowDown className=" pb-1" />{" "}
                </div>
              )}
            </button>
          </div>
        </div>

        <div className=" mt-5 recommendedSection pt-5 ms-3">
          <h4 className=" my-3 chooseText text-center">
            Exercises Recommended For You
          </h4>
          <div className=" recommendedContainer ">
            {recommendedExercise?.slice(0, 12).map((ob, index) => (
              <ExerciseBox data={ob} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
