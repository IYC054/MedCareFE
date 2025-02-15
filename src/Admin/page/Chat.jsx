import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getToken } from "../../components/Authentication/authService";
import SockJS from "sockjs-client";
import { over } from "stompjs";


function Chat() {
    const token = getToken();
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [friendsList, setFriendsList] = useState([]);
    const messagesEndRef = useRef(null);

    // const stompClientRef = useStompClient();

    useEffect(() => {

        const socket = new SockJS("http://localhost:8080/ws", null, {
            withCredentials: true,  // Cần thiết để gửi thông tin xác thực như cookies hoặc token
        });;
        const client = over(socket);


        client.connect({}, () => {
            console.log("✅ WebSocket Connected!");

            client.subscribe("/user/queue/messages", (message) => {
                console.log("📩 Received Message:", message.body);
                const receivedMessage = JSON.parse(message.body);
                handleReceiveMessage(receivedMessage);
            });
        }, (error) => {
            console.error("❌ WebSocket connection error:", error);
        });

    }, []);

    const handleReceiveMessage = (message) => {
        setMessages((prevMessages) => ({
            ...prevMessages,
            [message.sender.id]: [...(prevMessages[message.sender.id] || []), message],
        }));
    };

    // const handleSendMessage = () => {
    //     if (!newMessage.trim() && !selectedImage) return;

    //     const messageData = {
    //         sender: { id: 10 }, // Assuming logged-in user ID
    //         receiver: { id: selectedFriend.id },
    //         message: newMessage || null,
    //         image: selectedImage || null,
    //         sent: new Date().toISOString(),
    //     };

    //     if (stompClientRef.current && stompClientRef.current.connected) {
    //         stompClientRef.current.send("/app/chat", {}, JSON.stringify(messageData));

    //         setMessages((prevMessages) => ({
    //             ...prevMessages,
    //             [selectedFriend.id]: [...(prevMessages[selectedFriend.id] || []), messageData],
    //         }));

    //         setNewMessage("");
    //         setSelectedImage(null);
    //     } else {
    //         console.error("STOMP client not connected");
    //     }
    // };


    // Fetch danh sách bạn bè
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

    const handleSelectFriend = async (friend) => {
        setSelectedFriend(friend);

        try {
            const response = await axios.get(`http://localhost:8080/api/chat/history/${10}/${friend.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessages((prevMessages) => ({
                ...prevMessages,
                [friend.id]: response.data,
            }));
        } catch (error) {
            console.error("Error fetching messages:", error);
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
            <div className="w-1/4 bg-white p-4 border-r overflow-auto">
                <h2 className="text-gray-600 font-semibold mb-3">BẠN BÈ TRỰC TUYẾN</h2>
                <div>
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
                                        src={friend.avatar || ""}
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
                            <div ref={messagesEndRef}></div>
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t bg-white flex">
                            <label className="ml-2 bg-gray-200 text-gray-600 px-4 py-2 rounded-lg cursor-pointer">
                                📎
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 p-2 border rounded-lg" placeholder="Type a message..." />
                            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
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
