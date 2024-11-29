import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";

function Calender() {
  const handleDateClick = (e) => {
    const selectedDate = e.date;
    const formartDate = selectedDate.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    console.log(formartDate)
  };
  return (
    <div className="w-full h-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={viLocale}
        selectable={true}
        validRange={{
            start: new Date().toISOString().split("T")[0], 
        }}
        headerToolbar={{
          start: "title",
          center: "",
          end: "today prev,next",
        }}
        dateClick={handleDateClick}
      />
    </div>
  );
}

export default Calender;
