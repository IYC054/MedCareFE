import React from 'react'

const Header = () => {
  return (
    <div className='bg-gray-50 flex px-60 gap-4'>
         <div className='w-1/6 flex items-center'>
            <img src='https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Fheader_logo.svg&w=2048&q=75'></img>
         </div>
         <div className='w-5/6'>
            <div className='flex justify-between  border-b-[1px] py-4'>
               <div className='flex text-[12px] font-semibold items-center'>
                  <a className=' hover:text-[#00b5f1] flex border-r-[2px] px-3 items-center gap-2' href='#'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" aria-label="Icon TikTok" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg>Tiktok</a>
                  <a className='hover:text-[#00b5f1] flex border-r-[2px] px-3 items-center gap-2' href='#'> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" aria-label="Icon FaceBook" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>Facebook</a>
                  <a className=' hover:text-[#00b5f1] flex border-r-[2px] px-3 items-center gap-2' href='#'><img src='https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FiconZalo.568cf064.svg&w=32&q=75' width={15} height={15}/>Zalo</a>
                  <a className='hover:text-[#00b5f1] flex items-center gap-2  px-3' href='#'> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" aria-label="Icon Youtube" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>Youtube</a>
               </div>
               <div className='flex gap-1 text-[12px]'>
                 <button className='flex gap-2 hover:bg-orange-300/75 text-white font-bold  px-3 py-2 rounded-full  items-center bg-[#ffb54a]'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-label="Icon Phone" height="17" width="17" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></svg>Tải Ứng Dụng </button>
                 <button  className='border border-[00b5f1] flex gap-3 hover:bg-[#00b5f1] hover:text-white text-[#00b5f1] font-bold  px-3 py-2 rounded-full  items-center bg-white' > <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" aria-label="Icon User" height="15" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path></svg>Tài Khoản</button>
                 <button>Quốc Gia</button>
               </div>
            </div>
            <div className='flex'>
                <div className='flex px-4'>
                    <div>
                        <img src='https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhp.a16c51cc.svg&w=2048&q=75'></img>
                    </div>
                    <div>
                        <p>Hỗ trợ đặt khám</p>
                         <p>19002115</p>
                    </div>
                </div>
                <div>
                    <ul className='flex gap-4'>
                        <li>Cơ sở y tế</li>
                        <li>Dịch vụ y tế</li>
                        <li>Khám Sức Khỏe Doanh Nghiệp</li>
                        <li>Tin Tức</li>
                        <li>Hướng Dẫn</li>
                        <li>Liên Hệ Hợp Tác</li>
                    </ul>
                </div>

            </div>
         </div>
    </div>
  )
}

export default Header