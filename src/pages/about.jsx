import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/about.css";
function About() {
  return (
    <div className=" col-12 row aboutPage">
      <div className=" Aboutcontainer">
        <div className=" pt-5 mt-5 col-12 aboutContainer">
          <h2 className=" col-12 text-center text-white   mt-5 position-absolute about">
            About Page
          </h2>
        </div>
        <div className=" col-md-10 col-12 offset-md-1 offset-0 ps-md-1 ps-2 ">
          <h3 className=" aboutLin">About Lin Work Out and Fitness</h3>
          <div className=" text-white-50">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Inventore facilis rem amet harum
            qui iste esse, quae odio laborum ad pariatur fugit dolores, ipsam,
            ullam adipisci provident nulla omnis voluptate!Lorem Lorem, ipsum
            dolor sit amet consectetur adipisicing elit. Inventore facilis rem
            amet harum qui iste esse, quae odio laborum ad pariatur fugit
            dolores, ipsam, ullam adipisci provident nulla omnis voluptate!Lorem
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore
            facilis rem amet harum qui iste esse, quae odio laborum ad pariatur
            fugit dolores, ipsam, ullam adipisci provident nulla omnis
            voluptate!Lorem Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Inventore facilis rem amet harum qui iste esse, quae odio
            laborum ad pariatur fugit dolores, ipsam, ullam adipisci provident
            nulla omnis voluptate!Lorem Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Inventore facilis rem amet harum qui iste esse,
            quae odio laborum ad pariatur fugit dolores, ipsam, ullam adipisci
            provident nulla omnis voluptate!Lorem Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Inventore facilis rem amet harum qui
            iste esse, quae odio laborum ad pariatur fugit dolores, ipsam, ullam
            adipisci provident nulla omnis voluptate!Lorem
          </div>
        </div>
        <div className="my-5 pt-5 col-md-10 col-12 offset-md-1 offset-0 ps-md-1 ps-2">
          <h2 className=" aboutLin ">Our Most Experienced </h2>
          <h2 className=" aboutLin">Trainers</h2>
          <div className="   coachSection ">
            <div className=" mt-3 shadow-sm ms-3 coachTrainer">
              <img
                src={`https://preview.colorlib.com/theme/fitnessclub/assets/img/gallery/team1.png`}
                alt="dsa"
                className="  coachImg w-100"
              />
              <div className=" coachText">
                <h5 className=" aboutLin fw-light text-center ">
                  {" "}
                  Creative Director
                </h5>
                <h4 className=" aboutLin">Dave LIn</h4>
              </div>
            </div>
            <div className=" mt-3 shadow-sm ms-3 coachTrainer">
              <img
                src={`https://preview.colorlib.com/theme/fitnessclub/assets/img/gallery/team2.png`}
                alt="dsa"
                className="  coachImg w-100"
              />
              <div className=" coachText">
                <h5 className=" aboutLin fw-light text-center ">
                  {" "}
                  Creative Director
                </h5>
                <h4 className=" aboutLin">Dave LIn</h4>
              </div>
            </div>
            <div className=" mt-3 ms-3 coachTrainer">
              <img
                src={`https://preview.colorlib.com/theme/fitnessclub/assets/img/gallery/team3.png`}
                alt=""
                className=" coachImg w-100"
              />
              <div className=" coachText">
                <h5 className="  aboutLin fw-light text-center ">
                  {" "}
                  Creative Director
                </h5>
                <h4 className=" aboutLin ">Dave LIn</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
