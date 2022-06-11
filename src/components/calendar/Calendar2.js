import React, { useState } from "react";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker';;


const CalendarPicker2 = ({disabledDays, onDateChange}) =>{

    const [selectedDay, setSelectedDay] = useState(null);
      const handleCalendarChange = (selectedDayRange) => {
       
        setSelectedDay(selectedDayRange)
        onDateChange({from:selectedDayRange,
                      to:selectedDayRange});
      }

      return (
        <Calendar
          value={selectedDay}
          onChange={handleCalendarChange}
          minimumDate={utils().getToday()}
          disabledDays={disabledDays}
          shouldHighlightWeekends
        />);
}
export default CalendarPicker2;
