import { useState } from "react";
import { useForm } from "react-hook-form";
import { getFood } from "../assets/ApiCall/caluculateCaloriesApi";

const DailyCalorie = () => {
  const activityLevel = [
    "BMR",
    "Sedentary: little or no exercise",
    "Exercise 1-3 times/week",
    "Exercise 4-5 times/week",
    "Daily exercise or intense exercise 3-4 times/week",
    "Intense exercise 6-7 times/week",
    "Very intense exercise daily, or physical job",
  ];

  const [height, setHeight] = useState("");

  const [gender, setGender] = useState("");

  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const caluculate = async () => {
    setIsError(false);
    if (height === "" || gender === "") {
      setIsError(true);
      return;
    }
    const params = {
      height,
      gender,
    };
    console.log(params);
    try {
      const result = await getFood("idealweight", params);
      setData(result.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="  row col-12 col-md-10 offset-md-1  offset-0 calculateContainer">
        <div className=" col-md-5 my-3 offset-md-0 col-5 offset-1">
          {" "}
          <input
            onChange={(e) => {
              if (
                e.target.value < 130 ||
                e.target.value > 230 ||
                e.target.value < 0
              ) {
                setHeight(180);
                return;
              }
              setHeight(e.target.value);
            }}
            type="number"
            className=" ms-2 form-control"
            placeholder="Enter Your Height"
          />
        </div>

        <div className=" col-md-5 my-3 offset-md-0 col-5 offset-1">
          {" "}
          <select
            onChange={(e) => {
              setGender(e.target.value);
            }}
            className=" ms-2 form-control"
            id=""
          >
            <option value="">Choose Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className=" col-md-2 my-2 offset-md-0 offset-2 col-8 d-flex justify-content-center">
          <button
            onClick={caluculate}
            className=" mt-2 btn h-75 btn-primary p-1 rounded-1 col-8"
          >
            Check
          </button>
        </div>
      </div>
      {isError && (
        <h3 className=" text-danger text-center">Please Fill All Forms</h3>
      )}
      {data && (
        <div className=" ps-5 offset-md-2 offset-1">
          <div className=" card col-md-8 col-11   aboutLin">
            <h4 className=" card-header text-center ">Results</h4>
            <div className="  row col-12 ">
              <h5 className=" p-3 text-center col-md-6 col-10 offset-1 offset-md-0 ">
                HamWi - {data["Hamwi"]}
              </h5>
              <h5 className=" p-3 text-center col-md-6 col-10 offset-1 offset-md-0 ">
                Devine - {data["Devine"]}
              </h5>
              <h5 className=" p-3 text-center col-md-6 col-10 offset-1 offset-md-0 ">
                Miller - {data["Miller"]}
              </h5>
              <h5 className=" p-3 text-center col-md-6 col-10 offset-1 offset-md-0 ">
                Robinson - {data["Robinson"]}
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DailyCalorie;
