import React, { useState } from "react";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const userData = { email, password };
    console.log(userData);
  };
  const tologin = () => {
  };

  return (
      <div>
        <h2>Signup</h2>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Register</button>
          <span onClick={tologin}>already have an account</span>
        </div>
      </div>
  );
};

export default SignupForm;
