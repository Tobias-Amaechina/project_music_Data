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

// Format a list of song IDs for display.
function songLabels(songIDs) {
  return songIDs.map(songLabel);
}

// Total listening duration for each song.
function listeningTimeBySong(events) {
  const times = new Map();

  for (const event of events) {
    const song = getSong(event.song_id);

    if (!song) continue;

    times.set(
      event.song_id,
      (times.get(event.song_id) ?? 0) +
        song.duration_seconds
    );
  }

  return times;
}

// Convert seconds to a readable duration.
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }

  return `${remainingSeconds}s`;
}

// Questions 1 and 4: most-listened-to song.
function mostListenedSong(events, byTime = false) {
  const totals = byTime
    ? listeningTimeBySong(events)
    : countBy(events, event => event.song_id);

  const ids = findMaximumKeys(totals);

  if (ids.length === 0) return null;

  return {
    songs: songLabels(ids),
    value: byTime
      ? formatDuration(totals.get(ids[0]))
      : totals.get(ids[0]),
  };
}

// Questions 2 and 4: most-listened-to artist.
function mostListenedArtist(events, byTime = false) {
  const totals = new Map();

  for (const event of events) {
    const song = getSong(event.song_id);

    if (!song) continue;

    const value = byTime ? song.duration_seconds : 1;

    totals.set(song.artist, (totals.get(song.artist) ?? 0) + value);
  }
  const artists = findMaximumKeys(totals);

  if (artists.length === 0) return null;

  return {
    artists,
    value: byTime
      ? formatDuration(totals.get(artists[0]))
      : totals.get(artists[0]),
  };
}

// Question 3: Friday night, 17:00 until Saturday 04:00.
// The Saturday portion is 00:00 to before 04:00.
function isFridayNight(event) {
  const date = new Date(event.timestamp);
  const day = date.getDay();
  const seconds = date.getHours() * 3600 +
    date.getMinutes() * 60 +
    date.getSeconds();

  const fridayEvening =
    day === 5 && seconds >= 17 * 3600;

  const saturdayEarly =
    day === 6 && seconds < 4 * 3600;

  return fridayEvening || saturdayEarly;
}