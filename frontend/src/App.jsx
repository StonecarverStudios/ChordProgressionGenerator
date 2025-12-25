import './style.css'

function App() {
  return (
    <div className="container">
      <h1>Chord Progression Generator</h1>

      {/* Controls Section */}
      <div className="selectors">

        {/* Key Selector */}
        <div className="selector-item">
          <label htmlFor="key-select">Key</label>
          <select id="key-select">
            <option value="C">C</option>
            <option value="C#">C#</option>
            <option value="Cb">Cb</option>
            <option value="D">D</option>
            <option value="D#">D#</option>
            <option value="Db">Db</option>
            <option value="E">E</option>
            <option value="E#">E#</option>
            <option value="Eb">Eb</option>
            <option value="F">F</option>
            <option value="F#">F#</option>
            <option value="Fb">Fb</option>
            <option value="G">G</option>
            <option value="G#">G#</option>
            <option value="Gb">Gb</option>
            <option value="A">A</option>
            <option value="A#">A#</option>
            <option value="Ab">Ab</option>
            <option value="B">B</option>
            <option value="B#">B#</option>
            <option value="Bb">Bb</option>
          </select>
        </div>

        {/* Mode Selector */}
        <div className="selector-item">
          <label htmlFor="mode-select">Mode</label>
          <select id="mode-select">
            <option value="major">Major</option>
            <option value="dorian">Dorian</option>
            <option value="mixolydian">Mixolydian</option>
            <option value="lydian">Lydian</option>
            <option value="phrygian">Phrygian</option>
            <option value="locrian">Locrian</option>
            <option value="minor">Minor</option>
            <option value="harmonic minor">Harmonic Minor</option>
            <option value="melodic minor">Melodic Minor</option>
          </select>
        </div>

        {/* Number of Chords */}
        <div className="selector-item">
          <label htmlFor="num-chords">Number of Chords</label>
          <div className="chord-count-wrapper">
            <input
              type="text"
              id="num-chords"
              name="num-chords"
              defaultValue="4"
              readOnly
              required
            />
            <button className="small-btn" id="plus-btn">+</button>
            <button className="small-btn" id="minus-btn">−</button>
          </div>
        </div>

        {/* Spiciness Checkbox */}
        <div className="selector-item">
          <label htmlFor="spicy-checkbox">Spicy??</label>
          <input type="checkbox" id="spicy-checkbox" name="spicy-checkbox" />
        </div>

      </div>

      {/* Primary Controls */}
      <div className="controls">
        <button id="generate-btn" className="iconBtn">
          <i className="material-symbols-outlined">music_note_add</i>
          Generate Progression
        </button>

        <button id="save-btn" className="iconBtn">
          <i className="material-symbols-outlined">save</i>
          Save Progression
        </button>
      </div>

      {/* Progression Display */}
      <div id="progression-display">
        <div className="chord-progression-window"></div>
        <div className="chord-progression-window"></div>
      </div>

      {/* Playback Controls */}
      <div className="playback-controls">
        <audio controls />
      </div>

      {/* Special Controls */}
      <div className="special-controls">
        <button id="edit-btn" className="iconBtn">
          <i className="material-symbols-outlined">edit</i>
          Edit Progression
        </button>
      </div>
    </div>
  )
}

export default App
