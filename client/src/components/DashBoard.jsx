import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-md border border-gray-400">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome, {user?.username}</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-600">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">DOB</th>
                <th className="px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-600">
                <td className="px-4 py-2">{user?.username}</td>
                <td className="px-4 py-2">{user?.dob}</td>
                <td className="px-4 py-2">{user?.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
