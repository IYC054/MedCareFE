import { useEffect, useState } from "react";
import axios from "axios";
import token from "../../../api/token";
import { useParams } from "react-router-dom";

const FeedbackList = () => {
    const { id } = useParams();  // Get the `id` from the URL params
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/feedbacks/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

         
                const filteredFeedbacks = response.data.filter(feedback =>
                    feedback.account?.id === 10 || feedback.account?.id === Number(id) &&
                    feedback.recipient?.id === 10 || feedback.recipient?.id === Number(id)
                );

                setFeedbackList(filteredFeedbacks);  // Set the filtered feedbacks to state
            } catch (err) {
                console.error("Error fetching feedbacks:", err);
            }
        };

        fetchFeedbacks();
    }, [id]);  // Run effect when `id` changes

    if (!feedbackList.length) return <p>No feedback found...</p>;
    console.log(" cc",feedbackList);
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Lịch sử Feedback</h2>
            <ul>
                {feedbackList.map((feedback) => (
                    <li key={feedback.id} className="p-4 mb-4 border rounded-lg">
                        <div className="font-semibold">{feedback.account?.name || "Unknown Account"}</div>
                        <div className="text-sm text-gray-600">{feedback.recipient?.name || "Unknown Recipient"}</div>
                        <div className="text-sm text-gray-500">{new Date(feedback.createdAt).toLocaleString()}</div>
                        <p className="mt-2">{feedback.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedbackList;
