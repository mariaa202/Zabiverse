import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [step, setStep] = useState(1); // Step 1: Facial Recognition, Step 2: Login
  const [userType, setUserType] = useState(""); // User type
  const [message, setMessage] = useState(""); // Feedback message
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input

  const handleFacialRecognition = () => {
    setMessage("Facial Recognition Successful!");
    setStep(2); // Move to login form
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Simulate backend verification
    if (username === "admin" && password === "1234") {
      setMessage(`Welcome, ${username}!`);
    } else {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <img
          src="https://your-campus-image-url.com/campus.jpg"
          alt="Campus"
          className="campus-image"
        />
        <h1>ZABIVERSE</h1>
        <p>Your Smart Campus Companion</p>

        {message && <p className="status-message">{message}</p>}

        {step === 1 && (
          <div className="facial-recognition">
            <h2>Facial Recognition</h2>
            <p>Look into the camera to verify your identity.</p>
            <button onClick={handleFacialRecognition}>Start Recognition</button>
          </div>
        )}

        {step === 2 && (
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <label>User Type:</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Management">Management</option>
                <option value="Higher Management">Higher Management</option>
              </select>

              {userType === "Faculty" && (
                <select required>
                  <option value="">Select Role</option>
                  <option value="Program Manager">Program Manager</option>
                  <option value="Head of Department">Head of Department</option>
                  <option value="Professor">Professor</option>
                </select>
              )}

              {userType === "Management" && (
                <select required>
                  <option value="">Select Role</option>
                  <option value="Finance">Finance</option>
                  <option value="Admin">Admin</option>
                  <option value="Examination">Examination</option>
                </select>
              )}

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
    </div>
  );
};

export default App;
