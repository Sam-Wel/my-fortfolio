import React from "react";
import HeroImage from "../assets/heroImage.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div
      name="home"
      className="flex items-end h-screen w-full bg-black justify-center md:items-center"
    >
      <div className="flex flex-col items-center px-4 m-6 md:flex-row justify-center w-full md:w-1/2">
        <div className="flex-col justify-center w-1/2">
          <h2 className="text-4xl font-bold text-cyan-500 text-#8DD9BF">
            I'm a Full Stack Developer
          </h2>
          <p className="text-white py-4 max-w-md">
          I earned my B.S. degree in Computer Science and a Minor in Mathematics from IUPUI. Currently, focused on building a career in SWE and AI/ML. 
          </p>

          <div>
            <Link
              to="portfolio"
              smooth
              duration={500}
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-cyan-700 cursor-pointer"
            >
              Portfolio
              <span className="group-hover:rotate-90 duration-300">
                <MdOutlineKeyboardArrowRight size={25} className="ml-1" />
              </span>
            </Link>
          </div>
        </div>

        <div className=" w-full md:w-1/2">
          <img
            src={HeroImage}
            alt="my profile"
            className="rounded-2xl mx-auto w-2/4 md:w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
