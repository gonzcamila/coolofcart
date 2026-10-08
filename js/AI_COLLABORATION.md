This documents how I used AI as a development partner while building my  web application. The goal isnt for AI to write the app for me, but to work with it as a tool that understand new concepts, debug issues, refine my design, and rebuild the project when the structure didn’t feel right.

Tools Used
Claude (claude.ai, in a browser and in vsc)
The only AI agent i used for brainstorming, planning, and building the app one feature
at a time, with an explanation of each part.


 Learning Moments

the dates in js was part of my new skill
Date.now() gives the current time as one number
48 hours is `48 * 60 * 60 * 1000` milliseconds. Writing it as multiplication
shows what it means.
Saving the unlock time instead of a countdown is what keeps the app correct
A countdown would stop when I close the browser, but a saved time can always
be compared to now.
Math.floor rounds down, and gives the leftover hours after full days.

**Form accessibility**
- `<label for="...">` connects each label to its input, so screen readers
  read it.
- `role="alert"` makes screen readers announce error messages right away.
- `novalidate` turns off the browser's pop-ups so my JavaScript shows my own
  error messages.
- `aria-label` on the Buy and Skip buttons makes a screen reader say "Skip
  black boots" instead of just "Skip it" for every item.

**try / catch**
If the saved data is broken, `JSON.parse` would crash the whole page. `try`
attempts it, and `catch` runs instead if it fails, so the app starts with an
empty cart and explains why.

**Running total**
`getMoneySaved` starts at 0 and goes through every item, adding the price of
each skipped one. The total isn't saved; it's calculated from the statuses, so
it can't get out of sync.

## 3. Challenges

**My CSS wasn't loading on the live site**
The JavaScript worked, but the page showed the browser's default style. The
browser couldn't find `css/styles.css`. [Say what the actual cause was and how
you fixed it.]

**Pasting code twice**
When I added the Buy and Skip buttons, I pasted the new code below the old code
instead of replacing it. JavaScript doesn't allow `const COOL_OFF_MS` to be
created twice, so the whole script stopped. Replacing the file fixed it.

**Reusing the wrong stylesheet**
I pasted my portfolio's stylesheet, but it had no form or button styles, so my
buttons would have been the browser's default gray, the same problem my
dashboard had. I kept my portfolio's colors and fonts and added form and
button styles.

**Testing something that takes 48 hours**
I couldn't wait two days to test unlocking, so I changed the cool-off to one
minute while building and changed it back before submitting.

## 4. Process Evolution

At the start, my prompts were broad: I asked for app ideas based on my
interests (F1, going out on 7th Street, fashion, and online shopping). In
Project 3's optional labs, I mostly asked for whole files to paste. For Zed, I
changed my approach: I built one feature at a time in order (page structure,
saving an item, the date math, the Buy and Skip buttons, then styling) and asked
for an explanation of each part, because I have to explain every line at the
walkthrough. I also told Claude to keep everything vanilla and avoid anything
fancy, so the code only uses what I learned in the labs plus one new technique.
Later, my prompts were more about checking and fixing my own work, like sending
a screenshot when my CSS didn't load and asking if all my code was vanilla.

[Add anything else about how your prompting changed.]

## 5. Sample Conversations

**Conversation 1 — Brainstorming and choosing the idea (Mon. Oct. 5)**

My prompt: "help me brainstorm with the Project Zed assignment", then "i
like f1, going out to bars, fashio, online shopping"
AI response (summary): Claude suggested an F1 Lights Out reaction game, a
night-out planner, a cool-off cart, a cost-per-wear tracker, and an outfit
builder. I also asked about a roommate chore wheel and a beer pong game.
My decision: I chose the cool-off cart because it was something i would actually used and it for one person the reason i passed on the chore wheel because localStorage only saves on one device so roommates wouldn't see the same info, and on beer pong it would be too much to learn and explain.

**Conversation 2 — Teach Me a Concept: dates in JavaScript (Thu. Oct. 8)**
(required)

- My prompt: [what you asked]
- AI response (summary): Claude explained `Date.now()`, how to turn 48 hours
  into milliseconds, how to calculate the unlock time and the time left, how to
  turn milliseconds into days and hours, and why saving the unlock time works
  better than a countdown. It suggested changing the cool-off to one minute for
  testing.
- What I learned: [In your own words. You could include the check question:
  an item with 50 hours left shows 2 days and 2 hours.]

Conversation 3 — Debugging: CSS not loading (Thu. Oct. 8)
My prompt: A screenshot of my live site and "ok i comitted but my css aint
showing"
AI response (summary): Claude checked the live site and found the browser
couldn't find `css/styles.css`. It said GitHub Pages needs the file name to
match exactly, including capital letters, and listed likely causes. It also
noticed an extra `zed` folder in my repo and that my log wasn't at the top
level.
What I learned: what i learned was that when creating the repository on github desktop a duplicate folder was created so i had to delete the duplicate file and the reason wht my css wasnt loading was because i had a spelling error it was style.css instead on styles.css once that was fixed my css loaded and changed the look of the web app.

**Conversation 4 — Debugging: the page stopped working after adding buttons
(Thu. Oct. 8)**

- My prompt: I pasted my whole `app.js` and asked "how does this look is there any grammer or duplicates"
- AI response (summary): Claude found the step 3 code pasted below the step 2
  code, so `COOL_OFF_MS` was declared twice, which stops the whole script. It
  showed me which half to delete.
- What I learned: when doing my js i would go back and fourth so i ended up typing it double and didnt realize until my page wasnt working properly.

**Conversation 5 — Building the Buy and Skip decision (Thu. Oct. 8)**

- My prompt: "ok bet ready for the next step"
- AI response (summary): Claude wrote `decideItem` to change an item's status,
  `getMoneySaved` to add up skipped prices, and the Buy and Skip buttons, and
  explained each part.
- What I learned: [One thing, for example how the running total works.]

## 6. Code Understanding

**How the code was made**
Claude wrote most of the code for this app, one feature at a time, with an
explanation of each part. I pasted it in, tested each feature before moving on,
and asked questions when something didn't work. [Add anything you changed or
wrote yourself, if you did.]

**How I checked it worked**
- Adding items with no name and no price to see the error messages
- Changing the cool-off to one minute to watch items move to "Ready to decide"
- Clicking Skip and Buy, and checking the money-saved total
- Refreshing to make sure items and the total stayed
- [Add the failure-case tests when you do them: broken saved data and an
  empty cart.]

**What I can explain at the walkthrough**
[Be honest. List the parts you understand well, like the date math, and any
parts you're still working on understanding before Oct. 16.]

