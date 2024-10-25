import axios from "axios";
import * as gameService from "../services/game.service";
import * as authService from "../services/auth.services";
import { AccessToken } from "../models/AccessToken";
import { Track, TracksResponse } from "../models/Track";
import { response } from "express";

jest.mock("axios");

describe("It should test the game logic", () => {
  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should start playing a song on spotify", async () => {
    jest.spyOn(authService, "token").mockReturnValueOnce({
      access_token: "valid_token",
      token_type: "Bearer",
      scope: "scopes",
      expires_in: 3600,
      refresh_token: "refresh_token",
    } as AccessToken);

    await gameService.playSong("spotify_uri");

    expect(axios.put).toHaveBeenCalledWith(
      "https://api.spotify.com/v1/me/player/play",
      { position_ms: 0, uris: ["spotify_uri"] },
      { headers: { Authorization: "Bearer valid_token" } },
    );
  });

  it("should fail if no uri provided", async () => {
    jest.spyOn(authService, "token").mockReturnValue({} as AccessToken);

    await expect(gameService.playSong("")).rejects.toThrow(`No URI provided`);
  });

  it("should return 11 daily tracks for getDailyTracks", async () => {
    const mockTracks: Track[] = [];
    for (let i = 0; i < 11; i++) {
      mockTracks.push({
        id: "track_id",
        revealed: false,
        year: 1999,
        artist: "artist_name",
        title: "track_name",
        album: "album_name",
      });
    }

    jest.spyOn(authService, "token").mockReturnValueOnce({
      access_token: "valid_token",
      token_type: "Bearer",
      scope: "scopes",
      expires_in: 3600,
      refresh_token: "refresh_token",
    } as AccessToken);

    jest.spyOn(gameService, "getNTracks").mockResolvedValueOnce(mockTracks);

    const tracks = await gameService.getDailyTracks();

    expect(tracks.length).toBe(11);
  });

  it("should format tracks for the front end", () => {
    const data = gameService.formatTracksForFrontEnd([
      {
        album: {
          name: "album_name",
          release_date: "1999",
        },
        artists: [
          {
            name: "artist_name",
          },
        ],
        name: "track_name",
        uri: "spotify_uri",
      },
    ]);

    const response = {
      id: "spotify_uri",
      revealed: false,
      year: 1999,
      artist: "artist_name",
      title: "track_name",
      album: "album_name",
    };

    expect(data[0].id).toBe(response.id);
  });

  it("should return 11 tracks with getNTracks(10)", async () => {
    const playListSongs = {
      items: [
        {
          track: {
            album: {
              name: "album_name",
              release_date: "1999",
            },
            artists: [
              {
                name: "artist_name",
              },
            ],
            name: "track_name",
            uri: "spotify_uri",
          },
        },
        {
          track: {
            album: {
              name: "album_name",
              release_date: "1999",
            },
            artists: [
              {
                name: "artist_name",
              },
            ],
            name: "track_name",
            uri: "spotify_uri",
          },
        },
        {
          track: {
            album: {
              name: "album_name",
              release_date: "1999",
            },
            artists: [
              {
                name: "artist_name",
              },
            ],
            name: "track_name",
            uri: "spotify_uri",
          },
        },
        {
          track: {
            album: {
              name: "album_name",
              release_date: "1999",
            },
            artists: [
              {
                name: "artist_name",
              },
            ],
            name: "track_name",
            uri: "spotify_uri",
          },
        },
        {
          track: {
            album: {
              name: "album_name",
              release_date: "1999",
            },
            artists: [
              {
                name: "artist_name",
              },
            ],
            name: "track_name",
            uri: "spotify_uri",
          },
        },
        {
          track: {
            album: {
              name: "album_name",
              release_date: "1999",
            },
            artists: [
              {
                name: "artist_name",
              },
            ],
            name: "track_name",
            uri: "spotify_uri",
          },
        },
        {
          track: {
            album: {
              name: "album_name",
              release_date: "1999",
            },
            artists: [
              {
                name: "artist_name",
              },
            ],
            name: "track_name",
            uri: "spotify_uri",
          },
        },
        {
          track: {
            album: {
              name: "album_name",
              release_date: "1999",
            },
            artists: [
              {
                name: "artist_name",
              },
            ],
            name: "track_name",
            uri: "spotify_uri",
          },
        },
        {
          track: {
            album: {
              name: "album_name",
              release_date: "1999",
            },
            artists: [
              {
                name: "artist_name",
              },
            ],
            name: "track_name",
            uri: "spotify_uri",
          },
        },
        {
          track: {
            album: {
              name: "album_name",
              release_date: "1999",
            },
            artists: [
              {
                name: "artist_name",
              },
            ],
            name: "track_name",
            uri: "spotify_uri",
          },
        },
        {
          track: {
            album: {
              name: "album_name",
              release_date: "1999",
            },
            artists: [
              {
                name: "artist_name",
              },
            ],
            name: "track_name",
            uri: "spotify_uri",
          },
        },
      ],
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: playListSongs });

    const nTracks = await gameService.getNTracks(10);
    expect(nTracks.length).toBe(11);
  });
});
