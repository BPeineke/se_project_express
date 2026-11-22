/* global describe, it */
const request = require("supertest");
const app = require("./app");

describe("HTTP endpoints", () => {
  it("returns the JSON 404 response for an unknown route", () =>
    request(app)
      .get("/unknown-route")
      .expect(404)
      .expect({ message: "Requested resource not found" }));
});
