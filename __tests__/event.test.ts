import request from "../config/testConfig";
import { connectDB, disconnectDB } from "../config/db";
const signingURL = "/api/v1/auth/signin";
const eventURL = "/api/v1/event";
let accessToken = "*";
beforeAll(() => jest.setTimeout(90 * 1000));

describe("DB Connection", () => {
    test("It should return true if database is connected successfully", async () => {
        const db = await connectDB();
        expect(db).toBeTruthy();
    });
});

describe("Events Tests", () => {

    test("Signin Success - It should respond with user payload, accessToken & refreshToken", async () => {
        const response = await request
            .post(signingURL)
            .send({
                email: "user2@mail.com",
                password: "123456789"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.accessToken).not.toBeNull();
        expect(response.body.refreshToken).not.toBeNull();
        accessToken = response.body.accessToken;

    });

    test("Create a new event - It should respond a success condition and the created event document", async () => {
        const response = await request
            .post(eventURL)
            .send({
                title: "Business meeting",
                notes: "Check my notes",
                start: "2022-02-18T17:00:00.000Z",
                end: "2022-02-18T17:50:00.000Z"
            })
            .set('x-token', accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.event).not.toBeNull();
    });

    test("Get an event (invalid or wrong eventId) - It should respond a bad request", async () => {
        const response = await request
            .get(`${eventURL}/3434`)
            .set('x-token', accessToken);
        expect(response.statusCode).toBe(400);
    });

    test("Get All events - with custom query", async () => {
        const response = await request
            .get(`${eventURL}?from=${0}&limit=${0}&sort=${-1}`)
            .set('x-token', accessToken)
        expect(response.body.events).not.toBeNull();
        expect(response.statusCode).toBe(200);
    });
});

describe("DB Disconnection", () => {
    test("It should return true if database is disconnected successfully", async () => {
        const disconnected = await disconnectDB();
        expect(disconnected).toBeTruthy();
    });
});