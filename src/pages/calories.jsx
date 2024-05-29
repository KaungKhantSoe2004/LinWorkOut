import { useEffect, useRef, useState } from "react";
// import { getFood } from "../assets/ApiCall/caluculateCaloriesApi";
import Bmi from "../components/bmi";
import DailyCalorie from "../components/dailyCalorie";
import IdealWeight from "../components/idealWeight";
import { getFoodCalory } from "../assets/ApiCall/dietaGramApi";
import { FaSearch } from "react-icons/fa";

function Calories() {
  // ref
  const searchRef = useRef();

  const data = [
    { name: "Potatoes", caloric: "76", carbon: "4.5", protein: "2" },
    { name: "Potatoes", caloric: "76", carbon: "4.5", protein: "2" },
    { name: "Potatoes", caloric: "76", carbon: "4.5", protein: "2" },
    { name: "Potatoes", caloric: "76", carbon: "4.5", protein: "2" },
    { name: "Potatoes", caloric: "76", carbon: "4.5", protein: "2" },
    { name: "Potatoes", caloric: "76", carbon: "4.5", protein: "2" },
  ];

  // usestate
  const [dishes, setDishes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchKey, setSearchKey] = useState("potato");
  const [render, setRender] = useState(true);
  // getInitiate Calories

  const dataChange = async () => {
    const response = await getFoodCalory(searchKey);
    setDishes(response.dishes);
    setTimeout(() => {
      setIsSearch(false);
    }, 200);
  };

  // search Function
  const search = async () => {
    setIsSearch(true);

    setSearchKey(searchRef.current.value);
    if (searchKey === "") {
      return;
    }
    setRender(!render);
  };

  // useEffect
  useEffect(() => {
    dataChange();
  }, [render]);
  return (
    <div className=" col-12 row aboutPage">
      <div className=" pt-5 mt-5 col-12 aboutContainer">
        <div className=" mt-5 pt-5">
          <h2 className="  mt-5 col-12 text-center text-white  mt-5 position-absolute about">
            Food Calories and BMC Calculator Page
          </h2>
        </div>
      </div>

      <div className=" my-4">
        <h4 className=" text-center aboutLin">Search Foods for Calories</h4>
        <div className=" container">
          <div className=" col-12 row">
            <div className=" my-4  offset-md-3 offset-2 col-7  col-md-5 ">
              <input
                type="text"
                className=" col-12 form-control"
                placeholder=" Search Food"
                ref={searchRef}
              />
            </div>

            <div className="my-4 col-1">
              <button
                onClick={search}
                className=" btn pt-1  bg-white  border-0 rounded-1"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="ansContainer mt-4">
            {searchKey !== "" && (
              <h5 className=" ms-4 aboutLin ">Search Key - {searchKey}</h5>
            )}
            {dishes?.length === 0 && (
              <h4 className=" text-center my-4 text-danger">No Data</h4>
            )}
            {isSearch ? (
              <h6 className=" text-center text-danger">Loading</h6>
            ) : (
              <div>
                {dishes?.map((item, index) => (
                  <div className=" ms-3 p-3 mb-3 foodCalorieLine border-white ">
                    <h5 className=" text-white">{item.name}</h5>
                    <div className=" text-white-50">
                      {item.caloric} calories | {item.carbon} carbon |{" "}
                      {item.protein} proteins
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className=" container">
        <h3 className=" aboutLin my-4 ms-5">Daily Calory Requirements</h3>
        <DailyCalorie />
        <h3 className=" aboutLin my-4 ms-5">Ideal Weight </h3>
        <IdealWeight />

        <h3 className=" aboutLin my-4 ms-5">BMI Calculator</h3>
        <Bmi />
      </div>
    </div>
  );
}
export default Calories;
