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
    const article = document.createElement("article");
    const question = document.createElement("h3");
    question.textContent = answer.question;

    const output = document.createElement("p");
    const result = answer.result;

    if (Array.isArray(result)) {
      output.textContent = result.join(", ");
    } else if (result.songs) {
      output.textContent = result.songs.join(", ");

      if (result.length !== undefined) {
        output.textContent += ` (length: ${result.length})`;
      }

      if (result.value !== undefined) {
        output.textContent += ` — ${result.value}`;
      }
    } else if (result.artists) {
      output.textContent = result.artists.join(", ");

      if (result.value !== undefined) {
        output.textContent += ` — ${result.value}`;
      }
    } else {
      output.textContent = String(result);
    }

    article.append(question, output);
    results.append(article);
  }
}
