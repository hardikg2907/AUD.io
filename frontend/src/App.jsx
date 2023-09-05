import { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Layout from "./Layout";

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
      <Layout>
        <Routes>
          <Route
            exact
            path="/"
            element={!user ? <Home /> : <Navigate to="/permissions" />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
