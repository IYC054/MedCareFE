import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import token from "../../../api/token";

const FeedbackDetail = () => {
    const { id } = useParams();
    const [feedback, setFeedback] = useState(null);
    const [reply, setReply] = useState("");


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
        axios.post(`http://localhost:8080/api/feedbacks/${feedback.recipient.id}`, {
            message: reply,
            recipient: {
                "id": 10
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                alert("Reply sent successfully!");
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
            });
    };

    if (!feedback) return <p>Loading...</p>;


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Feedback Của {feedback.account.name}</h2>
            <div className="mb-4">

                <p><strong>Email:</strong> {feedback.account.email}</p>
                <p><strong>Thời gian:</strong>  {new Date(feedback.createdAt).toLocaleString()}</p>
                <p><strong>Nột dung:</strong> {feedback.message}</p>
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
            >
                Send Reply
            </button>
        </div>
    );
};

export default FeedbackDetail;
