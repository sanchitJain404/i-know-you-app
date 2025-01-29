require('dotenv').config({ path: './config.env' }); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Users = require("./models/Users");
const path = require('path')


// if (process.env.NODE === 'production') {
//     app.use(express.static(path.join(__dirname, '/fun-project/dist')))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, "fun_project", "dist", "index.html"))
//     })
// }


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

__dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/fun-project/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "fun_project", "dist", "index.html"))
})

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);  

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Placeholder for routes
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// POST /api/check-name
app.post("/api/check-name", async (req, res) => {
    const { name } = req.body;

    try {
        // Use regex to find a name that contains the input (case-insensitive)
        const user = await Users.findOne({ 
            name: { $regex: new RegExp(name, "i") } 
        });

        if (user) {
            // Include all necessary fields in the response
            res.json({
                image: user.image,
                info: user.name,  // Assuming you want to show the user's name as 'info'
                hobbies: user.hobbies,
                current_company: user.current_company,
                birthplace: user.birthplace,
                quote: user.quote,
            });
        } else {
            res.json({ message: "😂 Don't cheat me, enter your real name!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error!" });
    }
});


