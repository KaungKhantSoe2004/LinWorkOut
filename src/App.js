import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Junct from "./components/example";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";

// Pages
import NavBar from "./NavBar";
import Favorites from "./pages/Favorites";
import Home from "./pages/home";
import About from "./pages/about";
import Calories from "./pages/calories";
import ExerciseInfo from "./pages/exerciseInfo";
import Services from "./pages/services";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/Register";
import EachBodyPage from "./pages/eachBodyPart";
import EachCoursePage from "./pages/eachCourses";
import { Provider } from "react-redux";
import { store } from "./store";

const testApi = async () => {};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calories" element={<Calories />} />
            <Route path="/exerciseInfo/:id" element={<ExerciseInfo />} />
            <Route path="/bodyPart/:name" element={<EachBodyPage />} />
            <Route path="/course/:name" element={<EachCoursePage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
