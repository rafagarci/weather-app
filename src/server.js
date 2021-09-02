const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

// Handle GET requests
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
    console.log("Main app accessed");
});

app.get("/getter.js", (req, res) => {
    res.sendFile(path.join(__dirname, "getter.js"));
    console.log("getter.js provided");
});

// Listen on port
app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});
