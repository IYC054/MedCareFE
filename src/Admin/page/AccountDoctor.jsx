import React from 'react';
// import '../scss/AccountDoctor.scss';
import { Link } from 'react-router-dom';

function AccountDoctor(props) {
    return (
        <div className="tab-content">
            <div className='tool pb-10 flex justify-between '>
                <div className='place-content-center'>
                    <Link to="/admin/doctor/CreateDoctor" className="w-full flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-[#da624a] border-primary rounded-md hover:bg-[#b2503c] transition"
                    >
                        Create New Account
                    </Link>
                </div>
                <div className='flex'>
                    <div className='place-content-center'>
                        <select className="form-select px-5 py-3  border rounded-md ">
                            <option>departments</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div className='input-group px-4 py-6 flex' >
                        <button className='input-group-prepend  border px-3 py-2 rounded-l-md bg-[#faeae7]'>
                            <div className='input-group-text'>
                                <i className='bi bi-search '></i>
                            </div>
                        </button>
                        <input placeholder="Search..." type="text" className="form-control px-3 border rounded-r-md  	" />
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Repeat for each card */}
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div key={index} className="shadow-lg border mb-3 p-0 rounded-md z-0">
                            <div className="bg-[#da624a] p-4 rounded-t-md relative z-6">
                                <div
                                    className="absolute inset-0 bg-center bg-no-repeat opacity-25 filter grayscale"
                                    style={{
                                        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s')`,
                                    }}
                                />
                                <div className="relative z-10 text-center">
                                    <div className="inline-block mr-2">
                                        <div className="w-14 h-14 rounded-full border-4 border-white overflow-hidden">
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s"
                                                alt="Avatar of Tuan"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-white text-xl font-medium">Tuan</h5>
                                    </div>
                                    <div className="flex justify-center space-x-2 mt-2">
                                        <button className="btn btn-info btn-sm text-white">View Profile</button>
                                        <button className="btn btn-warning btn-sm text-white">
                                            <i className="bi bi-gear"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-y-auto max-h-40">
                                <div className="space-y-2">
                                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                                        <div key={index} className="relative group flex justify-between items-center bg-gray-100 p-3 rounded-md">
                                            <div className="flex items-center space-x-2">
                                                <i className="pe-7s-file text-gray-500 text-2xl"></i>
                                                <div>
                                                    <div className="text-sm font-medium">File patient</div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button className="text-blue-500 text-sm">
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                                <button className="text-gray-500 text-sm">
                                                    <i className="bi bi-tools"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AccountDoctor;
