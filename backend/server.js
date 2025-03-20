require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const UserRoutes = require('./routes/userRoutes');
const AgentRoutes = require('./routes/agentRoutes');
const ListRoutes = require('./routes/listRoutes');


const PORT = process.env.PORT

// Middleware setup
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// CORS configuration
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));  

// Route setup
app.use('/api', UserRoutes);
app.use('/api', AgentRoutes);
app.use('/api', ListRoutes);

// Connect to database
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});