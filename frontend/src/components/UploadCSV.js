import { useState } from "react";
import BackButton from "./BackPage";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file); 
  
    const token = localStorage.getItem("token");
  
    const response = await fetch("http://localhost:8080/api/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, 
      },
      body: formData,
    });
  
    const data = await response.json();
    setMessage(data.message);
  };  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload CSV File</h2>
      <BackButton />
      <input type="file" accept=".csv,.xlsx,.xls" 
      onChange={handleFileChange} className="mb-2 border p-2" />

      <button onClick={handleUpload} 
      className="bg-blue-500 text-white px-4 py-2 rounded 
      cursor-pointer">Upload</button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default UploadCSV;