import { getSong, getListenEvents } from "./data.mjs";


// Utility helpers

export function countBy(items, getKey) {
  const counts = new Map();
  for (const item of items) {
    const key = getKey(item);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

export function findMaximumKeys(counts) {
  if (counts.size === 0) return [];
  const max = Math.max(...counts.values());
  return [...counts.entries()]
    .filter(([, value]) => value === max)
    .map(([key]) => key);
}

function songLabel(id) {
  const song = getSong(id);
  return song ? `${song.artist} - ${song.title}` : "Unknown song";
}

function songLabels(ids) {
  return ids.map(songLabel);
}

function listeningTimeBySong(events) {
  const totals = new Map();
  for (const event of events) {
    const song = getSong(event.song_id);
    if (!song) continue;
    totals.set(
      event.song_id,
      (totals.get(event.song_id) ?? 0) + song.duration_seconds,
    );
  }
  return totals;
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}


  // Core analysis


function mostListenedSong(events, byTime = false) {
  const totals = byTime
    ? listeningTimeBySong(events)
    : countBy(events, (e) => e.song_id);

  const ids = findMaximumKeys(totals);
  if (ids.length === 0) return null;

  // UI rule: hide counts and durations
  return {
    songs: songLabels(ids),
    value: undefined,
  };
}

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

  // UI rule: hide counts and durations
  return {
    artists,
    value: undefined,
  };
}

function isFridayNight(event) {
  const date = new Date(event.timestamp);
  const day = date.getDay();
  const seconds =
    date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

  const fridayEvening = day === 5 && seconds >= 17 * 3600;
  const saturdayEarly = day === 6 && seconds < 4 * 3600;

  return fridayEvening || saturdayEarly;
}
function longestStreak(events) {
  if (events.length === 0) return null;

  let current = events[0].song_id;
  let currentLen = 1;
  let maxLen = 1;
  let winners = [current];

  for (let i = 1; i < events.length; i++) {
    const id = events[i].song_id;

    if (id === current) {
      currentLen++;
    } else {
      current = id;
      currentLen = 1;
    }

    if (currentLen > maxLen) {
      maxLen = currentLen;
      winners = [current];
    } else if (currentLen === maxLen && !winners.includes(current)) {
      winners.push(current);
    }
  }

  return {
    songs: songLabels(winners),
    length: maxLen,
  };
}


function songsListenedEveryDay(events) {
  if (events.length === 0) return [];

  const songsByDay = new Map();

  for (const event of events) {
    const day = event.timestamp.slice(0, 10);
    if (!songsByDay.has(day)) songsByDay.set(day, new Set());
    songsByDay.get(day).add(event.song_id);
  }

  const daySets = [...songsByDay.values()];
  const firstDaySongs = daySets[0];

  return [...firstDaySongs]
    .filter((id) => daySets.every((set) => set.has(id)))
    .map(songLabel);
}

function topGenres(events) {
  const counts = new Map();

  for (const event of events) {
    const song = getSong(event.song_id);
    if (!song) continue;
    counts.set(song.genre, (counts.get(song.genre) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genre]) => genre);
}


   //Main entry


export function analyseUser(userID) {
  const events = getListenEvents(userID) ?? [];

  if (events.length === 0) {
    return { empty: true, answers: [] };
  }

  const fridayEvents = events.filter(isFridayNight);

  const answers = [
    {
      question: "Most listened song (count)",
      result: mostListenedSong(events, false),
    },
    {
      question: "Most listened song (time)",
      result: mostListenedSong(events, true),
    },

    {
      question: "Most listened artist (count)",
      result: mostListenedArtist(events, false),
    },
    {
      question: "Most listened artist (time)",
      result: mostListenedArtist(events, true),
    },

    {
      question: "Friday night song (count)",
      result: mostListenedSong(fridayEvents, false),
    },
    {
      question: "Friday night song (time)",
      result: mostListenedSong(fridayEvents, true),
    },

    { question: "Longest streak song", result: longestStreak(events) },

    { question: "Every day songs", result: songsListenedEveryDay(events) },

    { question: "Top genres", result: topGenres(events) },
  ];

  return {
    empty: false,

    answers: answers.filter((a) => {
      const r = a.result;

      // Remove null results (Friday night for User 3)
      if (r === null) return false;

      // Remove empty arrays (Every day songs for User 3)
      if (Array.isArray(r)) return r.length > 0;

      // KEEP ALL OBJECTS (songs, artists, streak)
      return true;
    }),
  };
}
