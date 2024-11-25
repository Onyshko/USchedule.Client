import classes from "./CalendarNavigation.module.css";

function CalendarNavigation() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];
  return (
    <div className={classes.calendarNavigationContainer}>
      <button className={classes.leftButton}>{"<"}</button>
      <div className={classes.monthblock}>
        <h1>
          {months[currentMonth]}|{currentYear}
        </h1>
      </div>
      <button className={classes.rightButton}>{">"}</button>
    </div>
  );
}

export default CalendarNavigation;
