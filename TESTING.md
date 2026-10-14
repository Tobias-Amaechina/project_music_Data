# Testing

This document explains how I tested the requirements of the Music Data Project.

## 1. User selection

**Requirement:** The user can select one of the four available users from a dropdown menu.

**Testing method:** Manual testing in the browser.

**Steps:**
1. I open the website.
2. I checked that the dropdown displays all four users.
3. I select each user in turn.
4. I confirm that the displayed results update when the selected user changes.

**Result:**  All the four users worked correctly 

## 2. Music listening analysis

**Requirement:** The website answers the music listening questions using the supplied data.

**Testing method:** Manual testing and comparison with the supplied data.

**Steps:**
1. I selected a user from the dropdown.
2. I check each displayed answer.
3. I compared the results with the listening events and song information supplied in `data.mjs`.
4. I repeated for other users.
5. I confirm that the answers update when a different user is selected.

**Result:** Each   displayed answers for the selected users matches the information supplied in the README.md file

## 3. Empty listening history

**Requirement:** The website handles a user with no listening events.

**Testing method:** Manual testing in the browser.

**Steps:**
1.I  selected User 4, who is expected to have no listening events.
2.I check that the website displays an appropriate empty-state message.
3.I confirm that no errors occur and that the page remains usable.

**Result:** When User 4 was selected, this messages was displayed "This user didn't listen to any songs." as requested in the README.md file

## 4. Fewer than three genres

**Requirement:** The website handles users who have listened to fewer than three different genres.

**Testing method:** Manual testing using the supplied data.

**Steps:**
1. I selected a user whose listening history contains fewer than three genres, if available.
2. I checked any question that asks for the top three genres.
3. I confirmed that the website displays the available results without inventing genres or displaying errors.

**Result:** user 2 display pop did not say "top 3 genres"

## 5. Automated unit tests

**Requirement:** The music analysis functions produce the expected results.

**Testing method:** Unit tests in `analysis.test.mjs`.

**Steps:**
1. I ran `npm test` from the project directory.
2. And checked the terminal output for passing and failing tests.
3. I confirmed that the tests cover the relevant analysis functions and expected results.
4. I fixed any failing tests and run the tests again.

**Result:** analyseUser() returns empty=true when user has no events (5.681063ms)
✔ analyseUser() returns answers in correct order for user1 (10.247157ms)
✔ User 1 expected results (8.507407ms)
✔ User 2 expected results (6.09401ms)
✔ User 3 expected results (2.0384)

## 6. Accessibility

**Requirement:** The website meets the accessibility target specified in the project rubric.

**Testing method:** Lighthouse accessibility audit and manual keyboard testing.

**Steps:**
1. Open the deployed website in Chrome.
2. Open Chrome DevTools.
3. Run a Lighthouse audit with the Accessibility category selected.
4. Check the accessibility score and any reported issues.
5. Navigate the page using the keyboard and check that the dropdown and other interactive elements can be used without a mouse.

**Result:** Was able to navigate the page and select users using keyboard, lighthouse snapshot for the four users scored 14/14, and  navigation scored 100%

## 7. Deployment

**Requirement:** The website is publicly accessible and updates when changes are merged into the configured deployment branch.

**Testing method:** Manual browser testing and deployment verification.

**Steps:**
1. Open the published website using its GitHub Pages URL.
2. Confirm that the page loads correctly.
3. Test the user dropdown and the displayed results.
4. After merging a change into the configured publishing branch, check that GitHub Pages completes deployment.
5. Confirm that the updated website is available online.

**Result:** I can confirm that the page loads correctly  and available at :https://tobias-amaechina.github.io/project_music_Data/


