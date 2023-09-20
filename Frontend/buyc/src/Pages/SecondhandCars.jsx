import React, { useEffect, useState } from "react";
import {
  createInventory,
  deleteInventory,
  fetchInventory,
  updateInventory,
} from "../Redux/CarsDealerRedux/action";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOemSpecs, fetchOemSpecById } from "../Redux/OEmRedux/action";
import "../Styles/SecondhandCars.scss";
import toast from "react-hot-toast";

function SecondhandCars() {
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const dealerid = localStorage.getItem("dealerid") || "";
  const oemSpecsListdata = useSelector(
    (store) => store.oemSpecsReducer.oemSpecsList
  );
  const oemSpecsListdatabyid = useSelector(
    (store) => store.oemSpecsReducer.oemSpecsList
  );
  const inventorydata = useSelector(
    (store) => store.inventoryReducer.inventory
  );
  const filteredInventoryData = inventorydata.filter(
    (item) => item.dealer === dealerid
  );
  const dispatch = useDispatch();
  // console.log(data2)
  const [cardDetailsOpen, setCardDetailsOpen] = useState({});
  const [formData, setFormData] = useState({
    dealer: dealerid,
    oemSpecs: "",
    image: "",
    desc: [],
    kmsOdometer: 0,
    scratches: false,
    accidents: 0,
    prevBuyers: 0,
    originalPaint: true,
    price: 0,
    regPlace: "",
  });

  useEffect(() => {
    dispatch(fetchAllOemSpecs());
    dispatch(fetchInventory());
  }, [dispatch,filteredInventoryData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = isFormValid();

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return;
    } else {
      if (editMode) {
        dispatch(updateInventory(editItemId, formData))
          .then(() => {
          
            handleCancelEdit();
          })
          .catch((error) => {
          });
      }else{
        setTimeout(() => {
          dispatch(createInventory(formData));
          toast.success("Inventory created successfully");
          setFormData({
            dealer: dealerid,
            oemSpecs: "",
            image: "",
            desc: [],
            kmsOdometer: 0,
            scratches: false,
            accidents: 0,
            prevBuyers: 0,
            originalPaint: true,
            price: 0,
            regPlace: "",
          });
        }, 3000);
      }
     
     
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "desc") {
      const newDesc = Array.isArray(newValue) ? newValue : [newValue];
      setFormData({ ...formData, desc: newDesc });
    } else {
      setFormData({ ...formData, [name]: newValue });
    }
  };
  const descValue = Array.isArray(formData.desc) ? formData.desc.join(",") : "";

  const handleOemSpecsChange = (e) => {
    setFormData({ ...formData, oemSpecs: e.target.value });
  };
  const isFormValid = () => {
    const errors = {};

    if (!formData.dealer) {
      errors.dealer = "Dealer field is required";
    } else if (!formData.oemSpecs) {
      errors.oemSpecs = "Model field is required";
    } else if (!formData.image) {
      errors.image = "Image field is required";
    } else if (formData.desc == "") {
      errors.desc = "Description field is required";
    } else if (!formData.kmsOdometer) {
      errors.kmsOdometer = "Kilometers Odometer field is required";
    } else if (!formData.accidents) {
      errors.accidents = "Number of Accidents field is required";
    } else if (!formData.prevBuyers) {
      errors.prevBuyers = "Previous Buyers field is required";
    } else if (!formData.price) {
      errors.price = "Price field is required";
    } else if (!formData.regPlace) {
      errors.regPlace = "Registration Place field is required";
    }

    return errors;
  };
  const toggleCardDetails = (cardId) => {
    setCardDetailsOpen((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };
  const handleDelete = (inventoryId) => {
    dispatch(deleteInventory(inventoryId));
    dispatch(fetchInventory());
  };

  const handleEdit = (inventoryId) => {
    const selectedItem = filteredInventoryData.find((item) => item._id === inventoryId);
    
    if (selectedItem) {
      setEditMode(true);
      setEditItemId(inventoryId);

      setFormData({
        dealer: selectedItem.dealer,
        oemSpecs: selectedItem.oemSpecs._id,
        image: selectedItem.image,
        desc: selectedItem.desc.join(","),
        kmsOdometer: selectedItem.kmsOdometer,
        scratches: selectedItem.scratches,
        accidents: selectedItem.accidents,
        prevBuyers: selectedItem.prevBuyers,
        originalPaint: selectedItem.originalPaint,
        price: selectedItem.price,
        regPlace: selectedItem.regPlace,
      });
    }
  };
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditItemId(null);

    // Clear the form fields
    setFormData({
      dealer: dealerid,
      oemSpecs: "",
      image: "",
      desc: "",
      kmsOdometer: 0,
      scratches: false,
      accidents: 0,
      prevBuyers: 0,
      originalPaint: true,
      price: 0,
      regPlace: "",
    });
  };
  return (
    <div className="SecondhandCars" id="SecondhandCars">
      <div className="formdata">
      <h1>{editMode ? "Edit Inventory" : "Inventory Data"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-child">
            <label>DealerID</label>
            <input
              type="text"
              name="dealer"
              placeholder="Dealer"
              value={formData.dealer}
              onChange={handleChange}
            />
          </div>
          <div className="form-child">
            <label>Model</label>
            <select
              name="oemSpecs"
              value={formData.oemSpecs}
              onChange={handleOemSpecsChange}
            >
              <option value="">Select OEM Specs</option>
              {oemSpecsListdata?.map((oemSpecs) => (
                <option key={oemSpecs._id} value={oemSpecs._id}>
                  {oemSpecs.company}
                </option>
              ))}
            </select>
          </div>
          <div className="form-child">
            <label>Image Url</label>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="form-child">
            <label>Description</label>
            <textarea
              name="desc"
              placeholder="Description"
              value={descValue}
              onChange={handleChange}
            />
          </div>

          <div className="form-child">
            <label htmlFor="">Kilometers</label>
            <input
              type="number"
              name="kmsOdometer"
              placeholder="Kilometers Odometer"
              value={formData.kmsOdometer}
              onChange={handleChange}
            />
          </div>

          <div className="form-child2">
            <label>
              Scratches:
              <input
                type="checkbox"
                name="scratches"
                checked={formData.scratches}
                onChange={handleChange}
              />
            </label>
            <label>
              Original Paint:
              <input
                type="checkbox"
                name="originalPaint"
                checked={formData.originalPaint}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-child">
            <label htmlFor="">Number of Accidents</label>
            <input
              type="number"
              name="accidents"
              placeholder="Number of Accidents"
              value={formData.accidents}
              onChange={handleChange}
            />
          </div>
          <div className="form-child">
            <label>Previous Buyers</label>
            <input
              type="number"
              name="prevBuyers"
              placeholder="Previous Buyers"
              value={formData.prevBuyers}
              onChange={handleChange}
            />
          </div>

          <div className="form-chil"></div>
          <div className="form-child">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-child">
            <label>Registration Place</label>
            <input
              type="text"
              name="regPlace"
              placeholder="Registration Place"
              value={formData.regPlace}
              onChange={handleChange}
            />
          </div>

          {editMode ? (
              <>
                <button type="submit">Update</button>
                <button type="button" onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <button type="submit">Create</button>
            )}
        </form>
      </div>
      <div className="cars-data">
        {filteredInventoryData.length === 0 ? (
         <div className="no-data">
           <span>No data, please add inventory.</span>
         </div>
        ) : (
          filteredInventoryData.map((item) => (
            <div className="card">
              <div className="img">
                <img src={item.image} alt="" />
              </div>
              <div className="top-data">
                <div className="title">
                  <h2>
                    {item.oemSpecs.company +
                      " " +
                      item.oemSpecs.model +
                      " " +
                      item.oemSpecs.year}
                  </h2>
                </div>
                <strong>
                  Colors:- <span> {item.oemSpecs.colors?.join(", ")}</span>
                </strong>

                <strong>
                  Power:- <span>{item.oemSpecs.power} hp</span>
                </strong>
                <strong>
                  MaxSpeed:- <span>{item.oemSpecs.maxSpeed} mph.</span>
                </strong>
                <strong>
                  Mileage:- <span> {item.oemSpecs.mileage} kmpl</span>
                </strong>
              </div>
              <div className="buttons">
              <button className="edit-button" onClick={() => handleEdit(item._id)}>Edit</button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
              <div className="details">
                <button
                  className="details-button"
                  onClick={() => toggleCardDetails(item._id)}
                >
                  {" "}
                  {cardDetailsOpen[item._id] ? "Hide details" : "Show details"}
                </button>
              </div>
              {cardDetailsOpen[item._id] && (
                <div className="details-data">
                  <strong>
                    Price:-<span>₹ {item.price}</span>
                  </strong>
                  <strong>
                    Scratches:- <span>{item.scratches ? "YES" : "NO"}</span>
                  </strong>
                  <strong>
                    OriginalPaint:-{" "}
                    <span>{item.originalPaint ? "YES" : "NO"}</span>
                  </strong>
                  <strong>
                    kmsOdometer:- <span>{item.kmsOdometer} Km</span>
                  </strong>
                  <strong>
                    Accidents:- <span>{item.accidents}</span>
                  </strong>
                  <strong>
                    PrevBuyers:- <span>{item.prevBuyers}</span>
                  </strong>
                  <strong>
                    RegPlace:- <span>{item.regPlace}</span>
                  </strong>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SecondhandCars;
