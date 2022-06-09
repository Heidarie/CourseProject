import React, { useState } from "react";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker';;


const CalendarPicker = ({disabledDays, onDateChange}) =>{

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
      });

      const handleCalendarChange = (selectedDayRange) => {
        setSelectedDayRange(selectedDayRange)
        onDateChange(selectedDayRange);
      }

      return (
        <Calendar
          value={selectedDayRange}
          onChange={handleCalendarChange}
          minimumDate={utils().getToday()}
          disabledDays={disabledDays}
          shouldHighlightWeekends
        />);
}
export default CalendarPicker;
