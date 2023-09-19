import React, { useState } from "react";

function Auth() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showLogin, setShowLogin] = useState(true);

  const handleSignup = (e) => {
    e.preventDefault();
    
  };

  const handleLogin = (e) => {
    e.preventDefault();
   
  };
  const toggleForm = () => {
    setShowLogin(!showLogin);
    setUsername("");
    setEmail("");
    setPassword("");
  };
  return (
    <div>
         <div className="heading">
            <h2>{showLogin ? "Login" : "Signup"}</h2>
          </div>
      {showLogin ? (
        <form onSubmit={handleLogin}>
          {/* Login Form */}
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
          <button type="submit">Login</button>
          <p>
            Don't have an account? Signup{" "}
            <button onClick={toggleForm}>here</button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          {/* Signup Form */}
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
          <button type="submit">Signup</button>
          <p>
            Already have an account? Login{" "}
            <button onClick={toggleForm}>here</button>
          </p>
        </form>
      )}
    </div>
  );
}

export default Auth;
