/* ==========================================================================
   Dubai School English Test - Game Logic & Sound Engine
   ========================================================================== */

// --- Game Constants & Word Pool ---
const WORD_POOL = [
  { word: "when", hint: "At what time? (e.g. '___ do we go to lunch?')" },
  { word: "note", hint: "A short written message or a sweet musical sound 🎵" },
  { word: "shop", hint: "A wonderful place where you buy toys or yummy candy! 🏪" },
  { word: "book", hint: "You open and read this to see stories and colorful pictures! 📖" },
  { word: "need", hint: "Something you must have, like fresh water or healthy food! 💧" },
  { word: "news", hint: "Exciting information about what is happening in the world! 📰" },
  { word: "view", hint: "What you see from a high window, like the beautiful Burj Khalifa! 🏙️" },
  { word: "edit", hint: "To change, fix, or improve writing ✏️" },
  { word: "luck", hint: "Good fortune! Like finding a shiny four-leaf clover 🍀" },
  { word: "five", hint: "The number after four! Counting on your fingers: 1, 2, 3, 4, ___! 🖐️" },
  { word: "fool", hint: "To play a silly, happy trick on someone 🤡" },
  { word: "food", hint: "Yummy stuff you eat when your tummy rumbles! 🍎" },
  { word: "good", hint: "Nice and correct! The opposite of bad 👍" },
  { word: "ball", hint: "A round, bouncy toy that you roll, bounce, and throw! ⚽" },
  { word: "pull", hint: "To tug something towards you! The opposite of push! 🤝" },
  { word: "rank", hint: "A position in a list! Like standing in 1st, 2nd, or 3rd place! 🏆" },
  { word: "fast", hint: "Moving super quickly, like a running cheetah or a space rocket! 🚀" },
  { word: "slow", hint: "Moving very quietly and gently, like a friendly garden snail! 🐌" },
  { word: "cube", hint: "A solid 3D square shape, like a building block or a playing dice! 🎲" },
  { word: "text", hint: "Words written on a screen or inside a book 📱" }
];

// --- Audio Synthesizer (Web Audio API) ---
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Sound: Bubble Pop
function playPop() {
  initAudio();
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
  
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.12);
}

// Sound: Bubble Remove (Lower pitch slide down)
function playRemove() {
  initAudio();
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.1);
  
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.12);
}

// Sound: Success Chime
function playSuccess() {
  initAudio();
  if (!audioCtx) return;
  
  const now = audioCtx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
  
  notes.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);
    
    gain.gain.setValueAtTime(0.12, now + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.3);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.35);
  });
}

// Sound: Failure "Boing"
function playFailure() {
  initAudio();
  if (!audioCtx) return;
  
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.linearRampToValueAtTime(90, now + 0.4);
  
  // High cut filter to soften the sawtooth sound
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(400, now);
  
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(now);
  osc.stop(now + 0.5);
}

// Sound: Final Celebration Fanfare
function playCelebrationSound() {
  initAudio();
  if (!audioCtx) return;
  
  const now = audioCtx.currentTime;
  const notes = [
    { freq: 261.63, time: 0 },   // C4
    { freq: 329.63, time: 0.15 }, // E4
    { freq: 392.00, time: 0.3 },  // G4
    { freq: 523.25, time: 0.45 }, // C5 (held)
    { freq: 659.25, time: 0.7 },  // E5
    { freq: 783.99, time: 0.85 }, // G5
    { freq: 1046.50, time: 1.0 }  // C6 (loud and celebratory!)
  ];
  
  notes.forEach(note => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(note.freq, now + note.time);
    
    const duration = note.time >= 1.0 ? 0.8 : 0.4;
    gain.gain.setValueAtTime(0.12, now + note.time);
    gain.gain.exponentialRampToValueAtTime(0.005, now + note.time + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now + note.time);
    osc.stop(now + note.time + duration + 0.05);
  });
}

// --- Canvas Confetti Celebration Engine ---
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class ConfettiParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height - 20;
    this.size = Math.random() * 10 + 10;
    this.color = `hsl(${Math.random() * 360}, 90%, 65%)`;
    this.speedY = Math.random() * 4 + 4;
    this.speedX = Math.random() * 4 - 2;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 4 - 2;
  }
  
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
    
    if (this.y > canvas.height) {
      this.y = -20;
      this.x = Math.random() * canvas.width;
    }
  }
  
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function startConfetti() {
  particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push(new ConfettiParticle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animationFrameId = requestAnimationFrame(animate);
  }
  animate();
}

function stopConfetti() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = [];
  }
}

// --- Game State Variables ---
let sessionWords = [];     // 3 chosen words
let currentWordIndex = 0;  // 0, 1, 2
let currentSpelling = [];  // Array of { letter, sourceIndex } representing current word slots
let jumbledWordInfo = [];  // Array of { letter, originalIndex, used: boolean }

// --- Game Logic Functions ---

// 1. Pick 3 unique words from word pool
function selectThreeRandomWords() {
  const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

// 2. Jumble letters of a word
function jumbleWord(wordString) {
  const letters = wordString.split('');
  let jumbled;
  let attempts = 0;
  
  // Ensure the jumbled word is not the same as the original word (avoid "book" -> "book")
  do {
    jumbled = [...letters].sort(() => Math.random() - 0.5);
    attempts++;
  } while (jumbled.join('') === wordString && attempts < 20);
  
  return jumbled.map((letter, index) => ({
    letter: letter,
    originalIndex: index,
    used: false
  }));
}

// 3. Start a new test game
function startNewGame() {
  stopConfetti();
  sessionWords = selectThreeRandomWords();
  currentWordIndex = 0;
  loadWord(currentWordIndex);
  
  // Update overall progress indicators
  updateProgressIndicators();
}

// 4. Load a specific word into the UI
function loadWord(index) {
  const wordObj = sessionWords[index];
  jumbledWordInfo = jumbleWord(wordObj.word);
  currentSpelling = [];
  
  // Update hint text
  document.getElementById('hint-text').textContent = wordObj.hint;
  
  // Update progress title
  document.getElementById('progress-text').textContent = `Word ${index + 1} of 3`;
  
  // Render letter workspace / jumbled bubbles
  renderSlots();
  renderBubbles();
  
  // Mascot greets the child
  const greetings = [
    "You are doing great! Can you solve this one?",
    "Awesome! Let's scramble these letters!",
    "Wow! Try spelling this super fun word!",
    "Spelling star! What word is this?"
  ];
  const mascotMsg = index === 0 ? "Hello! Can you help me unscramble this word?" : greetings[Math.floor(Math.random() * greetings.length)];
  document.querySelector('.mascot-greeting').textContent = mascotMsg;
  
  updateSubmitButton();
}

// 5. Render target letter slots
function renderSlots() {
  const slotsContainer = document.getElementById('slots-container');
  slotsContainer.innerHTML = '';
  
  const wordObj = sessionWords[currentWordIndex];
  const len = wordObj.word.length;
  
  for (let i = 0; i < len; i++) {
    const slot = document.createElement('div');
    slot.className = 'letter-slot';
    slot.dataset.slotIndex = i;
    
    // Check if slot has a letter placed
    if (currentSpelling[i]) {
      slot.textContent = currentSpelling[i].letter.toUpperCase();
      slot.classList.add('filled');
      
      // Click a filled slot to remove it
      slot.addEventListener('click', () => removeLetterFromSlot(i));
    } else {
      slot.textContent = '';
    }
    
    slotsContainer.appendChild(slot);
  }
}

// 6. Render jumbled bubbles
function renderBubbles() {
  const bubblesWrapper = document.getElementById('bubbles-wrapper');
  bubblesWrapper.innerHTML = '';
  
  jumbledWordInfo.forEach((item, index) => {
    const bubble = document.createElement('div');
    bubble.className = 'letter-bubble';
    bubble.textContent = item.letter.toUpperCase();
    bubble.dataset.bubbleIndex = index;
    
    if (item.used) {
      bubble.classList.add('used');
    } else {
      bubble.addEventListener('click', () => addLetterToSpelling(index));
    }
    
    bubblesWrapper.appendChild(bubble);
  });
}

// 7. Click bubble to add to spelling
function addLetterToSpelling(jumbledIndex) {
  const item = jumbledWordInfo[jumbledIndex];
  if (item.used) return;
  
  // Find next empty spot in spelling slots
  const wordLen = sessionWords[currentWordIndex].word.length;
  if (currentSpelling.length >= wordLen) return; // All slots filled
  
  // Mark bubble as used
  item.used = true;
  
  // Push letter to spelling array
  currentSpelling.push({
    letter: item.letter,
    sourceIndex: jumbledIndex
  });
  
  playPop();
  renderSlots();
  renderBubbles();
  updateSubmitButton();
}

// 8. Click filled slot to remove
function removeLetterFromSlot(slotIndex) {
  if (slotIndex >= currentSpelling.length) return;
  
  const removed = currentSpelling[slotIndex];
  
  // Mark original bubble as unused
  jumbledWordInfo[removed.sourceIndex].used = false;
  
  // Remove from current spelling array
  currentSpelling.splice(slotIndex, 1);
  
  playRemove();
  renderSlots();
  renderBubbles();
  updateSubmitButton();
}

// 9. Action: Undo
function handleUndo() {
  if (currentSpelling.length === 0) return;
  
  // Pop the last added letter
  const removed = currentSpelling.pop();
  jumbledWordInfo[removed.sourceIndex].used = false;
  
  playRemove();
  renderSlots();
  renderBubbles();
  updateSubmitButton();
}

// 10. Action: Clear/Reset current word spelling
function handleReset() {
  if (currentSpelling.length === 0) return;
  
  currentSpelling = [];
  jumbledWordInfo.forEach(item => {
    item.used = false;
  });
  
  playRemove();
  renderSlots();
  renderBubbles();
  updateSubmitButton();
}

// 11. Update "Check spelling" button availability
function updateSubmitButton() {
  const btn = document.getElementById('btn-submit');
  const wordLen = sessionWords[currentWordIndex].word.length;
  
  if (currentSpelling.length === wordLen) {
    btn.classList.remove('disabled');
    btn.disabled = false;
  } else {
    btn.classList.add('disabled');
    btn.disabled = true;
  }
}

// 12. Update Top Star Indicators
function updateProgressIndicators() {
  const stepsContainer = document.getElementById('progress-steps');
  
  for (let i = 0; i < 3; i++) {
    const star = document.getElementById(`star-${i}`);
    if (i < currentWordIndex) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  }
}

// 13. Verify Spelled Word
function checkCurrentWordSpelling() {
  const userWord = currentSpelling.map(x => x.letter).join('');
  const targetWord = sessionWords[currentWordIndex].word;
  
  if (userWord.toLowerCase() === targetWord.toLowerCase()) {
    // Correct!
    playSuccess();
    
    // Animate current stars
    const star = document.getElementById(`star-${currentWordIndex}`);
    if (star) star.classList.add('active');
    
    currentWordIndex++;
    
    if (currentWordIndex >= 3) {
      // Completed all 3! Trigger final celebration overlay
      setTimeout(() => {
        showSuccessModal();
      }, 500);
    } else {
      // Go to next word
      setTimeout(() => {
        loadWord(currentWordIndex);
        updateProgressIndicators();
      }, 1000);
    }
  } else {
    // Wrong spelling! Play warning boing & trigger retry screen
    playFailure();
    setTimeout(() => {
      showRetryModal();
    }, 500);
  }
}

// --- Overlay Modals Handlers ---

function showSuccessModal() {
  const modal = document.getElementById('modal-success');
  modal.classList.remove('hidden');
  startConfetti();
  playCelebrationSound();
}

function hideSuccessModal() {
  const modal = document.getElementById('modal-success');
  modal.classList.add('hidden');
  stopConfetti();
}

function showRetryModal() {
  const modal = document.getElementById('modal-retry');
  modal.classList.remove('hidden');
}

function hideRetryModal() {
  const modal = document.getElementById('modal-retry');
  modal.classList.add('hidden');
}

// Retry Current game session (picks new words to try again)
function restartWholeGame() {
  hideSuccessModal();
  hideRetryModal();
  startNewGame();
}

// Keyboard input mapping for ease of use
function setupKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    // Ignore key presses if a modal is visible
    const successVisible = !document.getElementById('modal-success').classList.contains('hidden');
    const retryVisible = !document.getElementById('modal-retry').classList.contains('hidden');
    if (successVisible || retryVisible) {
      if (e.key === 'Enter') {
        restartWholeGame();
      }
      return;
    }
    
    const key = e.key.toLowerCase();
    
    // Check if it's a letter
    if (key.length === 1 && key >= 'a' && key <= 'z') {
      // Find matching unused bubble
      const idx = jumbledWordInfo.findIndex(item => item.letter === key && !item.used);
      if (idx !== -1) {
        addLetterToSpelling(idx);
      }
    } 
    // Backspace to undo
    else if (e.key === 'Backspace') {
      handleUndo();
    }
    // Escape to reset
    else if (e.key === 'Escape') {
      handleReset();
    }
    // Enter to submit
    else if (e.key === 'Enter') {
      const wordLen = sessionWords[currentWordIndex].word.length;
      if (currentSpelling.length === wordLen) {
        checkCurrentWordSpelling();
      }
    }
  });
}

// --- Bind Event Listeners on DOM Load ---
document.addEventListener('DOMContentLoaded', () => {
  // Action Buttons
  document.getElementById('btn-undo').addEventListener('click', handleUndo);
  document.getElementById('btn-clear').addEventListener('click', handleReset);
  document.getElementById('btn-submit').addEventListener('click', checkCurrentWordSpelling);
  
  // Modal Buttons
  document.getElementById('btn-restart').addEventListener('click', restartWholeGame);
  document.getElementById('btn-retry-game').addEventListener('click', restartWholeGame);
  
  // Setup keyboard typing
  setupKeyboardListeners();
  
  // Start the initial game state
  startNewGame();
});
