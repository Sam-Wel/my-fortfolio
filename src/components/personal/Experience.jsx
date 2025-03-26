import React from "react";
import {
  SiTailwindcss,
  SiSpring,
  SiPython,
  SiOracle,
  SiDotnet,
  SiApachekafka,
  SiCplusplus,
} from "react-icons/si";
import { FaReact, FaAws } from "react-icons/fa";

const Experience = () => {
  const skills = [
    { id: 1, icon: <SiTailwindcss className="text-cyan-500" />, name: "Tailwind CSS" },
    { id: 2, icon: <FaReact className="text-blue-400" />, name: "React.js" },
    { id: 3, icon: <SiSpring className="text-green-400" />, name: "Spring Boot" },
    { id: 4, icon: <SiPython className="text-blue-500" />, name: "Python" },
    { id: 5, icon: <SiOracle className="text-red-500" />, name: "Oracle" },
    { id: 6, icon: <SiDotnet className="text-purple-500" />, name: ".NET" },
    { id: 7, icon: <SiApachekafka className="text-orange-400" />, name: "Kafka" },
    { id: 8, icon: <FaAws className="text-yellow-500" />, name: "AWS" },
    { id: 9, icon: <SiCplusplus className="text-blue-300" />, name: "C++" },
  ];

  return (
    <div id="experience" 
    className="bg-dark-blue text-white min-h-screen flex items-center justify-center px-8">
      <div className="max-w-6xl w-full text-center">
      <h2
          className="text-5xl font-bold text-blue-500 border-b-4 border-blue-900 pb-4"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          Experience
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-8 gap-10">
          {skills.map(({ id, icon, name }) => (
            <div
              key={id}
              className="flex flex-col items-center bg-gradient-to-b from-blue-700 to-blue-900 p-8 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
            >
              <div className="text-6xl mb-4">{icon}</div>
              <p className="text-lg font-semibold">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
