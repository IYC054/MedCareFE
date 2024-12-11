import React, { useState } from 'react';

function ProfileAdmin() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s");
    const [email, setEmail] = useState("tuann@gmail.com");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = () => {
        if (newPassword === confirmPassword && newPassword.trim() !== "") {
            alert("Password updated successfully!");
        } else {
            alert("Passwords do not match or are empty.");
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result); // Update the avatar preview with the file data
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-[#fff] min-h-screen text-gray-900 p-6 border-1 rounded-lg shadow-lg mb-10" id="goup">
            {/* Header section */}
            <div className="relative bg-[#0A2558] h-96 rounded-xl overflow-hidden shadow-lg">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{
                        backgroundImage: `url('${avatar}')`,
                        backgroundSize: 'cover',
                    }}
                ></div>
                <div className="relative p-8 flex items-center justify-between top-40 mx-auto max-w-7xl ">
                    <div className="flex items-center space-x-6">

                        <div className="  w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative group" onClick={() => document.getElementById("avatarInput").click()}>

                            <img
                                src={avatar}
                                alt="Avatar"
                                className="object-cover w-full h-full cursor-pointer"

                            />
                            {/* Hidden file input */}
                            <input
                                id="avatarInput"
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer">
                                <span className="text-white text-sm font-bold">Change Avatar</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold text-white">Tuan</h1>
                            <span className="text-md text-gray-200">Admin</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 pt-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Account Info */}
                    <div className="bg-white rounded-md p-6 shadow-xl">
                        <h2 className="text-lg font-bold text-gray-700 mb-4">Account Info</h2>
                        <div className="flex space-x-4 mb-6">
                            <div className="w-1/2">
                                <label className="block text-sm text-gray-700 mb-1">Username:</label>
                                <input
                                    type="text"
                                    value="tuanlk42"
                                    readOnly
                                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm text-gray-700 mb-1">Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300"
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <button
                                className="w-40 py-2 bg-[#0A2558] text-white font-bold rounded-md hover:bg-[#093c6b] transition"
                            >
                                Update Email
                            </button>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="bg-[#da624a] rounded-md p-6 shadow-xl">
                        <h2 className="text-lg font-bold text-white mb-4">Change Password</h2>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                            <div>
                                <label className="block text-sm text-white mb-1">Old Password</label>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-[#c5392e]"
                                    placeholder="Old password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-[#c5392e]"
                                    placeholder="New password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-white mb-1">Re-enter New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-[#c5392e]"
                                    placeholder="Re-enter new password"
                                />
                            </div>
                            <button
                                onClick={handlePasswordChange}
                                className="w-full py-2 bg-[#b94f3d] text-white font-bold rounded-md hover:bg-[#9e3b2c] transition"
                            >
                                Change Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileAdmin;
