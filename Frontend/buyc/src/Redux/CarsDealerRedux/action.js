import toast from "react-hot-toast";
import * as types from "../Actiontype";
import axios from "axios";

export const fetchInventorySuccess = (inventory) => ({
  type: types.FETCH_INVENTORY_SUCCESS,
  payload: inventory,
});

export const fetchInventoryFailure = (error) => ({
  type: types.FETCH_INVENTORY_FAILURE,
  payload: error,
});

export const fetchDealerInventorySuccess = (inventory) => ({
  type: types.FETCH_DEALER_INVENTORY_SUCCESS,
  payload: inventory,
});

export const fetchDealerInventoryFailure = (error) => ({
  type: types.FETCH_DEALER_INVENTORY_FAILURE,
  payload: error,
});

export const createInventorySuccess = (inventory) => ({
  type: types.CREATE_INVENTORY_SUCCESS,
  payload: inventory,
});

export const createInventoryFailure = (error) => ({
  type: types.CREATE_INVENTORY_FAILURE,
  payload: error,
});

export const deleteInventorySuccess = (message) => ({
  type: types.DELETE_INVENTORY_SUCCESS,
  payload: message,
});

export const deleteInventoryFailure = (error) => ({
  type: types.DELETE_INVENTORY_FAILURE,
  payload: error,
});

export const updateInventorySuccess = (inventory) => ({
  type: types.UPDATE_INVENTORY_SUCCESS,
  payload: inventory,
});

export const updateInventoryFailure = (error) => ({
  type: types.UPDATE_INVENTORY_FAILURE,
  payload: error,
});

export const fetchInventory = (search) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://attryb-buyc.onrender.com/inventory${
        search ? `?search=${search}` : ""
      }`,
      {
        headers: {
          Authorization: `${localStorage.getItem("dealertoken")}`,
        },
      }
    );

    dispatch(fetchInventorySuccess(response.data));
  } catch (error) {
    dispatch(fetchInventoryFailure(error));
  }
};

export const fetchDealerInventory = (dealer) => async (dispatch) => {
  try {
    const response = await fetch(`/api/inventory/dealer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dealer }),
    });
    const data = await response.json();
    dispatch(fetchDealerInventorySuccess(data));
  } catch (error) {
    dispatch(fetchDealerInventoryFailure(error));
  }
};

export const createInventory = (inventoryData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://attryb-buyc.onrender.com/inventory",
      inventoryData,
      {
        headers: {
          Authorization: `${localStorage.getItem("dealertoken")}`,
        },
      }
    );
    dispatch(createInventorySuccess(response.data));
  } catch (error) {
    dispatch(createInventoryFailure(error));
    console.log(error.message);
  }
};

export const deleteInventory = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://attryb-buyc.onrender.com/inventory/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem("dealertoken")}`,
      },
    });
    dispatch(deleteInventorySuccess("Inventory deleted"));
    toast.success("Deleted successfully !", {
      style: {
        borderRadius: "50px",
        background: "#000428",
        color: "#ffffff",
        padding: "1rem 1.5rem",
        fontWeight: "600",
      },
     
    });

  } catch (error) {
    dispatch(deleteInventoryFailure(error));
  }
};

export const updateInventory = (id, inventoryData) => async (dispatch) => {
  try {
    const response = await fetch(`https://attryb-buyc.onrender.com/inventory/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("dealertoken")}`,
      },
      body: JSON.stringify(inventoryData),
    });
    const data = await response.json();
    dispatch(updateInventorySuccess(data));
    toast.success("Inventory updated successfully !", {
      style: {
        borderRadius: "50px",
        background: "#000428",
        color: "#ffffff",
        padding: "1rem 1.5rem",
        fontWeight: "600",
      },
     
    });
  } catch (error) {
    dispatch(updateInventoryFailure(error));
  }
};
