import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExerciseBox from "../components/exerciseBox";

function Favorites() {
  const data = useSelector((state) => state.favorites);
  const [render, setRender] = useState(true);
  return (
    <div className=" col-12 row aboutPage">
      <div className=" pt-5 mt-5 col-12 aboutContainer">
        {/* <img
      src="https://c1.wallpaperflare.com/path/782/470/535/adult-barbell-body-bodybuilding-212e99ae58018ed48a35a5ce9ef066ae.jpg"
      className=" image"
      alt="d"
    /> */}
        <h2 className=" text-white col-12 text-center  my-5  position-absolute about">
          Favorites Page
        </h2>
      </div>
      {data?.length === 0 ? (
        <div className="">
          <h2 className=" p-1 aboutLin text-center">There is No Favorites</h2>
          <div className=" text-black my-5">-</div>
        </div>
      ) : (
        <div>
          <h4 className=" my-3 aboutLin text-center col-12 ">
            Total - {data?.length}
          </h4>
          <div className=" recommendedContainer">
            {data?.map((ob, index) => (
              <ExerciseBox data={ob} key={index} render={render} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Favorites;
