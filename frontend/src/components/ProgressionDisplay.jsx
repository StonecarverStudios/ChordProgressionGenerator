function ProgressionDisplay({ progression }) {
  const romanRow = progression; 
  const chordRow = progression;

  return (
    <div>
      {/* ROMAN NUMERALS ROW */}
      <div className="chord-progression-window">
        {romanRow.map((slot, index) => (
          <div key={index} className="chord-block">
            {slot.roman}
          </div>
        ))}
      </div>

      {/* CHORD NAMES ROW */}
      <div className="chord-progression-window">
        {chordRow.map((slot, index) => (
          <div key={index} className="chord-block">
            {slot.chord}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressionDisplay;