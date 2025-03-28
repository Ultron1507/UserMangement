import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ first_name: "", last_name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("https://reqres.in/api/users?page=1")
      .then(response => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  // Open Edit Form
  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({ first_name: user.first_name, last_name: user.last_name, email: user.email });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save Updated User
  const handleUpdateUser = () => {
    axios.put(`https://reqres.in/api/users/${editingUser.id}`, editForm)
      .then(() => {
        setUsers(users.map(user => (user.id === editingUser.id ? { ...user, ...editForm } : user)));
        setEditingUser(null);
        setMessage("User updated successfully!");
      })
      .catch(() => setMessage("Failed to update user."));
  };

  // Delete User
  const handleDeleteUser = (id) => {
    axios.delete(`https://reqres.in/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
        setMessage("User deleted successfully!");
      })
      .catch(() => setMessage("Failed to delete user."));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">User Management</h1>

      {message && <p className="mb-4 text-green-400">{message}</p>}

      {loading ? (
        <p className="text-gray-400 text-lg">Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-900 p-4 rounded-lg shadow-lg flex flex-col items-center">
              <img src={user.avatar} alt={user.first_name} className="w-20 h-20 rounded-full border-2 border-blue-400 mb-3" />
              <h2 className="text-lg font-semibold">{user.first_name} {user.last_name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <div className="mt-3 flex gap-2">
                <button 
                  className="bg-blue-500 hover:bg-blue-400 text-black px-4 py-2 rounded transition flex items-center gap-2"
                  onClick={() => handleEditClick(user)}
                >
                  <i className="ri-pencil-line"></i> Edit
                </button>
                <button 
                  className="bg-zinc-800 hover:bg-zinc-400 text-white px-4 py-2 rounded transition flex items-center gap-2"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <i className="ri-delete-bin-6-line"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input 
              type="text" 
              name="first_name" 
              value={editForm.first_name} 
              onChange={handleChange} 
              placeholder="First Name" 
              className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
            />
            <input 
              type="text" 
              name="last_name" 
              value={editForm.last_name} 
              onChange={handleChange} 
              placeholder="Last Name" 
              className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
            />
            <input 
              type="email" 
              name="email" 
              value={editForm.email} 
              onChange={handleChange} 
              placeholder="Email" 
              className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
            />
            <div className="flex gap-2">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                onClick={handleUpdateUser}
              >
                Save
              </button>
              <button 
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
