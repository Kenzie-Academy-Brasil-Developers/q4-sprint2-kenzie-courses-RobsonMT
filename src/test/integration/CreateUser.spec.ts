import { Connection, generateUser } from "..";
import supertest from "supertest";
import app from "../../app";
import { validate } from "uuid";
import { User } from "../../entities";

describe("Create user route | Integration Test", () => {
  const dbConnection = new Connection();

  beforeAll(async () => {
    await dbConnection.create();
  });

  afterAll(async () => {
    await dbConnection.clear();
    await dbConnection.close();
  });

  beforeEach(async () => {
    await dbConnection.clear();
  });

  test("Return: User as JSON response | Status code: 201", async () => {
    const user: Partial<User> = generateUser();

    const response = await supertest(app)
      .post("/users")
      .send({ ...user });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toStrictEqual(user.email);
    expect(validate(response.body.id)).toBeTruthy();
  });

  test("Return: Body error, missing password | Status code: 400", async () => {
    const { password, ...user } = generateUser();
    const response = await supertest(app)
      .post("/users")
      .send({ ...user });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toStrictEqual({
      message: ["password is a required field"],
    });
  });
});
