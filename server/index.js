const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware

const app = express();
app.use(cors()); // Enable CORS

const upload = multer({ dest: 'uploads/' });

app.post("/predict", upload.single("audio"), async (req, res) => {
    console.log("Request received");
    console.log(req.file);
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = path.join(__dirname, req.file.path);
    // console.log("File Path:", filePath);

    // Call Python script to process audio
    exec(`python process_audio.py "${filePath}"`, (error, stdout, stderr) => {
        console.log("STDOUT:", stdout);
        // console.log("STDERR:", stderr);
        fs.unlinkSync(filePath); // Delete file after processing
    
        if (error) {
            console.error("Python Script Error:", stderr);
            return res.status(500).json({ error: stderr });
        }
        // Get the last non-empty line from stdout
        const emotion = stdout.trim().split("\n").filter(line => line.trim() !== "").
                          pop();
        res.json({ emotion });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});