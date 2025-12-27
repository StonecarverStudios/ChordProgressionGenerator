function SpicyCheckbox({ isSpicy, setIsSpicy }) {
  return (
    <div className="selector-item">
      <label htmlFor="spicy-checkbox">Spicy??</label>
      <input
        id="spicy-checkbox"
        type="checkbox"
        checked={isSpicy}
        onChange={(e) => setIsSpicy(e.target.checked)}
      />
    </div>
  );
}

export default SpicyCheckbox;