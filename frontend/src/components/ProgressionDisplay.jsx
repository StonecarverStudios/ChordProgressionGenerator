function ProgressionDisplay({ progression, numChords }) {
  const romanRow = progression.slice(0, numChords);
  const chordRow = progression.slice(0, numChords);

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
