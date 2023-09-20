import axios from 'axios';
import * as types from '../Actiontype';

export const fetchOemSpecsSuccess = (oemSpecs) => ({
  type: types.FETCH_OEM_SPECS_SUCCESS,
  payload: oemSpecs,
});

export const fetchOemSpecsFailure = (error) => ({
  type: types.FETCH_OEM_SPECS_FAILURE,
  payload: error,
});

export const fetchOemSpecSuccess = (oemSpec) => ({
  type: types.FETCH_OEM_SPEC_SUCCESS,
  payload: oemSpec,
});

export const fetchOemSpecFailure = (error) => ({
  type: types.FETCH_OEM_SPEC_FAILURE,
  payload: error,
});

export const createOemSpecsSuccess = (oemSpecs) => ({
  type: types.CREATE_OEM_SPECS_SUCCESS,
  payload: oemSpecs,
});

export const createOemSpecsFailure = (error) => ({
  type: types.CREATE_OEM_SPECS_FAILURE,
  payload: error,
});

export const fetchAllOemSpecs = (search) => async (dispatch) => {
    try {
      let url = "https://attryb-buyc.onrender.com/oemspec";
      
      if (search) {
        url += `?search=${search}`;
      }
  
      const response = await axios.get(url, {
        headers: {
          'Authorization': `${localStorage.getItem("dealertoken")}`, 
        },
      });
      dispatch(fetchOemSpecsSuccess(response.data));
    } catch (error) {
      dispatch(fetchOemSpecsFailure(error));
      console.log(error);
    }
  };
  

export const fetchOemSpecById = (id) => async (dispatch) => {
  try {
    const response = await fetch(`https://attryb-buyc.onrender.com/oemspec/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    dispatch(fetchOemSpecSuccess(data));
  } catch (error) {
    dispatch(fetchOemSpecFailure(error));
  }
};

export const createNewOemSpecs = (oemSpecsData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/oem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(oemSpecsData),
    });
    const data = await response.json();
    dispatch(createOemSpecsSuccess(data));
  } catch (error) {
    dispatch(createOemSpecsFailure(error));
  }
};
