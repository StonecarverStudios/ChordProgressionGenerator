//importins css, compenents, and libraries
import { useState, useEffect, useRef } from "react";
import './style.css'
import ChordCount from "./components/ChordCount";
import ProgressionDisplay from "./components/ProgressionDisplay";
import KeySelector from "./components/KeySelector";
import ModeSelector from "./components/ModeSelector";
import InstrumentSelector from "./components/InstrumentSelector";
import SpicyCheckbox from "./components/SpicyCheckbox";
import { initPiano, playChord, stopAllSound } from "./sound";


function App() {
  //Variables and States
  //Chord Counter
  const [numChords, setNumChords] = useState(4);
  //Progression State
  const [progression, setProgression] = useState([]);
  //Key State
  const [selectedKey, setSelectedKey] = useState("C");
  //Mode State
  const [selectedMode, setSelectedMode] = useState("major");
  //Spicy State
  const [isSpicy, setIsSpicy] = useState(false);
  //Instrument State
  const [selectedInstrument, setSelectedInstrument] = useState("acoustic_grand_piano");
  //piano loaded state
  const [pianoLoaded, setPianoLoaded] = useState(false);
  //State to track active sound nodes for stopping
  const [playingIndex, setPlayingIndex] = useState(null);
  //State to store timeout IDs for cleanup
  const timeoutRefs = useRef([]); 
  //State to handle bpm
  const [bpm, setBpm] = useState(120);

  // Initial load
  useEffect(() => {
    initPiano(selectedInstrument).then(() => setPianoLoaded(true));
  }, []); // runs once on mount

  // Re-initialize whenever instrument changes
  useEffect(() => {
    setPianoLoaded(false); // disable buttons while loading
    stopAllSound();
    initPiano(selectedInstrument).then(() => setPianoLoaded(true));
  }, [selectedInstrument]); // runs every time selectedInstrument changes
  
  //Function to play a single chord when clicked
  const handlePlayChord = (slot) => {
    playChord(slot.notes, 2.5, 0, 5.0); // longer sustain, louder
    console.log("Playing chord:", slot.notes, Array.isArray(slot.notes));
  };


  //Function to play the entire progression
  const handlePlayProgression = () => {
    handleStop();

    const chordDuration = (60 / bpm) * 4; // 4 beats per chord
    const volume = 5.0;

    progression.forEach((slot, i) => {
      playChord(slot.notes, chordDuration, i * chordDuration, volume);
      
      //Shedule the highlight to match the audio
      const t = setTimeout(() => {
        setPlayingIndex(i);
      }, i * chordDuration * 1000);
      timeoutRefs.current.push(t);
    });

    // Clear highlight after the last chord finishes
    const endTimeout = setTimeout(() => {
      setPlayingIndex(null);
    }, progression.length * chordDuration * 1000);
    timeoutRefs.current.push(endTimeout);
  };
    
  // Also clear highlights when stopping
  const  handleStop= () => {
    stopAllSound();
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
    setPlayingIndex(null);
  };

  
  // Function to generate a new chord progression by calling the backend API
  const handleGenerate = async () => {
    handleStop();
    setPlayingIndex(null);
    try {
      // Make a POST request to the backend to generate chords
      //fetch - https://chordgen-backend.onrender.com/generate -> for deployment on Render
      //fetch - http://localhost:5000/generate   -> for local testing
      const response = await fetch("https://chordgen-backend.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send current settings: number of chords, key, mode, and spicy checkbox
        body: JSON.stringify({
          numChords,
          key: selectedKey,
          mode: selectedMode,
          spicy: isSpicy,
        }),
      });

      // Check if the request was successful
      if (!response.ok) {
        console.error("Failed to generate progression");
        return;
      }

      // Parse the JSON response from the backend
      const data = await response.json();
      console.log("Backend returned:", data);

      // Transform the response data into an array of chord objects with roman numerals
      const newProg = data.chordList.map((chord, i) => ({
        notes: data.chordNotes[i],   // correct
        chord,
        roman: data.romanDegrees[i],
      }));

      console.log("Setting progression to:", newProg);

      // Update the progression state with the newly generated chords
      setProgression(newProg);
    } catch (error) {
      // Log any errors that occur during the API call
      console.error("Error calling backend:", error);
    }
  };

  
  //HTML Structure
  return (
    <div className="container">
      <h1>Chord Progression Generator</h1>

      {/* Controls Section */}
      <div className="selectors">

        {/* Key Selector */}
        <KeySelector 
          selectedKey={selectedKey} 
          setSelectedKey={setSelectedKey} 
        />

        {/* Mode Selector */}
        <ModeSelector 
          selectedMode={selectedMode} 
          setSelectedMode={setSelectedMode} 
        />

        {/* Number of Chords React Component*/}
        <ChordCount
          chordCount={numChords}
          setChordCount={setNumChords}
        />

        {/* Spiciness Checkbox */}
        <SpicyCheckbox 
          isSpicy={isSpicy} 
          setIsSpicy={setIsSpicy} 
        />

        {/* Instrument Selector */}
        <InstrumentSelector 
          instrument={selectedInstrument} 
          setInstrument={setSelectedInstrument} 
        />
      </div>

      {/* Primary Controls */}
      <div className="controls">
        {/* Generate Button */}
        <button id="generate-btn" className="iconBtn" onClick={handleGenerate}>
          <i className="material-symbols-outlined">music_note_add</i>
          Generate Progression
        </button>

        {/* Save Button WILL ADD LATER*/}
        {/* <button id="save-btn" className="iconBtn">
          <i className="material-symbols-outlined">save</i>
          Save Progression
        </button> */}
      </div>

      {/* Progression Display */}
      <div id="progression-display">
        <ProgressionDisplay
          progression={progression}
          onChordClick={handlePlayChord}
          playingIndex={playingIndex}
        />
      </div>
 

      {/* Playback Controls */}
      <div className="playback-controls">

        <div className="playback-buttons">
          {/* play button */}
          <button onClick={handlePlayProgression} className="iconBtn" disabled={!pianoLoaded}>
            <i className="material-symbols-outlined">play_arrow</i>
          </button>

          {/* stop button */}
          <button onClick={handleStop} className="iconBtn" disabled={!pianoLoaded}>
            <i className="material-symbols-outlined">stop</i>
          </button>
          
          {/* bpm slider */}
          <div className="bpm-row">
            <label>BPM: {bpm}</label>
            <input
              type="range"
              min="40"
              max="300"
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value))}
            />
          </div>
          
        </div>
      </div>

      {/* Special Controls WILL ADD LATER*/}
      {/* <div className="special-controls">
        <button id="edit-btn" className="iconBtn">
          <i className="material-symbols-outlined">edit</i>
          Edit Progression
        </button>
      </div> */}
    </div>
  )
}

export default App
