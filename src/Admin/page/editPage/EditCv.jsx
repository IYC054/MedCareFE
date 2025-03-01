import axios from "axios";
import { getToken } from "../../../components/Authentication/authService";
import { useState } from "react";

function EditCv({ onClose, doctorId, fileImages, onUpdate }) {
    const [files, setFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState(fileImages.map(file => file.urlImage));
    const token = getToken();

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviewImages(newPreviews);
    };

    const deleteOldImages = async () => {
        try {
            for (let file of fileImages) {
                await axios.delete(`http://localhost:8080/api/cvimage/${file.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
        } catch (error) {
            console.error("Lỗi khi xóa ảnh cũ:", error);
        }
    };

    const uploadNewImages = async () => {
        const formDataUpload = new FormData();
        formDataUpload.append("doctorfile_id", doctorId);
        for (let file of files) {
            formDataUpload.append("url_image", file);
        }
        try {
            await axios.post("http://localhost:8080/api/cvimage", formDataUpload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Cập nhật hình thành công!");
            onUpdate(); // Gọi hàm cập nhật danh sách ảnh
            onClose();
        } catch (error) {
            console.error("Lỗi khi tải lên hình ảnh:", error);
        }
    };
    const handleUpload = async () => {
        if (files.length > 0) {
            await deleteOldImages();
            await uploadNewImages();
        }
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Cập nhật hình CV</h2>
                <input type="file" multiple onChange={handleFileChange} className="mb-4" />

                <div className="grid grid-cols-2 gap-2">
                    {previewImages.map((url, index) => (
                        <img key={index} src={url} alt="CV Preview" className="w-20 h-20 object-cover rounded-md" />
                    ))}
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-md">Hủy</button>
                    <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Cập nhật</button>
                </div>
            </div>
        </div>
    );
}

export default EditCv;
