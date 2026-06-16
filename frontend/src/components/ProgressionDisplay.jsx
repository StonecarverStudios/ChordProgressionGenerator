function ProgressionDisplay({ progression, onChordClick, playingIndex }) {
  return (
    <div>
      {/* ROMAN NUMERALS ROW */}
      <div className="chord-progression-window">
        {progression.map((slot, index) => (
          <div
            key={index}
            className={`chord-block ${index === playingIndex ? 'playing' : ''}`}
            onClick={() => onChordClick(slot)}
          >
            {slot.roman}
          </div>
        ))}
      </div>

      {/* CHORD NAMES ROW */}
      <div className="chord-progression-window">
        {progression.map((slot, index) => (
          <div
            key={index}
            className={`chord-block ${index === playingIndex ? 'playing' : ''}`}
            onClick={() => onChordClick(slot)}
          >
            {slot.chord}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressionDisplay;