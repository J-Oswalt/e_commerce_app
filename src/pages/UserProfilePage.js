import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";

function UserProfilePage() {
  const loggedInUser = JSON.parse(window.localStorage.getItem("loggedInUser"));

  const [username, setUserName] = useState(loggedInUser.username);
  const [email, setEmail] = useState(loggedInUser.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleUserNameChange = (e) => {
    setError("")
    setMessage("")
    setUserName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setError("")
    setMessage("")
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setError("")
    setMessage("")
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setError("")
    setMessage("")
    setConfirmPassword(e.target.value);
  };
  
  const updateUserHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
        setError("Passwords do not match!")
    } else if (email === "") {
    setError("Email is required!")
    } else {
        loggedInUser.password = password
        loggedInUser.email = email
        setMessage("User Details Updated!")
        let users = JSON.parse(localStorage.getItem("users"))
        users = users.filter((user) => user.username !== loggedInUser.username);
        users.push(loggedInUser);
        localStorage.setItem("users", JSON.stringify(users));
        const creds = JSON.parse(localStorage.getItem("credentials"));
        creds[loggedInUser.username] = password
        localStorage.setItem("credentials", JSON.stringify(creds));
    }
    }

  return (
    <>
    {error && <AlertMessage varient="danger" message={error}></AlertMessage>}
    {message && <AlertMessage varient="success" message={message}></AlertMessage>}
      <Form>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            disabled
            onChange={(e) => handleUserNameChange(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            value={email}
            disabled
            onChange={(e) => handleEmailChange(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>ConfirmPassword:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mb-3" onClick={(e) => updateUserHandler(e)}>
            Update Details.
        </Button>
      </Form>
    </>
  );
}

export default UserProfilePage;
