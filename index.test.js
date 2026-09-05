const request = require("supertest");
const app = require("./index");

describe("Nexora API Tests", () => {

    test("GET /api/status should return success", async () => {
        const response = await request(app)
            .get("/api/status");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");
    });

    test("GET /api/info should return application information", async () => {
        const response = await request(app)
            .get("/api/info");

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Nexora");
        expect(response.body.status).toBe("running");
    });

    test("GET /api/metrics should return system metrics", async () => {
        const response = await request(app)
            .get("/api/metrics");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("nodeVersion");
        expect(response.body).toHaveProperty("memoryUsage");
    });

    test("GET /api/system should return system information", async () => {
        const response = await request(app)
            .get("/api/system");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("operatingSystem");
        expect(response.body).toHaveProperty("architecture");
        expect(response.body).toHaveProperty("cpuCores");
    });

});