import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function News() {
    const [news, setnews] = useState([])

    useEffect(() => {
        const fetchnews = async () => {

            const response = await axios.get('http://localhost:8080/api/news');

            setnews(response.data);

        };
        fetchnews();
    }, []);

    console.log(news);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const filterednews = news.filter(news =>
        news.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filterednews.length / usersPerPage);
    const displaynews = filterednews.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    console.log()
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-[#da624a]">Tin tức</h1>
                <div className="mb-4 w-60">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tiêu đề..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-[#da624a]"
                    />
                </div>
                <div className='w-60 py-5'>
                    <Link to="/admin/news/createnews" className="w-full flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-[#da624a] border-primary rounded-md hover:bg-[#b2503c] transition"
                    >
                        Thêm mới
                    </Link>
                </div>
                <div className="overflow-x-auto max-h-96 overflow-y-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="sticky top-0 z-10 bg-[#da624a] text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Hình minh hoạ</th>
                                <th className="px-4 py-2 text-left">Tiêu đề</th>
                                <th className="px-4 py-2 text-left">Ngày đăng</th>
                                <th className="px-4 py-2 text-left">Miêu tả</th>

                            </tr>
                        </thead>
                        <tbody>
                            {displaynews.map((news, index) => (
                                <tr key={news.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                    <td className="border px-4 py-2">{(currentPage - 1) * usersPerPage + index + 1}</td>
                                    <td className="border px-4 py-2">
                                        <img
                                            className="mx-auto"
                                            src={news.images}
                                            width={70}
                                            height={70}
                                        />
                                    </td>
                                    <td className="border px-4 py-2">{news.name}</td>
                                    <td className="border px-4 py-2">{news.date}</td>

                                    <td className="border px-4 py-2">{news.description}</td>
                                  
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 mx-1 rounded shadow ${page === currentPage ? 'bg-[#da624a] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                } transition`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;