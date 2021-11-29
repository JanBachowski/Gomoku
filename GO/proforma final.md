# Computing 2 Submission Proforma

**CID:** [01717337]

For each section, write a maximum of 200 words.

running the code: 
- addons used: express, socket.io, esm, mocha, chai, node

in order to run the main page: localhost:3000/1st.html
I suggest opening two tabs, one for the white player and the other for the black player.

running the test function: 
- in terminal, within the public folder, run:
mocha boardGO.test.js -r esm

## Brief
*State what you set out to acomplish with this web app.*

I initially set out to create the game go. I found the logic too difficult,
as go requires the removal of large groups of counters played which are connected. I was able to remove groups of one, however I was unable to remove groups consisting of many stones reliably. I therefore pivoted to the game of gomoku, which is played on the same board as go, however the objective is to create a row of counters 5 long, be it vertical, horizontal or diagonal.

## Coding
*Highlight your approach to coding in this project.*

I did my best to separate the code into its specific 
files. As a result, I ended up with files for the logic, UI, as well as servers for javascript. I also followed this principle when writing CSS. This resulted in 3 files, one of which was called on by both pages. Within those files I tried to use functional programming as much as I could. I used the 1st.html page as my ,ain index page.

## UX/UI
*Outline the key elements of your UX/UI design.*

I tried to make the UI simple. As a result, the entire app can be controlled just by the mouse. I made sure that the players can choose which side they want to play and when they mouse over the board, the colour of the translucent counter would identify which person is to play. I also included the ability of players to switch colours from the playing page, although this would terminate the current game if pressed.

## Data
*Explain how you structure and process your data.*

My server uses JSON to transmit only the last played value as well as the player who just played to the other player, thus making data exchange cheap. I used socket.io to aid in the operation of the server, which acts as a link between the two instances which are playing the game. It thus does not store any data on its own.

## Debugging
*Describe how you used debugging practices and tools and how they helped you overcome a bug or conceptual issue.*

I wrote a test file using mocha, when run from the public folder. It helped me identify 
an issue where the same instance could play for both players (it resurfaced when adding the server). This was obviously a major oversight and I was able to resolve it by having the code store the last player and ignore the next move if it was the same as the last move.

## Best Practice
*Outline your use of software development best practices*

I separated the code into different files and commented to what I believe to be a satifactory explanation (I hope I am correct). I used axe to comply with accessibilty regulations. I tried to conform to Js Lint as much as possible, however I had certain issues which I was unable toresolve due to the structure of the code. 