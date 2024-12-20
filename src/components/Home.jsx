import React from "react";
import profile from "../assets/profile1.png";
import Contact from "./Contact";
import Experience from "./Experience";
import About from "./About";

const Home = () => {
  return (
    <div>
    <div
      id="home"
      className="flex items-end h-screen w-full     bg-dark-blue text-blue-500  justify-center md:items-center"
    >
      <div className="flex flex-col items-center px-4 m-6 md:flex-row justify-center w-full md:w-1/2">
        <div className="flex-col justify-center w-1/2">
          <h2 className="text-4xl font-bold text-white ">
            I'm a Full Stack Developer
          </h2>
          <p className="text-gray-300 py-4 max-w-md">
          I earned my B.S. degree in Computer Science and a Minor in Mathematics from IUPUI. Currently, focused on building a career in SWE and AI/ML. 
          </p>

          <div>
            <a
              href="/FESSEHAYE, SAMUEL_RESUME_Updated.pdf"
              smooth
              duration={500}
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r bg-blue-500 cursor-pointer hover:bg-blue-800"
            >
              RESUME
            </a>
          </div>
        </div>

        <div className=" w-full md:w-1/2">
          <img
            src={profile}
            alt="my profile"
            className="rounded-2xl mx-auto w-2/4 md:w-full"
          />
        </div>
      </div>
    </div>
    <About/>
    <Experience/>
    <Contact/>
    </div>
  );
};

export default Home;
