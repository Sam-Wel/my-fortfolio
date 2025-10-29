import React from "react";

const About = () => {
  return (
    <div
      id="about"
      className="w-full min-h-screen bg-dark-blue text-gray-300 flex flex-col justify-center items-center py-12"
    >
      <div className="max-w-screen-lg text-center px-8">
        <h2
          className="text-5xl font-bold text-blue-500 border-b-4 border-blue-900 pb-4"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          About
        </h2>
        <p
          className="text-lg mt-8 leading-relaxed"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
        Passionate Software Engineer who loves building scalable, 
        innovative solutions and staying up to date with the latest tech. 
        Always eager to learn, grow, and create impactful software that solves real-world problems.
        </p>
      </div>
    </div>
  );
};

export default About;
