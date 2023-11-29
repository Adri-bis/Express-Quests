const request = require("supertest");
const crypto = require("node:crypto");

const app = require("../src/app");
const database = require("../database");
afterAll(() => database.end());

describe("GET /api/users", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});

describe("GET /api/users/:id", () => {
  it("should return one user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no user", async () => {
    const response = await request(app).get("/api/users/0");

    expect(response.status).toEqual(404);
  });
});
describe("POST /api/users", () => {
  it("should return created user", async () => {
    const newUser = {
      firstname: "Adrien",
      lastname: "Occitnie",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Toulouse",
      language: "Frenche",
    };
    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");
    const [result] = await database.query(
      "SELECT * FROM users WHERE id=?",

      response.body.id
    );

    const [userInDatabase] = result;
    expect(userInDatabase).toHaveProperty("id");
    expect(userInDatabase).toHaveProperty("firstname");
    expect(typeof userInDatabase.firstname).toBe("string");
    expect(userInDatabase).toHaveProperty("lastname");
    expect(typeof userInDatabase.lastname).toBe("string");
    expect(userInDatabase).toHaveProperty("email");
    expect(typeof userInDatabase.email).toBe("string");
    expect(userInDatabase).toHaveProperty("city");
    expect(typeof userInDatabase.city).toBe("string");
    expect(userInDatabase).toHaveProperty("language");
    expect(typeof userInDatabase.language).toBe("string");
  });
  it("should return an error", async () => {
    const userWithMissingProps = { firstname: "Adrien" };

    const response = await request(app)
      .post("/api/users")

      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });
});
describe("PUT /api/users/:id", () => {
  it("should edit user", async () => {
    const newUser = {
      firstname: "Adrien",
      lastname: "Occitnie",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Toulouse",
      language: "Frenche",
    };
    const [result] = await database.query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",

      [
        newUser.firstname,
        newUser.lastname,
        newUser.email,
        newUser.city,
        newUser.language,
      ]
    );

    const id = result.insertId;

    const updateUser = {
      firstname: "Paul",
      lastname: "Smithee",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "London",
      language: "English",
    };

    const response = await request(app)
      .put(`/api/users/${id}`)

      .send(updateUser);

    expect(response.status).toEqual(204);

    const [users] = await database.query("SELECT * FROM users WHERE id=?", id);

    const [userInDatabase] = users;

    expect(userInDatabase).toHaveProperty("id");

    expect(userInDatabase).toHaveProperty("firstname");
    expect(userInDatabase.firstname).toStrictEqual(updateUser.firstname);
    expect(typeof userInDatabase.firstname).toBe("string");

    expect(userInDatabase).toHaveProperty("lastname");
    expect(userInDatabase.lastname).toStrictEqual(updateUser.lastname);
    expect(typeof userInDatabase.lastname).toBe("string");

    expect(userInDatabase).toHaveProperty("email");
    expect(userInDatabase.email).toStrictEqual(updateUser.email);
    expect(typeof userInDatabase.email).toBe("string");

    expect(userInDatabase).toHaveProperty("city");
    expect(userInDatabase.city).toStrictEqual(updateUser.city);
    expect(typeof userInDatabase.city).toBe("string");

    expect(userInDatabase).toHaveProperty("language");
    expect(userInDatabase.language).toStrictEqual(updateUser.language);
    expect(typeof userInDatabase.language).toBe("string");
  });

  it("should return an error", async () => {
    const userWithMissingProps = { firstname: "Harry" };

    const response = await request(app)
      .put(`/api/users/1`)

      .send(userWithMissingProps);

    expect(response.status).toEqual(422);
  });
  it("should return no movie", async () => {
    const newMovie = {
      firstname: "Adrien",
      lastname: "Occitnie",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Toulouse",
      language: "Frenche",
    };

    const response = await request(app).put("/api/users/0").send(newMovie);

    expect(response.status).toEqual(404);
  });
});
describe("DELETE /api/users/:id", () => {
  it("should delete user", async () => {
    const response = await request(app).delete("/api/users/1");

    expect(response.status).toEqual(204);
  });

  it("should fund user to delete", async () => {
    const response = await request(app).delete("/api/users/0");

    expect(response.status).toEqual(404);
  });
});
