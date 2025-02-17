import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getToken } from "../../components/Authentication/authService";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function Chat() {
    const token = getToken();
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [friendsList, setFriendsList] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState({});
    const [stompClient, setStompClient] = useState(null);
    const messagesEndRef = useRef(null);
    const [notification, setListNotifications] = useState("");
    useEffect(() => {
        const sock = new SockJS(`http://localhost:8080/ws`);
        const socketUrl = `http://localhost:8080/ws`;
        console.log(socketUrl);

        const stompClient = Stomp.over(sock);
        console.log("socket", sock);
        console.log("stomp", stompClient);
        sock.onopen = () => console.log("SockJS connected");
        sock.onerror = (error) => console.error("SockJS Error:", error);
        sock.onclose = () => console.log("SockJS Disconnected");

        const topics = [
        ];

        stompClient.connect(
            {},
            () => {
                topics.forEach((topic) => {
                    stompClient.subscribe(topic, (messageOutput) => {
                        const newMessage = JSON.parse(messageOutput.body);
                        setListNotifications((prevMessages) => [
                            ...prevMessages,
                            { ...newMessage },
                        ]);

                        notification.success({
                            message: "Thông báo",
                            description: "Bạn có một thông báo mới. Vui lòng kiểm tra.",
                        });
                    });
                });
            },
            (err) => {
                console.error("WebSocket Error:", err);
            }
        );

        return () => stompClient.disconnect();
    }, []);

    // useEffect(() => {
    //     let socket = new SockJS("http://localhost:8080/ws");
    //     const client = over(socket);
    //     console.log("socket",socket);
    //     console.log("client",client);
    //     stompClient.connect(
    //         {},
    //         () => {
    //           topics.forEach((topic) => {
    //             stompClient.subscribe(topic, (messageOutput) => {
    //               const newMessage = JSON.parse(messageOutput.body);
    //               setListNotifications((prevMessages) => [
    //                 ...prevMessages,
    //                 { ...newMessage },
    //               ]);

    //               notification.success({
    //                 message: "Thông báo",
    //                 description: "Bạn có một thông báo mới. Vui lòng kiểm tra.",
    //               });
    //             });
    //           });
    //         },
    //         (err) => {
    //           console.error("WebSocket Error:", err);
    //         }
    //       );
    //     // client.connect({}, (frame) => {
    //     //     console.log("Connected: " + frame);

    //     //     client.subscribe("/user/queue", (messageOutput) => {
    //     //         console.log("Received message:", messageOutput.body);
    //     //         const receivedMessage = JSON.parse(messageOutput.body);
    //     //         setReceivedMessages((prevMessages) => ({
    //     //             ...prevMessages,
    //     //             [receivedMessage.sender.id]: [
    //     //                 ...(prevMessages[receivedMessage.sender.id] || []),
    //     //                 receivedMessage,
    //     //             ],
    //     //         }));
    //     //     });
    //     // });
    // //     setStompClient(client);
    // }, []);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedFriend) return;

        const messageData = {
            senderId: 10,
            receiverId: selectedFriend.id,
            messageText: newMessage,
            sent_at: new Date().toISOString(),
        };

        if (stompClient) {
            stompClient.send(
                "/app/sendMessage",
                {},
                JSON.stringify(messageData)
            );

            setReceivedMessages((prevMessages) => ({
                ...prevMessages,
                [selectedFriend.id]: [
                    ...(prevMessages[selectedFriend.id] || []),
                    messageData,
                ],
            }));

            setNewMessage("");
        }
    };
    console.log(receivedMessages);
    // Auto scroll đến tin nhắn mới
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [receivedMessages]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/account", {
                    headers: { Authorization: `Bearer ${token}` },
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
            const response = await axios.get(`http://localhost:8080/api/messages/${10}/${friend.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setReceivedMessages((prevMessages) => ({
                ...prevMessages,
                [friend.id]: response.data,
            }));
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };
    console.log(friendsList);
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
                            {receivedMessages[selectedFriend.id]?.map((msg, index) => {
                                const time = new Date(msg.sent_at);
                                const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;

                                return (
                                    <div key={index} className={`flex ${msg.senderId === 10 ? "justify-end" : "justify-start"}`}>
                                        <div className={`p-3 rounded-lg text-white max-w-xs ${msg.senderId === 10 ? "bg-blue-500" : "bg-red-400"}`}>
                                            {msg.messageText && <p>{msg.messageText}</p>}
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
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 p-2 border rounded-lg"
                                placeholder="Type a message..."
                            />
                            <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
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
