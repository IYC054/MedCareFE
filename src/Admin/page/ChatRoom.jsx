import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

import Stomp from 'stompjs';
const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  // const [stompClient, setStompClient] = useState(null);

  const messagesEndRef = useRef(null);  // Ref to scroll to latest message


  const socket = new SockJS('http://localhost:8080/ws'); // Kiểm tra URL có đúng không
  const stompClient = Stomp.over(socket);
  console.log("socket", socket);
  console.log("stomp", stompClient);
  socket.onopen = () => {
    console.log("✅ WebSocket connected!");
  };

  socket.onerror = (error) => {
    console.error("❌ WebSocket error:", error);
  };

  socket.onclose = (event) => {
    console.log("❌ WebSocket closed:", event.reason);
  };
  stompClient.connect({}, (frame) => {
    console.log('Connected: ' + frame);
  }, (error) => {
    console.error('Connection error:', error);
  });

  // Connect to WebSocket when component mounts
  // useEffect(() => {
  //   const socket = new SockJS("http://localhost:9090/ws", null, {
  //     withCredentials: true,  // Cần thiết để gửi thông tin xác thực như cookies hoặc token
  //   });
  //   const client = over(socket);

  //   // Connect to WebSocket server
  //   client.connect({}, (frame) => {
  //     console.log('Connected: ' + frame);

  //     // Subscribe to message queue ("/user/queue/messages" là destination của bạn)
  //     client.subscribe('/user/queue/messages', (messageOutput) => {
  //       const receivedMessage = JSON.parse(messageOutput.body);
  //       setReceivedMessages((prevMessages) => [
  //         ...prevMessages,
  //         receivedMessage,
  //       ]);
  //     });
  //   });

  //   setStompClient(client); // Lưu stomp client để sử dụng sau

  //   return () => {
  //     if (stompClient) {
  //       stompClient.disconnect(); // Disconnect khi component unmount
  //     }
  //   };
  // }, []);

  // Gửi tin nhắn
  const handleSendMessage = () => {
    if (!message.trim()) return;

    const messageData = {
      senderId: 1, // ID của người gửi
      receiverId: 2, // ID của người nhận
      messageText: message,
    };

    if (stompClient) {
      stompClient.send(
        '/app/sendMessage', // Địa chỉ gửi tin nhắn
        {}, // headers (nếu có)
        JSON.stringify(messageData) // Tin nhắn cần gửi
      );
      setMessage('');
    }
  };

  // Auto scroll đến tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [receivedMessages]);

  return (
    <div className="chat-container">
      <h2>WebSocket Test</h2>

      <div className="messages">
        {receivedMessages.map((msg, index) => (
          <div key={index} className="message">
            <p>{msg.messageText}</p>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;