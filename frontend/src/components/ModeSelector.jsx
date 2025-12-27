function ModeSelector({ selectedMode, setSelectedMode }) {
  return (
    <div className="selector-item">
      <label htmlFor="mode-select">Mode</label>
      <select
        id="mode-select"
        value={selectedMode}
        onChange={(e) => setSelectedMode(e.target.value)}
      >
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
  );
}

export default ModeSelector;