import { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Layout from "./Layout";
import './App.css'

const App = () => {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      {user && (
        <div>
          <div className="userProfileName">
            <h4>{user.email}</h4>
          </div>
        </div>
      )}
      {!user && <Routes>
        <Route
          exact
          path="/signup"
          element={<SignUp />}
        />
        <Route
          exact
          path="/login"
          element={<Login />}
        />
      </Routes>}
      {user && <Layout></Layout>}
    </BrowserRouter>
  );
};

export default App;
