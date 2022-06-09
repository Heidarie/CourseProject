import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";


const CalendarPicker = ({disabledDays, onDateChange}) =>{

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
      });

      const handleCalendarChange = (selectedDayRange) => {
        onDateChange(selectedDayRange);
      }

      return (
        <Calendar
          value={selectedDayRange}
          onChange={setSelectedDayRange}
          minimumDate={utils().getToday()}
          disabledDays={disabledDays}
          shouldHighlightWeekends
        />);
}
export default CalendarPicker;
