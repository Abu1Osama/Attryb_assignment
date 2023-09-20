import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../Redux/CarsDealerRedux/action";
import { fetchAllOemSpecs } from "../Redux/OEmRedux/action";
import "../Styles/DealersCar.scss";

function DealersCar() {
  const inventorydata = useSelector(
    (store) => store.inventoryReducer.inventory
  );
  const [cardDetailsOpen, setCardDetailsOpen] = useState({});

  console.log(inventorydata);

  const [selectedColor, setSelectedColor] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOemSpecs());
    dispatch(fetchInventory());
    const filteredData = inventorydata
      .filter((item) => {
        if (selectedColor && selectedColor !== "All Colors") {
          return item.oemSpecs.colors.includes(selectedColor);
        }
        return true;
      })
      .filter((item) => {
        if (isFiltering && minMileage !== "" && maxMileage !== "") {
          const mileage = item.oemSpecs.mileage;
          return mileage >= minMileage && mileage <= maxMileage;
        }
        return true;
      })
      .filter((item) => {
        if (isFiltering && minPrice !== "" && maxPrice !== "") {
          const price = item.price;
          return price >= minPrice && price <= maxPrice;
        }
        return true;
      });

    setIsDataAvailable(filteredData.length > 0 || !isFiltering);
  }, [selectedColor, isFiltering, minMileage, maxMileage, minPrice, maxPrice]);

  const toggleCardDetails = (cardId) => {
    setCardDetailsOpen((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };
  const uniqueColors = [
    ...new Set(inventorydata.flatMap((item) => item.oemSpecs.colors)),
  ];

  return (
    <div className="DealersCar" id="DealersCar">
      <div className="filter">
        <div className="filter-child">
          <span>Filter by color:-</span>
          <select
            name=""
            id=""
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">All Colors</option>
            {uniqueColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-child">
          <span>Filter by Mileage:-</span>
          <input
            type="number"
            placeholder="Min Mileage"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Mileage"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
          />
        </div>
        <div className="filter-child">
          <span>Filter by Price:-</span>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button onClick={() => setIsFiltering(true)}>Apply Filters</button>
        <button onClick={() => setIsFiltering(false)}>Clear Filters</button>
      </div>
      <div className="cars-data">
        {inventorydata
          .filter((item) => {
            if (selectedColor && selectedColor !== "All Colors") {
              return item.oemSpecs.colors.includes(selectedColor);
            }
            return true;
          })
          .filter((item) => {
            if (isFiltering && minMileage !== "" && maxMileage !== "") {
              const mileage = item.oemSpecs.mileage;
              return mileage >= minMileage && mileage <= maxMileage;
            }
            return true;
          })
          .filter((item) => {
            if (isFiltering && minPrice !== "" && maxPrice !== "") {
              const price = item.price;
              return price >= minPrice && price <= maxPrice;
            }
            return true;
          })
          .map((item) => (
            <div className="card" key={item._id}>
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
          ))}
        {isDataAvailable && inventorydata.length === 0 && (
          <div className="no-data-message">No data available</div>
        )}
      </div>
    </div>
  );
}

export default DealersCar;
