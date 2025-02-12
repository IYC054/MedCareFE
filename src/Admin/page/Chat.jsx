import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";

import { getToken } from "../../components/Authentication/authService";

const socket = io("http://localhost:8080"); // Thay thế URL backend

function Chat() {
     const token = getToken();
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [friendsList, setFriendsList] = useState([]);
    const messagesEndRef = useRef(null); // Ref để cuộn xuống tin nhắn mới nhất

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/account", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFriendsList(response.data.result);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };

        fetchAccounts();
    }, []);

    useEffect(() => {
        // Lắng nghe sự kiện tin nhắn mới từ server
        socket.on("receiveMessage", (message) => {
            if (message.receiver.id === selectedFriend?.id) {
                setMessages((prevMessages) => {
                    const updatedMessages = { ...prevMessages };
                    if (!updatedMessages[selectedFriend.id]) {
                        updatedMessages[selectedFriend.id] = [];
                    }
                    updatedMessages[selectedFriend.id].push(message);
                    return updatedMessages;
                });
            }
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [selectedFriend]);

    useEffect(() => {
        // Tự động cuộn xuống khi có tin nhắn mới
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSelectFriend = async (friend) => {
        setSelectedFriend(friend);
        try {
            const response = await axios.get(`http://localhost:8080/api/chat/history/${10}/${friend.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages({ ...messages, [friend.id]: response.data });
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() && !selectedImage) return;

        const messageData = {
            sender: { id: 10 },
            receiver: { id: selectedFriend.id },
            message: newMessage || null,
            image: selectedImage || null,
            sent: new Date().toISOString(),
        };

        try {
            // Gửi tin nhắn qua socket
            socket.emit("sendMessage", messageData);

            // Cập nhật tin nhắn vào state
            setMessages((prevMessages) => {
                const updatedMessages = { ...prevMessages };
                if (!updatedMessages[selectedFriend.id]) {
                    updatedMessages[selectedFriend.id] = [];
                }
                updatedMessages[selectedFriend.id].push(messageData);
                return updatedMessages;
            });

            setNewMessage("");
            setSelectedImage(null);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <div className="flex h-[85vh] bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white p-4 border-r">
                <h2 className="text-gray-600 font-semibold mb-3">BẠN BÈ TRỰC TUYẾN</h2>
                {friendsList.length > 0 ? (
                    friendsList.map((friend) => (
                        <div
                            key={friend.id}
                            className={`flex items-center p-3 rounded-md cursor-pointer transition 
                ${selectedFriend?.id === friend.id ? "bg-red-400 text-white" : "hover:bg-gray-100"}`}
                            onClick={() => handleSelectFriend(friend)}
                        >
                            <div className="relative">
                                <img
                                    src={friend.avatar || "https://via.placeholder.com/40"}
                                    alt={friend.name}
                                    className="w-10 h-10 rounded-full border"
                                />
                                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${friend.online ? "bg-green-500" : "bg-gray-400"}`}></span>
                            </div>
                            <div className="ml-3">
                                <p className="font-semibold">{friend.name}</p>
                                <p className="text-sm text-gray-500">{friend.message || "..."}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Đang tải danh sách...</p>
                )}
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
                {selectedFriend ? (
                    <>
                        <div className="p-4 bg-white border-b flex justify-between items-center">
                            <h2 className="text-lg font-semibold">{selectedFriend.name}</h2>
                            <div className={`w-3 h-3 rounded-full ${selectedFriend.online ? "bg-green-500" : "bg-gray-400"}`} />
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            {messages[selectedFriend.id]?.map((msg, index) => {
                                const time = new Date(msg.sent);
                                const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;

                                return (
                                    <div key={index} className={`flex ${msg.sender.id === 10 ? "justify-end" : "justify-start"}`}>
                                        <div className={`p-3 rounded-lg text-white max-w-xs ${msg.sender.id === 10 ? "bg-blue-500" : "bg-red-400"}`}>
                                            {msg.message && <p>{msg.message}</p>}
                                            {msg.image && <img src={msg.image} alt="Sent" className="mt-2 max-w-[150px] rounded-lg" />}
                                            <span className="text-xs opacity-75">{formattedTime}</span>
                                        </div>
                                    </div>
                                );
                            })}
                            {/* Phần tử ẩn để cuộn xuống cuối */}
                            <div ref={messagesEndRef}></div>
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t bg-white flex">
                            <input
                                type="message"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 p-2 border rounded-lg"
                                placeholder="Type a message..."
                            />
                            <label className="ml-2 bg-gray-200 text-gray-600 px-4 py-2 rounded-lg cursor-pointer">
                                📎
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                            <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex justify-center items-center text-gray-500">Select a friend to start chatting</div>
                )}
            </div>
        </div>
    );
}

export default Chat;
