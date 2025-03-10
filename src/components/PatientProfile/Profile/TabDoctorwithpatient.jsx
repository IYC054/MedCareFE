import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { jsPDF } from "jspdf";

import {
  deteleimage,
  getfileimagebypatientprofileid,
  getpatientbydoctorid,
} from "../../../api/Doctor/patient";
import { ProfilebypatientprofileId } from "../../../api/Profile/profilebyaccount";
import axios from "axios";
import { useSnackbar } from "notistack";
import { AppContext } from "../../Context/AppProvider";
import { getDoctorbyId, getDoctorbyIds } from "../../../api/Doctor/doctor";
import { getToken } from "../../Authentication/authService";
import {
  getAllApointment,
  getAllVipApointment,
} from "../../../api/Doctor/appointment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MedicalRecordPDF from "../../../page/scss/MedicalRecordPDF";

function TabDoctorwithpatient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(4);
  const { enqueueSnackbar } = useSnackbar();
  const [patient, setPatient] = useState([]);
  const [NormalAppointment, setNormalAppointment] = useState([]);
  const [VipAppointment, setVipAppointment] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectPatientId, setSelectPatientId] = useState();
  const [selectPatientFileId, setSelectPatientFileId] = useState();
  const [queryName, setQueryName] = useState("");
  const [description, setDescription] = useState("");

  const { User } = useContext(AppContext);
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh sách");

    // Định dạng tiêu đề
    worksheet.columns = [
      { header: "Tên", key: "fullname", width: 25 },
      { header: "Ghi chú", key: "description", width: 40 },
      { header: "Ngày", key: "createdAt", width: 20 },
      { header: "Hình ảnh", key: "image", width: 30 },
    ];

    // Lặp qua dữ liệu để thêm vào sheet
    for (let i = 0; i < currentPatient.length; i++) {
      const item = currentPatient[i];
      const row = worksheet.addRow({
        fullname: item.patientDetails.fullname,
        description: item.description ? item.description : "Chưa cập nhật",
        createdAt: new Date(item.createdAt).toLocaleString("vi-VN"),
      });

      // Nếu có hình ảnh thì tải xuống và chèn vào file Excel
      if (item.fileimageDetails.length > 0) {
        const imageUrl = item.fileimageDetails[0].urlImage;
        console.log("image " + imageUrl);
        try {
          const response = await axios.get(imageUrl, {
            responseType: "arraybuffer",
          });
          const imageId = workbook.addImage({
            buffer: response.data,
            extension: "png", // Hoặc "jpeg"
          });

          worksheet.addImage(imageId, {
            tl: { col: 3, row: i + 1 }, // Vị trí ảnh trong ô
            ext: { width: 60, height: 60 }, // Kích thước ảnh
          });
        } catch (error) {
          console.error("Lỗi tải ảnh:", error);
        }
      }
    }

    // Xuất file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "DanhSach.xlsx");
  };

  const openModal = (urlImage) => {
    setSelectedImage(urlImage);
  };
  const closeModal = () => {
    setSelectedImage(null);
  };
  const fetchPatient = async () => {
    try {
      const doctorId = await getDoctorbyIds(User?.id);

      const data = await getpatientbydoctorid(doctorId?.id);
      if (data && data.length > 0) {
        const enrichedPatient = await Promise.all(
          data.map(async (patient) => {
            const [patientDetails, fileimageDetails] = await Promise.all([
              ProfilebypatientprofileId(patient.patients_information_id),
              getfileimagebypatientprofileid(patient.id),
            ]);
            return { ...patient, patientDetails, fileimageDetails };
          })
        );
        setPatient(enrichedPatient);
        console.log("enchan" + JSON.stringify(enrichedPatient));
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  useEffect(() => {
    fetchPatient(); // chờ login
  }, []);
  const handlePopupDetail = (id = null, patientfileid = null) => {
    if (id == null) {
      setPopup(false);
      setSelectPatientId(null);
      setSelectPatientFileId(null);
    } else {
      setPopup(true);
      setSelectPatientId(id);
      setSelectPatientFileId(patientfileid);
    }
    const selectedPatient = patient.find((item) => item.id === patientfileid);
    setDescription(selectedPatient?.description || "");
  };
  const uniquePatient = patient.filter(
    (item, index, self) =>
      index ===
      self.findIndex((t) => t.patientDetails.id === item.patientDetails.id)
  );
  const handleDeleteImage = async (imageId) => {
    try {
      await deteleimage(imageId);
      fetchPatient(User?.id);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  const SubmitPatientFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("patientfile_id", selectPatientFileId);

    // Lấy danh sách file từ input
    const files = document.getElementById("image").files;

    // Nếu có file hình ảnh, thêm vào formData
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("url_image", files[i]);
      }
    }

    try {
      // Nếu có hình ảnh, gửi formData lên server
      let responeimage;
      if (files.length > 0) {
        responeimage = await axios.post(
          "http://localhost:8080/api/filesimage",
          formData,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
      }

      // Cập nhật mô tả bất kể có file hay không
      const response = await axios.put(
        `http://localhost:8080/api/patientsfile/description/${selectPatientFileId}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response || responeimage) {
        enqueueSnackbar("Cập nhật thành công!", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (updateError) {
      console.error("Lỗi khi cập nhật mô tả:", updateError);
      enqueueSnackbar("Lỗi khi cập nhật mô tả.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    } finally {
      fetchPatient(User?.id);
    }
  };

  const filteredPatients = patient.filter((item) =>
    item.patientDetails.fullname.toLowerCase().includes(queryName.toLowerCase())
  );
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentPatient = filteredPatients.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  console.log("currentPatient", currentPatient);
  const totalPages = Math.ceil(filteredPatients.length / appointmentsPerPage);
  // xuất PDF
  const handleDownloadPDF = (item) => {
    const doc = new jsPDF();
  
    // Thông tin bệnh viện
    const HospitalName = "Bệnh viện Med Care";
    // Thông tin bệnh nhân
    const PatientInformation = "Thông tin bệnh nhân:";
    const PatientName = item?.patientDetails?.fullname;
    const PatientAddress = item?.patientDetails?.address;
    const PatientDOB = item?.patientDetails?.birthdate;
    const PatientDiagnosis = item?.diagnosis;
    const Prescription = item?.description;
  
    // Tính toán vị trí căn giữa cho tên bệnh viện
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
  
    // Căn giữa tên bệnh viện
    const textWidth = doc.getTextWidth(HospitalName);
    const x = (pageWidth - textWidth) / 2;
    const y = 20;
  
    // Thêm tên bệnh viện vào PDF, in đậm và kích thước lớn
    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);  // Phóng to kích thước cho tên bệnh viện
    doc.text(HospitalName, x, y);
  
    // Thêm phần thông tin bệnh nhân
    const indent = 10; // Khoảng cách thụt đầu dòng
    const patientInfoX = 20 + indent; // Vị trí bắt đầu của dòng thông tin bệnh nhân
    const patientInfoY = y + 50; // Vị trí dọc cho phần thông tin bệnh nhân
  
    // Thêm thông tin bệnh nhân in đậm
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(PatientInformation, patientInfoX, patientInfoY);
  
    // Thêm thông tin chi tiết bệnh nhân, thụt đầu dòng
    const patientDetailsY = patientInfoY + 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
  
    doc.text(` -Tên: ${PatientName}`, patientInfoX + 10, patientDetailsY);  // Thụt đầu dòng
    doc.text(` -Nơi ở: ${PatientAddress}`, patientInfoX + 10, patientDetailsY + 10);
    doc.text(` -Ngày sinh: ${PatientDOB}`, patientInfoX + 10, patientDetailsY + 20);
    doc.text(` -Chẩn đoán: ${PatientDiagnosis}`, patientInfoX + 10, patientDetailsY + 30);
  
    // Thêm Toa thuốc in lớn hơn
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);  // Kích thước lớn hơn cho toa thuốc
    doc.text("Toa thuốc:", patientInfoX, patientDetailsY + 50);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.text(Prescription, patientInfoX + 10, patientDetailsY + 60);  // Thụt đầu dòng
  
    // Tải file PDF xuống
    doc.save(`hoso${item?.patientDetails?.fullname}.pdf`);
  };
  

  return (
    <div className="w-full h-full  border-l border-[#00b5f1] pl-10">
      <span className="text-[24px] font-medium">Quản lý bệnh nhân </span>
      <div
        className=" p-2 bg-[#00b5f1] text-[#fff] rounded-lg"
        style={{ width: "fit-content" }}
      >
        Bạn đã khám {patient.length} bệnh nhân
      </div>
      <div className="w-full h-10  mt-4">
        <input
          type="text"
          className="px-2 py-1 w-2/5 outline-none rounded-lg focus:outline-[#00b5f1] not-placeholder-shown:outline-[#00b5f1] shadow-lg border border-[#c2c2c2] focus:border-none not-placeholder-shown:border-none"
          placeholder="Nhập tên để tìm"
          value={queryName}
          onChange={(e) => setQueryName(e.target.value)}
        />
      </div>
      <div className="mt-4 w-full h-[500px] bg-[#fff] rounded-lg shadow-lg">
        <div className="flex flex-col w-full h-full text-gray-700 bg-white overflow-auto overflow-y-hidden shadow-md rounded-xl bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <span className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Tên
                  </span>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <span className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Ghi chú
                  </span>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <span className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Chuấn đoán
                  </span>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <span className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Ngày
                  </span>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <span className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Hình ảnh
                  </span>
                </th>
                <th className="p-4 border-b border-blue-gray-50">
                  <button
                    className="p-2 px-4 bg-[red] block font-sans text-sm antialiased font-medium leading-normal text-[#fff] rounded-xl"
                    onClick={exportToExcel}
                  >
                    Xuất file
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {currentPatient.map((item, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <span className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 capitalize">
                      {item.patientDetails.fullname}
                    </span>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <span
                      className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                      style={{
                        maxWidth: "300px",
                        wordBreak: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.description == "" || item.description == null
                        ? "Chưa cập nhật"
                        : item.description}
                    </span>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <span className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {item.diagnosis}
                    </span>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <span className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {new Date(item.createdAt).toLocaleString("vi-VN")}
                    </span>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <span className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {item.fileimageDetails.length > 0 ? (
                        <div className="grid grid-cols-2">
                          {item.fileimageDetails
                            .slice(0, 2)
                            .map((file, index) => (
                              <div key={index} className="col-span-1">
                                <img
                                  onClick={() => openModal(file.urlImage)}
                                  src={file.urlImage}
                                  alt={`Image ${file.id}`}
                                  className="w-20 h-20 object-cover cursor-pointer"
                                />
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p>Chưa cập nhật hình ảnh</p>
                      )}
                    </span>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="p-2 bg-[#00b5f1] block font-sans text-sm antialiased font-medium leading-normal text-[#fff] rounded-xl"
                      onClick={() =>
                        handlePopupDetail(item.patientDetails.id, item.id)
                      }
                    >
                      Cập nhật
                    </button>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <PDFDownloadLink
                      document={<MedicalRecordPDF item={item} />}
                      fileName="ho-so-kham-benh.pdf"
                    >
                      {({ loading }) =>
                        loading ? (
                          "Đang tạo PDF..."
                        ) : (
                          <button className="p-2 bg-[red] block font-sans text-sm antialiased font-medium leading-normal text-[#fff] rounded-xl">
                            Tải PDF
                          </button>
                        )
                      }
                    </PDFDownloadLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <div className="flex justify-center mt-4">
          <button
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
            }
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded mr-2"
          >
            Previous
          </button>
          <span className="py-2 px-4">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded ml-2"
          >
            Next
          </button>
        </div> */}
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded mr-2"
        >
          Previous
        </button>
        <span className="py-2 px-4">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() =>
            setCurrentPage(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded ml-2"
        >
          Next
        </button>
      </div>
      <div
        className={`w-full h-screen ${
          popup ? "fixed" : "hidden"
        } z-20 bg-slate-400/60 top-0 right-0`}
        onClick={() => handlePopupDetail()} // Đóng popup khi click vào nền
      >
        <div className="w-full h-full flex justify-center items-center">
          <div
            className="w-2/5 p-4 bg-[#fff] rounded-xl shadow-lg border border-solid border-[#c2c2c2]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full flex justify-end cursor-pointer hover:text-[red]"
              onClick={() => handlePopupDetail()}
            >
              X
            </div>
            <span className="text-[18px]">
              Bệnh nhân:{" "}
              <span className="text-[#00b5f1] font-medium text-[20px] capitalize">
                {uniquePatient.map((item) => {
                  if (item.patientDetails.id === selectPatientId) {
                    return item.patientDetails.fullname;
                  }
                })}
              </span>
              <form onSubmit={SubmitPatientFile}>
                <div className="mt-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mô tả
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    rows="4"
                    placeholder="Nhập mô tả..."
                  />
                </div>
                {/* Chọn hình ảnh */}
                <div className="mt-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hình ảnh
                  </label>
                  <input
                    type="file"
                    id="image"
                    multiple
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <span className="block text-sm font-medium text-gray-700">
                    Ảnh cũ
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {patient
                      .filter((item) => item.id === selectPatientFileId)
                      .map((item, index) =>
                        item.fileimageDetails &&
                        item.fileimageDetails.length > 0 ? (
                          item.fileimageDetails.map((file, index) => (
                            <div className="relative col-span-1" key={index}>
                              <div
                                className="absolute top-0 right-1 text-[#fff] px-2 bg-[red]/60 rounded-full flex justify-center items-center cursor-pointer"
                                onClick={() => handleDeleteImage(file.id)}
                              >
                                X
                              </div>
                              <img
                                src={file.urlImage}
                                className="w-full h-20 object-cover"
                                alt=""
                              />
                            </div>
                          ))
                        ) : (
                          <p key={index}>Chưa có hình ảnh</p>
                        )
                      )}
                  </div>
                  <div className="my-4 flex justify-center">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#00b5f1] text-[#fff] rounded-lg hover:scale-[0.9]"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </form>
            </span>
          </div>
        </div>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 text-white text-2xl font-bold mr-4 mt-2"
            >
              X
            </button>
            <img
              src={selectedImage}
              alt="Selected Image"
              className="w-[400px] object-center"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TabDoctorwithpatient;
