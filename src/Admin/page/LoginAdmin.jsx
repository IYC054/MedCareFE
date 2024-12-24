import React from "react";

function LoginAdmin() {
    return (
        <div
            className="min-h-screen flex items-center justify-between"
            style={{
                backgroundImage: "url('https://medihome.com.vn/wp-content/uploads/2022/12/phan-mem-quan-ly-benh-vien-1.jpg')",
                backgroundSize: "cover",
                backgroundAttachment : "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >

        

            <div className="relative z-10 w-full max-w-md bg-white shadow-xl rounded-lg p-8 mr-10 ml-auto">
                {/* Hospital Logo */}
                <div className="flex justify-center mb-6">
                    <img
                        src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Fheader_logo.svg&w=2048&q=75"
                        alt="Hospital Logo"
                        className="w-24 h-24"
                    />
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Admin Login
                </h2>
                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg shadow-md transition-colors"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Forgot your password?{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Reset it here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginAdmin;
