import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole'); 
      navigate('/'); 
    };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 
            rounded cursor-pointer">
                Logout
            </button>
        </div>

      <div className="space-x-4">
        <Link to="/agents" 
        className="bg-green-500 hover:bg-green-400 text-white 
        px-4 py-2 rounded">
            Manage Agents
        </Link>

        <Link to="/upload" 
        className="bg-blue-500 hover:bg-blue-400 text-white 
        px-4 py-2 rounded">
            Upload CSV
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;