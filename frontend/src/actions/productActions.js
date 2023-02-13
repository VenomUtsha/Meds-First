import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstant.js";

//all products
export const getProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/v1/products");

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({ 
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

//only a product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    //let id = "6285f93f4a0b26d41604fe7f"; 
    const { data } = await axios.get(`/api/v1/product/${id}`);
    
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (err) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
