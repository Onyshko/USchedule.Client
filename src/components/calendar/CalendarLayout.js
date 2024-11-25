import { Outlet } from "react-router-dom";
import CalendarNavigation from "./CalendarNavigation";

function CalendarLayout() {
  return (
    <>
      <CalendarNavigation />
      <Outlet />
    </>
  );
}

export default CalendarLayout;
