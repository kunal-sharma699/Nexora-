const express = require("express");
const os = require("os");

const app = express();
const PORT = 3000;

// Serve frontend files
app.use(express.static("public"));
app.use(express.json());

// API endpoint
app.get("/api/status", (req, res) => {
    res.json({
        status: "success",
        message: "✅ Nexora is running successfully!"
    });
});

// API endpoint for Nexora information
app.get("/api/info", (req, res) => {
    res.json({
        name: "Nexora",
        version: "1.0.0",
        description: "Interactive and responsive Node.js application",
        status: "running"
    });
});

// System metrics API
app.get("/api/metrics", (req, res) => {
    const memory = process.memoryUsage();

    res.json({
        uptime: Math.floor(process.uptime()),
        nodeVersion: process.version,
        memoryUsage: Math.round(memory.rss / 1024 / 1024),
        environment: process.env.NODE_ENV || "Development",
        port: PORT
    });
});

// CPU usage API
app.get("/api/cpu", (req, res) => {
    const cpu = process.cpuUsage();

    res.json({
        user: cpu.user,
        system: cpu.system
    });
});

// Server/System information API
app.get("/api/system", (req, res) => {
    res.json({
        operatingSystem: os.type(),
        platform: os.platform(),
        architecture: os.arch(),
        cpuCores: os.cpus().length,
        totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024 * 10) / 10,
        freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024 * 10) / 10
    });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;