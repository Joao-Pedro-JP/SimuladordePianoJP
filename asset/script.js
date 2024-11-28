document.addEventListener("DOMContentLoaded", () => {
  const keys = document.querySelectorAll(".key");
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const playNote = (frequency) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 1
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  };

  const noteFrequencies = {
    C: 261.63,
    "C#": 277.18,
    D: 293.66,
    "D#": 311.13,
    E: 329.63,
    F: 349.23,
    "F#": 369.99,
    G: 392.0,
    "G#": 415.3,
    A: 440.0,
    "A#": 466.16,
    B: 493.88,
  };

  keys.forEach((key) => {
    key.addEventListener("mousedown", () => {
      const note = key.getAttribute("data-note");
      playNote(noteFrequencies[note]);
      key.classList.add("active");
    });

    key.addEventListener("mouseup", () => {
      key.classList.remove("active");
    });

    key.addEventListener("mouseleave", () => {
      key.classList.remove("active");
    });
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    const validKeys = [
      "A",
      "W",
      "S",
      "E",
      "D",
      "F",
      "T",
      "G",
      "Y",
      "H",
      "U",
      "J",
    ];
    const index = validKeys.indexOf(key);

    if (index !== -1) {
      const note = keys[index].getAttribute("data-note");
      playNote(noteFrequencies[note]);
      keys[index].classList.add("active");
    }
  });

  document.addEventListener("keyup", (event) => {
    const key = event.key.toUpperCase();
    const validKeys = [
      "A",
      "W",
      "S",
      "E",
      "D",
      "F",
      "T",
      "G",
      "Y",
      "H",
      "U",
      "J",
    ];
    const index = validKeys.indexOf(key);

    if (index !== -1) {
      keys[index].classList.remove("active");
    }
  });
});
let tempo = 120; // Default tempo
let intervalId = null;

const tempoSlider = document.getElementById("tempo-slider");
const tempoDisplay = document.getElementById("tempo-display");

tempoSlider.addEventListener("input", function () {
  tempo = this.value;
  tempoDisplay.textContent = tempo;
  updateTempo();
});

function updateTempo() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(markBeat, 60000 / tempo);
}
function markBeat() {
  beats[currentBeat].classList.add("active");
  setTimeout(() => {
    beats[currentBeat].classList.remove("active");
    currentBeat = (currentBeat + 1) % beats.length;
  }, 100); // Keep this short for a clear visual cue
}

// Initialize the metronome
updateTempo();
const noteSequence = document.querySelector(".note-sequence");
let currentNoteIndex = 0;

function addNoteToSequence(note) {
  const noteElement = document.createElement("div");
  noteElement.classList.add("note");
  noteElement.textContent = note;
  noteSequence.appendChild(noteElement);
}

function highlightNextNote() {
  const notes = noteSequence.querySelectorAll(".note");
  notes.forEach((note) => note.classList.remove("active"));
  if (currentNoteIndex < notes.length) {
    notes[currentNoteIndex].classList.add("active");
    currentNoteIndex++;
  } else {
    currentNoteIndex = 0;
  }
}

// Exemplo de uso:
addNoteToSequence("C");
addNoteToSequence("E");
addNoteToSequence("G");
addNoteToSequence("C");

// Você pode chamar highlightNextNote() quando uma tecla for pressionada
// ou em um intervalo regular para criar um efeito de "rolagem" da música
