import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import { getToken } from "../../../components/Authentication/authService";

function TransactionDetail() {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isvip = queryParams.get("isvip");

  const [tran, setTran] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = getToken();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch transaction data
        const tranResponse = await axios.get(
          `http://localhost:8080/api/payments/${id}`
        );

        const transactionData = tranResponse.data;
        if (!transactionData) {
          throw new Error("Transaction not found.");
        }

        setTran(transactionData);

        // Fetch appointment data only if transaction exists
        if (
          transactionData.appointment_id !== null ||
          transactionData.vipappointment_id !== null
        ) {
          let responseAppointments;

          if (transactionData.vipappointment_id) {
            // Ưu tiên lấy VIP nếu có
            responseAppointments = await axios.get(
              `http://localhost:8080/api/vip-appointments/${transactionData.vipappointment_id}`
            );
          } else if (transactionData.appointment_id) {
            responseAppointments = await axios.get(
              `http://localhost:8080/api/appointment/${transactionData.appointment_id}`
            );
          }

          setAppointment(responseAppointments.data);
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Dependency on transaction ID

  if (loading) {
    return <div>Loading transaction details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tran) {
    return <div>Transaction not found.</div>;
  }
  return (
    <div className="w-full bg-white py-4 px-4 rounded-md shadow-sm">
      <div className="flex content-center justify-between">
        {/* Left Section */}
        <div className="px-4">
          <span className="text-2xl font-bold">Chi tiết giao dịch</span>
          <div className="py-2 w-full">
            <div className="flex text-gray-500 py-2">
              <span className="min-w-[250px]">Mã giao dịch:</span>
              <span className="text-gray-900 font-medium">
                {tran.transactionCode || "N/A"}
              </span>
            </div>
            {appointment && (
              <>
                <div className="flex text-gray-500">
                  <span className="min-w-[250px]">Người trả tiền:</span>
                  <span className="text-gray-900 font-medium">
                    {appointment.patientprofile.fullname || "N/A"}
                  </span>
                </div>
                <div className="flex text-gray-500">
                  <span className="min-w-[250px]">Điện thoại:</span>
                  <span className="text-gray-900 font-medium">
                    {appointment.patientprofile.phone || "N/A"}
                  </span>
                </div>
              </>
            )}
            <div className="flex text-gray-500">
              <span className="min-w-[250px]">Thời gian:</span>
              <span className="text-gray-900 font-medium">
                {new Date(tran.transactionDate).toLocaleString()}
              </span>
            </div>
            <div className="flex text-gray-500 py-2">
              <span className="min-w-[250px]">Trạng thái:</span>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  tran.status === "Đã thanh toán"
                    ? "bg-green-100 text-green-800"
                    : tran.status === "Chờ xử lý"
                    ? "bg-yellow-100 text-yellow-800"
                    : tran.status === "Hoàn tiền"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {tran.status}
              </span>
            </div>
            <div className="flex text-gray-500">
              <span className="min-w-[250px]">Miêu tả:</span>
              <span className="text-gray-900 font-medium">
                {tran.transactionDescription || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <div className="py-2 w-full">
            <div className="bg-[#fef4fa] content-center align-center p-10 mr-20 rounded-md shadow-lg">
              <div className="flex justify-center">
                <span className="text-2xl font-bold border-gray-300">
                  Tổng quan giao dịch
                </span>
              </div>
              <div className="border-t-2 border-dashed border-[#da624a] my-2"></div>
              <div className="flex text-gray-500">
                <span className="min-w-[250px]">Mã giao dịch:</span>
                <span className="text-gray-900 font-medium">
                  {tran.transactionCode}
                </span>
              </div>
              <div className="flex text-gray-500">
                <span className="min-w-[250px]">Số tiền:</span>
                <span className="text-gray-900 font-medium break-words">
                  {tran.amount} VNĐ
                </span>
              </div>
              <div className="flex text-gray-500">
                <span className="min-w-[250px]">Phương thức thanh toán:</span>
                <span className="text-gray-900 font-medium">
                  {tran.paymentMethod || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetail;
