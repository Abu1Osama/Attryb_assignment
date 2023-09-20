import React, { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { userLogin, userSignup } from "../Redux/AuthRedux/action";
import "../Styles/Auth.scss"
import cardlogo from "../assets/car_logo.jpg"
import { useLocation, useNavigate } from "react-router-dom";

function Auth() {
  const data=useSelector((store)=>store.authReducer)

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showLogin, setShowLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const location=useLocation()

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(name, email, password)
    dispatch(userSignup(name, email, password,navigate,setShowLogin))
    
 
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin( email, password,navigate,location))

   
  };
  const toggleForm = () => {
    setShowLogin(!showLogin);
    setUsername("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="Auth" id="Auth">
         <div className="heading">
            <img src={cardlogo} alt="" />
            <h2>{showLogin ? "Login" : "Signup"}</h2>
          </div>
      {showLogin ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button  className="submit-btn"type="submit">Login</button>
          <p className="change">
            Don't have an account? {" "}
            <button className="toggle" onClick={toggleForm}>Signup here</button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <div>
            <label>Username:</label>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="submit-btn" type="submit">Signup</button>
          <p className="change">
            Already have an account?{" "}
            <button className="toggle" onClick={toggleForm}>Login here</button>
          </p>
        </form>
      )}
    </div>
  );
}

export default Auth;
