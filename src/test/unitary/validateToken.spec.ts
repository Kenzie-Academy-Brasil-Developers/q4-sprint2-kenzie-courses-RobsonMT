import { validateToken } from "../../middlewares";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { ErrorHandler } from "../../errors/errors";
import * as dotenv from "dotenv";

dotenv.config();

describe("validateToken Middleware Tests", () => {
  const mockReq: Partial<Request> = {};
  const _: Partial<Response> = {};
  const nextFunc: NextFunction = jest.fn();

  test("Error: Missing authorization token. | Status code: 400", async () => {
    mockReq.headers = {};

    try {
      validateToken(mockReq as Request, _ as Response, nextFunc);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe("Missing authorization token.");
    }
  });

  test("Error: jwt malformed | Status code: 401", () => {
    mockReq.headers = {
      authorization: "Bearer 33bas79ertrbxz",
    };

    try {
      validateToken(mockReq as Request, _ as Response, nextFunc);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("jwt malformed");
    }
  });

  test("Will call next function and add 'decoded' key on mockReq object.", () => {
    const emailTest = "mock-email@mail.com.br";
    const token = sign({ email: emailTest }, process.env.SECRET_KEY);

    mockReq.headers = {
      authorization: `Bearer ${token}`,
    };

    validateToken(mockReq as Request, _ as Response, nextFunc);

    expect(nextFunc).toBeCalled();
    expect(nextFunc).toBeCalledTimes(1);

    expect(mockReq).toHaveProperty("decoded");
    expect(mockReq.decoded.email).toStrictEqual(emailTest);
  });
});
