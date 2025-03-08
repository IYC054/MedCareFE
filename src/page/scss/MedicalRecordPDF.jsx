import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Đăng ký font Roboto (đảm bảo rằng file font được lưu trong thư mục public/fonts/)
Font.register({
  family: "Roboto",
  src: `${window.location.origin}/fonts/Roboto.ttf`,
});

// Định nghĩa style cho PDF
const styles = StyleSheet.create({
  page: {
    padding: 40, // Tăng lề của trang
    fontFamily: "Roboto",
    backgroundColor: "#f4f4f9", // Màu nền nhẹ nhàng cho trang
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
    color: "#003366", // Màu sắc chuyên nghiệp cho tiêu đề
  },
  section: {
    marginBottom: 20, // Khoảng cách giữa các phần
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366", // Màu sắc cho các nhãn
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 1.6, // Cải thiện khoảng cách giữa các dòng
    color: "#333", // Màu chữ đen dễ đọc
    marginBottom: 6,
  },
  sectionContent: {
    marginLeft: 20, // Thụt vào các đoạn văn bản trong mỗi phần
  },
  borderBox: {
    border: "1px solid #ccc", // Đặt đường viền nhẹ cho các phần
    padding: 15,
    borderRadius: 8, // Bo góc nhẹ cho các hộp
    marginTop: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#003366", // Màu sắc cho các tiêu đề nhỏ
  },
  footer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    textAlign: "center",
    fontSize: 12,
    color: "#aaa", // Màu chữ nhạt cho footer
  },
});

// Component tạo nội dung PDF
const MedicalRecordPDF = ({ item }) => (
  <Document>
    <Page style={styles.page}>
      {/* Tiêu đề bệnh viện */}
      <Text style={styles.title}>Bệnh viện Med Care</Text>

      {/* Thông tin bệnh nhân */}
      <View style={styles.borderBox}>
        <Text style={styles.label}>Thông tin bệnh nhân:</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.text}>- Tên: {item?.patientDetails?.fullname}</Text>
          <Text style={styles.text}>- Nơi ở: {item?.patientDetails?.address}</Text>
          <Text style={styles.text}>- Ngày sinh: {item?.patientDetails?.birthdate}</Text>
          <Text style={styles.text}>- Chẩn đoán: {item?.diagnosis}</Text>
          <Text style={styles.text}>- Ngày Khám: {item?.createdAt.split("T")[0]}</Text>
        </View>
      </View>

      {/* Toa thuốc */}
      <View style={styles.borderBox}>
        <Text style={styles.label}>Toa thuốc:</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.text}>{item?.description}</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        © 2025 Bệnh viện Med Care. Tất cả quyền lợi được bảo lưu.
      </Text>
    </Page>
  </Document>
);

export default MedicalRecordPDF;
