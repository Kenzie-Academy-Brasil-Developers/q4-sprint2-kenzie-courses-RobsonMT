import supertest from "supertest";
import { Connection, generateUser } from "..";
import app from "../../app";
import { User } from "../../entities";

describe("Get All users route | Integration Test", () => {
  const dbConnection = new Connection();

  beforeAll(async () => {
    await dbConnection.create();
  });

  beforeEach(async () => {
    await dbConnection.clear();
  });

  afterAll(async () => {
    await dbConnection.clear();
    await dbConnection.close();
  });

  test("should list all registered users", async () => {
    const user: Partial<User> = generateUser();

    const createResponse = await supertest(app)
      .post("/users")
      .send({ ...user });

    expect(createResponse.statusCode).toBe(201);

    const loginResponse = await supertest(app)
      .post("/login")
      .send({ email: user.email, password: user.password });

    expect(loginResponse.statusCode).toBe(200);

    const getAllresponse = await supertest(app)
      .get("/users")
      .set("Authorization", `Token ${loginResponse.body.token}`);

    expect(getAllresponse.statusCode).toBe(200);
    expect(getAllresponse.body).toHaveProperty("map");
    expect(getAllresponse.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ email: user.email })])
    );
  });

  test("should block users without admin permission from listing all registered users", async () => {
    const user: Partial<User> = Object.assign(generateUser(), { isAdm: false })    

    const createResponse = await supertest(app)
      .post("/users")
      .send({ ...user });

    expect(createResponse.statusCode).toBe(201);

    const loginResponse = await supertest(app)
      .post("/login")
      .send({ email: user.email, password: user.password });

    expect(loginResponse.statusCode).toBe(200);

    const getAllresponse = await supertest(app)
      .get("/users")
      .set("Authorization", `Token ${loginResponse.body.token}`);

    expect(getAllresponse.statusCode).toBe(401);
    expect(getAllresponse.body).toHaveProperty("message");
    expect(getAllresponse.body).toStrictEqual({
      message: "You are not allowed to access this information",
    });
  });
});
