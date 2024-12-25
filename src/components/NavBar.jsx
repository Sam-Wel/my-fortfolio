import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { Link, scroller } from "react-scroll";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const handleNavigation = (link) => {
    if (window.location.pathname !== "/") {
      navigate("/"); // Navigate to Home
      setTimeout(() => scrollToSection(link), 100); // Ensure DOM is ready before scrolling
    } else {
      scrollToSection(link);
    }
    setNav(false); // Close mobile menu
  };

  const scrollToSection = (link) => {
    scroller.scrollTo(link, {
      smooth: true,
      duration: 500,
      offset: -80, // Adjust for fixed navbar height
    });
  };

  const links = [
    { id: 1, label: "Home", link: "home" },
    { id: 2, label: "About", link: "about" },
    { id: 3, label: "Experience", link: "experience" },
    { id: 4, label: "Contact", link: "contact" },
    { id: 5, label: "Hobby", path: "/hobby" },
    { id: 6, label: "Dictionary", path: "/dictionary" },
    { id: 7, label: "Add Word", path: "/add-word" },
  ];

  const socials = [
    {
      id: 1,
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/in/samuel-fessehaye/",
    },
    { id: 2, icon: <FaGithub />, href: "https://github.com/Sam-Wel" },
    { id: 3, icon: <HiOutlineMail />, href: "mailto:samuel.fessehaye477@gmail.com" },
    {
      id: 4,
      icon: <BsFillPersonLinesFill />,
      href: "/FESSEHAYE, SAMUEL_RESUME_Updated.pdf",
      download: true,
    },
    { id: 5, icon: <FaInstagram />, href: "https://www.instagram.com/samuel_weldemichael/" },
    { id: 6, icon: <FaFacebook />, href: "https://www.facebook.com/profile.php?id=100008395952926" },
    { id: 7, icon: <FaTwitter />, href: "https://twitter.com/SamuelWeldemic5" },
  ];

  return (
    <div className="fixed w-full z-50 bg-[#0D112B] shadow-lg">
      {/* Desktop Navbar */}
      <div className="flex justify-between items-center h-20 px-4 text-white">
        {/* Logo */}
        <div
          onClick={() => {
            navigate("/"); // Navigate to Home page
            scrollToSection("home"); // Scroll to the "home" section
          }}
          className="text-3xl font-bold text-blue-500 cursor-pointer"
        >
          SAMUEL FESSEHAYE
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          {links.map(({ id, label, link, path }) =>
            path ? (
              <li
                key={id}
                onClick={() => navigate(path)}
                className="cursor-pointer hover:text-blue-400 transition"
              >
                {label}
              </li>
            ) : (
              <li
                key={id}
                onClick={() => handleNavigation(link)}
                className="cursor-pointer hover:text-blue-400 transition"
              >
                {label}
              </li>
            )
          )}
        </ul>

        {/* Social Links */}
        <ul className="hidden md:flex space-x-4">
          {socials.map(({ id, icon, href, download }) => (
            <li key={id}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                download={download}
                className="text-xl hover:text-blue-400 transition"
              >
                {icon}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer md:hidden text-blue-500"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {nav && (
        <div className="fixed inset-0 bg-gradient-to-b from-blue-600 to-blue-900 text-white flex flex-col items-center justify-start z-40 overflow-y-auto">
          <div className="w-full flex justify-end px-4 pt-4">
            <FaTimes
              size={30}
              className="cursor-pointer"
              onClick={() => setNav(false)}
            />
          </div>
          <ul className="flex flex-col items-center space-y-6 mt-10 text-xl">
            {links.map(({ id, label, link, path }) =>
              path ? (
                <li
                  key={id}
                  onClick={() => {
                    navigate(path);
                    setNav(false);
                  }}
                  className="cursor-pointer hover:text-blue-400 transition"
                >
                  {label}
                </li>
              ) : (
                <li
                  key={id}
                  onClick={() => handleNavigation(link)}
                  className="cursor-pointer hover:text-blue-400 transition"
                >
                  {label}
                </li>
              )
            )}
          </ul>
          <ul className="flex flex-wrap justify-center items-center mt-8 space-x-4">
            {socials.map(({ id, icon, href, download }) => (
              <li key={id}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  download={download}
                  className="text-2xl hover:text-blue-400 transition"
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
