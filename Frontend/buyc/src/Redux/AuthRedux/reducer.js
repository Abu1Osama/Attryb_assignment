import {
    USER_SIGNUP_FAILURE,
    USER_SIGNUP_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
  } from "../Actiontype";
  
  const initialState = {
    user: null,
    error: null,
    token: null || localStorage.getItem("dealertoken"),
    isLoading: false,
    isAuth: localStorage.getItem("dealertoken") ? true : false,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_SIGNUP_FAILURE:
      case USER_LOGIN_FAILURE:
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
  
      case USER_SIGNUP_SUCCESS:
      case USER_LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          error: null,
          isLoading: false,
          isAuth: true,
        };
  
      case USER_LOGOUT:
        return {
          ...state,
          user: null,
          error: null,
          token: null,
          isLoading: false,
          isAuth: false,
        };
  
      default:
        return state;
    }
  };
  