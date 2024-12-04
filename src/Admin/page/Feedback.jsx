import React, { useState } from 'react';
import '../scss/feedback.scss';
function Feedback(props) {
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAll = () => {
        setSelectedAll(!selectedAll);
        setSelectedRows(selectedAll ? [] : [...Array(20).keys()]);
    };

    const handleRowSelect = (index) => {
        setSelectedRows((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };
    return (
        <div className='flex'>

            <div className="mail">
                <div className="bg-white rounded-lg shadow-md">
                    <ul className="flex flex-col">
                        {/* Write New Email Button */}
                        <li className="p-3">
                            <button className="w-full flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-primary border-primary rounded-md hover:bg-gray-100 transition"
                            >
                                Write New Email
                            </button>


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
            <div className="boxmail">
                <div className="app-inner-layout__top-pane flex justify-between border-b-2">
                    <div className="pane-left">
                        <div className="mobile-app-menu-inline-flex tracking-wide  px-4 py-6  text-2xl tracking-normal font-medium rounded-md  font-bold ">
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
                <div className="bg-white w-full">
                    <div className="max-h-96 overflow-y-auto">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    <th className="">
                                        <input
                                            type="checkbox"
                                            checked={selectedAll}
                                            onChange={handleSelectAll}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />

                                    </th>
                                    <th className="">
                                        <i
                                            className={`bi bi-trash2 text-gray-400 transition-opacity duration-300 ${selectedRows.length > 0 && !selectedAll ? "opacity-100" : "opacity-0"
                                                }`}
                                        ></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(10)].map((_, index) => (
                                    <tr
                                        key={index}
                                        className={`w-full bg-white hover:bg-gray-100 transition duration-300 group relative ${selectedRows.includes(index) ? "bg-blue-100" : ""
                                            }`}  >
                                        {/* Checkbox */}
                                        <td className="pb-5">
                                            <div className="flex items-center justify-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(index)}
                                                    onChange={() => handleRowSelect(index)}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                            </div>
                                        </td>

                                        {/* Star */}
                                        <td className="pb-5 px-4">
                                            <div className="flex items-center justify-center">
                                                <i className="bi bi-star-fill text-yellow-500"></i>
                                            </div>
                                        </td>

                                        {/* User Info */}
                                        <td className="pb-5">
                                            <div className="flex items-center">
                                                <img
                                                    src="https://via.placeholder.com/40"
                                                    alt="Avatar"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div className="ml-2">
                                                    <div className="font-semibold text-gray-600">
                                                        Alina Mcloughlin
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Last seen online 15 minutes ago
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Message */}
                                        <td className="px-10 pb-5">
                                            Nullam dictum felis eu pede mollis pretium.
                                        </td>

                                        {/* Actions */}
                                        <td className="w-fit pb-5 relative">
                                            <div className="hidden group-hover:flex space-x-2 absolute right-0">
                                                <button className="hover:text-blue-500">
                                                    <i className="bi bi-tags-fill text-gray-400"></i>
                                                </button>
                                                <button className="hover:text-blue-500">
                                                    <i className="bi bi-calendar3 text-gray-400"></i>
                                                </button>
                                                <button className="hover:text-red-500">
                                                    <i className="bi bi-trash2 text-gray-400"></i>
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