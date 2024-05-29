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
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [level, setLevel] = useState("");
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const caluculate = async () => {
    setIsError(false);
    if (
      height === "" ||
      weight === "" ||
      age === "" ||
      gender === "" ||
      level === ""
    ) {
      setIsError(true);
      return;
    }
    const params = {
      height,
      weight,
      age,
      gender,
      activitylevel: level,
    };
    console.log(params);
    try {
      const result = await getFood("dailycalorie", params);
      setData(result.data);
      console.log(data);
      console.log(data.goals["Extreme weight gain"]["calory"]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="  row col-12 col-md-10 offset-md-1  offset-0 calculateContainer">
        <div className=" col-md-2 my-3 offset-md-0 col-5 offset-1">
          {" "}
          <input
            onChange={(e) => {
              if (e.target.value > 80 || e.target.value < 0) {
                setAge(25);
                return;
              }
              setAge(e.target.value);
            }}
            type="number"
            placeholder=" Enter Your Age"
            className=" ms-2 form-control"
          />
        </div>
        <div className=" col-md-2 my-3 offset-md-0 col-5 offset-1">
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
        <div className=" col-md-2 my-3 offset-md-0 col-5 offset-1">
          {" "}
          <input
            onChange={(e) => {
              if (
                e.target.value < 40 ||
                e.target.value > 160 ||
                e.target.value < 0
              ) {
                setWeight(70);
                return;
              }
              setWeight(e.target.value);
            }}
            type="number"
            className=" ms-2 form-control"
            placeholder="Enter Your Weight"
          />
        </div>
        <div className=" col-md-2 my-3 offset-md-0 col-5 offset-1">
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
        <div className=" col-md-2 my-3 offset-md-0 col-5 offset-1">
          {" "}
          <select
            onChange={(e) => {
              setLevel(`level_${e.target.value}`);
            }}
            className=" ms-2 form-control"
            id=""
          >
            <option value="">Choose an Activity</option>
            {activityLevel.map((item, index) => (
              <option value={index + 1}>{item}</option>
            ))}
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
              <div className="border-end-1 text-center mt-2 d-flex align-items-center justify-content-center  border-end col-4">
                {" "}
                <div className=" text-center">
                  <h2 className=" mt-1 ms-2 aboutLin">BMR</h2>
                  <h3 className=" ms-2">{data.BMR}</h3>
                </div>
              </div>
              <div className="  col-8">
                <div className="  col-12 row">
                  <div className="mt-2  text-center col-md-3 col-6">
                    <div className=" fw-bold fs-6 ms-2 aboutLin">MWG</div>
                    <div className=" ms-2">{data.goals["maintain weight"]}</div>
                  </div>
                  <div className="mt-2  text-center col-md-3 col-6">
                    <h6 className=" fs-6 ms-2 aboutLin">EWG</h6>
                    <div className=" ms-2">
                      {data.goals["Extreme weight gain"]["calory"]}
                    </div>
                  </div>
                  <div className="mt-2  text-center col-md-3 col-6">
                    <h6 className=" fs-6 ms-2 aboutLin">EML</h6>
                    <div className=" ms-2">
                      {data.goals["Extreme weight loss"]["calory"]}
                    </div>
                  </div>
                  <div className="mt-2  text-center col-md-3 col-6">
                    <h6 className="fs-6 ms-2 aboutLin">MWR</h6>
                    <div className=" ms-2">
                      {data.goals["Mild weight gain"]["calory"]}
                    </div>
                  </div>
                </div>
                <div className=" my-3  col-12 row">
                  <div className="fs-6 mt-2 text-center col-md-3 col-6">
                    <h6 className="fs-6 ms-2 aboutLin">MWL</h6>
                    <div className=" ms-2">
                      {data.goals["Mild weight loss"]["calory"]}
                    </div>
                  </div>
                  <div className=" mt-2  text-center col-md-3 col-6">
                    <h6 className="fs-6 ms-2 aboutLin">WG</h6>
                    <div className=" ms-2">
                      {data.goals["Weight gain"]["calory"]}
                    </div>
                  </div>
                  <div className="mt-2  text-center col-md-3 col-6">
                    <h6 className="fs-6 ms-2 aboutLin">WL</h6>
                    <div className=" ms-2">
                      {data.goals["Weight loss"]["calory"]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DailyCalorie;
