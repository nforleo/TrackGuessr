import NodeCache from "node-cache";
import { getNTracks } from "../services/game.service";
import { Track } from "../models/Track";

const cache = new NodeCache({ stdTTL: 3600 * 24 });

/**
 * Get the daily tracks. Generate new tracks if there are
 *  no daily ones yet
 */
export const getDailyTrack = async () => {
  if (getCacheSize() === 0) {
    // Add tracks to cache if none exist
    console.log("No tracks in cache.");
    await refresh();
  }

  // Store just the tracks to return
  const tracks: Track[] = [];
  // Get all of the keys in the cache
  const keys = cache.keys();

  keys.forEach((key) => {
    const track = cache.get(key) as Track;
    if (track) {
      tracks.push(track);
    }
  });

  return tracks;
};

/**
 * Refresh the cache
 */
export const refresh = async () => {
  console.log("Filling daily cache...");
  const original = cache.getStats().keys;

  const tracks = await getNTracks(10);

  tracks.forEach((track, i) => {
    cache.set(i, track);
  });

  console.log(
    `Refreshed Daily Cache. Original: ${original} / New: ${getCacheSize()}`,
  );
};

/**
 * This should be 11.
 * @returns number of items in cache
 */
export const getCacheSize = () => {
  return cache.getStats().keys;
};
