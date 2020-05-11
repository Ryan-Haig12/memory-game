# Memory-Game
This project is an implementation of the classic memory card game. The idea is there are 16 cards on the screen and each card is part of a pair. Match 2 cards and they remain on the screen. The goal is to find all 8 pairs in as little time and clicks as possible. 

# Playing the game
The game is available at https://memory-game-haig.herokuapp.com/ or by cloning this repo and simply running:
```bash
npm run start
```

# Powered by Giphy
The images on the cards are provided by a GET request to the Giphy API with the search term the user enters into the search bar. The API information can be found at https://developers.giphy.com/, all logic for requesting data from Giphy can be found in the /src/imageSearch file where api.js is the actual http request (via axios) and InputBar.js is the React Component rendered to the screen.

# Game Logic
All of the logic to make the game work is found in the /src/playingField folder. Field.js is where the guessHandler and the useEffect that deals with the user's inputted guesses. A guess in this instance refers to a user clicking a card. These cards are found in Card.js and contain the React component that contains the shows the animation (using react-reveal) and gif logic for all 16 gifs rendered to the screen.
