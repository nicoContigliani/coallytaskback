import jwt from "jsonwebtoken";
import express from "express";
import request from "supertest";
import { verifyToken, SECRET_KEY } from "../src/midelware/auth.js";

jest.mock("jsonwebtoken");

const app = express();

// Mock route to test the middleware
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

describe("verifyToken Middleware", () => {
  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/protected");

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Token required");
  });

  it("should return 403 if token is invalid", async () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error("Token not valid"), null);
    });

    const res = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer invalid_token");

    expect(res.status).toBe(403);
    expect(res.body.error).toBe("Token not valid");
  });

  it("should call next and grant access if token is valid", async () => {
    const mockUser = { id: "123", username: "testuser" };
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, mockUser);
    });

    const res = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer valid_token");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Access granted");
    expect(res.body.user).toEqual(mockUser);
  });
});
