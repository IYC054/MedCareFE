import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import token from "../../../api/token";

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
    data.append("tokenRecaptch", "03AFcWeA62X2F1uV1_ZZgS0C-S6BremAZexrypL-g34mrc6oS7SBGXlqrzECAjgFUYTp61asRLjAox00uvtm8q7ML11zgh4KBG9McP6NOT83B4cbEcXpgvG2B2_sIEqnB6wxc_oooH8UF39LmL8qfXK9ySMMYO944Bk7EuuoUh7jMdEuZIaZouYA3qkgPcFgHd6IgpAX0hM1cAX5HgmNU5EKhpedGh8tUABMUB4JI6uCMT6P8vBV-o3hmI6YtvwLKQPAqHATcr8XPfMygCug5_9_3hgl9s44hFl7RPFjaMVmYu9O6gJcRRHh8gOoBTYCRdrGNDYX-X8YMZmNOl7RySDt6_Hg1sFcFm0dw6YloOe_ll8Wf1qMZDnHF_AXYDNrqn58vuunu2b0W446_pNhOeb3PV9y6bGq3S8I4r01bfKodIq6sFLn41B4jpvpXs2EFHpHS8bAqnxkC33GLKFSmCuLWVD18eFvSanlfFJd26Q7GZuo88c0ZC_M5O6_t1HVNoRFBf8vz_3rRidCkPhDNhwkR_VxwIH-9q_Nte0fpV9alK1RD-hxTNoVDQuxRllLbzOI6lGPj5w7LQMgQ4BxaUMFtLaMocnsJzd-KDJ19lpGHxgxzMeSch2fFpU7wAKrd6Y_HJL2-c2Iz0YCtaRVwHxaFE8qSmMTbhy_bQvlPoG5nS6u-dK4O4O_krKrPLN5gY3zyfkJLe1ZonC-8K3KgoLaivU_O1AjRDyhuBFgBDNdbG82X8xqFQ4Q7dOe0v6Q6_d5C0GBq5qU8IGKodXcOrdYcvDJCCggZiPK72ura8Bed36nkyhOovXGK9xMDRS0n4tODRNrIA6-aE70PdjBH7OOAXW0ks_bklGdDmmQScjoMKxHL2lOBALHHaRu7FKUG9FJpNnFRySiwHVRgoT8ecryhbgJzNu_FCeiCzeFU7pdZeESUx96g_fzZTKsPJWU7gPbCPaeOgwXiJNKceMS_eyDC-o2KpSaePIw");

    try {
      const response = await axios.post("http://localhost:8080/api/bhyt/check", data, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
      });
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
        <div className="w-full mb-5">
          {hoten}
        </div>
      </div>
    </div>
  );
}

export default TabCheckBHYT;
