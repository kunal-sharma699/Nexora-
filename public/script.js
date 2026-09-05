function checkStatus() {
    const statusElement = document.getElementById("status");

    statusElement.textContent = "Checking server...";

    fetch("/api/status")
        .then(response => {
            if (!response.ok) {
                throw new Error("Server response failed");
            }

            return response.json();
        })
        .then(data => {
            statusElement.textContent = data.message;
        })
        .catch(error => {
            statusElement.textContent = "❌ Server connection failed";

            console.error("API Error:", error);
        });
}


function loadInfo() {
    const infoElement = document.getElementById("appInfo");

    infoElement.textContent = "Loading application information...";

    fetch("/api/info")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load application information");
            }

            return response.json();
        })
        .then(data => {

            infoElement.innerHTML = `
                <strong>${data.name}</strong><br>
                Version: ${data.version}<br>
                Status: ${data.status}<br>
                ${data.description}
            `;

        })
        .catch(error => {

            infoElement.textContent =
                "❌ Unable to load application information";

            console.error("API Error:", error);
        });
}

function loadMetrics() {
    const uptimeElement = document.getElementById("uptime");
    const nodeElement = document.getElementById("nodeVersion");
    const memoryElement = document.getElementById("memoryUsage");
    const environmentElement = document.getElementById("environment");

    uptimeElement.textContent = "Loading...";
    nodeElement.textContent = "Loading...";
    memoryElement.textContent = "Loading...";
    environmentElement.textContent = "Loading...";

    fetch("/api/metrics")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load metrics");
            }

            return response.json();
        })
        .then(data => {

            const hours = Math.floor(data.uptime / 3600);
            const minutes = Math.floor((data.uptime % 3600) / 60);
            const seconds = data.uptime % 60;

            uptimeElement.textContent =
                `${hours}h ${minutes}m ${seconds}s`;

            nodeElement.textContent = data.nodeVersion;

            memoryElement.textContent =
                `${data.memoryUsage} MB`;

            environmentElement.textContent =
                data.environment;
        })
        .catch(error => {
            uptimeElement.textContent = "--";
            nodeElement.textContent = "--";
            memoryElement.textContent = "--";
            environmentElement.textContent = "--";

            console.error("Metrics Error:", error);
        });
}
function loadSystemInfo() {
    fetch("/api/system")
        .then(response => response.json())
        .then(data => {

            document.getElementById("operatingSystem").textContent =
                data.operatingSystem;

            document.getElementById("architecture").textContent =
                data.architecture;

            document.getElementById("cpuCores").textContent =
                data.cpuCores;

            document.getElementById("totalMemory").textContent =
                data.totalMemory + " GB";

            document.getElementById("freeMemory").textContent =
                data.freeMemory + " GB";
        })
        .catch(error => {
            console.error("System Info Error:", error);
        });
}

function loadCPU() {
    const cpuElement = document.getElementById("cpuUsage");

    cpuElement.textContent = "Loading...";

    fetch("/api/cpu")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load CPU usage");
            }

            return response.json();
        })
        .then(data => {
            const totalCPUTime = data.user + data.system;

            // Convert microseconds to milliseconds
            const cpuMilliseconds = totalCPUTime / 1000;

            cpuElement.textContent =
                `${cpuMilliseconds.toFixed(2)} ms`;
        })
        .catch(error => {
            cpuElement.textContent = "--";
            console.error("CPU Error:", error);
        });
}