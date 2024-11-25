import { json } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export async function userRolesLoader() {
  const token = getAuthToken();
  const response = await fetch(
    "https://localhost:44337/api/Account/userroles",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!(await response).ok) {
    throw json({ message: "Could not get user roles." }, { status: 500 });
  }

  const resData = (await response).json();
  const roles = await resData;
  return roles;
}
