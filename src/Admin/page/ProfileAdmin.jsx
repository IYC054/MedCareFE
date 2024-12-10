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
        <div className="bg-[#fff] min-h-screen text-white">
            {/* Header section */}
            <div className="relative bg-[#0A2558] h-96">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 max-h-full"
                    style={{
                        backgroundImage: `url('${avatar}')`,
                        // backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUWB51JwETzUH9_F2hZJzagg0LKEV6dYi8g&s')`,
                        backgroundSize: 'contain',
                        // backgroundRepeat: 'no-repeat',
                    }}

                ></div>
                <div className="relative z-10 p-8 flex items-center justify-between top-60">
                    <div className="flex items-center space-x-4">
                        {/* Avatar container */}
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#ffffff] relative group">
                            {/* Avatar image */}
                            <img
                                src={avatar}
                                alt="Avatar"
                                className="object-cover w-full h-full cursor-pointer"
                            // Trigger file input
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
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition" onClick={() => document.getElementById("avatarInput").click()}>
                                <span className="text-white text-sm font-bold">Change Avatar</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">tuan</h1>
                            <span className="text-sm opacity-75">Admin</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Account Info */}
                    <div className="bg-[#fff] rounded-md p-6 shadow-lg">
                        <h2 className="text-lg text-gray-700 font-bold mb-4">Info account</h2>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-gray-700 text-sm opacity-75 mb-1">Username:</label>
                                <input
                                    type="text"
                                    value="tuanlk42"
                                    readOnly
                                    className="w-full px-4 py-2 bg-[#fff] text-gray-900 rounded-md border border-gray-800"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-700 text-sm opacity-75 mb-1">Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="w-full px-4 py-2 bg-[#fff] text-gray-900 rounded-md border border-gray-800"
                                />
                            </div>
                        </div>
                        <div className='w-full flex justify-end'>
                            <button
                             
                                className="flex items-center justify-center w-40 py-2 bg-primary my-2 text-gray-600 font-bold rounded-md hover:bg-gray-400 transition"
                            >
                                Update Email
                            </button>
                        </div>


                    </div>

                    {/* Change Password */}
                    <div className="bg-[#da624a] rounded-md p-6 shadow-md">
                        <h2 className="text-lg font-bold mb-4">Đổi mật khẩu</h2>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                            <div>
                                <label className="block text-sm opacity-75 mb-1">Old password</label>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-[#fff] text-gray-900 rounded-md border border-[#3b4a6b]"
                                    placeholder='Old password'
                                />
                            </div>
                            <div>
                                <label className="block text-sm opacity-75 mb-1">New password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-[#fff] text-gray-900 rounded-md border border-[#3b4a6b]"
                                    placeholder='New password'
                                />
                            </div>
                            <div>
                                <label className="block text-sm opacity-75 mb-1">Re-enter new password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-[#fff] text-gray-900 rounded-md border border-[#3b4a6b]"
                                    placeholder='Re-enter new password'
                                />
                            </div>
                            <button
                                onClick={handlePasswordChange}
                                className="flex items-center justify-center w-40 py-2 bg-primary text-white font-bold rounded-md hover:bg-[#b94f3d] transition"
                            >
                                Change password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileAdmin;
