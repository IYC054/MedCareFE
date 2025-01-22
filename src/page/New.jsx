import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const New = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios.get('http://localhost:8080/api/news');

      const now = new Date();

      const sortedNews = response.data.sort((a, b) => {
        const diffA = Math.abs(new Date(a.date) - now);
        const diffB = Math.abs(new Date(b.date) - now);
        return diffA - diffB;
      });

      setNews(sortedNews);

    };

    fetchNews();
  }, []);

  // Tin mới nhất (phần tin nổi bật)
  const latestNews = news[0];

  // Các tin còn lại
  const otherNews = news.slice(1);
  const stripHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const navigate = useNavigate();
  const handleDetail = (id) => {
    navigate(`/new/detail/${id}`);
  };
  return (
    <div className="w-full h-full bg-white">
      <div className='max-w-4xl mx-auto'>
        <div className="text-cyan-800">
          <h1 className="text-2xl font-bold uppercase pt-2">Tin tức y khoa</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {/* Tin mới nhất */}
          {latestNews && (
            <div className="col-span-2 group" onClick={() => handleDetail(latestNews.id)}>
              <img
                src={latestNews.images || 'https://via.placeholder.com/374x374'}
                className="w-full h-[374px] rounded-md"
              />
              <h2 className="text-xl font-semibold text-cyan-800 mt-4 group-hover:text-[#1da1f2] transition-colors">
                {latestNews.title}
              </h2>


              <p className="text-sm text-gray-500">
                {stripHTML(latestNews.description).length > 100
                  ? `${stripHTML(latestNews.description).slice(0, 100)}...`
                  : stripHTML(latestNews.description)}</p>
              <p className="text-sm text-gray-400 mt-2">
                <i className='bi bi-calendar2'></i> {new Date(latestNews.date).toLocaleDateString()}
              </p>
              <a
                href=""
                className="mt-2 mb-10 block font-medium hover:underline group"
                style={{
                  background: "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Xem tiếp
                <span
                  className="inline-block transition-all duration-300 group-hover:ml-2"
                  style={{
                    background: "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  →
                </span>
              </a>
            </div>
          )}

          {/* Tin tức sidebar */}
          <div className="h-[500px] flex flex-col">
            {otherNews.slice(0, 5).map((item) => (
              <div key={item.id} className="flex gap-3 ml-2 items-center justify-start group" onClick={() => handleDetail(item.id)}>
                <img
                  src={item.images || 'https://via.placeholder.com/100x100'}
                  className="w-24 h-24 py-3 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-sm font-semibold text-cyan-800 group-hover:text-[#1da1f2] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    <i className='bi bi-calendar2'></i> {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Các tin khác */}
          {otherNews.map((item) => (
            <div key={item.id} className="group p-4 space-y-4" onClick={() => handleDetail(item.id)}>
              <img
                src={item.images || 'https://via.placeholder.com/150x150'}
                className="w-full h-36 object-cover rounded-md"
              />
              <div>
                <h2 className="text-base font-semibold text-cyan-800 group-hover:text-[#1da1f2] transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500"> {stripHTML(item.description).length > 70
                  ? `${stripHTML(item.description).slice(0, 70)}...`
                  : stripHTML(item.description)}</p>
                <p className="text-xs text-gray-400">
                  <i className='bi bi-calendar2'></i> {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <a
                href=""
                className="mt-2 mb-10 block font-medium hover:underline group"
                style={{
                  background: "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Xem tiếp
                <span
                  className="inline-block transition-all duration-300 group-hover:ml-2"
                  style={{
                    background: "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  →
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default New;
