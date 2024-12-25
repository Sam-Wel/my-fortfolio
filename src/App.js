import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Hobby from "./components/Hobby";
import AddWordPage from "./components/AddWordPage";
import UpdateWordPage from "./components/UpdateWordPage";


import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/hobby" element={<Hobby/>}/>
            <Route path="/searchbar" element={<SearchPage/>}/>
            <Route path="/add-word" element={<AddWordPage />} />
            <Route path="/update-word/:id" element={<UpdateWordPage />} />;
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
