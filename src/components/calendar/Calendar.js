import classes from "./Calendar.module.css";
import CalendarTime from "./CalendarTime";
import CalendarWeek from "./CalendarWeek";

function Calendar({ events }) {
  const days = Array.from({ length: 7 }, (_, day) => `${day.toString()}`);
  return (
    <div className={classes.calendarContainer}>
      <CalendarTime />
      <CalendarWeek />
    </div>
  );
}

export default Calendar;
