function KeySelector({ selectedKey, setSelectedKey }) {
    return (
         <div className="selector-item">
          <label htmlFor="key-select">Key</label>
          <select id="key-select" value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
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
    );
} 

export default KeySelector;