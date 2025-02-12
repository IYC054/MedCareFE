import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getToken } from '../../../components/Authentication/authService';

function NewDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = getToken();
    // Fetch news details
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/news/${id}`);
                setNews(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Không thể tải dữ liệu');
                setLoading(false);
            }
        };
        fetchNews();
    }, [id]);

    // Handle update
    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", news.title);
        formData.append("description", news.description);
        formData.append("date", news.date);
        if (news.image instanceof File) { // Kiểm tra nếu ảnh mới được chọn
            formData.append("images", news.image);
        }

        try {
            await axios.put(`http://localhost:8080/api/news/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Cập nhật thành công");
            navigate("/admin/news");
        } catch (err) {
            console.error(err);
            alert("Cập nhật thất bại");
        }
    };
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNews({ ...news, image: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-5 border-2 border-[#da624a]">
            <h1 className="text-xl font-semibold text-[#da624a] mb-4">Chi tiết bản tin</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Tiêu đề
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={news.title}
                        onChange={(e) => setNews({ ...news, title: e.target.value })}
                        className="mt-1 block w-full p-2 border border-[#da624a] rounded-md"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={news.description}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setNews({ ...news, description: data });
                        }}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Ngày
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={news.date}
                        onChange={(e) => setNews({ ...news, date: e.target.value })}
                        className="mt-1 block w-full p-2 border border-[#da624a] rounded-md"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Ảnh bìa
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange} 
                        className="mt-1 block w-full p-2 border border-[#da624a] rounded-md"
                    />

                    {(previewImage || news.images) && (
                        <img
                            src={previewImage || news.images}
                            alt="Preview"
                            className="mt-2 w-36 h-36 object-cover rounded-md"
                        />
                    )}

                </div>

                <div className="mt-6 flex space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#da624a] text-white rounded-md hover:bg-[#c74d3e]"
                    >
                        Cập nhật
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/news')}
                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewDetail;
