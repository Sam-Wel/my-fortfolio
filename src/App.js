import Home from "./components/Home";
import NavBar from "./components/personal/NavBar";
import Hobby from "./components/personal/Hobby";
import AddWordPage from "./components/dictionary/AddWordPage";
import UpdateWordPage from "./components/dictionary/UpdateWordPage";
import SearchPage from "./components/dictionary/SearchPage";
import DictionaryGame from "./components/dictionary/DictionaryGame";
import AddBlogPost from "./components/Qnie/AddBlogPost";
import BlogList from "./components/Qnie/BlogList";
import UpdateBlogPost from "./components/Qnie/UpdateBlogPost";



import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hobby" element={<Hobby />} />
            <Route path="/dictionary" element={<SearchPage />} />
            <Route path="/add-word" element={<AddWordPage />} />
            <Route path="/update-word/:id" element={<UpdateWordPage />} />
            <Route path="/game" element={<DictionaryGame />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/add-blog" element={<AddBlogPost />} />
            <Route path="/update-blog/:id" element={<UpdateBlogPost />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
