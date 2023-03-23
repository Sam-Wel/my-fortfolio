import React, { useState } from "react";
import { FaBars, FaTimes, FaLinkedin, FaGithub, FaFacebook, FaTwitter, FaInstagram} from "react-icons/fa";
import { Link } from "react-scroll";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "home",
    },
    {
      id: 2,
      link: "about",
    },
    {
      id: 3,
      link: "blog",
    },
    {
      id: 4,
      link: "experience",
    },
    {
      id: 5,
      link: "contact",
    },
  ];

  const socials = [
    {
      id: 1,
      child: (
        <>
        <FaLinkedin size={25} />
        </>
      ),
      href: "https://www.linkedin.com/in/samuel-fessehaye/",
      style: "rounded-tr-md",
      disc: "LinkedIn",
    },
    {
      id: 2,
      child: (
        <>
        <FaGithub size={25} />
        </>
      ),
      href: "https://github.com/Sam-Wel",
      disc: "GitHub",
    },
    {
      id: 3,
      child: (
        <>
        <HiOutlineMail size={25} />
        </>
      ),
      href: "mailto:samuel.fessehaye477@gmail.com",
      disc: "Email",
    },
    {
      id: 4,
      child: (
        <>
        <BsFillPersonLinesFill size={25} />
        </>
      ),
      href: "/FESSEHAYE, SAMUEL_RESUME_Updated.pdf",
      style: "rounded-br-md",
      download: true,
      disc: "Resume",
    },
    {
      id: 5,
      child: (
        <>
        <FaInstagram size={25} />
        </>
      ),
      href: "https://www.instagram.com/sam_wel__/",
      style: "rounded-br-md",
      disc: "Instagram",
    },
    {
      id: 6,
      child: (
        <>
        <FaFacebook size={25} />
        </>
      ),
      href: "https://www.facebook.com/profile.php?id=100008395952926",
      style: "rounded-br-md",
      disc: "Facebook",
    },
    {
      id: 7,
      child: (
        <>
        <FaTwitter size={25} />
        </>
      ),
      href: "https://twitter.com/SamuelWeldemic5",
      style: "rounded-br-md",
      disc: "Twitter",
    },
  ];


  return (
    <div className="flex justify-between uppercase items-center w-full h-20 px-4 text-white bg-black fixed">
      <div className="">
        <ul className="hidden md:flex">
          {links.map(({ id,link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer font-signature text-gray-500 hover:scale-110 duration-200 hover:text-white"
            >
              <Link to={link} smooth duration={500}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="justify-start">
      <Link to="home">
        <h1 className=" text-white text-3xl ml-5 font-extrabold font-signature">SAMUEL FESSEHAYE</h1>
      </Link>
      </div>
      <div className="justify-center">
        <ul className="hidden md:flex">
          {socials.map(({ id, href, child, download }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-110 duration-200 hover:text-white"
            >
            <a
              href={href}
              className="flex justify-between items-center w-full"
              download={download}
              target="_blank"
              rel="noreferrer"
            >
              {child}
            </a>
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-white md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="overflow-y-scroll flex flex-col items-center lowercase absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-white">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link
                onClick={() => setNav(!nav)}
                to={link}
                smooth
                duration={500}
              >
                {link}
              </Link>
            </li>
          ))}
          {socials.map(({ id, disc, href,download }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize py-6 text-4xl"
          >
          
          <a
              href={href}
              target='_blank'
              rel="noreferrer"
              download={download}
            >
              {disc}
            </a>
          </li>
        ))}
        </ul>
      )}
    </div>
  );
};

export default NavBar;
