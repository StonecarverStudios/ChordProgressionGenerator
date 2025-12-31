import Soundfont from "soundfont-player";

let audioContext = null;
let piano = null;
let pianoReady = false;

export async function initPiano() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (!piano) {
    piano = await Soundfont.instrument(audioContext, "acoustic_grand_piano");
    pianoReady = true;
  }

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
    }
  });
}