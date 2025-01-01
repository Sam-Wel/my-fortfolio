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
          I was blessed to be born in the beautiful town of Mendefera, nestled in
          the heart of Eritrea. During my formative years, I attended the
          esteemed Adi Ugri Elementary school and San Giorgio Middle School,
          where I developed a love for learning and a passion for excellence.
          <br />
          <br />
          In 2012, I embarked on a journey of discovery and growth, leaving my
          homeland to settle in Sudan. During my stay, I was blessed to meet many
          wonderful people and experience different cultures, broadening my
          worldview and enriching my life in ways I could have never imagined.
          Eventually, the call to pursue my dreams led me to the land of
          opportunities, America.
          <br />
          <br />
          After arriving in 2014, I began to carve out my path, finishing my high
          school studies at the prestigious Decatur Central High School in
          Indianapolis, Indiana. Fueled by an unquenchable thirst for knowledge
          and a fierce determination to succeed, I pursued a degree in Computer
          Science at Indiana University-Purdue University Indianapolis (IUPUI).
          After years of hard work and dedication, I graduated in December 2022,
          earning my Bachelor of Science Degree.
          <br />
          <br />
          Today, I am privileged to work as a Software Engineer at one of the
          world's largest and most respected financial institutions. As I
          continue to grow and evolve, I remain committed to pushing the
          boundaries of what is possible, using my skills and talents to make a
          meaningful difference in the world.
        </p>
      </div>
    </div>
  );
};

export default About;
