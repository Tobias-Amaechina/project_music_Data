

import { getUserIDs } from "./data.mjs";
import { analyseUser } from "./analysis.mjs";
import { renderResults } from "./render.mjs";

const userSelect = document.querySelector("#user-select");
const results = document.querySelector("#results");

function populateUsers() {
  for (const userID of getUserIDs()) {
    const option = document.createElement("option");

    option.value = userID;
    option.textContent = `User ${userID}`;

    userSelect.append(option);
  }
}

function handleUserChange() {
  const userID = userSelect.value;

  if (!userID) {
    renderResults({
      empty: false,
      answers: [],
    });

    const message = document.createElement("p");
    message.textContent = "Select a user to see their results.";
    results.append(message);
    return;
  }

  results.setAttribute("aria-busy", "true");

  const summary = analyseUser(userID);
  renderResults(summary);
}

populateUsers();
userSelect.addEventListener("change", handleUserChange);
