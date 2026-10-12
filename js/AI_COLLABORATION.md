This is how I used AI as a partner while building my  web app. The goal isnt for AI to write the app for me, but to work with it as a tool that understand new concepts, debug issues, refine my design, and rebuild the project when the structure didn’t feel right.

Tools Used
Claude -claude.ai, in a browser and in vsc
The only AI i used for brainstorming, planning, and building the app one feature at a time, with an explanation of each par

Learning Moments

the dates in js was part of my new skill
Date.now() gives the current time as one number
48 hours is `48 * 60 * 60 * 1000` milliseconds. 
Saving the unlock time instead of a countdown is what keeps the app correct
A countdown would stop when I close the browser but a saved time can always
be compared to now.
Math.floor rounds down, and gives the leftover hours after full days.


Running total
getMoneySaved` starts at 0 and goesevery item, adding the price of each skipped one. The total isn't saved it's calculated so it can't get out of sync


Reusing the css from my portfolio
I pasted my portfolio's stylesheet but it had no form or button style so my
buttons would have been the browser's default gray, the same problem my
dashboard had. I kept my portfolio's colors and fonts and added form and
button styles


Process

At the start, my prompts were broad: I asked for app ideas based on my
interests (F1, going out, fashion, and online shopping). 

I told Claude to keep everything vanilla and avoid anything
fancy, so the code was stuff i learned in the labs plus one new skill

after my prompts were more about checking and fixing my own work, like sending a screenshot when my CSS didn't load and asking if all my code was vanilla.


Conversations with claude

Conversation — Brainstorming and choosing the idea (Mon. Oct. 5)**

My prompt: "help me brainstorm with the Project Zed assignment", then "i
like f1, going out to bars, fashio, online shopping"
AI response (summary): Claude suggested an F1 Lights Out reaction game, a
night-out planner, a cool-off cart, a cost-per-wear tracker, and an outfit
builder. I also asked about a roommate chore wheel and a beer pong game.
My decision: I chose the cool-off cart because it was something i would actually used and it for one person the reason i passed on the chore wheel because localStorage only saves on one device so roommates wouldn't see the same info, and on beer pong it would be too much to learn and explain.

Conversation 2 — dates in JavaScript (Thu. Oct. 8)**

My prompt: how does Dare.now work in java and can i change the time to test the buy or skip
AI response: Claude explained `Date.now()`, how to turn 48 hours into milliseconds, how to calculate the unlock time and the time left, how to turn milliseconds into days and hours, and why saving the unlock time works
better than a countdown. It suggested changing the cool-off to one minute for testing.

What I learned: [In your own words. You could include the check question:
an item with 50 hours left shows 2 days and 2 hours.]

Conversation 3 — Debugging: CSS not loading (Thu. Oct. 8)
My prompt: A screenshot of my live site and "ok i comitted but my css aint
showing"
AI response: Claude checked the live site and found the browser
couldn't find `css/styles.css`. It said GitHub Pages needs the file name to
match exactly, including capital letters, and listed likely causes. It also
noticed an extra `zed` folder in my repo and that my log wasn't at the top
level.
What I learned: what i learned was that when creating the repository on github desktop a duplicate folder was created so i had to delete the duplicate file and the reason wht my css wasnt loading was because i had a spelling error it was style.css instead on styles.css once that was fixed my css loaded and changed the look of the web app.

Conversation — Debugging: the page stopped working after adding buttons
(Thu. Oct. 8)**

My prompt: I pasted my whole app.js and asked "how does this look is there any grammer or duplicates"
AI response: Claude found the step 3 code pasted below the step 2
  code, so COOL_OFF_MS` was declared twice, which stops the whole script. It
  showed me which half to delete.
What I learned: when doing my js i would go back and fourth so i ended up typing it double and didnt realize until my page wasnt working properly.


checking it worked
Adding items with no name and no price to see the error messages
Changing the cool-off to one minute to watch items move to Ready to buy
Clicking Skip and checking the money-saved total
Refreshing to make sure items and the total stayed


