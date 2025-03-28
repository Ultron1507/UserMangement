import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://reqres.in/api/users?page=1")
      .then(response => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">User Management</h1>

      {loading ? (
        <p className="text-gray-400 text-lg">Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-900 p-4 rounded-lg shadow-lg flex flex-col items-center">
              <img src={user.avatar} alt={user.first_name} className="w-20 h-20 rounded-full border-2 border-blue-400 mb-3" />
              <h2 className="text-lg font-semibold">{user.first_name} {user.last_name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
