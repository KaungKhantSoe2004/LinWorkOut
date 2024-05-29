import VideoBox from "../components/videoBox";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCall } from "../assets/ApiCall/exerciseApi";
import { GetVideos } from "../assets/ApiCall/youTubeApi";
import { FaBookmark, FaHeart } from "react-icons/fa";
import axios from "axios";
import { getUser } from "../assets/localStorage/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { isFocusable } from "@testing-library/user-event/dist/utils";
import { allFavorites } from "../store/action/favorites";

function ExerciseInfo() {
  // dipatch
  const dispatch = useDispatch();

  // navigate
  const navigate = useNavigate("");
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [exerciseName, setExerciseName] = useState("");
  const [videos, setVideos] = useState("");
  const [isFavShow, setIsFavShow] = useState(true);
  const favorites = useSelector((state) => state.favorites);
  const fetchData = async () => {
    try {
      const resultArray = await apiCall(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`
      );
      const vide = await GetVideos(
        "https://youtube-search-results.p.rapidapi.com/youtube-search/",
        resultArray.name
      );
      setDetails(resultArray);

      setVideos(vide.videos);
      console.log(vide.videos, "is videos");
      console.log(resultArray);
      for (let i = 0; i < favorites.length; i++) {
        if (resultArray.id === favorites[i].exerciseId) {
          setIsFavShow(false);
          console.log(isFavShow, "is fav Show");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const addFav = async () => {
    setIsFavShow(false);

    const response = await axios.post(
      "https://linworkout-backend.onrender.com/favorites",
      {
        userId: JSON.parse(getUser()).id,
        bodyPart: details.bodyPart,
        target: details.target,
        equipment: details.equipment,
        gifUrl: details.gifUrl,
        name: details.name,
        exerciseId: details.id,
      }
    );
    console.log(response.data);
    const allFav = await axios.get(
      `https://linworkout-backend.onrender.com/user/${
        JSON.parse(getUser()).id
      }?_embed=favorites`
    );
    navigate("/favorites");
    dispatch(allFavorites(allFav.data.favorites));
  };
  return (
    <div className=" col-12 row aboutPage">
      <div className="  pt-5 mt-5 pt-5 col-12 aboutContainer">
        <h2 className=" col-12 text-center text-white pt-5   mt-5 position-absolute about">
          {details === null || details === undefined ? (
            <h1 className=" m-5 p-5 text-white">Loading</h1>
          ) : (
            details.name?.toUpperCase()
          )}
        </h2>
      </div>
      {details === null || details === undefined ? (
        <h1 className=" m-5 p-5 text-center text-white">Loading</h1>
      ) : (
        <div className=" col-12 row">
          {isFavShow && (
            <div className=" offset-1 mt-4">
              <div className=" favBtn " onClick={addFav}>
                <FaHeart className=" fs-4 text-white" />
              </div>
            </div>
          )}
          <div className=" col-12 row">
            <div className="  col-md-5 col-10 offset-1   girUrlContainer">
              <img className=" mt-3 col-12" src={details.gifUrl} alt="" />
            </div>

            <div className=" mt-md-1 mt-5 text-white col-md-5 col-10 offset-1 offset-md-0">
              <div className=" ms-4">
                <h4> {details.name?.toUpperCase()}</h4>
                <div className=" mt-4 text-white-50">
                  {details.instructions}
                </div>
                <h4 className=" mt-4"> Target - {details.target}</h4>
                <div className=" d-flex mt-4">
                  {details.equipment !== undefined && (
                    <img
                      src={require(`../assets/${details.equipment}.jpg`)}
                      alt=""
                      className=" text-white bodyPartImg"
                    />
                  )}
                  <div className=" d-flex align-items-center text-white ms-2">
                    <h5 className="">{details.equipment?.toUpperCase()}</h5>
                  </div>
                </div>
                <div className=" d-flex mt-4">
                  {details.bodyPart !== undefined && (
                    <img
                      src={require(`../assets/bodyParts/${details.bodyPart}.png`)}
                      alt=""
                      className=" text-white bg-white bodyPartImg"
                    />
                  )}
                  <div className=" d-flex align-items-center text-white ms-2">
                    <h5 className="">{details.bodyPart?.toUpperCase()}</h5>
                  </div>
                </div>
                <h6 className=" mt-4">
                  Secondary Muscles -{" "}
                  {details.secondaryMuscles?.map((ob) => ` ,${ob} `)}
                </h6>
              </div>
            </div>
          </div>
          <div className="  my-5">
            <h4 className="ms-5 mt-5 aboutLin">
              Watch 3-4 Videos of {details?.name} exercise
            </h4>
            <div className=" offset-md-0 offset-1 videoContainer row">
              {videos?.slice(0, 4).map((v, index) => (
                <VideoBox data={v} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ExerciseInfo;
