import axios from "axios";
import React, { useEffect, useState } from "react";

function CreateAccountDoctor() {
    const [specialties, setSpecialties] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        phone: "",
        gender: "",
        birthdate: "",
        role: "Doctor",
        avatar: null,
        experienceYears: 0,
        status: "Active",
        selectedSpecialties: [],
    });
    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/specialty");
                setSpecialties(response.data);
            } catch (error) {
                console.error("Error fetching specialties:", error);
            }
        };
        fetchSpecialties();
    }, []);
    console.log(specialties)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // Nếu có file được chọn
        if (file) {
            // Tạo một bản sao của file mới với tên mặc định là "avatar" và phần mở rộng giống file g
            const newFile = new File([file], "avatar" + file.name.slice(file.name.lastIndexOf('.')), { type: file.type });

            // Cập nhật avatar trong formData
            setFormData({ ...formData, avatar: newFile });
        }
    };

    const handleSpecialtyChange = (e) => {
        const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({ ...formData, selectedSpecialties: selectedIds });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            specialties: formData.selectedSpecialties,
        };

        console.log("Form Data Submitted:", submitData);
        // API call for form submission goes here
    };

    return (
        <div className="max-h-full pb-3 flex " id="goup">
            <div className="w-full bg-white shadow-lg rounded-lg p-5 border-2 border-[#da624a]">
                <form className="space-y-4 w-full sm:px-96" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold text-[#da624a]">Create Doctor Account</h3>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                            required
                        />
                    </div>

                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
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
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                            required
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        />
                    </div>

                    {/* Gender Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <div className="mt-2 flex gap-4">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === "Male"}
                                    onChange={handleChange}
                                />{" "}
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === "Female"}
                                    onChange={handleChange}
                                />{" "}
                                Female
                            </label>
                        </div>
                    </div>

                    {/* Birthdate Field */}
                    <div>
                        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                            Birthdate
                        </label>
                        <input
                            id="birthdate"
                            name="birthdate"
                            type="date"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        />
                    </div>

                    {/* Experience Years Field */}
                    <div>
                        <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">
                            Years of Experience
                        </label>
                        <input
                            id="experienceYears"
                            name="experienceYears"
                            type="number"
                            value={formData.experienceYears}
                            onChange={handleChange}
                            min="0"
                            placeholder="Enter years of experience"
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        />
                    </div>

                    {/* Status Field */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Profile Image Upload */}
                    <div>
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                            Avatar
                        </label>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        />
                        {formData.avatar && (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(formData.avatar)}
                                    alt="Avatar Preview"
                                    className="w-16 h-16 rounded-full"
                                />
                            </div>
                        )}
                    </div>

                    {/* Specialty Selection */}
                    <div>
                        <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">
                            Specialties
                        </label>
                        <select
                            id="specialties"
                            multiple
                            value={formData.selectedSpecialties}
                            onChange={handleSpecialtyChange}
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        >


                            {specialties.map((specialty) => (
                                <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
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
    );
}

export default CreateAccountDoctor;
