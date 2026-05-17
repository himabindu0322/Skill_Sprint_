import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      console.log(response.data);

      // SUCCESS MESSAGE
      toast.success(response.data.message);

      // CLEAR FORM
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });

      // REDIRECT TO DASHBOARD
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.log("Signup Error:", error);

      // SHOW ERROR MESSAGE
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="signup-container">
      <Toaster position="top-center" reverseOrder={false} />

      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>AI Interview Platform</h1>

        <input
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Register
        </button>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
