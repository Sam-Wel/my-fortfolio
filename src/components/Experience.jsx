import React from "react";

import html from "../assets/html.png";
import javascript from "../assets/javascript.png";
import reactImage from "../assets/react.png";
import NET from "../assets/NET.png";
import Spring from "../assets/Spring.png";
import tailwind from "../assets/tailwind.png";
import cpp from "../assets/cpp.png";
import python from "../assets/python.png";
import oracle from "../assets/oracle.png";
import cassandra from "../assets/cassandra.png";
import kafka from "../assets/kafka.png";

const Experience = () => {
  const techs = [
    {
      id: 1,
      src: html,
      title: "HTML",
      style: "shadow-orange-500",
      size:"w-20 mx-auto",
    },
    {
      id: 2,
      src: tailwind,
      title: "Tailwind",
      style: "shadow-cyan-600",
      size:"w-20 mx-auto",
    },
    {
      id: 3,
      src: reactImage,
      title: "React",
      style: "shadow-cyan-500",
      size:"w-20 mx-auto",
    },
    {
      id: 4,
      src: NET,
      title: ".NET",
      style: "shadow-purple-400",
      size:"w-20 mx-auto",
    },
    {
      id: 5,
      src: Spring,
      title: "Spring",
      style: "shadow-green-400",
      size:"w-20 mx-auto h-20",
    },
    {
      id: 6,
      src: javascript,
      title: "JavaScript",
      style: "shadow-yellow-500",
      size:"w-20 mx-auto",
    },
    {
      id: 7,
      src: cpp,
      title: "C++",
      style: "shadow-black",
      size:"w-20 mx-auto",
    },
    {
      id: 9,
      src: python,
      title: "Python",
      style: "shadow-black",
      size:"w-20 mx-auto",
    },
    {
      id: 10,
      src: oracle,
      title: "Oracle",
      style: "shadow-black",
      size:"w-20 mx-auto",
    },
    {
      id: 11,
      src: cassandra,
      title: "Cassandra",
      style: "shadow-black",
      size:"w-20 mx-auto",
    },
    {
      id: 12,
      src: kafka,
      title: "Kafka",
      style: "shadow-black",
      size:"w-20 mx-auto",
    },
  ];

  return (
    <div
      name="experience"
      className="bg-gradient-to-b text-center bg-dark-blue w-full md:h-screen"
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
        <div>
          <p className="text-blue-500 text-4xl font-bold border-b-4 border-blue-900 p-2 inline">
            Experience
          </p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-8 text-center py-8 px-12 sm:px-0">
          {techs.map(({ id, src, title, style, size }) => (
            <div
              key={id}
              className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
            >
              <img src={src} alt="" className={`${size}`} />
              <p className="mt-4">{title}</p>
            </div>
  
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
