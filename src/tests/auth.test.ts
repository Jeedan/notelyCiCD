import { describe, test, expect } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("auth", () => {
  test("authHeader is defined", () => {
    const headers = { authorization: "ApiKey 12345" };
    const apiKey = getAPIKey(headers);
    expect(apiKey).toBeDefined();
  });

  test("getAPIKey extracts the key correctly", () => {
    const headers = { authorization: "ApiKey 12345" };
    const apiKey = getAPIKey(headers);
    expect(apiKey).toBe("12345");
  });

  test("authHeader is empty", () => {
    const apiKey = getAPIKey({});
    expect(apiKey).toBeNull();
  });

  test("authHeader malformed prefix", () => {
    const headers = { authorization: "ad" };

    const apiKey = getAPIKey(headers);
    expect(apiKey).toBeNull();
  });

  test("authHeader malformed casesensitive key", () => {
    const headers = { authorization: "apikey" };

    const apiKey = getAPIKey(headers);
    expect(apiKey).toBeNull();
  });

  test("authHeader missing second part", () => {
    const headers = { authorization: "ApiKey" };

    const apiKey = getAPIKey(headers);
    expect(apiKey).toBeNull();
  });
});
