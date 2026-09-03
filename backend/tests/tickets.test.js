import { test } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";

test("POST /api/tickets skapar en biljett med kod", async () => {
  const res = await request(app).post("/api/tickets");
  assert.strictEqual(res.status, 201);
  assert.ok(res.body.code);
});

test("GET /api/tickets listar biljetter", async () => {
  const res = await request(app).get("/api/tickets");
  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(res.body));
});

test("POST /api/tickets/:code/use markerar biljetten som använd", async () => {
  const created = await request(app).post("/api/tickets");
  const { code } = created.body;

  const res = await request(app).post(`/api/tickets/${code}/use`);
  assert.strictEqual(res.status, 200);
});

test("POST /api/tickets/:code/use misslyckas om biljetten redan är använd", async () => {
  const created = await request(app).post("/api/tickets");
  const { code } = created.body;

  await request(app).post(`/api/tickets/${code}/use`);
  const res = await request(app).post(`/api/tickets/${code}/use`);
  assert.strictEqual(res.status, 400);
});

test("DELETE /api/tickets/:code raderar en oanvänd biljett", async () => {
  const created = await request(app).post("/api/tickets");
  const { code } = created.body;

  const res = await request(app).delete(`/api/tickets/${code}`);
  assert.strictEqual(res.status, 200);
});

test("DELETE /api/tickets/:code misslyckas om biljetten är använd", async () => {
  const created = await request(app).post("/api/tickets");
  const { code } = created.body;

  await request(app).post(`/api/tickets/${code}/use`);
  const res = await request(app).delete(`/api/tickets/${code}`);
  assert.strictEqual(res.status, 400);
});
