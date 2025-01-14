import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateSpecialty(props) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null, // Avatar sẽ lưu ảnh dưới dạng file
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    // Xử lý thay đổi input text
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Xử lý thay đổi file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            image: file || null, // Nếu không có file, đặt giá trị là null
        }));
    };
    console.log("FormData:", formData);
    // Xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("image", formData.avatar);
            const response = await axios.post(
                'http://localhost:8080/api/specialty/create',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                       
                    },
                }
            );
            

            console.log('Response:', response.data);
            setSuccess('Tạo thành công');
            navigate('/admin/specialty');
        } catch (err) {
            console.error('Error:', err);
            setError('Không thể tạo. Vui lòng thử lại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-h-full pb-3 flex" id="goup">
            <div className="w-full bg-white shadow-lg rounded-lg p-5 border-2 border-[#da624a]">
                <form className="space-y-4 w-full sm:px-96" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold text-[#da624a]">Thêm mới</h3>

                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {success && <div className="text-green-500 text-sm">{success}</div>}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Tên khoa
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
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Miêu tả
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                            Ảnh bìa
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
                                    className="w-36 h-36 rounded-sm"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <button
                            type="submit"
                            className={`px-6 py-2 rounded-md ${loading ? 'bg-gray-400' : 'bg-[#da624a] text-white'}`}
                            disabled={loading}
                        >
                            {loading ? 'Đang thêm...' : 'Thêm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateSpecialty;
