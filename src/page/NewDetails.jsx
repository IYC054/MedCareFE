import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function NewDetails(props) {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

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

  const stripHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  const truncatedDescription = stripHTML(news.description).slice(0, 200); // Giới hạn 200 ký tự
  const isDescriptionLong = stripHTML(news.description).length > 200;

  return (
    <div className="w-full h-full bg-white">
      <div className='max-w-4xl mx-auto'>

        <div className="w-full h-max">
          <img
            className="rounded-lg"
            src="https://cdn.medpro.vn/prod-partner/a9257277-bd0a-4183-8ed2-462ce5b6a619-baby-dino_1180x250_desktop.webp?w=1200&q=75"
            alt="Banner"
          />
        </div>
        <div className="w-full flex justify-between mt-8">
          <div className="w-100 w-fit pr-2">
            <h1 className="text-5xl font-medium text-[#003553] pr-36">
              {news.title}
            </h1>
            <div className="text-gray-400 text-md py-2">
              <i className="bi bi-calendar2 pr-2"></i>
              <span>{news.date}</span>
            </div>
            <div className="text-[#003553] text-xs px-4 mb-7 border-l-2 border-orange-500">
              Medpro mang đến Chương trình Khuyến mãi Hoàn tiền lên đến 5% cho tất cả khách hàng đặt lịch khám. Xem ngay chính sách hoàn tiền Medpro để sử dụng ưu đãi!
            </div>
            <div className="w-full text-gray-800">
              {showFullDescription || !isDescriptionLong
                ? stripHTML(news.description)
                : truncatedDescription + '...'}
            </div>
            {isDescriptionLong && (
              <button
                className="mt-3 text-blue-500 underline"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Rút gọn' : 'Xem thêm'}
              </button>
            )}
          </div>
          <div className="ml-auto px-4">
            <img
              className="max-w-full h-auto rounded-md"
              src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbn.da13f84b.png&w=1920&q=75"
              alt="Promotion Banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDetails;
