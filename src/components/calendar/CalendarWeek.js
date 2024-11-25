import { useLoaderData } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import classes from "./Calendar.module.css";

function CalendarWeek() {
  const events = useLoaderData()["admin"];

  const [calendarBounds, setCalendarBounds] = useState(null);
  const [columnWidth, setColumnWidth] = useState(0);
  const calendarRef = useRef();

  useEffect(() => {
    // Визначаємо межі області календаря та ширину однієї колонки
    if (calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect();
      setCalendarBounds(rect.left); // Ліва межа області календаря
      setColumnWidth(rect.width / 7); // Ширина однієї колонки
    }
  }, [events]);

  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const firstDayOfWeek = new Date(currentDate);
  firstDayOfWeek.setDate(currentDate.getDate() - currentDay);

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    daysOfWeek.push(day.getDate());
  }

  const days = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  const EventBlock = ({ event }) => {
    const entryDate = new Date(event.entryDate);
    const entryTime = event.entryTime.includes("T")
      ? event.entryTime.split("T")[1]
      : event.entryTime;
    const startTime = new Date(`1970-01-01T${entryTime}`);

    const dayOfWeek = entryDate.getDay();
    const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const blockHeight = (80 / 1440) * 100;
    const blockTop = (startMinutes / 1440) * 100;

    // Обчислюємо ліву позицію блоку
    const blockLeft = calendarBounds + dayOfWeek * columnWidth;

    console.log(calendarBounds);
    console.log(dayOfWeek);
    console.log(columnWidth);
    console.log(blockLeft);

    return (
      <div
        className={classes.eventBlock}
        style={{
          top: `${blockTop}%`, // Вертикальна позиція
          height: `${blockHeight}%`, // Висота події
          width: `${columnWidth}px`, // Ширина колонки
        }}
      >
        <div className={classes.eventContent}>
          <div>{event.subjectName}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.week} ref={calendarRef}>
      {days.map((day, index) => (
        <div
          className={`${day === "Нд" ? classes.firstDay : classes.day}`}
          key={day}
        >
          <div
            className={`${
              daysOfWeek[index] === currentDate.getDate()
                ? classes.todayDay
                : ""
            }`}
          >
            {daysOfWeek[index]} {day}
          </div>
          {events
            .filter((event) => new Date(event.entryDate).getDay() === index)
            .map((event) => (
              <EventBlock key={event.id} event={event} />
            ))}
        </div>
      ))}
    </div>
  );
}

export default CalendarWeek;
