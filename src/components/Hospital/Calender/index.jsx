import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";
import "./calender.scss";
function Calender({ onDateSelect }) {
  const disabledDates = [
    { day: "13", month: "11" },
    { day: "14", month: "11" },
    { day: "15", month: "12" },
  ];
  const handleDateClick = (e) => {
    const selectedDate = e.date;
    const day = selectedDate.getDate().toString(); // Lấy ngày (1-31)
    const month = (selectedDate.getMonth() + 1).toString(); // Lấy tháng (1-12)

    // Kiểm tra nếu ngày và tháng nằm trong danh sách cấm
    const isDisabled = disabledDates.some(
      (d) => d.day === day && d.month === month
    );
    if (isDisabled) {
      alert(`Ngày ${day}/${month} không được phép chọn`);
      return;
    }
    const formattedDate = selectedDate.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    onDateSelect(formattedDate);
  };

  // Hàm thêm lớp CSS vào các ngày cần ẩn
  const handleDayCellClassNames = (info) => {
    const day = info.date.getDate().toString(); // Lấy ngày
    const month = (info.date.getMonth() + 1).toString(); // Lấy tháng

    const isDisabled = disabledDates.some(
      (d) => d.day === day && d.month === month
    );

    if (isDisabled) {
      return ["hidden-day"]; // Thêm lớp để ẩn
    }
    return ["fc-daygrid-day"];
  };

  return (
    <div className="w-full">
      <FullCalendar
        className="sticky"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={viLocale}
        selectable={true}
        height={"auto"}
        validRange={{
          start: new Date().toISOString().split("T")[0],
        }}
        headerToolbar={{
          start: "title",
          center: "",
          end: "today prev,next",
        }}
        dateClick={handleDateClick}
        dayCellClassNames={handleDayCellClassNames} // Áp dụng lớp CSS
      />
    </div>
  );
}

export default Calender;