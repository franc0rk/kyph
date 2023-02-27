import "./App.css";
import { useState, useEffect } from "react";
import { HOROSCOPES, HOROSCOPE_TYPES, MONTHS } from "./constants";
import { downloadImage } from "./utils";

function App() {
  const handleDownloadImage = () => {
    downloadImage(
      document.querySelector(".image-wrapper"),
      `${selectedHoroscope}-${selectedHoroscopeType}-${currentDate}.jpeg`
    );
  };

  const handleFocusText = (e) => {
    e.target.select();
  };

  const handleChangeText = (e) => {
    let height = e.target.scrollHeight;
    const text = e.target.value;
    let finalText = "";
    if (height > 300) {
      for (let i = 0; i < 320; i++) {
        finalText += text[i];
        setHoroscopeText(finalText + "...");
      }
    } else {
      setHoroscopeText(e.target.value);
    }
  };

  const [selectedHoroscope, setSelectedHoroscope] = useState("acuario");
  const [selectedHoroscopeType, setSelectedHoroscopeType] = useState("General");
  const [horoscopeText, setHoroscopeText] = useState("Pegar texto...");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(
      `${date.toLocaleString().split("/")[1]} ${
        MONTHS[date.getMonth()]
      } ${date.getFullYear()}`
    );
  }, []);

  return (
    <div className="app">
      <div className="controls-wrapper">
        <div>
          <label>Horoscopo: </label>
          <br />
          <select
            name="selected-horoscope"
            value={selectedHoroscope}
            onChange={(e) => setSelectedHoroscope(e.target.value)}
          >
            {Object.keys(HOROSCOPES).map((horoscope, horoscopeIndex) => (
              <option key={horoscopeIndex} value={horoscope}>
                {horoscope}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tipo: </label>
          <br />
          <select
            name="selected-horoscope-type"
            value={selectedHoroscopeType}
            onChange={(e) => setSelectedHoroscopeType(e.target.value)}
          >
            {HOROSCOPE_TYPES.map((horoscope, horoscopeIndex) => (
              <option key={horoscopeIndex} value={horoscope}>
                {horoscope}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Texto: </label>
          <small>{horoscopeText.length} characters</small>
        </div>
        <div>
          <button onClick={handleDownloadImage} id="download-btn">
            Descargar
          </button>
        </div>
      </div>
      <div className="image-wrapper">
        <div className="image1">
          <img src="/assets/astrology.jpg" alt="astrology" />
        </div>
        <div className="bg-purple">
          <div className="h-header">
            <div className="title">
              {HOROSCOPES[selectedHoroscope]}
              {selectedHoroscopeType !== "General" && (
                <span className="subtitle">
                  <img
                    src={`/assets/${selectedHoroscopeType}.svg`}
                    alt={selectedHoroscopeType}
                  />
                </span>
              )}
            </div>
            <div className="date">{currentDate}</div>
          </div>
          <div className="h-body">
            <div className="description">
              <textarea
                name="horoscope-text"
                cols="40"
                value={horoscopeText}
                rows="12"
                onChange={handleChangeText}
                onFocus={handleFocusText}
              ></textarea>
            </div>
            <div className="horoscopo-logo">
              <img
                src={`/assets/${selectedHoroscope}.png`}
                alt={selectedHoroscope}
              />
            </div>
          </div>
          <div className="logo">
            <img src="assets/kyphoroscopo_logo.png" alt="kypHoroscopo logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
