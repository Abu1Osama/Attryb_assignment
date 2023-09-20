import React, { useEffect, useState } from "react";
import "../Styles/Navbar.scss";
import { Link } from "react-router-dom";
import carlogo from "../assets/car_logo.jpg";
import { fetchAllOemSpecs } from "../Redux/OEmRedux/action";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../Redux/CarsDealerRedux/action";
import { userLogout } from "../Redux/AuthRedux/action";

function Navbar() {
  const token = localStorage.getItem("dealertoken") || "";
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    dispatch(fetchInventory(searchQuery));
  };
  const logout = () => {
   dispatch(userLogout())
  };
  // useEffect(()=>{
  //   dispatch
  // })
  return (
    <div className="navbar" id="navbar">
      <div className="logo">
        <Link to={"/"}>
          <img src={carlogo} alt="" />
        </Link>
      </div>
      <div className="search">
        <input
          value={searchQuery}
          type="text"
          placeholder="Search Models,Company"
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="linked">
        <Link to={"/"}>
          <span>Home</span>
        </Link>
        <Link to={"/secondhand"}>
          <span>Add Inventory</span>
        </Link>
        {token ? (
          <p onClick={logout}>Logout</p>
        ) : (
          <Link to={"/auth"}>
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
