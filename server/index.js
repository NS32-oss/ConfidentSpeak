const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

let confidentiallyProcess = null;

// Endpoint for processing audio (e.g., emotion detection)
app.post("/predict", upload.single("audio"), async (req, res) => {
    console.log("Request received");
    console.log(req.file);
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = path.join(__dirname, req.file.path);

    // Call Python script to process audio
    exec(`python process_audio.py "${filePath}"`, (error, stdout, stderr) => {
        console.log("STDOUT:", stdout);
        fs.unlinkSync(filePath); // Delete file after processing
    
        if (error) {
            console.error("Python Script Error:", stderr);
            return res.status(500).json({ error: stderr });
        }
        // Get the last non-empty line from stdout
        let emotion = stdout.trim().split("\n").filter(line => line.trim() !== "").pop();
        
        // Replace "sad" with "neutral"
        if (emotion === "sad"||emotion==="surprise") {
            emotion = "neutral";
        }
        res.json({ emotion });
    });
});

// Serve pronunciation audio files from the "pronunciations" folder
app.use("/pronunciations", express.static(path.join(__dirname, "pronunciations")));

// Endpoint for Word Explorer (fetches definitions, synonyms, antonyms, and pronunciation)
app.get("/word-explorer/:word", (req, res) => {
    const word = req.params.word;

    // Delete all existing audio files in the pronunciations folder
    const pronunciationsDir = path.join(__dirname, "pronunciations");
    fs.readdir(pronunciationsDir, (err, files) => {
        if (err) {
            console.error("Error reading pronunciations directory:", err);
        } else {
            files.forEach(file => {
                const filePath = path.join(pronunciationsDir, file);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Error deleting file:", filePath, err);
                    } else {
                        console.log(`Deleted audio file: ${filePath}`);
                    }
                });
            });
        }
    });

    exec(`python process_word.py "${word}"`, (error, stdout, stderr) => {
        if (error) {
            console.error("Python Script Error:", stderr);
            return res.status(500).json({ error: stderr });
        }
        try {
            const result = JSON.parse(stdout);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: "Failed to parse response from Python script" });
        }
    });
});

// Endpoint to start the Confidently You application
app.post('/api/start-confidently', (req, res) => {
    try {
        if (confidentiallyProcess) {
            return res.status(400).json({ message: 'Confidently You is already running' });
        }

        // Start the backend server (adjust the path and command according to your setup)
        const backendPath = path.join(__dirname, '..', 'confidently you', 'project', 'backend');
        confidentiallyProcess = spawn('npm', ['start'], {
            cwd: backendPath,
            shell: true
        });

        confidentiallyProcess.stdout.on('data', (data) => {
            console.log(`Confidently You stdout: ${data}`);
        });

        confidentiallyProcess.stderr.on('data', (data) => {
            console.error(`Confidently You stderr: ${data}`);
        });

        res.json({ message: 'Confidently You started successfully' });
    } catch (error) {
        console.error('Error starting Confidently You:', error);
        res.status(500).json({ error: 'Failed to start Confidently You' });
    }
});

// Endpoint to stop the Confidently You application
app.post('/api/stop-confidently', (req, res) => {
    try {
        if (confidentiallyProcess) {
            confidentiallyProcess.kill();
            confidentiallyProcess = null;
            res.json({ message: 'Confidently You stopped successfully' });
        } else {
            res.status(400).json({ message: 'Confidently You is not running' });
        }
    } catch (error) {
        console.error('Error stopping Confidently You:', error);
        res.status(500).json({ error: 'Failed to stop Confidently You' });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
