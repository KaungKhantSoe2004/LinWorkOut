import { useState } from "react";
import { useForm } from "react-hook-form";
import { getFood } from "../assets/ApiCall/caluculateCaloriesApi";

const DailyCalorie = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const caluculate = async () => {
    setIsError(false);
    if (height === "" || weight === "" || age === "") {
      setIsError(true);
      return;
    }
    const params = {
      height,
      weight,
      age,
    };
    console.log(params);
    try {
      const result = await getFood("bmi", params);
      setData(result.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="  row col-12 col-md-10 offset-md-2  offset-0 calculateContainer">
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
        <div className=" offset-md-2 offset-2">
          <div className=" card col-md-8 col-8   aboutLin">
            <h4 className=" card-header text-center ">Results</h4>
            <div className="  row col-12 ">
              <h5 className=" text-center col-md-12 col-10 offset-md-0 offset-1">
                BMI - {data["bmi"]}
              </h5>
              <h5 className=" text-center col-md-12 col-10 offset-md-0 offset-1">
                Health - {data["health"]}
              </h5>
              <h5 className=" text-center col-md-12 col-10 offset-md-0 offset-1">
                Healthy BMI Range - {data["healthy_bmi_range"]}
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DailyCalorie;
