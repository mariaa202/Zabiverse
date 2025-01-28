import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./App.css";

const App = () => {
  const [step, setStep] = useState(0); // Step 0: Select User, Step 1: Facial Recognition or Login, Step 2: Login
  const [userType, setUserType] = useState(""); // User type
  const [role, setRole] = useState(""); // Role for Faculty/Management
  const [message, setMessage] = useState(""); // Feedback message
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input
  const [chatMessages, setChatMessages] = useState([]); // Chat history
  const [query, setQuery] = useState(""); // User's query input

  // Handle user type selection
  const handleUserSelection = (e) => {
    setUserType(e.target.value);
    setRole(""); // Reset role when user type changes
    setStep(1);
  };

  // Handle role selection for Faculty/Management
  const handleRoleSelection = (e) => {
    setRole(e.target.value);
  };

  // Handle facial recognition mock
  const handleFacialRecognition = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/facial-recognition"
      );
      if (response.data.status === "success") {
        setMessage(response.data.message);
        setTimeout(() => setStep(2), 1000); // Move to login step
      } else {
        setMessage("Facial recognition failed. Please try again.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again.");
    }
  };

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        username,
        password,
        userType,
        role,
      });
      if (response.data.status === "success") {
        setMessage(response.data.message);
        setStep(3); // Proceed to chatbot interface
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Error connecting to server. Please try again.");
    }
  };

  // Handle chatbot query
  const handleChatbotQuery = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/query", {
        query,
      });
      const botResponse = response.data.response;
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: query },
        { sender: "bot", text: botResponse },
      ]);
      setQuery(""); // Clear input field
    } catch (error) {
      alert("Error connecting to chatbot. Please try again.");
    }
  };

  return (
    <div className="App">
      {step < 3 && (
        <div className="login-container">
          <h1>ZABIVERSE</h1>
          <p>Your Smart Campus Companion</p>

          {message && <p className="status-message">{message}</p>}

          {/* Step 0: Select User Type */}
          {step === 0 && (
            <div>
              <h2>Select User Type</h2>
              <select value={userType} onChange={handleUserSelection} required>
                <option value="">Select User Type</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Management">Management</option>
                <option value="Higher Management">Higher Management</option>
              </select>

              {/* Show Role Dropdown for Faculty */}
              {userType === "Faculty" && (
                <div>
                  <h3>Select Role</h3>
                  <select onChange={handleRoleSelection} required>
                    <option value="">Select Role</option>
                    <option value="Program Manager">Program Manager</option>
                    <option value="Head of Department">
                      Head of Department
                    </option>
                    <option value="Professor">Professor</option>
                  </select>
                </div>
              )}

              {/* Show Role Dropdown for Management */}
              {userType === "Management" && (
                <div>
                  <h3>Select Role</h3>
                  <select onChange={handleRoleSelection} required>
                    <option value="">Select Role</option>
                    <option value="Finance">Finance</option>
                    <option value="Admin">Admin</option>
                    <option value="Examination">Examination</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Facial Recognition or Login */}
          {step === 1 && userType !== "Student" && (
            <div>
              <h2>Facial Recognition</h2>
              <div className="webcam-container">
                <Webcam className="webcam" />
              </div>
              <button onClick={handleFacialRecognition}>
                Start Recognition
              </button>
            </div>
          )}

          {step === 1 && userType === "Student" && (
            <div className="login-form">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
              </form>
            </div>
          )}

          {/* Step 2: Login */}
          {step === 2 && (
            <div className="login-form">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Chatbot */}
      {step === 3 && (
        <div className="chatbot-interface">
          <h2>Welcome to the Chatbot</h2>
          <div className="chat-window">
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.sender === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatbotQuery}>
              <textarea
                placeholder="Type your query here..."
                rows="4"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
