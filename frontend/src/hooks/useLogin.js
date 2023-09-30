import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post("auth/login", {
      email,
      password,
    });
    const json = await response.data;
    console.log(json);
    // setError(json.error);
    // if (!response.ok) {
    //   setIsLoading(false);
    //   setError(json.error);
    //   setTimeout(() => {
    //     setError(null);
    //   }, 2000);
    // }
    localStorage.setItem("profile", JSON.stringify(json));
    // save the user to local storage
    // localStorage.setItem(
    //   "profile",
    //   JSON.stringify({ email: "hardikg2907@gmail.com" })
    // );
    // navigate("/home");

    // update the auth context
    dispatch({ type: "LOGIN", payload: json });

    setIsLoading(false);
    return true;
    // }
  };

  return { login, isLoading, error };
};
export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const register = async ({ email, password, username }) => {
    setIsLoading(true);
    setError(null);

    const response = await axios.post("auth/register", {
      email,
      password,
      username,
    });
    const json = await response.data;
    console.log(json);
    // setError(json.error);
    // if (!response.ok) {
    //   setIsLoading(false);
    //   setError(json.error);
    //   setTimeout(() => {
    //     setError(null);
    //   }, 2000);
    // }
    localStorage.setItem("profile", JSON.stringify(json));
    // save the user to local storage
    // localStorage.setItem(
    //   "profile",
    //   JSON.stringify({ email: "hardikg2907@gmail.com" })
    // );
    // navigate("/home");

    // update the auth context
    dispatch({ type: "LOGIN", payload: json });

    setIsLoading(false);
    return true;
    // }
  };

  return { register, isLoading, error };
};
