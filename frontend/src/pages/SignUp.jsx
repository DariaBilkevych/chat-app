import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signup/SignUp.css';
import useSignup from '../hooks/useSignup';

function SignUp() {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const { loading, signup } =  useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="input-group">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={inputs.firstname}
            onChange={(e) => setInputs({...inputs, firstname: e.target.value})}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={inputs.lastname}
            onChange={(e) => setInputs({...inputs, lastname: e.target.value})}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={inputs.email}
            onChange={(e) => setInputs({...inputs, email: e.target.value})}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password: e.target.value})}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="signup-button">
          {loading ? <div class="loading-spinner"></div> : "Sign Up"}
        </button>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
