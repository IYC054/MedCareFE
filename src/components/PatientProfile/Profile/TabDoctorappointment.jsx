import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  getAppointmentByDoctorId,
  getVIPAppointmentByDoctorId,
  UpdateStatusAppointment,
} from "../../../api/Doctor/appointment";
import { getpatientbyid } from "../../../api/Doctor/patient";
import { getallPaymentByAppoint } from "../../../api/Bank/payment";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import {
  getallprofile,
  ProfilebypatientprofileId,
} from "../../../api/Profile/profilebyaccount";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { AppContext } from "../../Context/AppProvider";
import { getDoctorbyId, getDoctorbyIds } from "../../../api/Doctor/doctor";
import { getToken } from "../../Authentication/authService";
import { data } from "autoprefixer";
import ColumnGroup from "antd/es/table/ColumnGroup";

function TabDoctorappointment() {
  const { User } = useContext(AppContext);
  const [dataProfile, setDataProfile] = useState([]);

  // const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [vipAppointments, setVipAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(5);
  const [popup, setPopup] = useState(false);
  // bệnh nhận đang được chọn
  const [Selectedpatients, setSelectedpatients] = useState(null);


  const [description, setDescription] = useState(""); // Lưu giá trị nhập vào
  const [suggestions, setSuggestions] = useState([]);  // Lưu gợi ý
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false); 
  // kiếm đại 300 loại thu
  const drugList = [
    "Paracetamol 500mg",
    "Ibuprofen 200mg",
    "Aspirin 100mg",
    "Amoxicillin 500mg",
    "Ciprofloxacin 500mg",
    "Metformin 500mg",
    "Atorvastatin 10mg",
    "Lisinopril 10mg",
    "Omeprazole 20mg",
    "Clopidogrel 75mg",
    "Levothyroxine 50mcg",
    "Prednisone 5mg",
    "Furosemide 20mg",
    "Diazepam 5mg",
    "Lorazepam 1mg",
    "Doxycycline 100mg",
    "Sertraline 50mg",
    "Alprazolam 0.5mg",
    "Hydrochlorothiazide 25mg",
    "Gabapentin 300mg",
    "Tamsulosin 0.4mg",
    "Simvastatin 20mg",
    "Folic Acid 400mcg",
    "Ranitidine 150mg",
    "Montelukast 10mg",
    "Bisoprolol 5mg",
    "Hydrocodone 5mg",
    "Acetaminophen 500mg",
    "Tramadol 50mg",
    "Amlodipine 5mg",
    "Losartan 50mg",
    "Vitamins C 500mg",
    "Vitamin D 1000 IU",
    "Prednisolone 5mg",
    "Erythromycin 250mg",
    "Tetracycline 500mg",
    "Cephalexin 500mg",
    "Amoxicillin-Clavulanate 500mg",
    "Diphenhydramine 25mg",
    "Levocetirizine 5mg",
    "Loratadine 10mg",
    "Cetirizine 10mg",
    "Guaifenesin 200mg",
    "Hydrocortisone 25mg",
    "Chlorpheniramine 4mg",
    "Diphenhydramine 50mg",
    "Fluconazole 150mg",
    "Ketoconazole 200mg",
    "Itraconazole 100mg",
    "Fluticasone 50mcg",
    "Mometasone 50mcg",
    "Beclometasone 200mcg",
    "Budesonide 200mcg",
    "Salbutamol 100mcg",
    "Albuterol 90mcg",
    "Tiotropium 18mcg",
    "Ipratropium 20mcg",
    "Montelukast 10mg",
    "Methylprednisolone 4mg",
    "Clonazepam 0.5mg",
    "Fentanyl 12mcg/hr",
    "Codeine 30mg",
    "Oxycodone 10mg",
    "Morphine 10mg",
    "Hydromorphone 2mg",
    "Carbamazepine 200mg",
    "Phenytoin 100mg",
    "Valproic Acid 500mg",
    "Topiramate 25mg",
    "Levetiracetam 500mg",
    "Lamotrigine 100mg",
    "Pregabalin 75mg",
    "Risperidone 1mg",
    "Olanzapine 10mg",
    "Aripiprazole 15mg",
    "Quetiapine 25mg",
    "Citalopram 20mg",
    "Escitalopram 10mg",
    "Fluoxetine 20mg",
    "Paroxetine 10mg",
    "Venlafaxine 75mg",
    "Duloxetine 30mg",
    "Bupropion 150mg",
    "Mirtazapine 15mg",
    "Trazodone 50mg",
    "Lithium Carbonate 300mg",
    "Dantrolene 25mg",
    "Methocarbamol 500mg",
    "Cyclobenzaprine 10mg",
    "Benzonatate 100mg",
    "Hydroxychloroquine 200mg",
    "Methotrexate 10mg",
    "Sulfasalazine 500mg",
    "Hydralazine 25mg",
    "Isosorbide Mononitrate 30mg",
    "Nitroglycerin 0.4mg",
    "Carvedilol 12.5mg",
    "Metoprolol 50mg",
    "Propranolol 40mg",
    "Atenolol 25mg",
    "Chlorthalidone 25mg",
    "Spironolactone 25mg",
    "Triamterene 75mg",
    "Bumetanide 1mg",
    "Eplerenone 25mg",
    "Mannitol 250mg",
    "Glyburide 5mg",
    "Glipizide 5mg",
    "Pioglitazone 15mg",
    "Rosiglitazone 4mg",
    "Repaglinide 1mg",
    "Sitagliptin 100mg",
    "Metformin 1000mg",
    "Canagliflozin 100mg",
    "Dapagliflozin 10mg",
    "Liraglutide 0.6mg",
    "Exenatide 5mcg",
    "Glimepiride 2mg",
    "Nateglinide 120mg",
    "Insulin Glargine 100 IU",
    "Insulin Lispro 100 IU",
    "Insulin Aspart 100 IU",
    "Insulin NPH 100 IU",
    "Insulin Detemir 100 IU",
    "Insulin Regular 100 IU",
    "Insulin Glulisine 100 IU",
    "Bromocriptine 2.5mg",
    "Cabergoline 0.5mg",
    "Levodopa 100mg",
    "Carbidopa 25mg",
    "Ropinirole 0.5mg",
    "Pramipexole 0.125mg",
    "Entacapone 200mg",
    "Tolcapone 100mg",
    "Selegiline 5mg",
    "Donepezil 5mg",
    "Rivastigmine 1.5mg",
    "Galantamine 8mg",
    "Memantine 10mg",
    "Buspirone 10mg",
    "Hydroxyzine 25mg",
    "Prochlorperazine 5mg",
    "Promethazine 25mg",
    "Meclizine 25mg",
    "Dimenhydrinate 50mg",
    "Pyridoxine 10mg",
    "Thiamine 100mg",
    "Niacin 500mg",
    "Vitamin B12 1000mcg",
    "Vitamin B6 25mg",
    "Folic Acid 800mcg",
    "Vitamin A 10000 IU",
    "Vitamin E 400 IU",
    "Vitamin K 100mcg",
    "Sodium Chloride 0.9%",
    "Calcium Carbonate 500mg",
    "Magnesium Oxide 400mg",
    "Iron 65mg",
    "Zinc 50mg",
    "Potassium Chloride 10mEq",
    "Sodium Bicarbonate 650mg",
    "Phosphorus 250mg",
    "Aluminum Hydroxide 250mg",
    "Magnesium Hydroxide 200mg",
    "Sodium Phosphate 10mg",
    "Potassium Phosphate 15mEq",
    "Calcium Citrate 300mg",
    "Calcium Gluconate 1g",
    "Acetate 0.5%",
    "Sodium Acetate 1g",
    "Sodium Chloride 100mg",
    "Calcium Sulfate 1g",
    "Sodium Hydroxide 100mg",
    "5 viên",
    "10 viên",
    "15 viên",
    "20 viên",
    "30 viên",
    "50 viên",
    "100 viên"
  ];
  

  console.log("dang chon ne",Selectedpatients)

  const statusoption = ["Xác nhận", "Huỷ bỏ", "Hoàn thành"];

  const fetchAppointments = async () => {
    try {
      const doctorId = await getDoctorbyIds(User?.id);
      console.log("DOCTIRID: " + JSON.stringify(doctorId));
      const data = await getAppointmentByDoctorId(doctorId?.id);
      const vipData = await getVIPAppointmentByDoctorId(doctorId?.id);

      if (data && data.length > 0) {
        const enrichedAppointments = await Promise.all(
          data.map(async (appointment) => {
            const [patientDetails, paymentDetails] = await Promise.all([
              ProfilebypatientprofileId(appointment.patientprofile.id),
              getallPaymentByAppoint(appointment.id),
            ]);
            return { ...appointment, patientDetails, paymentDetails };
          })
        );
        setAppointments(enrichedAppointments);
      }

      if (vipData && vipData.length > 0) {
        const enrichedVIPAppointments = await Promise.all(
          vipData.map(async (vipAppointment) => {
            const patientDetails = await ProfilebypatientprofileId(
              vipAppointment.patientprofile.id
            );
            return { ...vipAppointment, patientDetails };
          })
        );
        setVipAppointments(enrichedVIPAppointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;

  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  const currentVipAppointments = vipAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
   console.log("vip nè:",currentVipAppointments[1])

  // Fetch appointments once on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStauts = async (
    id,
    status,
    doctorid,
    patientfile_id,
    appointment_id
  ) => {
    try {
      console.log("thay dổi",doctorid , patientfile_id , appointment_id)
      const data = await UpdateStatusAppointment(id, status);
      console.log("starus hiện tại",status);
      if (status === "Hoàn thành") {
       
        // cập nhật status pay 
        const updatePaymentStatus = await axios.put(
          `http://localhost:8080/api/payments/status/${appointments[id-1]?.paymentDetails[0].id}`,
          {
            status: "Đã thanh toán", // Set the status to "Đã thanh toán"
          },
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        );
        if (updatePaymentStatus != null) {
          enqueueSnackbar("Cập nhật thành công!", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        } else {
          enqueueSnackbar("Cập nhật không thành công!", {
            variant: "error",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
      }
      // hủy bỏ
       if(status === "Huỷ bỏ"){
        const updatePaymentStatus = await axios.put(
          `http://localhost:8080/api/payments/status/${appointments[id-1]?.paymentDetails[0].id}`,
          {
            status: "Hoàn tiền", // Set the status to "Đã thanh toán"
          },
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        );
        if (updatePaymentStatus != null) {
          enqueueSnackbar("Cập nhật thành công!", {
            variant: "success",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        } else {
          enqueueSnackbar("Cập nhật không thành công!", {
            variant: "error",
            autoHideDuration: 5000,
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }
        console.log("hủy bỏ nè nghị ơi ")
      }
  // Xác nhận
  if(status === "Xác nhận"){
    const updatePaymentStatus = await axios.put(
      `http://localhost:8080/api/payments/status/${appointments[id-1]?.paymentDetails[0].id}`,
      {
        status: "Chờ xử lý", // Set the status to "Đã thanh toán"
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    if (updatePaymentStatus != null) {
      enqueueSnackbar("Cập nhật thành công!", {
        variant: "success",
        autoHideDuration: 5000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } else {
      enqueueSnackbar("Cập nhật không thành công!", {
        variant: "error",
        autoHideDuration: 5000,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
    console.log("hủy bỏ nè nghị ơi ")
  }

      fetchAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const totalPages = Math.ceil(
    (appointments.length + vipAppointments.length) / appointmentsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
   console.log("currentAppointments",currentAppointments[0]?.patientDetails?.id)

   const handleOpenPopup =(index)=>{
     setPopup(true);
     setSelectedpatients(currentAppointments[index])

   }

   const handleOpenPopupVip =(index)=>{
    setPopup(true);
    console.log("thứ tự",index)
    setSelectedpatients(currentVipAppointments[index])
   }

    // Hàm xử lý khi người dùng nhập liệu
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setDescription(inputText);

    // Lấy các ký tự đầu tiên (hoặc vài ký tự) của inputText để tìm kiếm tên thuốc
    const searchTerm = inputText.slice(-3).toLowerCase();  // Lấy 3 ký tự cuối cùng từ input

    // Tìm kiếm thuốc trong danh sách theo 3 ký tự cuối cùng
    if (inputText.length >= 3) {
      const filteredSuggestions = drugList.filter((drug) =>
        drug.toLowerCase().startsWith(searchTerm)
      );
      setSuggestions(filteredSuggestions);
      setIsSuggestionVisible(filteredSuggestions.length > 0);  // Hiển thị gợi ý nếu có kết quả
    } else {
      setSuggestions([]);
      setIsSuggestionVisible(false);  // Ẩn gợi ý nếu không đủ ký tự
    }
  };

  // Hàm xử lý khi người dùng chọn gợi ý thuốc
  const handleSuggestionClick = (suggestion) => {
    const currentText = description.slice(0, description.length - 3); // Giữ lại phần trước đó
    const newText = `${currentText}${suggestion}`; // Thêm tên thuốc đã chọn vào cuối phần mô tả
    setDescription(newText);
    setSuggestions([]);  // Ẩn gợi ý khi chọn tên thuốc
    setIsSuggestionVisible(false);  // Ẩn gợi ý khi đã chọn
  };
 //Summit form 
 const SubmitPatientFile = async (e) => {
  e.preventDefault();
  const checksuccess = axios.post(
    `http://localhost:8080/api/patientsfile?doctors_id=${Selectedpatients.doctor.account.id}&patients_profile_id=${patientfile_id}&appointment_id=${appointment_id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );


};
  return (
    <div className="w-full h-full  border-l border-[#00b5f1] pl-10 ">
      <span className="text-[24px] font-medium">
        Quản lý lịch hẹn đặt khám{" "}
      </span>
      {/* <div className="flex gap-2">
        <div
          className=" p-2 bg-[#00b5f1] text-[#fff] rounded-lg"
          style={{ width: "fit-content" }}
        >
          Bạn đang hiện có{" "}
          {appointments.filter((item) => item.status === "Chờ xử lý").length}{" "}
          cuộc hẹn
        </div>
        <div
          className=" p-2 bg-[#00b5f1] text-[#fff] rounded-lg"
          style={{ width: "fit-content" }}
        >
          Bạn khám thành công{" "}
          {appointments.filter((item) => item.status === "Thành công").length}{" "}
          cuộc hẹn
        </div>
        <div
          className=" p-2 bg-[#00b5f1] text-[#fff] rounded-lg"
          style={{ width: "fit-content" }}
        >
          Bạn huỷ{" "}
          {appointments.filter((item) => item.status === "Huỷ bỏ").length} cuộc
          hẹn
        </div>
      </div> */}
      <div className="mt-4 w-full h-[500px] bg-[#fff] rounded-lg shadow-lg">
        <div className="flex flex-col w-full h-full text-gray-700 bg-white overflow-auto overflow-y-hidden shadow-md rounded-xl bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Tên
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Dịch vụ
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Mã phiếu
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Giờ khám
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Bệnh Án
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                    Trạng thái
                  </p>
                </th>
                <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                  <p className="block font-sans text-sm antialiased font-bold leading-none text-blue-gray-900 opacity-70"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentVipAppointments.map((vip, vipindex) => {
                return (
                  <tr key={vipindex} className="bg-yellow-300/50">
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 capitalize">
                        {vip.patientprofile.fullname}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        {vip.type}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        {vip.payments.map((payment, index) => (
                          <div key={index}>{payment.transactionCode}</div>
                        ))}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        {vip.startTime} - {vip.endTime}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                           <span className="px-4 py-2 bg-green-300 rounded-lg" onClick={()=>handleOpenPopupVip(vipindex)}>Điều Trị</span>
                        </p>
                      </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        {/* {vip.status} */}
                        <Select
                          className="w-full"
                          value={vip.status}
                          onChange={(value) =>
                            handleUpdateStauts(
                              vip.id,
                              value,
                              vip.doctor.id,
                              vip.patientDetails.id,
                              vip.id
                            )
                          }
                        >
                          {statusoption.map((status) => (
                            <Option
                              key={status}
                              value={status}
                              className="w-full"
                              disabled={
                                vip.status === "Thành công" &&
                                vip.status !== status
                              }
                            >
                              {vip.status === status ? vip.status : status}
                            </Option>
                          ))}
                        </Select>
                      </p>
                    </td>
                    {/* <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="p-2 bg-[#00b5f1] block font-sans text-sm antialiased font-medium leading-normal text-[#fff] rounded-xl"
                      onClick={(e) => {
                        console.log("Selected ID:", item.patientDetails.id);
                        handlePopupDetail(item.patientDetails.id);
                      }}
                    >
                      Edit
                    </button>
                  </td> */}
                  </tr>
                );
              })}
            </tbody>
            <tbody className="">
              {currentAppointments.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <tr>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900 capitalize">
                          {item.patientDetails.fullname}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                          {item.type}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                          {item.paymentDetails.map((payment, index) => (
                            <div key={index}>{payment.transactionCode}</div>
                          ))}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                          {item.worktime.startTime} - {item.worktime.endTime}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                           <span className="px-4 py-2 bg-green-300 rounded-lg" onClick={()=>handleOpenPopup(index)}>Điều Trị</span>
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                          {/* {item.status} */}
                          <Select
                            className="w-full"
                            value={item.status}
                            onChange={(value) =>
                              handleUpdateStauts(
                                item.id,
                                value,
                                item.doctor.id,
                                item.patientDetails.id,
                                item.id
                              )
                            }
                          >
                            {statusoption.map((status) => (
                              <Option
                                key={status}
                                value={status}
                                className="w-full"
                                disabled={
                                  item.status === "Thành công" &&
                                  item.status !== status
                                }
                              >
                                {item.status === status ? item.status : status}
                              </Option>
                            ))}
                          </Select>
                        </p>
                      </td>
                      {/* <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="p-2 bg-[#00b5f1] block font-sans text-sm antialiased font-medium leading-normal text-[#fff] rounded-xl"
                      onClick={(e) => {
                        console.log("Selected ID:", item.patientDetails.id);
                        handlePopupDetail(item.patientDetails.id);
                      }}
                    >
                      Edit
                    </button>
                  </td> */}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
           
          </table>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded mr-2"
        >
          Trang sau
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
          Trang trước
        </button>
      </div>
       {/* popup */}
       <div
      className={`w-full h-screen ${popup ? "fixed" : "hidden"} z-20 bg-slate-400/60 top-0 right-0`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-2/5 p-4 bg-[#fff] rounded-xl shadow-lg border border-solid border-[#c2c2c2]">
          <div className="w-full flex justify-end cursor-pointer hover:text-[red]"
           onClick={()=>{setPopup(false)}}
          >
            X
          </div>
          <span className="text-[18px]">
            <h3 className="font-bold text-center">Thông Tin Bệnh Nhân</h3>
            <p> -Bệnh nhân: {Selectedpatients?.patientDetails?.fullname}</p>
            <p> -Sinh ngày: {Selectedpatients?.patientDetails?.birthdate}</p>
            <p> -Số BHYT: {Selectedpatients?.patientDetails?.codeBhyt}</p>
            <span className="text-[#00b5f1] font-medium text-[20px] capitalize"></span>

            <form  onSubmit={SubmitPatientFile}>
              {/* Mô tả khám bệnh và đơn thuốc */}
              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mô Tả Khám Bệnh Và Đơn Thuốc
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleInputChange}  // Xử lý khi nhập liệu
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Nhập mô tả thuốc, tên thuốc và số lượng..."
                />
              </div>

              {/* Gợi ý thuốc */}
              {isSuggestionVisible && suggestions.length > 0 && (
                <div className="mt-2 bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto">
                  <ul className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Chọn hình ảnh */}
              <div className="mt-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  id="image"
                  multiple
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="my-4 flex justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00b5f1] text-[#fff] rounded-lg hover:scale-[0.9]"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </span>
        </div>
      </div>
    </div>
      {/* {selectedImage && (
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
      )} */}
    </div>
  );
}
export default TabDoctorappointment;
