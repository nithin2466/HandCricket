# 🏏 Hand Cricket

A web version of the classic childhood **Hand Cricket / Finger Cricket** game — the one where you and a friend shake hands and throw out a number (1-6), and the "bowler" is trying to match the "batter's" number to get them out!

**🎮 Play it live:** https://playhandcricketeasy.netlify.app

---

## How to Play

1. Choose a game mode — **vs Computer** or **vs Player** (pass-and-play on one screen).
2. Enter player name(s).
3. **Toss** decides who bats first.
4. Both batter and bowler pick a number from **1 to 6**.
   - If the numbers are **different** → the number the batter picked is added to their score (runs).
   - If the numbers **match** → the batter is **OUT**, and the innings ends.
5. After Innings 1 ends, roles swap — the bowler now bats, chasing the first innings' score.
6. Whoever has the higher total after both innings **wins**!
7. Your results (wins/losses/ties, run history) are saved automatically so you can track your stats over time.

---

## Features

- 🏏 **2-innings gameplay** with automatic batting/bowling role swap
- 🎯 Simple, colorful **click-to-play** number buttons (no typing needed)
- 🤖 **vs Computer** mode with randomized bowling/batting
- 👫 **vs Player** local multiplayer (pass the device between turns)
- ✏️ Custom player names
- 📊 **Stats tracking** — win/loss/tie record, score history, saved in your browser (localStorage)
- 🎨 Clean, responsive UI with smooth animations, playable on desktop and mobile

---

## Tech Stack

- **React** (Create React App)
- Custom hooks for game logic (`useGameLogic`) and stats persistence (`useStats`)
- Plain CSS (animations, gradients, responsive layout)
- Deployed on **Netlify**, continuously deployed from this GitHub repo

---

## Running Locally

```bash
# clone the repo
git clone https://github.com/nithin2466/HandCricket.git
cd HandCricket

# install dependencies
npm install

# start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to play.

### Other scripts

| Command | Description |
|---|---|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds an optimized production bundle in `/build` |
| `npm test` | Runs the test runner |

---

## Project Structure

```
src/
  Components/
    GameModeScreen.js     # Choose vs Computer / vs Player
    PlayerNamesScreen.js  # Enter player names
    TossScreen.js         # Coin toss animation
    NumberInputButtons.js # 1-6 clickable number picker
    ScoreBoard.js         # Live score display during play
    ResultScreen.js       # End-of-match result & winner
    StatsScreen.js        # Win/loss history & stats
    Header.js
  hooks/
    useGameLogic.js       # Core game state machine (innings, scoring, roles)
    useStats.js           # localStorage-backed stats tracking
  App.js                  # Orchestrates game phases/screens
  App.css                 # All styling
```

---

## Roadmap / Ideas

- 🌐 Online multiplayer (play with friends on different devices, via Firebase real-time sync)
- 🏆 Leaderboards / achievements
- 📱 Installable PWA / mobile app

---

## Credits

Originally built as a Java console app using `Random`, later rebuilt as this React web app — bringing back childhood hand cricket memories, now playable by anyone with a browser. 🎉
