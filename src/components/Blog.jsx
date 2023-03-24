import React from "react";

const Blog = () => {
  const techs = [
    {
      id: 1,
      src: "html",
      title: "HTML",
      content:"HTML, or Hypertext Markup Language, is the standard markup language used to create web pages. It consists of a set of elements that define the structure and content of a web page. HTML elements are represented by tags, which are enclosed in angle brackets, and can have attributes that provide additional information about the element. HTML documents are usually structured as a hierarchy of nested elements, with the root element being the <html> element. Some of the most commonly used HTML elements include headings, paragraphs, lists, links, images, and forms. HTML provides a flexible and powerful way to structure and present content on the web, and is essential for creating modern, interactive web applications.",
      style: "shadow-orange-500",
      size:"w-20 mx-auto",
    },
    {
      id: 2,
      src: "tailwind",
      title: "Tailwind",
      content:"Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined classes that can be used to style HTML elements. It enables developers to rapidly build responsive and highly customized user interfaces, without having to write custom CSS. Tailwind CSS classes are highly modular and can be combined in various ways to create complex layouts and design patterns. The framework also includes a range of built-in utility classes for common tasks like typography, spacing, and color management. Additionally, Tailwind CSS can be configured and extended to meet the specific needs of a project. It has gained popularity among developers for its ability to speed up the development process, reduce code bloat, and make it easier to maintain consistent styles across a large codebase.",
      style: "shadow-cyan-600",
      size:"w-20 mx-auto",
    },
    {
      id: 3,
      src: "reactImage",
      title: "React",
      content:"React is a popular JavaScript library for building user interfaces. It was created by Facebook and is now widely used by developers around the world. React is based on the concept of components, which are small, self-contained pieces of code that can be reused across an application. Each component is responsible for rendering a specific part of the user interface and can be composed together to create complex UIs. React uses a virtual DOM, which is a lightweight representation of the actual DOM, to optimize rendering performance and minimize the number of changes that need to be made to the DOM. React also supports a declarative programming style, where developers describe what they want the UI to look like, and React takes care of updating the UI as needed. React is often used in combination with other technologies like Redux, React Router, and Next.js to build full-stack web applications.",
      style: "shadow-cyan-500",
      size:"w-20 mx-auto",
    },
    {
      id: 4,
      src: "NET",
      title: ".NET",
      content:".NET is a free, open-source, cross-platform framework for building various types of applications, including web, desktop, mobile, gaming, and IoT. It was created by Microsoft and is widely used by developers around the world. .NET includes a range of programming languages, such as C#, F#, and Visual Basic, and provides a rich set of libraries and tools for developing applications in a variety of domains. .NET is highly modular, enabling developers to use only the parts of the framework that are required for their application. It also supports a wide range of platforms and deployment scenarios, including Windows, Linux, macOS, and Docker. Additionally, .NET provides strong support for modern development practices like cloud computing, microservices architecture, and DevOps. With the introduction of .NET Core, the framework has become even more versatile and lightweight, making it an ideal choice for building modern, scalable, and high-performance applications.",
      style: "shadow-purple-400",
      size:"w-20 mx-auto",
    },
    {
      id: 5,
      src: "Spring",
      title: "Spring",
      content:"Spring is a popular open-source framework for building Java-based enterprise applications. It was first released in 2003 and has since become one of the most widely used frameworks for building web and enterprise applications. Spring provides a range of features and tools for developing scalable, robust, and secure applications, including dependency injection, aspect-oriented programming, data access, web services, and security. The Spring framework is modular, which means that developers can use only the parts of the framework that they need, making it highly customizable and adaptable to different types of applications. Additionally, Spring has a vibrant community of developers and contributors, which has resulted in a large ecosystem of plugins, libraries, and extensions that enhance its functionality and usability. Spring Boot, a sub-project of Spring, has become particularly popular for quickly building microservices-based applications. With its ease of use, flexibility, and extensive feature set, Spring has become a go-to choice for Java developers building enterprise applications.",
      style: "shadow-green-400",
      size:"w-20 mx-auto",
    },
  ];

  return (
    <div className="bg-black">
    <div className=" bg-black">
          <p className="text-cyan-500 text-4xl font-bold border-b-4 h-6 p-3">
          </p>
    </div>
    <div
      name="blog"
      className=" mt-8 flex items-center  bg-gradient-to-b bg-black w-full md:h-full justify-center md:items-end"
    >
      <div className="max-w-screen-lg mx-auto p-4 flex flex-col justify-center  text-white">
        <div>
          <p className="text-cyan-500 text-4xl font-bold border-b-4 border-gray-500 p-2 ">
            Blog
          </p>
          <p className="py-6 text-gray-300">I will be writting some blogs and they will be listed on these page. NOTE: this is mock blog (currently on construction)</p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-1 gap-8 text-center py-8 px-12 sm:px-0">
          {techs.map(({ id, src, title, style, size, content }) => (
            <div
              key={id}
              className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
            >
                <h1>{title}</h1>
              <p className="mt-4">{content}</p>
            </div>
  
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Blog;
