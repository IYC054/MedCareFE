import AppContext from "antd/es/app/context";
import React, { useContext, useEffect } from "react";
import { FaHandHoldingMedical, FaHospital } from "react-icons/fa";
import { FaKitMedical } from "react-icons/fa6";
import loading from '../../../../asset/loading.gif'

function TabAppointment(props) {
    const { patient } = useContext(AppContext);

    useEffect(() => {
      console.log("Patient in TabAppointment:", patient); // Kiểm tra giá trị của `patient`
    }, [patient]);
  
  return (
    <div className="w-full h-full  border-l border-[#00b5f1] pl-10">
      <span className="text-[24px] font-medium">Danh sách phiếu khám bệnh</span>
      <div className="w-full bg-[#fff] border-solid border border-[#c2c2c2]/50 rounded-lg p-4">
        <div className="flex justify-between">
          <span className="text-[15px]">
            Mã phiếu:{" "}
            <span className="text-[18px] font-medium">0123456789</span>{" "}
          </span>
          <div>
            <button className="px-4 py-2 bg-[#03C03C] rounded-xl text-[#fff] font-medium">
              Đã thanh toán
            </button>
          </div>
        </div>
        <div className="w-full">
          <span className="text-[20px] font-semibold">Thanh Phong</span>
        </div>
        <hr className="h-[2px] mt-4 border-0 border-t-2 border-dashed border-[#00b5f1]" />
        <div className="w-full my-4">
          <div className="flex items-center text-[#00b5f1] gap-4 text-[24px]">
            <FaHospital className="text-[25px] " />
            <span className="uppercase">Bệnh viện chợ rẫy</span>
          </div>
          <div className="flex items-center  gap-4 text-[15px] my-2">
            <div className="flex items-center gap-4">
              <FaKitMedical className="text-[18px] text-[#F1C40F] " />
              <span>Chuyên khoa: </span>
            </div>
            <span>Khám tim mạch</span>
          </div>
          <div className="flex items-center  gap-4 text-[15px] my-2">
            <div className="flex items-center gap-4">
              <FaHandHoldingMedical className="text-[18px] text-[#F1C40F] " />
              <span>Dịch vụ: </span>
            </div>
            <span>Khám tại bệnh viện</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabAppointment;
