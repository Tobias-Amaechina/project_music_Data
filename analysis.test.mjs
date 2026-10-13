import test from "node:test";
import assert from "node:assert/strict";
import { analyseUser } from "./analysis.mjs";

// Helper: map question → result
function mapResults(summary) {
  const map = {};
  for (const ans of summary.answers) {
    map[ans.question] = ans.result;
  }
  return map;
}

test("analyseUser() returns empty=true when user has no events", () => {
  const summary = analyseUser("nonexistent-user");
  assert.equal(summary.empty, true);
  assert.equal(summary.answers.length, 0);
});

test("analyseUser() returns answers in correct order for user1", () => {
  const summary = analyseUser("1");
  const questions = summary.answers.map((a) => a.question);

  assert.deepEqual(questions, [
    "Most listened song (count)",
    "Most listened song (time)",
    "Most listened artist (count)",
    "Most listened artist (time)",
    "Friday night song (count)",
    "Friday night song (time)",
    "Longest streak song",
    "Every day songs",
    "Top genres",
  ]);
});

test("User 1 expected results", () => {
  const summary = analyseUser("1");
  const results = mapResults(summary);

  assert.deepEqual(results["Most listened song (count)"].songs, [
    "The Swell Season - When Your Mind's Made Up",
  ]);

  assert.deepEqual(results["Most listened song (time)"].songs, [
    "Faithless - Insomnia",
  ]);

  assert.deepEqual(results["Most listened artist (count)"].artists, [
    "Frank Turner",
  ]);

  assert.deepEqual(results["Most listened artist (time)"].artists, [
    "Frank Turner",
  ]);

  assert.deepEqual(results["Friday night song (count)"].songs, [
    "The Swell Season - When Your Mind's Made Up",
  ]);

  assert.deepEqual(results["Friday night song (time)"].songs, [
    "The Swell Season - When Your Mind's Made Up",
  ]);

  assert.deepEqual(results["Longest streak song"].songs, [
    "The King Blues - I Got Love",
  ]);
  assert.equal(results["Longest streak song"].length, 34);

  assert.deepEqual(results["Every day songs"], [
    "The Swell Season - When Your Mind's Made Up",
  ]);

  assert.deepEqual(results["Top genres"], ["Pop", "Folk", "Punk"]);
});

test("User 2 expected results", () => {
  const summary = analyseUser("2");
  const results = mapResults(summary);

  assert.deepEqual(results["Most listened song (count)"].songs, [
    "Frank Turner - I Still Believe",
  ]);

  assert.deepEqual(results["Most listened song (time)"].songs, [
    "Frank Turner - I Still Believe",
  ]);

  assert.deepEqual(results["Most listened artist (count)"].artists, [
    "Frank Turner",
  ]);

  assert.deepEqual(results["Most listened artist (time)"].artists, [
    "Frank Turner",
  ]);

  assert.deepEqual(results["Friday night song (count)"].songs, [
    "Frank Turner - I Still Believe",
  ]);

  assert.deepEqual(results["Friday night song (time)"].songs, [
    "Frank Turner - Photosynthesis",
  ]);

  assert.deepEqual(results["Longest streak song"].songs, [
    "Frank Turner - I Still Believe",
  ]);
  assert.equal(results["Longest streak song"].length, 44);

  assert.deepEqual(results["Every day songs"], [
    "Frank Turner - Photosynthesis",
    "The Divine Comedy - Tonight We Fly",
  ]);

  assert.deepEqual(results["Top genres"], ["Pop"]);
});

test("User 3 expected results", () => {
  const summary = analyseUser("3");
  const results = mapResults(summary);

  assert.deepEqual(results["Most listened song (count)"].songs, [
    "Frank Turner - Be More Kind",
  ]);

  assert.deepEqual(results["Most listened song (time)"].songs, [
    "Faithless - Insomnia",
  ]);

  assert.deepEqual(results["Most listened artist (count)"].artists, [
    "Frank Turner",
  ]);

  assert.deepEqual(results["Most listened artist (time)"].artists, [
    "Frank Turner",
  ]);

  // Friday night questions must be omitted
  assert.equal(results["Friday night song (count)"], undefined);
  assert.equal(results["Friday night song (time)"], undefined);

  // Longest streak: two songs with same length
  assert.deepEqual(
    results["Longest streak song"].songs.sort(),
    [
      "The Divine Comedy - Tonight We Fly",
      "Frank Turner - Be More Kind",
    ].sort(),
  );
  assert.equal(results["Longest streak song"].length, 42);

  // Every day songs must be omitted
  assert.equal(results["Every day songs"], undefined);

  assert.deepEqual(results["Top genres"], ["Pop", "Folk", "House"]);
});
