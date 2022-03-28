import request from "../config/testConfig";
import { connectDB, disconnectDB } from "../config/db";
const signupURL = "/api/v1/auth/signup";

beforeAll(() => jest.setTimeout(90 * 1000));

describe("DB Connection", () => {
    test("It should return true if database is connected successfully", async () => {
        const db = await connectDB();
        expect(db).toBeTruthy();
    });
});

describe("Auth Signup Test", () => {
    test("No User Name - It should respond with an bad request", async () => {
        const response = await request
            .post(signupURL)
            .send({
                name: "",
                email: "user@mail.com",
                password: "123"
            });
        expect(response.statusCode).toBe(400);
    });

    test("Bad Email - It should respond with an bad request", async () => {
        const response = await request
            .post(signupURL)
            .send({
                name: "user_test",
                email: "usermail.com",
                password: "123456789"
            });
        expect(response.statusCode).toBe(400);
    });

    test("Bad Password - It should respond with an bad request", async () => {
        const response = await request
            .post(signupURL)
            .send({
                name: "user test",
                email: "user@mail.com",
                password: "123"
            });
        expect(response.statusCode).toBe(400);
    });

    test("Empty Request's body - It should respond with an bad request", async () => {
        const response = await request
            .post(signupURL)
            .send({});
        expect(response.statusCode).toBe(400);
    });

    test("Signup Success - It should respond with user payload, accessToken & refreshToken", async () => {
        const response = await request
            .post(signupURL)
            .send({
                name: "user test",
                email: "testUser@email.com",
                password: "qwertyui8"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe("process sucess");
        expect(response.body.accessToken).not.toBeNull();
        expect(response.body.refreshToken).not.toBeNull();
    });

    test("email exists - It should respond with an bad request", async () => {
        const response = await request
            .post(signupURL)
            .send({
                name: "user test",
                email: "testUser@email.com",
                password: "qwertyui"
            });
        expect(response.statusCode).toBe(400);
    });
});

describe("DB Disconnection", () => {
    test("It should return true if database is disconnected successfully", async () => {
        const disconnected = await disconnectDB();
        expect(disconnected).toBeTruthy();
    });
});