import axios from "axios";
import React, { useContext, useState } from "react";
import { getToken } from "../../Authentication/authService";
import { AppContext } from "../../Context/AppProvider";
import { useNavigate } from "react-router-dom";

function TabFeedBack() {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();
  const navigate = useNavigate();
  const { User } = useContext(AppContext);

  const handleSendFeedback = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      alert("Vui lòng nhập nội dung feedback!");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/api/sendmail/other",
        {
          message: feedback,
          fullname: User.name,
          phone: User.phone,
          sender_email: User.email,
          status: "NEW",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Feedback gửi thành công!");
      setFeedback("");
    } catch (error) {
      alert(`Lỗi: ${error.response?.data?.message || "Đã xảy ra lỗi!"}`);
      console.error("Lỗi khi gửi feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full border-l border-[#00b5f1] p-10">
      <span className="text-[24px] font-medium">Feedback</span>
      <form onSubmit={handleSendFeedback} className="mt-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nhập feedback của bạn:
        </label>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b5f1]"
          placeholder="Nhập nội dung feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-[#00b5f1] text-white py-2 px-6 rounded-lg hover:bg-[#0099d6] transition"
          disabled={isLoading}
        >
          {isLoading ? "Đang gửi..." : "Gửi Feedback"}
        </button>
      </form>
    </div>
  );
}

export default TabFeedBack;
