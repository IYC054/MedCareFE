import React from "react";

const Invoice = ({ name, services, total }) => {
  const currentDate = new Date().toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "#ffffff",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "24px", margin: "0" }}>HÓA ĐƠN THANH TOÁN</h1>
          <p style={{ fontSize: "14px", color: "#555" }}>Ngày: {currentDate}</p>
        </div>
        <div>
          <p>
            <strong>Khách hàng:</strong> Thanh Phong
          </p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Tên Dịch Vụ
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Ngày Giờ Khám
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  Tiền (VNĐ)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {services}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {currentDate}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {total} VNĐ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{ textAlign: "right", marginTop: "20px", fontWeight: "bold" }}
        >
          <p>Tổng Tiền: {total} VNĐ</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
