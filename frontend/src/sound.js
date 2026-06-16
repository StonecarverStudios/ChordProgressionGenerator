//chordDuration = 60 / bpm * beatsPerChord
import Soundfont from "soundfont-player";

let audioContext = null;
let piano = null;
let pianoReady = false;
let activeNodes = [];

export async function initPiano(instrumentName = "acoustic_grand_piano") {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

    piano = await Soundfont.instrument(audioContext, instrumentName);
    pianoReady = true;


  return piano;
}


export function playChord(notes, duration = 1.5, when = 0, volume = 1.0) {
  if (!piano || !audioContext) {
    console.warn("Piano not ready yet.");
    return;
  }

  const startTime = audioContext.currentTime + when;
  const stopTime = startTime + duration;

  notes.forEach((note) => {
    const node = piano.play(note, startTime, {
      gain: volume
    });

    // Force the note to stop early
    if (node && typeof node.stop === "function") {
      node.stop(stopTime);
      activeNodes.push(node);
    }
  });
}

export function stopAllSound() {
  activeNodes.forEach(node => {
    try { node.stop(); } catch (e) {} // already stopped nodes throw, ignore
  });
  activeNodes = [];
}