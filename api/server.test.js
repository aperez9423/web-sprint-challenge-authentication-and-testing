const supertest = require("supertest")
const server = require("./server")
const db = require('../data/dbConfig')
// Write your tests here
beforeAll(async () => {
  await db('users').truncate();
});

afterAll(async () => {
  await db.destroy()
})

describe ("testing endpoints", () => {
  it("POST /register returns 201", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "test125", password: "test125"})
      expect(res.statusCode).toBe(201)
      expect(res.body.username).toBe("test125")
})

  it("POST /register returns json", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "test123", password: "test123"})
      expect(res.type).toBe("application/json")
})

  it("POST /login returns 200", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "test125", password: "test125"})
      expect(res.statusCode).toBe(200)
})

  it("POST /login returns json message", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({username: "test125", password: "test125"})
      expect(res.type).toBe("application/json")
      expect(res.body.message).toBe("Welcome test125!")
})

  it("GET /jokes return json", async () => {
    const res = await supertest(server).get("/api/jokes")
    expect(res.type).toBe("application/json")
})

  it("GET /jokes to return 401 if not authorized", async () => {
    const res = await supertest(server).get("/api/jokes")
    expect(res.statusCode).toBe(401)
})
})
