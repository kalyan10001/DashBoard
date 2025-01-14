import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response) {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
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
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
