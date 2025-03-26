import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      alert("Registration successful. Please log in.");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-3" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-success" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
