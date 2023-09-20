import * as types from '../Actiontype';

const initialState = {
  inventory: [],
  dealerInventory: [],
  error: null,
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        inventory: action.payload,
        error: null,
      };

    case types.FETCH_INVENTORY_FAILURE:
      return {
        ...state,
        inventory: [],
        error: action.payload,
      };

    case types.FETCH_DEALER_INVENTORY_SUCCESS:
      return {
        ...state,
        dealerInventory: action.payload,
        error: null,
      };

    case types.FETCH_DEALER_INVENTORY_FAILURE:
      return {
        ...state,
        dealerInventory: [],
        error: action.payload,
      };

    case types.CREATE_INVENTORY_SUCCESS:
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
        error: null,
      };

    case types.CREATE_INVENTORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case types.DELETE_INVENTORY_SUCCESS:
      return {
        ...state,
        inventory: state.inventory.filter((item) => item._id !== action.payload),
        error: null,
      };

    case types.DELETE_INVENTORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case types.UPDATE_INVENTORY_SUCCESS:
      return {
        ...state,
        inventory: state.inventory.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        error: null,
      };

    case types.UPDATE_INVENTORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

