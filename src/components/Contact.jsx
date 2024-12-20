import React from "react";

const Contact = () => {
  return (
    <div
      id="contact"
      className="w-full md:h-screen bg-dark-blue bg-gradient-to-b p-4 text-center text-white"
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8">
          <p className="text-blue-500 text-4xl font-bold inline border-b-4 border-blue-900">
          Get in Touch
          </p>
        </div>

        <div className=" flex justify-center items-center">
          <form
            action="https://getform.io/f/5dfcabdf-425e-43cc-b9ea-b1dab1e28778"
            method="POST"
            className=" flex flex-col w-full md:w-1/2 "
          >
            <input
              type="text"
              name="name"
              placeholder="your name"
              className="p-2 bg-transparent border-2 rounded-md bg-white text-black focus:outline-none"
            />
            <input
              type="text"
              name="email"
              placeholder="your email"
              className="my-4 p-2 bg-transparent border-2 rounded-md bg-white text-black focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="your message"
              rows="10"
              className="p-2 bg-transparent border-2 rounded-md bg-white text-black focus:outline-none"
            ></textarea>

            <button className="text-white bg-gradient-to-b  from-blue-500 to-blue-700 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
