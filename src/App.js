import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Portfolio from "./components/Portfolio";
import SocialLinks from "./components/SocialLinks";

function App() {
  return (
    <div className="">
      <div className="">
      <NavBar />
      </div>
      <div className="">
      <Home />
      </div>
      <div className="">
      <About />
      </div>
      <div>
      <Portfolio />
      </div>
      <div>
      <Experience />
      </div>
      <div>
      <Contact />
      </div>
      <div>
      <SocialLinks />
      </div>
    </div>
  );
}

export default App;
