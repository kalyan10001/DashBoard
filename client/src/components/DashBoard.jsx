import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  useEffect(() => {
    if (!user) {
      alert("Access denied");
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getdata");
        const data = await response.json();
        if (data?.data) {
          setUserData(data.data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (!user) {
    return <div className="text-center mt-12">Redirecting to login...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-md border border-gray-400">
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome, {user?.username}
        </h2>
        <div className="overflow-x-auto">
          <table
            aria-label="User Data"
            className="w-full table-auto border-collapse border border-gray-600"
          >
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">DOB</th>
                <th className="px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {userData.length > 0 ? (
                userData.map((item) => (
                  <tr key={item._id} className="border-t border-gray-600">
                    <td className="px-4 py-2">{item.username}</td>
                    <td className="px-4 py-2">
                      {item.dob ? item.dob.split("T")[0] : "N/A"}
                    </td>
                    <td className="px-4 py-2">{item.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
