import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";


function Register() {

  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    const response = await fetch("https://dashboard-4e5o.onrender.com/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      const data = await response.json();
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          placeholder="Name"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          placeholder="Date of Birth"
          type="date"
          onChange={(e) =>
            setFormData({ ...formData, dob: e.target.value })
          }
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          placeholder="Email"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          placeholder="Password"
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 mb-4"
        >
          Register
        </button>
        <div className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-500 underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
