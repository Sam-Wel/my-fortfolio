import React from "react";
import profile from "../assets/profile1.png";
import About from "./About";
import Experience from "./Experience";
import Contact from "./Contact";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        id="home"
        className="flex items-center h-screen w-full bg-dark-blue text-white justify-center pt-40 md:pt-0"
      >
        <div className="flex flex-col md:flex-row items-center px-6 max-w-screen-lg space-y-8 md:space-y-0">
          {/* Text Content */}
          <div className="flex flex-col items-start w-full md:w-1/2 space-y-6">
            <h1
              className="text-6xl font-bold text-blue-500"
              style={{ fontFamily: "Great Vibes, cursive" }}
            >
              I'm a Full Stack Developer
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              I earned my B.S. degree in Computer Science and a Minor in
              Mathematics from IUPUI. Currently, I’m focused on building a
              career in Software Engineering and AI/ML, leveraging my skills to
              create impactful solutions.
            </p>
            <a
              href="/FESSEHAYE, SAMUEL_RESUME_Updated.pdf"
              download
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Download Resume
            </a>
          </div>

          {/* Profile Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={profile}
              alt="Profile"
              className="rounded-full w-2/3 md:w-3/4 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <About />
      <Experience />
      <Contact />
    </div>
  );
};

export default Home;
