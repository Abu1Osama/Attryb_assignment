import * as types from "../Actiontype";

const initialState = {
  oemSpecsList: [],
  selectedOemSpec: null,
  error: null,
};

export const oemSpecsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_OEM_SPECS_SUCCESS:
      return {
        ...state,
        oemSpecsList: action.payload,
        error: null,
      };

    case types.FETCH_OEM_SPECS_FAILURE:
      return {
        ...state,
        oemSpecsList: [],
        error: action.payload,
      };

    case types.FETCH_OEM_SPEC_SUCCESS:
      return {
        ...state,
        selectedOemSpec: action.payload,
        error: null,
      };

    case types.FETCH_OEM_SPEC_FAILURE:
      return {
        ...state,
        selectedOemSpec: null,
        error: action.payload,
      };

    case types.CREATE_OEM_SPECS_SUCCESS:
      return {
        ...state,
        oemSpecsList: [...state.oemSpecsList, action.payload],
        error: null,
      };

    case types.CREATE_OEM_SPECS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

