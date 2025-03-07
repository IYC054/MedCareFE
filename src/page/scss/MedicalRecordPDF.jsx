import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
// Đăng ký font Roboto (cần đặt file font trong thư mục public/fonts/)
Font.register({
  family: "Roboto",
  src: `${window.location.origin}/fonts/Roboto.ttf`,});

// Định nghĩa style cho PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
  },
});

// Component tạo nội dung PDF
const MedicalRecordPDF = ({ item }) => (
  <Document>
    <Page style={styles.page}>
      {/* Tiêu đề bệnh viện */}
      <Text style={styles.title}>Bệnh viện Med Care</Text>

      {/* Thông tin bệnh nhân */}
      <View style={styles.section}>
        <Text style={styles.label}>Thông tin bệnh nhân:</Text>
        <Text style={styles.text}>Tên: {item?.patientDetails?.fullname}</Text>
        <Text style={styles.text}>Nơi ở: {item?.patientDetails?.address}</Text>
        <Text style={styles.text}>
          Ngày sinh: {item?.patientDetails?.birthdate}
        </Text>
        <Text style={styles.text}>Chẩn đoán: {item?.diagnosis}</Text>
      </View>

      {/* Toa thuốc */}
      <View style={styles.section}>
        <Text style={styles.label}>Toa thuốc:</Text>
        <Text style={styles.text}>{item?.description}</Text>
      </View>
    </Page>
  </Document>
);

export default MedicalRecordPDF;
