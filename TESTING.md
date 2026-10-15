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
3. I compared the results with the listening events and song information supplied in `README.md`.
4. I repeated for other users 1-4.
5. I confirm that the answers update when a different user is selected.

**Result:** Each   displayed answers for the selected users matches the information supplied in the README.md file

for user 1: Most listened song (count): The Swell Season - When Your Mind's Made Up

Most listened song (time): Faithless - Insomnia

Most listened artist (count): Frank Turner

Most listened artist (time): Frank Turner

Friday night song (count): The Swell Season - When Your Mind's Made Up

Friday night song (time): The Swell Season - When Your Mind's Made Up

Longest streak song: The King Blues - I Got Love (length: 34)

Every day songs: The Swell Season - When Your Mind's Made Up

Top genres: Pop, Folk, Punk

for user2:Most listened song (count): Frank Turner - I Still Believe

Most listened song (time): Frank Turner - I Still Believe

Most listened artist (count): Frank Turner

Most listened artist (time): Frank Turner

Friday night song (count): Frank Turner - I Still Believe

Friday night song (time): Frank Turner - Photosynthesis

Longest streak song: Frank Turner - I Still Believe (length: 44)

Every day songs: Frank Turner - Photosynthesis, The Divine Comedy - Tonight We Fly

Top genres: Pop

for user 3:Most listened song (count): Frank Turner - Be More Kind

Most listened song (time): Faithless - Insomnia

Most listened artist (count): Frank Turner

Most listened artist (time): Frank Turner

Longest streak song: The Divine Comedy - Tonight We Fly, Frank Turner - Be More Kind (length: 42)

Top genres: Pop, Folk, House

for user 4:This user didn't listen to any songs.



## 3. Empty listening history

**Requirement:** The website handles a user with no listening events.

**Testing method:** Manual testing in the browser.

**Steps:**
1.I  selected User 4, who is expected to have no listening events.
2.I check that the website displays an appropriate empty-state message.
3.I confirm that no errors occur and that the page remains usable.

**Result:** When User 4 was selected, this messages was displayed "This user didn't listen to any songs." as requested in the README.md file

## 4. question doesn't apply

**Requirement:** The website handles users whose question does not apply, it hides both the question and the answer

**Testing method:** Manual testing using the supplied data and in the browser.

**Steps:**
1. I selected a user who has no result for the particular question asked .
2. I checked for any question where there is no answer .
3. I confirmed that the website completely hid both the question and the answer.

**Result:** user 3 completely hid both the questions and Answers for Friday night song (count),Friday night song (time) and Every day songs"




## 5. Fewer than three genres

**Requirement:** The website handles users who have listened to fewer than three different genres.

**Testing method:** Manual testing using the supplied data and in the browser.

**Steps:**
1. I selected a user whose listening history contains fewer than three genres, if available.
2. I checked any question that asks for the top three genres.
3. I confirmed that the website displays the available results without inventing genres or displaying errors.

**Result:** user 2 display pop, did not say "top 3 genres"

## 6.Unit tests in `analysis.test.mjs'.

**Requirement:** The music analysis functions produce the expected results.

**Testing method:** Unit tests in `analysis.test.mjs`.

**Steps:**
1. I ran `npm test` from the project directory.
2. And checked the terminal output for passing and failing tests.
3. I confirmed that the tests cover the relevant analysis functions and expected results.
4. I fixed any failing tests and run the tests again.

**Result:** the non-trivial test is the User 3 expected results
1. The Removal of Friday-night questions 
2. The removal of empty "everyday songs"
3. correct longest streak tie handling
4. correct genre ranking

## 7. Accessibility

**Requirement:** The website meets the accessibility target specified in the project rubric.

**Testing method:** Lighthouse accessibility audit and manual keyboard testing.

**Steps:**
1. Open the deployed website in Chrome.
2. Open Chrome DevTools.
3. Run a Lighthouse audit with the Accessibility category, both snapshot and navigation  selected.
4. Check the accessibility score and any reported issues.
5. Navigate the page using the keyboard and check that the dropdown and other interactive elements can be used without a mouse.

**Result:** Was able to navigate the page and select users using keyboard, lighthouse snapshot for the four users scored 14/14, and  navigation scored 100%

## 8. Deployment

**Requirement:** The website is publicly accessible and updates when changes are merged into the configured deployment branch.

**Testing method:** Manual browser testing and deployment verification.

**Steps:**
1. Open the published website using its GitHub Pages URL.
2. Confirm that the page loads correctly.
3. Test the user dropdown and the displayed results.
4. After merging a change into the configured publishing branch, check that GitHub Pages completes deployment.
5. Confirm that the updated website is available online.

**Result:** I can confirm that the page loads correctly  and available at :https://tobias-amaechina.github.io/project_music_Data/


