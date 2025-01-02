import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/personal/NavBar";
import Home from "./components/Home";
import Hobby from "./components/personal/Hobby";
import AddWordPage from "./components/admin/AddWord";
import UpdateWordPage from "./components/admin/UpdateWord";
import Dictionary from "./components/BeteQnie/Dictionary";
import DictionaryGame from "./components/BeteQnie/DictionaryGame";
import AddBlogPost from "./components/admin/AddBlogPost";
import BlogList from "./components/BeteQnie/BlogList";
import UpdateBlogPost from "./components/admin/UpdateBlogPost";
import DictionaryEdit from "./components/admin/DictionaryEdit";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hobby" element={<Hobby />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/add-word" element={<AddWordPage />} />
            <Route path="/update-word/:id" element={<UpdateWordPage />} />
            <Route path="/game" element={<DictionaryGame />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/add-blog" element={<AddBlogPost />} />
            <Route path="/update-blog/:id" element={<UpdateBlogPost />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dictionaryEdit" element={<DictionaryEdit />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
