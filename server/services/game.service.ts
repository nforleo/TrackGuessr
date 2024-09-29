import axios from "axios";
import { token } from "./auth.services";
import { Track, TrackFromSpotify, TracksResponse } from "../models/Track";
import * as dailyCache from "../caches/daily";

const TRACKGSSR_PLAYLIST_ID = "6zNR5uU4OfgkmOSp0huNS4";

/**
 * Formats Tracks from Spotify to what the front end expects
 * @param tracks Track data in format of Spotify Response
 * @returns Array of formatted tracks for front end
 */
export const formatTracksForFrontEnd = (
  tracks: TrackFromSpotify[],
): Track[] => {
  return tracks.reduce((tracksArr: Track[], track: TrackFromSpotify) => {
    tracksArr.push({
      id: track.uri,
      revealed: false,
      year: parseInt(track.album?.release_date?.substring(0, 4) || "-1"),
      artist: track.artists[0].name,
      title: track.name,
    });

    return tracksArr;
  }, []);
};

/**
 * Uses the Las Vegas Randomized Algorithm (https://en.wikipedia.org/wiki/Las_Vegas_algorithm)
 *  to selected n random tracks from the Spotfy playlist that is used to store pool of tracks
 *  that the game will use.
 * @param playlist Playlist of tracks as returned from Spotify endpoint
 * @param n The number of tracks to include in the array
 * @returns An array of n random tracks
 */
export const selectNRandomTracks = (
  playlist: TracksResponse,
  n?: number,
): Track[] => {
  if (n === undefined) {
    // Default to 10 (number needed for Daily game mode)
    n = 10;
  }

  // Add 1 to n since we will need a track card to start with
  n = n + 1;

  // Get the total number of tracks in the playlist
  const playlistLen = playlist.tracks.items.length;

  // Create array to hold tracks
  const selectedTracks: TrackFromSpotify[] = [];

  if (playlistLen < n) {
    // If n is bigger than all the songs in the playlist, then return the while playlist

    // Flatten Playlist so that it can be formatted
    for (let i = 0; i < playlistLen; i++) {
      selectedTracks.push(playlist.tracks.items[i].track);
    }
  } else {
    // Else process just the selected tracks

    // Avoid duplicates by using a Set of Indices
    const indices = new Set();

    while (selectedTracks.length < n) {
      // Generate a random integer, x, to index playlist where 0 <= x < n
      const randomIndex = Math.floor(Math.random() * n);

      if (!indices.has(randomIndex)) {
        selectedTracks.push(playlist.tracks.items[randomIndex].track);
        indices.add(randomIndex);
      }
    }
  }

  // Format and return tracks
  return formatTracksForFrontEnd(selectedTracks);
};

/**
 * Get the tracks to be used for the Daily or Custom game
 */
export const getNTracks = async (n: number): Promise<Track[]> => {
  console.log("getNTracks n", n);
  const accessToken = token();

  if (!accessToken) {
    throw new Error(`Application not Authenticated`);
  }
  console.log("getNTracks got token, calling get request");
  const { data } = await axios.get(
    `https://api.spotify.com/v1/playlists/${TRACKGSSR_PLAYLIST_ID}`,
    {
      params: {
        fields:
          "tracks.items.track(name,uri,album(name,release_date),artists(name))",
      },
      headers: {
        Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
      },
    },
  );

  return selectNRandomTracks(data as TracksResponse, n);
};

export const getDailyTracks = async (): Promise<Track[]> => {
  return dailyCache.getDailyTrack();
};

export const playSong = async (uri: string): Promise<void> => {
  if (!uri) {
    throw new Error(`No URI provided`);
  }

  const accessToken = token();

  if (!accessToken) {
    throw new Error(`Application not Authenticated`);
  }

  await axios.put(
    `https://api.spotify.com/v1/me/player/play`,
    {
      uris: [uri],
      position_ms: 0,
    },
    {
      headers: {
        Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
      },
    },
  );
};
