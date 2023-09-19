import axios from "axios";
import {
 
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
 
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
 
} from "../Actiontype";
import { toast } from "react-hot-toast";


export const userSignupRequest = () => ({
  type: USER_SIGNUP_REQUEST,
});

export const userSignupSuccess = (user) => ({
  type: USER_SIGNUP_SUCCESS,
  payload: user,
});

export const userSignupFailure = (error) => ({
  type: USER_SIGNUP_FAILURE,
  payload: error,
});




export const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

export const userLoginSuccess = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
});

export const userLoginFailure = (error) => ({
  type: USER_LOGIN_FAILURE,
  payload: error,
});




export const userLogoutSuccess = () => ({
  type: USER_LOGOUT,
});

export const userSignup = (name, email, password) => {
  return (dispatch) => {
    dispatch(userSignupRequest());

    return axios
      .post("https://attryb-buyc.onrender.com/dealer/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        const user = res.data.User;
        dispatch(userSignupSuccess(user));
      })
      .catch((error) => {
        dispatch(userSignupFailure(error.message));
      });
  };
};



export const userLogin = (email, password) => {
  return (dispatch) => {
    dispatch(userLoginRequest());

    return axios
      .post("https://attryb-buyc.onrender.com/dealer/login", {
        email,
        password,
      })
      .then((res) => {
        const user = res.data.user;
        const token = res.data.token;

        dispatch(userLoginSuccess(user));
        localStorage.setItem("dealertoken", token);
      }).then(()=>{
        toast.success("User Login successfully !", {
          style: {
            borderRadius: "50px",
            background: "#000428",
            color: "#ffffff",
            padding: "1rem 1.5rem",
            fontWeight: "600",
          },
        });
        // navigate(location.state === null ? "/" : location.state, {
        //   replace: true,
        // });
      })
      .catch((error) => {
        dispatch(userLoginFailure(error.message));
        toast.error(error.response.data.error, {
          style: {
            borderRadius: "50px",
            background: "#000428",
            color: "#ffffff",
            padding: "1rem 1.5rem",
            fontWeight: "600",
          },
        });
      });
  };
};


export const userLogout = () => {
  return (dispatch) => {
    dispatch(userLogoutSuccess());
    localStorage.removeItem("dealertoken");
    toast.success("User Logout successfully !", {
      style: {
        borderRadius: "50px",
        background: "#000428",
        color: "#ffffff",
        padding: "1rem 1.5rem",
        fontWeight: "600",
      },
    });
  };
};


