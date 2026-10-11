import { getSong, getListenEvents } from "./data.mjs";

// Count how often each key appears.
export function countBy(items, getKey) {
  const counts = new Map();

  for (const item of items) {
    const key = getKey(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return counts;
}

// Return every key tied for the highest value.
export function findMaximumKeys(counts) {
  if (counts.size === 0) return [];

  const maximum = Math.max(...counts.values());

  return [...counts.entries()]
    .filter(([, value]) => value === maximum)
    .map(([key]) => key);
}

// Convert a song into a readable label.
export function songLabel(songID) {
  const song = getSong(songID);

  if (!song) return "Unknown song";

  return `${song.artist} - ${song.title}`;
}