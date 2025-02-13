import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../../../components/Authentication/authService";
import { useNavigate } from "react-router-dom";

function CreateEmail() {
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();
  const navigate = useNavigate();

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!senderEmail.trim() || !message.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/api/sendmail",
        {
          message,
          sender_email: senderEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Email sent successfully!");
      navigate("/admin/feedback");
      setSenderEmail("");
      setMessage("");
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-[#da624a]">
      <h3 className="text-xl font-semibold text-[#da624a] mb-4">Gửi mail</h3>
      <form onSubmit={handleSendEmail} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Gửi tới</label>
          <input
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
            required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-[#da624a] text-white rounded-md hover:bg-[#c85138] flex items-center justify-center"
            disabled={isLoading}
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

export default CreateEmail;
