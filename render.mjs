export function renderResults(summary) {
  const results = document.querySelector("#results");
  results.replaceChildren();

  const heading = document.createElement("h2");
  heading.id = "results-heading";
  heading.textContent = "Listening statistics";
  results.setAttribute("aria-labelledby", "results-heading");
  results.setAttribute("aria-busy", "false");
  results.append(heading);

  if (summary.empty) {
    const message = document.createElement("p");
    message.textContent = "This user didn't listen to any songs.";
    results.append(message);
    return;
  }

  for (const answer of summary.answers) {
    const line = document.createElement("p");

    const label = document.createElement("strong");
    label.textContent = answer.question + ": ";
    line.append(label);

    const result = answer.result;

    let text = "";

    if (Array.isArray(result)) {
      text = result.join(", ");
    } else if (result.songs) {
      text = result.songs.join(", ");

      if (result.length !== undefined) {
        text += ` (length: ${result.length})`;
      }

      if (result.value !== undefined) {
        text += ` — ${result.value}`;
      }
    } else if (result.artists) {
      text = result.artists.join(", ");

      if (result.value !== undefined) {
        text += ` — ${result.value}`;
      }
    } else {
      text = String(result);
    }

    line.append(text);
    results.append(line);
  }
}
