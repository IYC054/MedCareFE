import React from 'react';

function UserDetail(props) {
    return (
        <div className="bg-gray-100 min-h-screen p-6 "  id="goup">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">

                <h1 className="text-2xl font-bold mb-6 text-[#da624a]">Patient Infomation</h1>
                <div className="mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className='flex'>
                            <div className="w-24 h-24 rounded-full overflow-hidden mr-4 border-4 border-[#da624a] shadow-lg">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s" alt="User Avatar" className="object-cover" />
                            </div>
                            <div> <label className="block text-gray-600 text-sm mb-2">Full name:</label>
                                <p className="text-gray-800 mb-7">Nguyễn anh tuấn</p>
                                <label className="block text-gray-600 text-sm mb-2">Phone number:</label>
                                <p className="text-gray-800">0123456789</p>
                            </div>

                        </div>
                        <div>
                            <label className="block text-gray-600 text-sm mb-2">Email:</label>
                            <p className="text-gray-800 mb-7">example@example.com</p>
                            <label className="block text-gray-600 text-sm mb-2">Address:</label>
                            <p className="text-gray-800">123 Đường ABC, Quận XYZ</p>
                        </div>

                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Transaction history</h2>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead className='top-0 sticky z-10 ' >
                                <tr className="bg-gray-50">
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">STT</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Transaction code</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Date time</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Room</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Transaction value</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">1</td>
                                    <td className="px-4 py-2 text-gray-700">#123456</td>
                                    <td className="px-4 py-2 text-gray-700">2024-12-11 14:30</td>
                                    <td className="px-4 py-2 text-gray-700">5</td>
                                    <td className="px-4 py-2 text-gray-700">1,000,000₫</td>

                                    <td className="px-4 py-2 text-gray-700">Thành công</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">1</td>
                                    <td className="px-4 py-2 text-gray-700">#123456</td>
                                    <td className="px-4 py-2 text-gray-700">2024-12-11 14:30</td>
                                    <td className="px-4 py-2 text-gray-700">5</td>
                                    <td className="px-4 py-2 text-gray-700">1,000,000₫</td>

                                    <td className="px-4 py-2 text-gray-700">Thành công</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">1</td>
                                    <td className="px-4 py-2 text-gray-700">#123456</td>
                                    <td className="px-4 py-2 text-gray-700">2024-12-11 14:30</td>
                                    <td className="px-4 py-2 text-gray-700">5</td>
                                    <td className="px-4 py-2 text-gray-700">1,000,000₫</td>

                                    <td className="px-4 py-2 text-gray-700">Thành công</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">1</td>
                                    <td className="px-4 py-2 text-gray-700">#123456</td>
                                    <td className="px-4 py-2 text-gray-700">2024-12-11 14:30</td>
                                    <td className="px-4 py-2 text-gray-700">5</td>
                                    <td className="px-4 py-2 text-gray-700">1,000,000₫</td>

                                    <td className="px-4 py-2 text-gray-700">Thành công</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">1</td>
                                    <td className="px-4 py-2 text-gray-700">#123456</td>
                                    <td className="px-4 py-2 text-gray-700">2024-12-11 14:30</td>
                                    <td className="px-4 py-2 text-gray-700">5</td>
                                    <td className="px-4 py-2 text-gray-700">1,000,000₫</td>

                                    <td className="px-4 py-2 text-gray-700">Thành công</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">1</td>
                                    <td className="px-4 py-2 text-gray-700">#123456</td>
                                    <td className="px-4 py-2 text-gray-700">2024-12-11 14:30</td>
                                    <td className="px-4 py-2 text-gray-700">5</td>
                                    <td className="px-4 py-2 text-gray-700">1,000,000₫</td>

                                    <td className="px-4 py-2 text-gray-700">Thành công</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">1</td>
                                    <td className="px-4 py-2 text-gray-700">#123456</td>
                                    <td className="px-4 py-2 text-gray-700">2024-12-11 14:30</td>
                                    <td className="px-4 py-2 text-gray-700">5</td>
                                    <td className="px-4 py-2 text-gray-700">1,000,000₫</td>

                                    <td className="px-4 py-2 text-gray-700">Thành công</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">2</td>
                                    <td className="px-4 py-2 text-gray-700">#654321</td>
                                    <td className="px-4 py-2 text-gray-700">2024-12-10 10:00</td>
                                    <td className="px-4 py-2 text-gray-700">5</td>
                                    <td className="px-4 py-2 text-gray-700">500,000₫</td>
                                    <td className="px-4 py-2 text-gray-700">Thất bại</td>
                                </tr>
                                <tr>
                                    <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                                        No data.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
