import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,

  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../constants/userConstant";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    // console.log(data)
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (name, email, password, phone, bankAccount) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });

      const config = { headers: { "content-Type": "application/json"  } };
      const { data } = await axios.post(
        `/api/v1/register`,
        { name, email, password, phone, bankAccount },
        config
      );

      // console.log(data)
      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };


  export const getUserDetails = () => async (dispatch) => {
    try {

      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/v1/me`);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };




export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
