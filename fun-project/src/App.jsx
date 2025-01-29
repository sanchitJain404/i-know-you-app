import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [info, setInfo] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [inputError, setInputError] = useState("");

  const fakeSearch = () => {
    if (!name.trim()) {
      setInputError("Please enter a name!");
      return;
    }

    setLoading(true);
    setMessage("");
    setInputError(""); // Clear previous error message

    setProgressMessage("Searching Facebook and instagram... 💻");

    setTimeout(() => {
      setProgressMessage("Checking Google... 🔍");

      setTimeout(() => {
        setProgressMessage("Searching through the dark web...");

        setTimeout(() => {
          handleSubmit();
        }, 2000);
      }, 2000);
    }, 2000);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/check-name", { name });

      // Check if the response has the necessary data
      if (res.data.image) {
        setImage(res.data.image);
        setInfo(res.data.info || "N/A");
        setHobbies(res.data.hobbies || []);
        setCurrentCompany(res.data.current_company || "N/A");
        setBirthplace(res.data.birthplace || "N/A");
        setQuote(res.data.quote || "No quote available.");
        setMessage("");
      } else {
        setMessage(res.data.message);
        setImage("");
        setInfo("");
        setHobbies([]);
        setCurrentCompany("");
        setBirthplace("");
        setQuote("");
      }
      setLoading(false); // Stop the loader
    } catch {
      setMessage("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="container-top">
      <div className="container">
        <h1 className="title">I Know You! 😎</h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-box"
        />
        <button onClick={fakeSearch} className="button">Find yourself</button>

        {inputError && <p className="input-error">{inputError}</p>}

        {loading && (
          <div className="loading-container">
            <div className="loader"></div>
            <p className="progress-text">{progressMessage}</p>
          </div>
        )}

        {message && <p className="error-message">{message}</p>}

        {image && (
          <div className="image-container">
            <img src={image} alt="User" />
            {info && <p className="user-info">Surprise! You are {info} 🎉</p>}
            <p className="found-instagram">Found your Instagram profile! 📸</p>
          </div>
        )}
      </div>

      {/* New Container for Hobbies, Company, Birthplace, and Quote */}
      {image && (
        <div className="additional-info-container">
          <h2 className="additional-info-title">I know a lot about you</h2>
          <ul className="info-list">
            <li><strong>Hobbies:</strong> {hobbies.length ? hobbies.join(", ") : "N/A"} 🎶</li>
            <li><strong>You are working in:</strong> {currentCompany || "N/A"} 💼</li>
            <li><strong>Birthplace:</strong> {birthplace || "N/A"} 🌎</li>
            <li><strong>Here is a Quote for you: </strong>{quote || 'No quote available.'} ❤️</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
