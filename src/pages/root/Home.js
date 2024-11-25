import { getAuthToken, userRolesLoader } from "../../util/auth";
import CalendarLayout from "../../components/calendar/CalendarLayout";
import Calendar from "../../components/calendar/Calendar";

function HomePage() {
  return (
    <>
      <CalendarLayout />
      <Calendar />
    </>
  );
}

export default HomePage;

export async function loader() {
  const token = getAuthToken();
  const roles = await userRolesLoader();
  const entriesJson = [];

  console.log(roles);

  if (roles.includes("Student")) {
    const studentResponse = await fetch(
      "https://localhost:44337/api/Entry/Student",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    entriesJson["student"] = await (await studentResponse).json();
  }

  if (roles.includes("Teacher")) {
    const teacherResponse = await fetch(
      "https://localhost:44337/api/Entry/Teacher",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    entriesJson["teacher"] = await (await teacherResponse).json();
  }

  if (roles.includes("Admin") || roles.includes("SuperAdmin")) {
    const adminResponse = await fetch("https://localhost:44337/api/Entry", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    entriesJson["admin"] = await (await adminResponse).json();
  }

  return entriesJson;
}
