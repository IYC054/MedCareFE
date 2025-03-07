import React, { useEffect, useRef, useState } from 'react';
import '../scss/feedback.scss';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import { getToken } from '../../components/Authentication/authService';

function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]); // Dữ liệu Feedback
    const [isFeedbackBox, setIsFeedbackBox] = useState(true); // Trạng thái hiển thị danh sách
    const token = getToken();
    const navigate = useNavigate();
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchFeedbacks();
        }
    }, []); // Empty dependency array ensures it runs only once

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/sendmail', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFeedbacks(response.data);
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
        }
    };

    useEffect(() => {
        console.log("Feedback state updated:", feedbacks);
    }, [feedbacks]);

    // Lọc danh sách theo trạng thái
    const filteredFeedbacks = feedbacks.filter(feedback =>
        isFeedbackBox ? feedback.status === 'NEW' : feedback.status === 'OTHER'
    );

    return (
        <div className='flex'>
            {/* Sidebar Menu */}
            <div className="mail">
                <div className="bg-white rounded-lg shadow-md">
                    <ul className="flex flex-col">
                        <li className="p-3">
                            <Link to="/admin/feedback/sendfeedback" className="w-full flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-[#da624a] border-primary rounded-md hover:bg-[#b2503c] transition">
                                Gửi Email
                            </Link>
                        </li>

                        <li className="px-4 py-2 text-gray-600 font-semibold uppercase text-sm">
                            Feedback
                        </li>
                        <li className="py-2">
                            <button
                                className={`w-full flex items-center px-4 py-2 rounded transition ${isFeedbackBox ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                onClick={() => setIsFeedbackBox(true)}
                            >
                                <i className="bi bi-inbox mr-2"></i>
                                <span>Hộp thư</span>
                            </button>
                        </li>
                        <li className="py-2">
                            <button
                                className={`w-full flex items-center px-4 py-2 rounded transition ${!isFeedbackBox ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                onClick={() => setIsFeedbackBox(false)}
                            >
                                <i className="bi bi-send mr-2"></i>
                                <span>Hộp thư Khác</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Body Feedback Box */}
            <div className="boxmail">
                <div className="app-inner-layout__top-pane flex justify-between border-b-2">
                    <div className="pane-left">
                        <div className="mobile-app-menu-inline-flex tracking-wide px-4 py-6 text-2xl rounded-md font-bold">
                            {isFeedbackBox ? 'Hộp thư' : 'Hộp thư Khác'}
                        </div>
                    </div>
                </div>

                <div className="bg-white w-full">
                    <div className="max-h-screen overflow-y-auto">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <tbody>
                                {filteredFeedbacks.map((item, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => navigate(`/admin/feedback/wasReponse/${item.id}`)}
                                        className="w-full bg-white hover:bg-gray-100 transition duration-300 group relative bg-blue-100"
                                    >
                                        <td className="py-3 pl-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={item.recipient?.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeUUz1pW3PpdJVcOvcwfYWdKFK4wBGL_UvcA&s'}
                                                    alt="Avatar"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div className="ml-2">
                                                    <div className="font-semibold text-gray-600">
                                                        {item.recipient?.name || item.sender_email}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm') : 'N/A'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-3">
                                            {item.message}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Feedback;
