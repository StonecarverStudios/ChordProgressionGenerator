function InstrumentSelector({ instrument, setInstrument }) {
  return (
    <div className="selector-item">
      <label htmlFor="instrument">Instrument:</label>
      <select id="instrument" value={instrument} onChange={(e) => setInstrument(e.target.value)}>
        <option value="acoustic_grand_piano">Piano</option>
        <option value="electric_piano_1">Electric Piano 1</option>
        <option value="electric_piano_2">Electric Piano 2</option>
        <option value="acoustic_guitar_nylon">Nylon Guitar</option>
        <option value="acoustic_guitar_steel">Steel Guitar</option>
        <option value="electric_guitar_clean">Electric Guitar</option>
        <option value="electric_guitar_jazz">Jazz Guitar</option>
        <option value="harpsichord">Harpsichord</option>
        <option value="vibraphone">Vibraphone</option>
        <option value="xylophone">Xylophone</option>
        <option value="glockenspiel">Glockenspiel</option>
        <option value="string_ensemble_2">String Ensemble</option>
        <option value="pizzicato_strings">Pizzicato Strings</option>
        <option value="tremolo_strings">Tremolo Strings</option>
        <option value="synth_strings_1">Synth Strings 1</option>
        <option value="synth_strings_2">Synth Strings 2</option>
        <option value="orchestral_harp">Harp</option>
        <option value ="choir_aahs">Choir Aahs</option>
        <option value="pad_4_choir">Choir Pad</option>
        <option value="pad_7_halo">Halo Pad</option>
        <option value="pad_2_warm">Warm Pad</option>
      </select>
    </div>
  )
}

export default InstrumentSelector;