import test from "node:test";
import assert from "node:assert/strict";

import { countBy, findMaximumKeys } from "./analysis.mjs";

test("countBy counts how often each song appears", () => {
  const events = [
    { song_id: "song-1" },
    { song_id: "song-2" },
    { song_id: "song-1" },
    { song_id: "song-3" },
    { song_id: "song-1" },
  ];

  const counts = countBy(events, (event) => event.song_id);

  assert.equal(counts.get("song-1"), 3);
  assert.equal(counts.get("song-2"), 1);
  assert.equal(counts.get("song-3"), 1);
});

test("findMaximumKeys returns all tied winners", () => {
  const counts = new Map([
    ["song-1", 4],
    ["song-2", 7],
    ["song-3", 7],
    ["song-4", 2],
  ]);

  assert.deepEqual(findMaximumKeys(counts), ["song-2", "song-3"]);
});

test("findMaximumKeys handles an empty map", () => {
  assert.deepEqual(findMaximumKeys(new Map()), []);
});
