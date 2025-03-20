require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const UserRoutes = require('./routes/userRoutes');
const AgentRoutes = require('./routes/agentRoutes');
const ListRoutes = require('./routes/listRoutes');


const PORT = process.env.PORT

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));  

app.use('/api', UserRoutes);
app.use('/api', AgentRoutes);
app.use('/api', ListRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});