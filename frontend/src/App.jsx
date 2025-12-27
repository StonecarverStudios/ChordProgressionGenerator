//importins css, compenents, and libraries
import { useState } from "react";
import './style.css'
import ChordCount from "./components/ChordCount";
import ProgressionDisplay from "./components/ProgressionDisplay";
import KeySelector from "./components/KeySelector";
import ModeSelector from "./components/ModeSelector";
import SpicyCheckbox from "./components/SpicyCheckbox";


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

  
  const handleGenerate = () => {
    const newProg = Array.from({ length: numChords }, () => ({
      chord: "",
      roman: ""
    }));
    setProgression(newProg);
    console.log("Generated:", newProg);

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
        <ProgressionDisplay progression={progression} numChords={numChords}/>
      </div>
 

      {/* Playback Controls */}
      <div className="playback-controls">
        <audio controls />
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
