import React from 'react'

const New = () => {
  return (
    <div className="max-w-4xl mx-auto  py-4">
      <div className="text-cyan-800">
        <h1 className="text-2xl font-bold uppercase">Tin tức y khoa</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="col-span-2 group">
          <img
            src="https://cdn.vietnammoi.vn/2019/5/5/photo-1-15569911307922099067668.png"
            alt="Main News"
            className="w-full h-[374px] rounded-md"
          />
          <h2 className="text-xl font-semibold text-cyan-800 mt-4 group-hover:text-[#1da1f2] transition-colors">
            Thông Báo Mời Họp Đại Cổ Đông Thường Niên năm 2024
          </h2>
          <p className="text-sm text-gray-500">
            Hội đồng Quản trị Công Ty Cổ Phần Ứng Dụng PKH trân trọng kính mời...
          </p>
          <p className="text-sm text-gray-400 mt-2">
            📅 19/12/2024, 09:31 - Mộc Thanh
          </p>
          <a
            href="#"
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

        <div className="h-[500px] flex flex-col ">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex gap-3 ml-2 items-center justify-start group">
              <img
                src="https://cdn.vietnammoi.vn/2019/5/5/photo-1-15569911307922099067668.png"
                alt="Sidebar Thumbnail"
                className="w-24 h-24 py-3 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-cyan-800 group-hover:text-[#1da1f2] transition-colors">
                  Thông Báo Mời Họp Đại Cổ Đông Thường Niên năm 2024
                </h3>
                <p className="text-xs text-gray-400">
                  📅 28/11/2024
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className=''></div>

      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            key={index}
            className="group p-4 space-y-4"
          >
            <img
              src="https://cdn.vietnammoi.vn/2019/5/5/photo-1-15569911307922099067668.png"
              alt="Service Thumbnail"
              className="w-full h-36 object-cover rounded-md"
            />
            <div>

              <h2 className="text-base font-semibold text-cyan-800 group-hover:text-[#1da1f2] transition-colors">
                Điều kiện & Điều khoản Chương trình Khuyến mãi Hoàn tiền...
              </h2>
              <p className="text-sm text-gray-500">
                Hội đồng Quản trị Công Ty Cổ Phần Ứng Dụng PKH trân trọng kính mời...
              </p>
              <p className="text-xs text-gray-400">📅 26/07/2024</p>
            </div>
            <a
              href="#"
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

  )
}

export default New