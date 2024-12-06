import React, { useState } from "react";

function CreatEmail() {
    const [recipientType, setRecipientType] = useState(""); // doctor or patient
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    // Mock data for doctors and patients
    const doctors = [
        { id: 1, name: "Dr. John Doe", email: "johndoe@hospital.com", image: "https://s120-ava-talk.zadn.vn/7/8/0/d/13/120/14c84001a633168678760689e3880fc1.jpg" },
        { id: 2, name: "Dr. Jane Smith", email: "janesmith@hospital.com", image: "https://s120-ava-talk.zadn.vn/7/8/0/d/13/120/14c84001a633168678760689e3880fc1.jpg" },
    ];

    const patients = [
        { id: 1, name: "Alice Johnson", email: "alicejohnson@gmail.com", image: "https://s120-ava-talk.zadn.vn/7/8/0/d/13/120/14c84001a633168678760689e3880fc1.jpg" },
        { id: 2, name: "Bob Williams", email: "bobwilliams@gmail.com", image: "https://s120-ava-talk.zadn.vn/7/8/0/d/13/120/14c84001a633168678760689e3880fc1.jpg" },
    ];

    const handleRecipientTypeChange = (e) => {
        setRecipientType(e.target.value);
        setSelectedRecipient(null); // Reset selected recipient when type changes
    };

    const handleRecipientChange = (e) => {
        const id = parseInt(e.target.value);
        const recipients = recipientType === "doctor" ? doctors : patients;
        const recipient = recipients.find((r) => r.id === id);
        setSelectedRecipient(recipient);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedRecipient && title && message) {
            console.log({
                recipientType,
                selectedRecipient,
                title,
                message,
            });
            alert("Email sent successfully!");
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="max-w-screen-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-[#da624a]">
            <h3 className="text-xl font-semibold text-[#da624a] mb-4">Send Email</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Field */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter email title"
                        className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        required
                    />
                </div>

                {/* Recipient Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Send To</label>
                    <select
                        value={recipientType}
                        onChange={handleRecipientTypeChange}
                        className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        required
                    >
                        <option value="">Select Recipient Type</option>
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>
                </div>

                {/* Recipient Selection */}
                {recipientType && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Select a {recipientType === "doctor" ? "Doctor" : "Patient"}
                        </label>
                        <select
                            onChange={handleRecipientChange}
                            value={selectedRecipient ? selectedRecipient.id : ""}
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                            required
                        >
                            <option value="">Select {recipientType === "doctor" ? "Doctor" : "Patient"}</option>
                            {(recipientType === "doctor" ? doctors : patients).map((recipient) => (
                                <option key={recipient.id} value={recipient.id}>
                                    {recipient.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Display Selected Recipient */}
                {selectedRecipient && (
                    <div className="mt-4 flex items-center">
                        <img
                            src={selectedRecipient.image}
                            alt={selectedRecipient.name}
                            className="w-16 h-16 rounded-full mr-4"
                        />
                        <div>
                            <p className="text-lg font-medium">{selectedRecipient.name}</p>
                            <p className="text-sm text-gray-500">{selectedRecipient.email}</p>
                        </div>
                    </div>
                )}

                {/* Message Field */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                        className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#da624a] text-white rounded-md hover:bg-[#c85138]"
                    >
                        Send Email
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatEmail;
