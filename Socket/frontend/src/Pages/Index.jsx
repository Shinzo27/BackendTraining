/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:3000");

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("connect", () => console.log("Socket Connected"));

    socket.on("messageResponse", (data) => {
      setMessages(data.messages);
    });

    socket.on("joinRoom", (data) => {
      alert("New User Joined!" + data.user);
      console.log(data);
    });
  }, [socket]);

  const handleSendMessage = (e) => {
    console.log("Called");
    e.preventDefault();
    socket.emit("message", {
      text: inputMessage,
      roomId: roomName,
    });
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("joinRoom", { user: username, room: roomName });
    console.log("Joined Room");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="mention username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="give one name to room"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <br />
      <br />
      <input
        type="button"
        value="Join room"
        onClick={(e) => handleJoinRoom(e)}
      />
      <br />
      <br />
      {messages ? messages.map((message) => <p>{message}</p>) : null}
      <input
        type="text"
        placeholder="Enter your message"
        onChange={(e) => setInputMessage(e.target.value)}
        value={inputMessage}
      />
      <br />
      <br />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default Index;
