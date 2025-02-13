import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../components/Authentication/authService";
import { useNavigate } from "react-router-dom";

function CreatEmail() {
 
  const [recipientType, setRecipientType] = useState(""); // doctor or patient
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Thêm state loading
  const token = getToken();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const accounts = response.data.result;
        setDoctors(accounts.filter((account) => account.role.some((r) => r.name === "DOCTOR")));
        setPatients(accounts.filter((account) => account.role.some((r) => r.name === "PATIENTS")));
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleRecipientTypeChange = (e) => {
    setRecipientType(e.target.value);
    setSelectedRecipient(null);
  };
  const natigave = useNavigate();
  const handleRecipientChange = (e) => {
    const id = parseInt(e.target.value);
    const recipients = recipientType === "doctor" ? doctors : patients;
    setSelectedRecipient(recipients.find((r) => r.id === id));
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      alert("Please enter your message before submitting!");
      return;
    }

    setIsLoading(true); // Bắt đầu loading

    try {
      await axios.post(
        `http://localhost:8080/api/feedbacks/${selectedRecipient.id}`,
        {
          message,
          recipient: {
            id: 10,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Reply sent successfully!");
      natigave("/admin/feedback");
      setMessage("");
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
      console.error("Error sending reply:", error);
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-[#da624a]">
      <h3 className="text-xl font-semibold text-[#da624a] mb-4">Send Email</h3>
      <form onSubmit={handleReplySubmit} className="space-y-4">
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

        <textarea
          className="w-full p-2 border rounded-md"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your reply..."
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-[#da624a] text-white rounded-md hover:bg-[#c85138] flex items-center justify-center"
            disabled={isLoading} // Vô hiệu hóa khi đang gửi
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Email"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatEmail;
