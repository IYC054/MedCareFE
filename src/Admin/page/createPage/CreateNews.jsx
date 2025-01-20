import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function CreateNews() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '', // Ngày
        images: null, // Lưu ảnh dưới dạng file
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
    const handleCKEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData((prevData) => ({
            ...prevData,
            description: data,
        }));
    };

    // Xử lý thay đổi file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            images: file || null, // Nếu không có file, đặt giá trị là null
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('date', formData.date);
            formDataToSend.append('description', formData.description);
            
            formDataToSend.append('images', formData.images);
            formDataToSend.append('title', formData.title);
            console.log(formDataToSend);
            const response = await axios.post(
                'http://localhost:8080/api/news',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Response:', response.data);
            setSuccess('Tạo tin tức thành công!');
            navigate('/admin/news');
        } catch (err) {
            console.error('Error:', err);
            setError('Không thể tạo. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl pb-3 flex" id="goup">
            <div className="l bg-white shadow-lg rounded-lg p-5 border-2 border-[#da624a]">
                <form className="space-y-4 w-full sm:px-96" onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold text-[#da624a]">Thêm Tin Tức Mới</h3>

                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {success && <div className="text-green-500 text-sm">{success}</div>}

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Tiêu đề
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Miêu tả
                        </label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.description}
                            onChange={handleCKEditorChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Ngày
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                            Ảnh bìa
                        </label>
                        <input
                            id="images"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-2 w-full p-2 border border-[#da624a] rounded-md focus:ring-2 focus:ring-[#da624a]"
                        />
                        {formData.images && (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(formData.images)}
                                    alt="Image Preview"
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

export default CreateNews;
