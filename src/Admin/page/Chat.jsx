import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import { getToken } from "../../components/Authentication/authService";
import { AppContext } from "../../components/Context/AppProvider";


function Chat() {
    const token = getToken();
    const { User } = useContext(AppContext);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [friendsList, setFriendsList] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState({});
    const [stompClient, setStompClient] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!User?.id) return;

        const stomp = new Client({
            brokerURL: "ws://localhost:8080/ws",
            connectHeaders: {
                Authorization: `Bearer ${token}`,
                userId: String(User.id) // Convert userId to string
            },
            debug: (str) => console.log("🔧 [STOMP Debug]:", str),
            onConnect: () => {
                console.log("✅ Kết nối STOMP thành công!");

                const topic = `/user/${User.id}/queue/messages`;
                console.log("🔗 Đang subscribe vào:", topic);

                stomp.subscribe(topic, (message) => {
                    console.log("📩 Tin nhắn nhận được từ WebSocket:", message.body);
                    try {
                        const newMsg = JSON.parse(message.body);
                        setReceivedMessages((prev) => ({
                            ...prev,
                            [newMsg.senderId]: [...(prev[newMsg.senderId] || []), newMsg],
                        }));
                    } catch (error) {
                        console.error("❌ Lỗi khi parse tin nhắn:", error, message.body);
                    }
                });
            },
            onStompError: (error) => console.error("⚠️ Lỗi STOMP:", error),
            onDisconnect: () => console.warn("⚠️ Mất kết nối WebSocket"),
        });

        stomp.activate();
        setStompClient(stomp);

        return () => stomp.deactivate();
    }, [User?.id, token]); 



    console.log("🟢 STOMP Connected:", stompClient?.connected);


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [receivedMessages, selectedFriend]);

    useEffect(() => {
        console.log("STOMP Client Connected:", stompClient?.connected);
    }, [stompClient]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/account", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setFriendsList(response.data.result);
        }).catch((error) => console.error("Lỗi lấy danh sách bạn bè:", error));
    }, []);

    // Chọn bạn để chat
    const handleSelectFriend = async (friend) => {
        setSelectedFriend(friend);
        try {
            const response = await axios.get(`http://localhost:8080/api/messages/${User.id}/${friend.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setReceivedMessages((prev) => ({
                ...prev,
                [friend.id]: response.data,
            }));
        } catch (error) {
            console.error("Lỗi lấy tin nhắn:", error);
        }
    };

    // Gửi tin nhắn
    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedFriend || !stompClient?.connected) return;

        const messageData = {
            sender: { id: User.id },
            receiver: { id: selectedFriend.id },
            content: newMessage,
        };
        try {
            stompClient.publish({
                destination: "/app/chat.sendMessage",
                body: JSON.stringify(messageData),
            });

            console.log("📤 Tin nhắn gửi đi:", messageData);

            setReceivedMessages((prev) => ({
                ...prev,
                [selectedFriend.id]: [...(prev[selectedFriend.id] || []), messageData],
            }));

            setNewMessage("");
        } catch (error) {
            console.error("❌ Lỗi khi gửi tin nhắn:", error);
        }
    };



    return (
        <div className="flex h-[85vh] bg-gray-100">
            {/* Sidebar danh sách bạn bè */}
            <div className="w-1/4 bg-white p-4 border-r overflow-auto">
                <h2 className="text-gray-600 font-semibold mb-3">BẠN BÈ TRỰC TUYẾN</h2>
                {friendsList.map((friend) => (
                    <div key={friend.id}
                        className={`flex items-center p-3 rounded-md cursor-pointer transition ${selectedFriend?.id === friend.id ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                        onClick={() => handleSelectFriend(friend)}>

                        <div className="w-3 h-3 rounded-full mr-2" style={{ background: friend.isOnline ? "green" : "gray" }}></div>
                        <p className="font-semibold">{friend.name}</p>
                    </div>
                ))}

            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b bg-white">{selectedFriend?.name || "Chọn một người để chat"}</div>

                <div className="flex-1 p-4 overflow-y-auto">
                    {receivedMessages[selectedFriend?.id]?.map((msg, index) => (
                        <div key={index} className={`p-2 my-1 rounded-md max-w-xs ${msg.sender.id === User.id ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto"}`}>
                            {msg.content}
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>

                <div className="p-4 border-t bg-white flex">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Nhập tin nhắn..." />
                    <button onClick={handleSendMessage}>Gửi</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
