import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("profile");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
