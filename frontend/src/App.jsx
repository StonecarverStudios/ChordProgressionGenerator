//importins css, compenents, and libraries
import { useState, useEffect } from "react";
import './style.css'
import ChordCount from "./components/ChordCount";
import ProgressionDisplay from "./components/ProgressionDisplay";
import KeySelector from "./components/KeySelector";
import ModeSelector from "./components/ModeSelector";
import SpicyCheckbox from "./components/SpicyCheckbox";
import { initPiano, playChord } from "./sound";


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
  //piano loaded state
  const [pianoLoaded, setPianoLoaded] = useState(false);

  //Initialize Piano on Load  
  useEffect(() => {
    initPiano().then(() => setPianoLoaded(true));
  }, []);
  
  //Function to play a single chord when clicked
  const handlePlayChord = (slot) => {
    playChord(slot.notes, 2.5, 0, 9.0); // longer sustain, louder
    console.log("Playing chord:", slot.notes, Array.isArray(slot.notes));
  };
  //Function to play the entire progression
  const handlePlayProgression = () => {
    const chordDuration = 2.0;
    const volume = 9.0;

    progression.forEach((slot, i) => {
      playChord(slot.notes, chordDuration, i * chordDuration, volume);
    });
  };
  
  // Function to generate a new chord progression by calling the backend API
  const handleGenerate = async () => {
    try {
      // Make a POST request to the backend to generate chords
      const response = await fetch("https://chordgen-backend.onrender.com", {
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
      </div>

      {/* Primary Controls */}
      <div className="controls">
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
        />
      </div>
 

      {/* Playback Controls */}
      <div className="playback-controls">
        <button onClick={handlePlayProgression} disabled={!pianoLoaded}>
          Play Progression
        </button>
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
