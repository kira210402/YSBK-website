import React from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import { Book } from "./pages/Book";
import { LeaderBoard } from "./pages/LeaderBoard";
import { Activities } from "./pages/Activities";
import { User } from "./pages/User";
import { NoMatch } from "./pages/NoMatch";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<Book />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/users" element={<User />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
