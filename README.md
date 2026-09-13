# Dubai Indian School English Spelling Adventure

An interactive English spelling game for Grade 3 learners. Players unscramble three randomly selected words by tapping letter bubbles, typing on the keyboard, or using the editing controls. Correct answers advance the session; completing all three words triggers a celebratory result.

## Features

- Three-word spelling sessions selected from a built-in vocabulary pool
- Child-friendly hints and mascot guidance for every word
- Click or keyboard-based letter entry
- Undo the last letter, reset the current word, or remove letters directly from the answer slots
- Immediate success and retry feedback
- Generated sound effects using the Web Audio API
- Confetti celebration after a complete three-word session
- Responsive layout for desktop and mobile screens
- UAE-inspired school theme with animated visual elements

## How to Play

1. Read the hint and look at the scrambled letter bubbles.
2. Select letters to build the word in the answer slots.
3. Use **Undo** or **Reset** to correct the current answer when needed.
4. Select **Check My Spelling!** once all slots are filled.
5. Complete all three words to pass the session, or start a new session after a mistake.

Keyboard controls are also supported:

| Key | Action |
| --- | --- |
| Letter keys | Select the matching unused letter bubble |
| `Backspace` | Undo the last selected letter |
| `Escape` | Reset the current word |
| `Enter` | Submit a completed word, or restart from a result modal |

## Technology

- HTML5 for the game structure
- CSS3 for layout, responsive styling, animation, and visual theme
- Vanilla JavaScript for game state, interaction, audio, and confetti
- Vite for local development and production builds
- Web Audio API for generated sound effects
- Canvas API for the confetti animation
- Google Fonts: Fredoka and Outfit

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173/`.

### Create a production build

```bash
npm run build
```

The optimized output is generated in the `dist/` directory.

### Preview the production build

```bash
npm run preview
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |

## Project Structure

```text
.
├── app.js             # Game logic, keyboard controls, audio, and confetti
├── index.html         # Game markup and modal views
├── styles.css         # Theme, responsive layout, and animations
├── camel_mascot.png   # Mascot image currently stored at the project root
├── package.json       # Scripts and development dependency definitions
└── dist/              # Generated production output
```

The HTML currently references the mascot at `assets/camel_mascot.png`. Ensure the image is available at that path when serving the application, or update the image references in `index.html` to match the asset location.

## Word Content

The initial word pool contains 20 short words, including `when`, `note`, `shop`, `book`, `need`, `news`, `view`, `edit`, `luck`, `five`, `fool`, `food`, `good`, `ball`, `pull`, `rank`, `fast`, `slow`, `cube`, and `text`. Each session selects three unique words at random.

## Browser Notes

The game works in modern browsers with JavaScript enabled. Audio is initialized after user interaction, following browser autoplay policies. The application does not use a backend or store player data.