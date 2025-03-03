import axios from "axios";
import React, { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AppContext } from "../../Context/AppProvider";

function TabCheckBHYT(props) {

  const [hoten, setHoTen] = useState("");

  const [formData, setFormData] = useState({
    txtMaThe: "",
    txtHoTen: "",
    txtNgaySinh: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("txtMaThe", formData.txtMaThe);
    data.append("txtHoTen", formData.txtHoTen);
    data.append("txtNgaySinh", formData.txtNgaySinh);
    data.append(
      "tokenRecaptch",
      "03AFcWeA7vnvgVUnTnzhwb-5PD9YYiPoTZdLGOk-MztIJ1Qq-ESj2EK-JToREY-Bs8RI270jnqqgCdQizNlBViYcYT-Yyo_3do8QnGB2Dlv7FoY-Wsh-hDVdyicvRXl3XGvsPcSYIlxc0_mXDd59FvZTQSJNAOfvXJJvRX2VkwAlQqo2CbkfuA5uOZQQ_sMCiJFeeHE_EB7QMmE_upPzwXnE7rl-ksX9U2YPJeLDrbHF5jflnipMSP40C6HlDsRh8mOlGIgrrpkhOIzxWv4NBGByy_MXRKwEqPrH4LPwghwoIJXbK84Wo3Iy-Np3CU6r31YIGPB-_ZMvF4iA_Mt3EO3XO-KMTfDLXYWzcMXVTW5hkVDEmJDliRZ-jHbIMntpXy2OJg2rNUprSaB5s3HfEwZA7WrEHhWgYQa5CZAOF8X6D3qLhHFd0o3yV7MKrHnXpLjG41h2G4h4-s4CBK0qMPb8kOfARRjWfdjTr6sl-ZyDZo595vPcT40GYGR-ae0n9P6LsnqvlvFBHpBs1i7oyOnaSU6jB9TKABdHAzW_EcHmagNI3Z7Lmt-B24hEAXULFjyTOIpRkdKEfioaek3J0L_kjfrcfLMLtyDEQviG3fsPMZO18wbvf-AKHMR-jfrpxQ-I4piHiGo8KVnabxjqgWDtEad86VG3IP92oycXqoOdgYD27jx8v2lts0gkHqKeLIzizRLD7zXQSCakKrhBwKXf9XcPOKMQV9AIkq_0gWk5LwbDIBtJeGAdBlS8ZiPwtdqmrsNDGSaJwByfcRENSSSyW9Ad-oWq8XzQciQq6yRyOLxXZ90FAbSU0WXb_PYitdINu-ylYQNI6g5MSD0Ozi8vh7oq8GlEHyw6rOwx5HAmNQPCSTSwkyBNIwm34ed6fHt4Dl7-Bo4B0biSudqvHJ_qLq3HEvbjEzQLiEfVKNfvEzkdkI7IVcG-VTAIsUcUzDkKDQc9xON7zah2mQXnhUMbCr2HPQuYxwcQ"
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/api/bhyt/check",
        data,
        
      );
      const html = await response.data.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const spanHoTen = doc.querySelector("span.hoten");
      if (spanHoTen) {
        setHoTen(spanHoTen.textContent); // Lấy nội dung text bên trong span
      } else {
        console.error("Không tìm thấy span.hoten");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full border-l border-[#00b5f1] pl-10">
      <span className="text-[24px] font-medium">
        Tra cứu giá trị sử dụng thẻ BHYT
      </span>
      <div className="w-full bg-[#fff] border-solid border border-[#c2c2c2]/50 rounded-lg p-4 my-4">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="txtMaThe"
              className="block mb-2 text-sm font-medium"
            >
              Mã số BHXH/thẻ BHYT <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              id="txtMaThe"
              className="outline-none border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nhập số BHYT"
              value={formData.txtMaThe}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="txtHoTen"
              className="block mb-2 text-sm font-medium"
            >
              Họ tên <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              id="txtHoTen"
              className="outline-none border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nhập họ tên"
              value={formData.txtHoTen}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="txtNgaySinh"
              className="block mb-2 text-sm font-medium"
            >
              Ngày/năm sinh <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              id="txtNgaySinh"
              className="outline-none border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="1/1/1950"
              value={formData.txtNgaySinh}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center mb-5">
          <button
            className="bg-[red] flex justify-center items-center gap-2 text-[#fff] px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            <span>Tra cứu</span>
            <span>
              <FaSearch />
            </span>
          </button>
        </div>
        <div className="w-full mb-5">{hoten}</div>
      </div>
    </div>
  );
}

export default TabCheckBHYT;