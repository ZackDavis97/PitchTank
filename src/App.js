import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/common/Header";
import Home from "./pages/Home";
import Liked from "./pages/Liked";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  const [activeDarkMode, setActiveDarkMode] = useState(false);

  return (
    <div>
      <Header setActive={setActiveDarkMode} active={activeDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/liked"
          element={
            <PrivateRoute>
              <Liked />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;