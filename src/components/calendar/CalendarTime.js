import classes from "./Calendar.module.css";

function CalendarTime() {
  const times = Array.from(
    { length: 24 },
    (_, hour) => `${hour.toString().padStart(2, "0")}:00`
  );
  return (
    <div>
      <ul className={classes.calendarTimeUl}>
        {times.map((time) => (
          <li key={time} className={classes.calendarTimeLi}>
            {time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarTime;
