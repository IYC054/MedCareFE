import React, { useState } from "react";

function CreateAccountDoctor() {
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    const specialties = ["Cardiology", "Neurology", "Orthopedics"];

    const handleSpecialtyChange = (e) => setSelectedSpecialty(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleProfileImageChange = (e) => setProfileImage(e.target.files[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic
        console.log({
            email,
            password,
            profileImage,
            selectedSpecialty,
        });
    };

    return (
        <div className="max-h-full pb-3 flex max-w-screen" id="goup">
            <div className="w-full bg-white shadow-lg rounded-lg p-5 border-2 border-[#da624a]">
                <div className="mt-5">
                    <div className="step-pane active max-w-screen flex items-center justify-center">
                        <form className="space-y-4 w-fit sm:px-96" onSubmit={handleSubmit}>
                            <div>
                                <h3 className="text-xl font-semibold text-[#da624a]">Create Doctor Account</h3>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Enter email"
                                    className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter password"
                                    className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                                    required
                                />
                            </div>

                            {/* Profile Image Upload */}
                            <div>
                                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                                    Profile Image
                                </label>
                                <input
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfileImageChange}
                                    className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                                />
                                {profileImage && (
                                    <div className="mt-2">
                                        <img
                                            src={URL.createObjectURL(profileImage)}
                                            alt="Profile Preview"
                                            className="w-16 h-16 rounded-full"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Specialty Selection */}
                            <div>
                                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                                    Choose a Specialty
                                </label>
                                <select
                                    id="specialty"
                                    className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                                    value={selectedSpecialty}
                                    onChange={handleSpecialtyChange}
                                    required
                                >
                                    <option value="">Select a Specialty</option>
                                    {specialties.map((specialty) => (
                                        <option key={specialty} value={specialty}>
                                            {specialty}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-between mt-6">
                                <button type="submit" className="px-6 py-2 bg-[#da624a] text-white rounded-md">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAccountDoctor;
