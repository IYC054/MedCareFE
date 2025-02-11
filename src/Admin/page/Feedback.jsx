import React, { useEffect, useState } from 'react';
import '../scss/feedback.scss';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import { getToken } from '../../components/Authentication/authService';


function Feedback(props) {
    const [feedback, setFeedback] = useState([]);
    const [filteredFeedback, setFilteredFeedback] = useState([]); // For storing filtered feedback
    const [isFeedbackBox, setIsFeedbackBox] = useState(true); // To track which section is selected
  const token = getToken();
    useEffect(() => {
        const fetchFeedback = async () => {
            const response = await axios.get('http://localhost:8080/api/feedbacks/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFeedback(response.data);  // Store all feedback
            setFilteredFeedback(response.data.filter(item => item.account.id !== 10));  // Initially show feedback with account.id !== 10
        };

        fetchFeedback();
    }, []);

    const handleFeedbackBoxClick = () => {
        // Show all feedback where account.id is NOT 10
        const filtered = feedback.filter(item => item.account.id !== 10);
        setFilteredFeedback(filtered);
        setIsFeedbackBox(true);
    };

    const handleFeedbackGivenClick = () => {
        // Show only feedback where account.id is 10
        const filtered = feedback.filter(item => item.account.id === 10);
        setFilteredFeedback(filtered);
        setIsFeedbackBox(false);
    };

    const navigate = useNavigate();
    console.log(filteredFeedback);
    return (
        <div className='flex'>
            <div className="mail">
                <div className="bg-white rounded-lg shadow-md">
                    <ul className="flex flex-col">
                        <li className="p-3">
                            <Link to="/admin/feedback/sendfeedback" className="w-full flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-[#da624a] border-primary rounded-md hover:bg-[#b2503c] transition">
                                Write New Email
                            </Link>
                        </li>

                        <li className="px-4 py-2 text-gray-600 font-semibold uppercase text-sm">
                            My Account
                        </li>
                        <li className="py-2">
                            <a
                                href="#"
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                                onClick={handleFeedbackBoxClick}
                            >
                                <i className="bi bi-inbox mr-2"></i>
                                <span>feedback box</span>

                            </a>
                        </li>
                        <li className="py-2">
                            <a
                                href="#"
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                                onClick={handleFeedbackGivenClick}
                            >
                                <i className="bi bi-send mr-2"></i>
                                <span>feedback has been given</span>
                            </a>
                        </li>
                        {/* Other list items */}
                    </ul>
                </div>
            </div>

            <div className="boxmail" id="goup">
                <div className="app-inner-layout__top-pane flex justify-between border-b-2">
                    <div className="pane-left">
                        <div className="mobile-app-menu-inline-flex tracking-wide px-4 py-6 text-2xl rounded-md font-bold">
                            Inbox
                        </div>
                    </div>
                    <div className='pane-right'>
                        <div className='input-group px-4 py-6 flex'>
                            <button className='input-group-prepend border px-3 py-2 rounded-l-md bg-[#faeae7]'>
                                <div className='input-group-text'>
                                    <i className='bi bi-search'></i>
                                </div>
                            </button>
                            <input placeholder="Search..." type="text" className="form-control px-3 border rounded-r-md" />
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full">
                    <div className="max-h-screen overflow-y-auto">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>
                                {/* Add any table headings if needed */}
                            </thead>
                            <tbody>
                                {/* Render feedback excluding account.id === 10 */}
                                {filteredFeedback.filter(item => item.account.id !== 10).map((item, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => navigate(`/admin/feedback/reponse/${item.id}`)}
                                        className="w-full bg-white hover:bg-gray-100 transition duration-300 group relative bg-blue-100"
                                    >
                                        <td className="py-3 pl-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={item.account.avatar}
                                                    alt="Avatar"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div className="ml-2">
                                                    <div className="font-semibold text-gray-600">
                                                        {item.account.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm')}
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

                            <tbody>
                                {/* Render feedback with account.id === 10 */}
                                {filteredFeedback.filter(item => item.account.id === 10).map((item, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => navigate(`/admin/feedback/wasReponse/${item.recipient.id}`)}
                                        className="w-full bg-white hover:bg-gray-100 transition duration-300 group relative bg-blue-100"
                                    >
                                        <td className="py-3 pl-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={item.recipient.avatar}
                                                    alt="Avatar"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div className="ml-2">
                                                    <div className="font-semibold text-gray-600">
                                                        {item.recipient.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm')}
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
