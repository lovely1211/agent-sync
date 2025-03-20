import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Dropdown icons
import BackButton from "./BackPage";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [list, setList] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    fetch("http://localhost:8080/api/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.agents) {
          setAgents(data.agents);
        } else {
          console.error("Unexpected response format:", data);
          setAgents([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching agents:", err);
        setAgents([]);
      });
  }, []);

  const handleAddAgent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, mobile, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "Email already exists") {
          alert("This email is already registered. Please use another email.");
          return;
        }
        throw new Error(data.message || "Failed to add agent");
      }

      alert("Agent added successfully");

      setAgents((prevAgents) => [...prevAgents, data.agent]);
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
    } catch (error) {
      console.error("Error adding agent:", error);
      alert(error.message);
    }
  };

  const handleAgentSelect = (agentId) => {
    if (selectedAgent === agentId) {
      setSelectedAgent(null); 
      setList([]); 
      return;
    }
  
    setSelectedAgent(agentId);
    fetch(`http://localhost:8080/api/grouped-agents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => console.error("Error fetching grouped agents:", err));
  };  
   
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Agents</h2>
      <BackButton />

      <form onSubmit={handleAddAgent} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />

        <input
          type="tel"
          placeholder="Mobile number with country code"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Add Agent
        </button>
      </form>

      <div className="space-y-4">
        {agents.length > 0 ? (
          agents.map((agent) => (
            <div
              key={agent._id}
              className="border p-4 rounded shadow-md flex 
              justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{agent.name}</p>
                <p className="text-gray-500">
                  {agent.email} - {agent.mobile}
                </p>
              </div>
              <button
                onClick={() => handleAgentSelect(agent._id)}
                className="text-gray-700 hover:text-gray-900 transition 
                cursor-pointer"
              >
                {selectedAgent === agent._id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
          ))
        ) : (
          <p>No agents found.</p>
        )}
      </div>

      {selectedAgent && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-xl font-bold mb-2">Items for Selected Agent</h3>
          {list.length > 0 ? (
            <div className="mt-4">
              {list.map((group, index) => (
                <div key={index} className="mb-6 p-4 border rounded-lg">
                  <h3 className="text-lg font-bold text-blue-600">
                  Items for {agents.find((a) => a._id === selectedAgent)?.name} 
                  </h3>
                  <ul>
                    {group.items.map((item, i) => (
                      <li key={i} className="p-2 border rounded mb-2">
                        <strong>{item.firstName}</strong> - {item.phone} <br />
                        <em>{item.notes}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-500 mt-4">No list found.</p>
          )}

        </div>
      )}
    </div>
  );
};

export default Agents;

