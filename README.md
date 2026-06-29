# 🎵 Chord Progression Generator

[![Version](https://img.shields.io/badge/version-1.1.0-blue)](https://github.com/StonecarverStudios/ChordProgressionGenerator/releases)
[![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61dafb)](https://vitejs.dev/)
[![Backend](https://img.shields.io/badge/backend-Flask%20%2B%20Python-green)](https://flask.palletsprojects.com/)
[![Live](https://img.shields.io/badge/live-Render-purple)](https://chordgen-frontend.onrender.com)

A full-stack music tool that generates randomized chord progressions 
for songwriters and composers. Built with a React/Vite frontend and 
a Flask backend powered by MusicPy. Includes real-time audio playback 
via SoundFont synthesis.

---

## 🎧 Live App
**https://chordgen-frontend.onrender.com**

> ⚠️ Hosted on Render's free tier — expect a ~50 second cold start 
> on first load. Subsequent requests are fast.

---

## ✨ Features

- Generate chord progressions by **key**, **mode**, **chord count**, 
  and optional **Spicy mode** (extended 4-note chords)
- Choose from multiple **instruments** (piano, violin, saxophone, and more)
- **Real-time audio playback** with SoundFont synthesis
- **BPM/tempo slider** for playback speed control
- **Chord highlighting** synced to playback
- Displays both **chord names** and **Roman numeral degrees**
- Click any individual chord to hear it instantly

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, SoundFont Player, Web Audio API |
| Backend | Python, Flask, MusicPy, Gunicorn |
| Hosting | Render (Static Site + Web Service) |
| Version Control | Git + GitHub |
|IDE| VS Code |
|Terminal| Git Bash |
 
---

## 📁 Project Structure

```
ChordProgressionGenerator/
├── backend/
│   ├── app.py              # Flask app, API routes
│   ├── ChordGenerator.py   # MusicPy chord logic
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── index.html
│   └── src/
│       ├── App.jsx             # Root component, state management
│       ├── sound.js            # Audio context, SoundFont playback
│       ├── style.css
│       └── components/
│           ├── ChordCount.jsx
│           ├── KeySelector.jsx
│           ├── ModeSelector.jsx
│           ├── ProgressionDisplay.jsx
│           ├── SpicyCheckbox.jsx
│           └── InstrumentSelector.jsx
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js v18+
- Python 3.10+
- pip

### 1. Clone the Repository
```bash
git clone https://github.com/StonecarverStudios/ChordProgressionGenerator.git
cd ChordProgressionGenerator
```

### 2. Start the Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
# Runs on http://localhost:5000
```

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

> ⚠️ **Dev vs Production URLs:** During local development, 
> the fetch URL in `App.jsx` must point to `http://localhost:5000/generate`.  
> Before pushing to production, change it back to 
> `https://chordgen-backend.onrender.com/generate`.

---

## 🔌 API Reference

### `POST /generate`

Generates a chord progression based on input parameters.

**Request Body:**
```json
{
  "numChords": 4,
  "key": "C",
  "mode": "major",
  "spicy": false
}
```

**Response:**
```json
{
  "chordNotes": [["C3", "E3", "G3"], ["A3", "C4", "E4"]],
  "chordList": ["Cmaj", "Am"],
  "romanDegrees": ["I", "vi"]
}
```

**Supported Modes:**
`major`, `minor`, `dorian`, `mixolydian`, `lydian`, 
`phrygian`, `locrian`, `harmonic minor`, `melodic minor`

---

## 📅 Roadmap

### 🔷 Planned Features
- Save and load progressions
- Reverb and audio effects
- Editable chord slots
- Shareable progression links
- Custom progression builder

### ♦️ Quality of Life
- Navigation bar with multiple pages
- Improved chord generation logic and cadence options
- Full mobile support

---

## 📄 License
MIT License — feel free to use, modify, and build on this project.
