import axios from "axios";
import React, { useContext, useState } from "react";
import { getToken } from "../../Authentication/authService";
import { AppContext } from "../../Context/AppProvider";

function TabFeedBack() {
  const [feedback, setFeedback] = useState("");
  const token = getToken();
  const {User} = useContext(AppContext)
  const sendFeedback = async (event) => {
    event.preventDefault(); // Ngăn form reload

    try {
   
      const response = await axios.post(
        `http://localhost:8080/api/feedbacks/10`,
        {
          message: feedback, 
          recipient: { id: User.id },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFeedback(""); // Xóa nội dung sau khi gửi
      console.log("Feedback sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };
  return (
    <div className="w-full h-full border-l border-[#00b5f1] p-10">
      <span className="text-[24px] font-medium">Feedback</span>
      <form onSubmit={sendFeedback} className="mt-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nhập feedback của bạn:
        </label>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b5f1]"
          placeholder="Nhập nội dung feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-[#00b5f1] text-white py-2 px-6 rounded-lg hover:bg-[#0099d6] transition"
        >
          Gửi Feedback
        </button>
      </form>
    </div>
  );
}

export default TabFeedBack;
