import { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Layout from "./Layout";
import Home from "./pages/Home";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/PrivateRoute";

const fallbackPath = "/login";
const App = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <>
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to={"/home"} replace />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={"/home"} replace />}
          />
          <Route
            path="/"
            element={
              !user ? <LandingPage /> : <Navigate to={"/home"} replace />
            }
          />
        </>
        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            user ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
