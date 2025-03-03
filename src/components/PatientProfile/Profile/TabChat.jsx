import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import { AppContext } from "../../Context/AppProvider";
import { getToken } from "../../Authentication/authService";

function TabChat() {
    const [adminList, setAdminList] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [stompClient, setStompClient] = useState(null);

    const token = getToken();
    const { User } = useContext(AppContext);

    // Fetch Admin List
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/account", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const admins = response.data.result.filter((account) =>
                    Array.isArray(account.role)
                        ? account.role.some((r) => r.name === "ADMIN")
                        : account.role === "ADMIN"
                );
                setAdminList(admins);
            })
            .catch((error) => console.error("Lỗi lấy danh sách ADMIN:", error));
    }, [token]);

    // Handle selecting an Admin and fetching messages
    const handleSelectAdmin = async (admin) => {
        setSelectedAdmin(admin);
        try {
            const response = await axios.get(
                `http://localhost:8080/api/messages/${User.id}/${admin.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessages(response.data); // Ensure messages are stored as an array
        } catch (error) {
            console.error("Lỗi lấy tin nhắn:", error);
        }
    };

    // Initialize STOMP WebSocket connection
    useEffect(() => {
        if (!User?.id) return;

        const stomp = new Client({
            brokerURL: "ws://localhost:8080/ws",
            connectHeaders: {
                Authorization: `Bearer ${token}`,
                userId: String(User.id),
            },
            debug: (str) => console.log("🔧 [STOMP Debug]:", str),
            onConnect: () => {
                console.log("✅ Kết nối STOMP thành công!");
                const topic = `/user/${User.id}/queue/messages`;
                console.log("🔗 Subscribing to:", topic);
                stomp.subscribe(topic, (message) => {
                    console.log("📩 Tin nhắn nhận được:", message.body);
                    try {
                        const newMsg = JSON.parse(message.body);
                        setMessages((prev) => [...prev, newMsg]);
                    } catch (error) {
                        console.error("❌ Lỗi khi parse tin nhắn:", error);
                    }
                });
            },
            onStompError: (error) => console.error("⚠️ Lỗi STOMP:", error),
            onDisconnect: () => console.warn("⚠️ Mất kết nối WebSocket"),
        });

        stomp.activate();
        setStompClient(stomp);

        return () => stomp.deactivate();
    }, [User?.id]);

    // Send message
    const sendMessage = () => {
        if (newMessage.trim() === "" || !stompClient || !selectedAdmin) return;

        const messageData = {
            sender: { id: User.id },
            receiver: { id: selectedAdmin.id },
            content: newMessage,
        };

        stompClient.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(messageData),
        });

        // Update messages state optimistically
        setMessages((prev) => [...prev, { senderId: User.id, content: newMessage }]);
        setNewMessage("");
    };

    return (
        <div className="flex h-full border-l border-[#00b5f1]">
            {/* Admin List */}
            <div className="w-1/3 border-r border-gray-300 p-4">
                <h2 className="text-[20px] font-semibold mb-4">Nhắn với Admin</h2>
                {adminList.length === 0 ? (
                    <p className="text-gray-500">Không có admin nào.</p>
                ) : (
                    <ul>
                        {adminList.map((admin) => (
                            <li
                                key={admin.id}
                                className={`p-2 cursor-pointer border-b ${
                                    selectedAdmin?.id === admin.id
                                        ? "bg-blue-200"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => handleSelectAdmin(admin)}
                            >
                                <strong>{admin.name}</strong> - {admin.email}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Chat Area */}
            <div className="w-2/3 flex flex-col">
                {/* Header */}
                <div className="bg-blue-500 text-white p-4 font-semibold">
                    {selectedAdmin ? `Nhắn tin với ${selectedAdmin.name}` : "Chọn một Admin để chat"}
                </div>
                {/* <div className="flex-1 p-4 overflow-y-auto">
                    {receivedMessages[selectedFriend?.id]?.map((msg, index) => (
                        <div key={index} className={`p-2 my-1 rounded-md max-w-xs ${msg.sender.id === User.id ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto"}`}>
                            {msg.content}
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div> */}
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                    {messages.length === 0 ? (
                        <p className="text-gray-500 text-center">Chưa có tin nhắn nào.</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 rounded max-w-[70%] ${
                                    msg.senderId === User.id
                                        ? "bg-blue-100 ml-auto text-right"
                                        : "bg-gray-200"
                                }`}
                            >
                                <strong>{msg.senderId === User.id ? "Bạn" : selectedAdmin?.name}:</strong> {msg.content}
                            </div>
                        ))
                    )}
                </div>

                {/* Message Input */}
                {selectedAdmin && (
                    <div className="p-4 border-t flex">
                        <input
                            type="text"
                            className="flex-1 p-2 border rounded"
                            placeholder="Nhập tin nhắn..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={sendMessage}
                        >
                            Gửi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TabChat;
