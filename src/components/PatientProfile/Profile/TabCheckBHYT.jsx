import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import token from "../../../api/token";

function TabCheckBHYT(props) {
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
    data.append("tokenRecaptch", "03AFcWeA7jXjsA_-368Wsa5zoYt-kTJBumgr7cVL0213KYC2utFnoQ0n6eEN41GZ-k9bC0lbn_QTOD7ltKhvkWPauiJ7ba4F9qqT4TSd5QjZuLTzxg_kjGrfqgCtppnma6eEIpL_VXZC2AemJSn1KrODRHH7o_flP48bUxJcGXFFRCSkthVkoMY5KeEKa4fXCkxCwWGxPRdls9k4iEqlE1dDSVxNHQ1MVTtBWV-WVvn1ql1rjBcoGscfnHa57uAFkcdimYhz6LxvM1B5fELEETkPHmdSj3f-NpXlV0i8ncixQl-wF164hTc3OFFdrFSGVrl1yLLGLX9ex0o-yOOj8uqP3vrZuzlB7anhS2tPO_3BO2fiy0F3rkHnkykDH91yz2X9Ld42wifzFWLxY_ncF8Bgw8cm9A_p5hcxbOsTxA9qwwrf6u4X2ufjbEPC8I9vpceMDRorXeZeXKAm3MW6JrN0c9Txj3xsq5KBNKdznnRWIQ4NzsAzj12JnrxKjF-IUt9B2AzaquqZqlpjz-IcYhrSZ9iMDWhqwP9T8xcqDnTzeEUzOPIVv1yeI3uGq4DD6v7LPmjycd6MSJqtXOQvYsKV0a-XRHDeBrJONTsfi3ZZgCfre_iDGeFcVjmeDLGJMKcBJD7o11Qv3iFFcwkNivgHS6RF59sscd_raa8ffAhp1ihJfqT6e831n0CVE-S2_xTpkYfpakT9JzjApVRLuFai8rQ7gtsNHU2G0_EnGxs1BmHZICJDQp-lp78PO6cnP5DgPQFcLcyTrKpq6sAq9yKd_I_qmFxLm7CGYv2WGgXUcs8Yd3uBtW315liw_TMmbcnT9LlxMikN1WGnw9WrPkiaotxctp4kCM1Ma6VKwOmRTiUo5bvkxo-KENtGWMw15-rLBEcHOGhw1h");

    try {
      const response = await axios.post("http://localhost:8080/api/bhyt/check", data, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
      });
      console.log(response);
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
      </div>
    </div>
  );
}

export default TabCheckBHYT;
