import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { allFavorites } from "../store/action/favorites";

const ExerciseBox = (props) => {
  const dispatch = useDispatch();
  const remove = async () => {
    await axios.delete(
      `https://linworkout-backend.onrender.com/favorites/${props.data.id}`
    );
    dispatch(allFavorites());
    window.location = "/favorites";
  };
  return (
    <Link
      to={`/exerciseInfo/${
        props.data.exerciseId === undefined
          ? props.data.id
          : props.data.exerciseId
      }`}
      className="exerciseBox rounded-2 mt-4 mx-5  position-relative"
    >
      <div className="  gifContainer">
        <img src={props.data.gifUrl} alt="" className=" w-100 gif" />
      </div>
      <div className=" position-absolute exBoxText justify-content-end d-flex flex-column  top-0   ps-3 ">
        <div className=" textContainer">
          <h4 className=" ms-2 aboutLin">{props.data.name?.toUpperCase()}</h4>
          <h6 className=" ms-2 aboutLin">Body Part - {props.data.bodyPart}</h6>
          <h6 className=" ms-2 aboutLin">Equipment -{props.data.equipment}</h6>
          <h6 className=" ms-2 aboutLin">Target- {props.data.target}</h6>
          <div>
            {props.render && (
              <button className=" ms-1 btn btn-dark btn-sm" onClick={remove}>
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ExerciseBox;
