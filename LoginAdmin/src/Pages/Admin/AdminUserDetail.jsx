import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdBlockFlipped } from "react-icons/md";
import axios from "axios";
import { Logout } from "../../Redux/AuthAdminslice";
import { useNavigate } from "react-router-dom";

const AdminUserDetail = () => {
  const userData = useSelector((state) => state.admin.userData);
  const isAuthenticated = useSelector(state => state.admin.isAuthenticated);
  const isblocked = useSelector((state) => state.admin.blockedorNot)

  console.log("isblocked", isblocked);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUserData, setFilteredUserData] = useState([]);
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const handleSearch = () => {
    if (userData) {
      const filteredData = userData.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUserData(filteredData);
    }
  };


  useEffect(() => {
    handleSearch(); // Trigger search when searchTerm changes
  }, [searchTerm, userData]);

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:5000/delete/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(`User with ID ${userId} deleted successfully`);

          // Update filteredUserData after successful deletion
          setFilteredUserData((prevData) => prevData.filter((user) => user._id !== userId));
        } else {
          console.error(`Failed to delete user with ID ${userId}`);
        }
      })
      .catch((error) => {
        console.error(`Error deleting user with ID ${userId}`, error);
      });
  };


  const handleBlock = (userId, isBlocked) => {
    axios.post(`http://localhost:5000/block/${userId}`, { blocked: !isBlocked })
      .then((response) => {
        if (response.status === 200) {
          console.log(`User with ID ${userId} ${isBlocked ? 'unblocked' : 'blocked'} successfully`);

          // Update the component state after a successful blocking or unblocking operation
          setFilteredUserData((prevData) =>
            prevData.map((user) =>
              user._id === userId ? { ...user, isBlocked: !isBlocked } : user
            )
          );

          // Dispatch an action to update the Redux store state
          dispatch(updateBlockedStatus({ userId, isBlocked: !isBlocked }));
        } else {
          console.error(`Failed to ${isBlocked ? 'unblock' : 'block'} user with ID ${userId}`);
        }
      })
      .catch((error) => {
        console.error(`Error ${isBlocked ? 'unblocking' : 'blocking'} user with ID ${userId}`, error);
      });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      Navigate('/admin');
    }
  }, [isAuthenticated, Navigate]);

  const handleLogout = () => {
    dispatch(Logout());
    Navigate('/admin');
  }

  return (
    <div>
      <div className="bg-blue-500 h-20 items-center text-center">
        <h1 className="text-3xl py-4 font-medium text-white">Admin User Detail</h1>
      </div>
      <button onClick={handleLogout}
        className="bg-red-500 ml-20 mt-5 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
      >
        Logout
      </button>
      <div className="container mx-auto mt-8">
        <div className="mb-4 flex items-center">
          <label className="text-sm text-gray-500 mr-2">Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Search
          </button>
        </div>
        {filteredUserData && filteredUserData.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold mb-4">User Details:</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUserData.map((user) => (
                  <tr key={user._id} className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap border-b">{user._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b">
                      <div className="flex items-center">
                        <div className={`flex gap-4 ${user.isBlocked ? 'bg-green-500' : 'bg-orange-500'} rounded-xl`}>
                        <button
  onClick={() => handleBlock(user._id, user.isBlocked)}
  className={`w-16 mt-1 font-bold text-white ${user.isBlocked ? 'bg-green-500' : 'bg-orange-500'} rounded-xl`}
>
  {user.isBlocked ? 'Unblock' : 'Block'}
</button>


                          <MdBlockFlipped className="mt-1 mr-2 text-white" size={20} />
                        </div>
                        <div className="flex items-center ml-2 bg-red-600 rounded-xl">
                          <button onClick={() => handleDelete(user._id)} className="w-16 rounded-xl mt-1 font-bold text-white">
                            Delete
                          </button>
                          <MdDelete className="ml-3 text-white" size={20} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
  );
};

export default AdminUserDetail;