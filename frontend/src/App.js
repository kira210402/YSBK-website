import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import { Book } from "./pages/Book";
import { LeaderBoard } from "./pages/LeaderBoard";
import { Activities } from "./pages/Activities";
import { User } from "./pages/User";
import { NoMatch } from "./pages/NoMatch";
import axios from "axios";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      // const url = `${process.env.SERVER_URL}/auth/login/success`;
      const url = "http://localhost:8000/auth/google/callback";
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={user ? <HomePage user={user} /> : <Navigate to="/login" />} />
        <Route path="/books" element={user ? <Book /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={user ? <LeaderBoard /> : <Navigate to="/login" />} />
        <Route path="/activities" element={user ? <Activities /> : <Navigate to="/login" />} />
        <Route path="/users" element={user ? <User /> : <Navigate to="/login" />} />
        <Route path="*" element={user ? <NoMatch /> : <Navigate to="/login" />} />
      </Routes >
    </>
  );
}

export default App;
