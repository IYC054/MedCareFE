import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../../components/Authentication/authService";


const FeedbackDetail = () => {
    const { id } = useParams();
    const [feedback, setFeedback] = useState(null);
    const [reply, setReply] = useState("");
    const token = getToken();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/feedbacks/one/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFeedback(response.data);

            } catch (err) {
                console.error(err);

            }
        };
        fetchNews();
    }, [id]);
    console.log(feedback);
    const navigate = useNavigate();
    const handleReplySubmit = () => {
        if (reply.trim() === "") {
            alert("Please enter your reply before submitting!");
            return;
        }
        setIsLoading(true); // Bắt đầu loading

        axios.post(`http://localhost:8080/api/feedbacks/${feedback.recipient.id}`, {
            message: reply,
            recipient: { id: 10 },
            status: "OLD"
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert("Reply sent successfully!");

                return axios.delete(`http://localhost:8080/api/feedbacks/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            })
            .then(() => {
                navigate("/admin/feedback");
                setReply("");
            })
            .catch(error => {
                if (error.response) {
                    alert(`Error: ${error.response.data.message || "Something went wrong!"}`);
                } else if (error.request) {
                    alert("No response from server. Please try again.");
                } else {
                    alert(`Request error: ${error.message}`);
                }
                console.error("Error sending reply:", error);
            })
            .finally(() => {
                setIsLoading(false); // Đảm bảo luôn tắt loading dù thành công hay lỗi
            });
    };


    if (!feedback) return <p>Loading...</p>;


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Feedback Của {feedback.account.name}</h2>
            <div className="mb-4">

                <p><strong>Email:</strong> {feedback.account.email}</p>
                <p><strong>Thời gian:</strong>  {new Date(feedback.createdAt).toLocaleString()}</p>
                <p><strong>Số liên lạc:</strong> {feedback.account.phone}</p>
                <p><strong>Nội dung:</strong> {feedback.message}</p>
            </div>
            <textarea
                className="w-full p-2 border rounded-md"
                rows="4"
                value={reply}

                onChange={(e) => setReply(e.target.value)}
                placeholder="Enter your reply..."
            />
            <button
                className="mt-2  px-6 py-2 bg-[#da624a] text-white rounded-md hover:bg-[#c85138]"
                onClick={handleReplySubmit}
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
    );
};

export default FeedbackDetail;
