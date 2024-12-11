import React from 'react';

function Transactions() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <div className="text-sm font-medium text-gray-900 border-1 bg-[#fcf1ef] rounded-lg p-3"><i className="bi bi-bank px-3 text-lg"></i>TOTAL REVENUE</div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">0<span className='text-sm'>₫</span></div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <div className="text-sm font-medium text-gray-900 border-1 bg-[#e7eeff] rounded-lg p-3"><i className="bi bi-bar-chart-fill  text-blue-700 px-3 text-lg"></i>NUMBER OF TRANSACTIONS</div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">0<span className='text-sm'>transaction</span> </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <div className="text-sm font-medium text-gray-900 border-1 bg-[#f0ffe2] rounded-lg p-3"><i className="bi bi-check-circle text-green-700 px-3 text-lg"></i>SUCCESSFUL TRANSACTION</div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">0<span className='text-sm'>transaction</span> </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <div className="text-sm font-medium text-gray-900 border-1 bg-[#ffebe9] rounded-lg p-3"><i className="bi bi-exclamation-circle px-3 text-red-700 text-lg"></i>TRANSACTION FAILED</div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">0<span className='text-sm'>transaction</span> </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="p-4 flex justify-between items-center border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-[#da624a]">5 RECENT TRANSACTIONS</h2>
                    <a href="#" className="text-sm text-[#da624a] hover:underline">See more</a>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-50">
                            <th className="text-left p-4 text-sm font-medium text-gray-500">STT</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Transaction code</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Date and time</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Phone number</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Customer name</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Transaction value (VND)</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                                <th className="text-left p-4 text-sm font-medium text-gray-500">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="8" className="p-6 text-center ">
                                    <div className="flex flex-col items-center">
                                        <div className="mb-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-10 h-10 text-gray-300"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 9V5.25M8.25 9V5.25M3 13.5h18M4.5 6.75h15m-2.25 3.75a6 6 0 11-12 0 6 6 0 0112 0z"
                                                />
                                            </svg>
                                        </div>
                                        <span className='text-gray-300'>No data</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Transactions;