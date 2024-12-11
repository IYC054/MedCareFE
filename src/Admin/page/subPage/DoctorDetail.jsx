import React from 'react';

function DoctorDetail(props) {
    return (
        <div className="bg-gray-100 min-h-screen p-6 "  id="goup">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                {/* Doctor Details Section */}
                <h1 className="text-3xl font-extrabold mb-6 text-[#da624a] text-center">Doctor Infomation</h1>
                <div className="mb-6 flex items-center gap-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#da624a] shadow-lg">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s" alt="Doctor Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Dr. Nguyễn Văn A</h2>
                        <p className="text-gray-600 text-lg mb-2"><span className="font-medium">Email:</span> example@example.com</p>
                        <p className="text-gray-600 text-lg mb-2"><span className="font-medium">Phone:</span> 0123456789</p>
                        <p className="text-gray-600 text-lg mb-2"><span className="font-medium">Address:</span> 123 ABC Street, XYZ District</p>
                        <p className="text-gray-600 text-lg"><span className="font-medium">Specialty:</span> General Medicine</p>
                    </div>
                </div>

                {/* Patient History Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Patient History</h2>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto ">
                        <table className= " min-w-full bg-white border border-gray-200 top-0 rounded-lg">
                            <thead className='sticky top-0 z-10'>
                                <tr className="bg-gray-50">
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">No.</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Patient Name</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Condition</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Prescription</th>
                                    <th className="text-left px-4 py-2 text-sm font-medium text-gray-500">Images</th>
                                </tr>
                            </thead>
                            <tbody >
                            <tr>
                                    <td className="px-4 py-2 text-gray-700">1</td>
                                    <td className="px-4 py-2 text-gray-700">Trần Văn B</td>
                                    <td className="px-4 py-2 text-gray-700">Flu</td>
                                    <td className="px-4 py-2 text-gray-700">Paracetamol</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s" alt="Condition Image" className="w-12 h-12 rounded" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">1</td>
                                    <td className="px-4 py-2 text-gray-700">Trần Văn B</td>
                                    <td className="px-4 py-2 text-gray-700">Flu</td>
                                    <td className="px-4 py-2 text-gray-700">Paracetamol</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s" alt="Condition Image" className="w-12 h-12 rounded" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">1</td>
                                    <td className="px-4 py-2 text-gray-700">Trần Văn B</td>
                                    <td className="px-4 py-2 text-gray-700">Flu</td>
                                    <td className="px-4 py-2 text-gray-700">Paracetamol</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s" alt="Condition Image" className="w-12 h-12 rounded" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">1</td>
                                    <td className="px-4 py-2 text-gray-700">Trần Văn B</td>
                                    <td className="px-4 py-2 text-gray-700">Flu</td>
                                    <td className="px-4 py-2 text-gray-700">Paracetamol</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s" alt="Condition Image" className="w-12 h-12 rounded" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 text-gray-700">2</td>
                                    <td className="px-4 py-2 text-gray-700">Lê Thị C</td>
                                    <td className="px-4 py-2 text-gray-700">Cough</td>
                                    <td className="px-4 py-2 text-gray-700">Cough Syrup</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s" alt="Condition Image" className="w-12 h-12 rounded" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                                        No patient history available.
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

export default DoctorDetail;
