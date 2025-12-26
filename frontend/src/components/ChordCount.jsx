function ChordCount({ chordCount, setChordCount }) {

  function incrementChordCount() {
    //Arrow function to increment chord count with a maximum limit of 10
    setChordCount(prev => Math.min(prev + 1, 10));
  }

  function decrementChordCount() {
    //Arrow function to decrement chord count with a minimum limit of 2
    setChordCount(prev => Math.max(prev - 1, 2));
  }

  return (
    //HTML structure for chord count selector
    <div className="selector-item">
      <label htmlFor="num-chords">Number of Chords</label>

      <div className="chord-count-wrapper">
        <input
          type="text"
          id="num-chords"
          value={chordCount}
          readOnly
        />

        {/* Buttons to increment/decrement chord count */}
        <button onClick={incrementChordCount} className="small-btn">+</button>
        <button onClick={decrementChordCount} className="small-btn">−</button>
      </div>
    </div>
  );
}

//Exporting the ChordCount component
export default ChordCount;
