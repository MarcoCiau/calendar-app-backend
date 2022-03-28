import request from "../config/testConfig";
describe("Signup Test - Bad Email", () => {
    test("It should respond with an bad request", async () => {
        const response = await request
        .post("/api/v1/auth/signin")
        .send({
            email:"usermail.com",
            password:"123456789"
        });
        expect(response.statusCode).toBe(400);
    });
});

describe("Signup Test - Bad Password", () => {
    test("It should respond with an bad request", async () => {
        const response = await request
        .post("/api/v1/auth/signin")
        .send({
            email:"user@mail.com",
            password:"123"
        });
        expect(response.statusCode).toBe(400);
    });
});
