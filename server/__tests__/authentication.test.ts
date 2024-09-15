import axios from "axios";
import { login, callback, token } from "../services/auth.services";

jest.mock("axios");

describe("Spotify Authentication", () => {
  test("should call the spotify endpoint", async () => {
    // Mock the Spotify token API response
    const mockTokenResponse = {
      data: undefined,
    };

    // Mock the axios.post method
    (axios.post as jest.Mock).mockResolvedValue(mockTokenResponse);

    // Call the function that performs Spotify authentication
    await callback({ code: "mock_code" });

    // Assertions
    expect(axios.post).toHaveBeenCalledWith(
      "https://accounts.spotify.com/api/token",
      expect.any(String),
      expect.any(Object),
    );
  });

  test("it should return an empty access token", () => {
    const myToken = token();

    expect(myToken).toBe(undefined);
  });

  test("it should return a redirect url", () => {
    const redirect = login();

    expect(redirect).toContain(`https://accounts.spotify.com/authorize/?`);
  });
});
