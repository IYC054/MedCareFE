import React, { useEffect, useState } from 'react';
import '../scss/feedback.scss';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

function Feedback(props) {
    const [feedback, setFeedback] = useState([])

    useEffect(() => {
        const fetchFeedback = async () => {

            const response = await axios.get('http://localhost:8080/api/feedbacks');

            setFeedback(response.data);

        };
        fetchFeedback();
    }, []);
    console.log(feedback)
    return (
        <div className='flex'>

            <div className="mail">
                <div className="bg-white rounded-lg shadow-md">
                    <ul className="flex flex-col">
                        {/* Write New Email Button */}
                        <li className="p-3">
                            <Link to="/admin/feedback/sendfeedback" className="w-full flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-[#da624a] border-primary rounded-md hover:bg-[#b2503c] transition"
                            >
                                Write New Email
                            </Link>
                        </li>

                        <li className="px-4 py-2 text-gray-600 font-semibold uppercase text-sm">
                            My Account
                        </li>
                        <li className="py-2">
                            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                                <i className="bi bi-inbox mr-2"></i>
                                <span>feedback box</span>
                                <span className="ml-auto bg-blue-100 text-blue-600 text-sm font-medium rounded-full px-2 py-0.5">8</span>
                                <span className="ml-auto bg-green-100 text-green-600 text-sm font-medium rounded-full px-2 py-0.5">New</span>
                            </a>
                        </li>
                        <li className="py-2">
                            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                                <i className="bi bi-send mr-2"></i>
                                <span>feedback has been given</span>
                            </a>
                        </li>
                        <li className="py-2">
                            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                                <i className="bi bi-people mr-2"></i>
                                <span>Form Patient</span>

                            </a>
                        </li>
                        <li className="py-2">
                            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                                <i className="bi bi-hospital mr-2"></i>
                                <span>Form doctor</span>

                            </a>
                        </li>
                        <li className="border-t my-2"></li>

                        <li className="py-2">
                            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                                <i className="bi bi-trash mr-2"></i>
                                <span>Trash</span>
                            </a>
                        </li>
                        <li className="py-2">
                            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                                <i className="bi bi-motherboard mr-2"></i>
                                <span>Others</span>
                                <span className="ml-auto bg-yellow-100 text-yellow-600 text-sm font-medium rounded-full px-2 py-0.5">512</span>
                            </a>
                        </li>



                    </ul>
                </div>

            </div>
            <div className="boxmail " id="goup">
                <div className="app-inner-layout__top-pane flex justify-between border-b-2">
                    <div className="pane-left">
                        <div className="mobile-app-menu-inline-flex tracking-wide  px-4 py-6  text-2xl rounded-md  font-bold ">
                            Inbox
                        </div>
                    </div>
                    <div className='pane-right'>
                        <div className='input-group px-4 py-6 flex ' >
                            <button className='input-group-prepend  border px-3 py-2 rounded-l-md bg-[#faeae7]'>
                                <div className='input-group-text'>
                                    <i className='bi bi-search '></i>
                                </div>
                            </button>
                            <input placeholder="Search..." type="text" className="form-control px-3 border rounded-r-md  	" />
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full"  >
                    <div className="max-h-screen overflow-y-auto">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>

                            </thead>
                            <tbody>
                                {feedback.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`w-full bg-white hover:bg-gray-100 transition duration-300 group relativebg-blue-100`}  >

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
                                        <td className="w-fit pb-5 relative">
                                            <div className="hidden group-hover:flex space-x-2 absolute right-0">

                                                <button className="hover:text-red-500">
                                                    <i className="bi bi-trash2 text-gray-400 right-4 text-xl relative"></i>
                                                </button>
                                            </div>
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