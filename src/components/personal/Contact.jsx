import React from "react";

const Contact = () => {
  return (
    <div
      id="contact"
      className="bg-dark-blue text-gray-300 w-full h-screen flex items-center justify-center"
    >
      <div className="max-w-lg w-full px-6 text-center">
        {/* Title */}
        <h2
          className="text-5xl font-bold text-blue-500 pb-4 border-b-4 border-blue-900"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          Get in Touch
        </h2>
        <p className="text-gray-400 text-lg mt-4">
          Feel free to reach out for collaborations or just a friendly chat!
        </p>

        {/* Form */}
        <form
          action="https://getform.io/f/5dfcabdf-425e-43cc-b9ea-b1dab1e28778"
          method="POST"
          className="mt-8 space-y-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-4 bg-gray-800 text-white rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-4 bg-gray-800 text-white rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            className="w-full p-4 bg-gray-800 text-white rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 font-medium text-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
