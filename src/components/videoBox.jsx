import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
//  import { FaBook } from "react-icons/fa";
const VideoBox = (props) => {
  return (
    <Link
      to={`https://www.youtube.com/watch?v=${props.data.id}`}
      className="exerciseBox  w-100 rounded-2 mt-5 mx-3   position-relative"
    >
      <div className=" w-100 h-100   gifContainer">
        <img src={props.data.thumbnail} alt="" className="  videoImg gif" />
      </div>
      <div className=" position-absolute exBoxText justify-content-end d-flex flex-column  top-0   ps-3 ">
        <div className=" textContainer">
          <div className=" ms-2 aboutLin">{props.data.title.toUpperCase()}</div>
          <div className=" ms-2 aboutLin">
            Uploaded by {props.data.uploaded}
          </div>
          <div className=" ms-2 aboutLin">
            {" "}
            <FaEye /> -{props.data.views}
            {/* <FaBook /> */}
          </div>
          <div className=" ms-2 aboutLin">
            Time- {props.data.durationString} min
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoBox;
