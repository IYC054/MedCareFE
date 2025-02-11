import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { getToken } from "../../../components/Authentication/authService";


function CreatEmail() {
  const token = getToken();
  const [recipientType, setRecipientType] = useState(""); // doctor or patient
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");
  const token = getToken();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch accounts from the API
        const response = await axios.get("http://localhost:8080/api/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const accounts = response.data.result;

        // Filter doctors and patients based on their role
        const filteredDoctors = accounts.filter((account) =>
          account.role.some((r) => r.name === "DOCTOR")
        );
        const filteredPatients = accounts.filter((account) =>
          account.role.some((r) => r.name === "PATIENTS")
        );

        setDoctors(filteredDoctors); // Set doctors data
        setPatients(filteredPatients); // Set patients data
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchUsers();
  }, []); // Only run once when the component mounts

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

  const handleReplySubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (message.trim() === "") {
      alert("Please enter your message before submitting!");
      return;
    }

    axios
      .post(
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
      )
      .then(() => {
        alert("Reply sent successfully!");
        // You can navigate to another page if necessary
      })
      .catch((error) => {
        alert(
          `Error: ${error.response?.data?.message || "Something went wrong!"}`
        );
        console.error("Error sending reply:", error);
      });
  };

  return (
    <div className="max-w-screen-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-[#da624a]">
      <h3 className="text-xl font-semibold text-[#da624a] mb-4">Send Email</h3>
      <form onSubmit={handleReplySubmit} className="space-y-4">
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
              <option value="">
                Select {recipientType === "doctor" ? "Doctor" : "Patient"}
              </option>
              {(recipientType === "doctor" ? doctors : patients).map(
                (recipient) => (
                  <option key={recipient.id} value={recipient.id}>
                    {recipient.name}
                  </option>
                )
              )}
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
        <textarea
                className="w-full p-2 border rounded-md"
                rows="4"
                value={message}
             
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your reply..."
            />
      
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
