import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosRefreshToken from "../axios"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useChat from "../hooks/useChat";
import "./ChatRoom.css";

const CustomerThread = () => {
  const location = useLocation();
  const { parcelId, parcelStatus, origin, destination, deliveryman, username } =
    location.state;

  const roomId = parcelId; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId, username); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent

  useEffect(() => {
    const fetchChat = async () => {
      const response = await fetch(`/api/dashboard/chat/${parcelId}`, {
        method: "GET",
      });
      console.log(response)
    };
    fetchChat();
  }, [])

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <>
      <Container style={{ width: "800px" }}>
        <Row>
          <Link to="/customerinbox">
            <Button variant="secondary" style={{ marginLeft: "0" }}>
              Back To Inbox
            </Button>
          </Link>
        </Row>
        <Row>
          <h3>Parcel ID: {parcelId}</h3>
        </Row>
        <Row>
          <h4>Current Status: {parcelStatus}</h4>
        </Row>
        <Row>
          <h5>Deliveryman: {deliveryman}</h5>
        </Row>
        <Row>
          <iframe
            title="Route"
            width="800"
            height="500"
            loading="lazy"
            allowfullscreen
            src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GMAP_API_KEY}&origin=${origin}&destination=${destination}`}
          ></iframe>
        </Row>
        <Row>
          <h3>Chat</h3>
          <div className="messages-container">
            <ol className="messages-list">
              {messages.map((message, i) => (
                <li
                  key={i}
                  className={`message-item ${
                    message.ownedByCurrentUser
                      ? "my-message"
                      : "received-message"
                  }`}
                >
                  {message.body}
                </li>
              ))}
            </ol>
          </div>
        </Row>
        <Row>
          <Form>
            <div className="input-container">
              <Form.Control
                value={newMessage}
                onChange={handleNewMessageChange}
                placeholder="Write message..."
                autoFocus
                style={{ height: "40px" }}
              />
              <Button
                type="submit"
                variant="outline-secondary"
                onClick={handleSendMessage}
                style={{ height: "40px", margin: "0" }}
              >
                Send
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default CustomerThread;
