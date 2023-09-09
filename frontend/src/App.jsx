import { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Layout from "./Layout";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from './components/PrivateRoute'

const fallbackPath = "/login";
const App = () => {
  const { user } = useAuthContext();

  // useEffect(()=>{
  //   if(user)
  // },[user])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {!user && (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<LandingPage />} />
          </>
        )}

        {/* Protected Routes */}
        {user && (
          <PrivateRoute
            path="/home"
            element={<Home />}
            authenticated={user}
            fallbackPath={fallbackPath}
          />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
