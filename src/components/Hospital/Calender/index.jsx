import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";
import "./calender.scss";
import {getWorkTimeDoctor} from "../../../api/Doctor/workinghour";

function Calender({ onDateSelect, doctorId }) {
  const [WorkTimeDoctor, setWorkTimeDoctor] = useState([]);

  // Xử lý khi người dùng chọn ngày
  const handleSelect = (e) => {
    const selectedDate = e.start;
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    // Kiểm tra nếu ngày đã được chọn trong WorkTimeDoctor
    const isValid = WorkTimeDoctor.some(
      (d) => d.day === day && d.month === month && d.year === year
    );

    if (isValid) {
      const formattedDate = selectedDate.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      onDateSelect(formattedDate);
    } else {
      alert(`Bác sĩ không rảnh vào ngày này ${day}/${month}/${year}`);
    }
  };

  // Xử lý để áp dụng class cho ngày không được phép chọn
  const handleDayCellClassNames = (info) => {
    const day = info.date.getDate();
    const month = info.date.getMonth() + 1;
    const year = info.date.getFullYear();
    const isDisabled = !WorkTimeDoctor.some(
      (d) => d.day === day && d.month === month && d.year === year
    );

    if (isDisabled) {
      return ["hidden-day"]; // Thêm lớp để ẩn các ngày không có trong WorkTimeDoctor
    }
    return ["fc-daygrid-day"];
  };

  useEffect(() => {
    const fetchWorkTime = async () => {
      const data = await getWorkTimeDoctor(doctorId);
      const dataupdate = data.map((item) => {
        const workDate = new Date(item.workDate);
        return {
          day: workDate.getDate(),
          month: workDate.getMonth() + 1,
          year: workDate.getFullYear(),
        };
      });
      setWorkTimeDoctor(dataupdate);
    };

    fetchWorkTime();
  }, [doctorId]);

  return (
    <div className="w-full">
      <FullCalendar
        className="sticky"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={viLocale}
        selectable={true}
        selectMirror={true} // Cho phép kéo chọn ngày
        // height={"auto"}
        validRange={{
          start: new Date().toISOString().split("T")[0],
        }}
        headerToolbar={{
          start: "title",
          center: "",
          end: "today prev,next",
        }}
        select={handleSelect} // Sử dụng select thay vì dateClick
        dayCellClassNames={handleDayCellClassNames} // Áp dụng lớp CSS
      />
    </div>
  );
}

export default Calender;
