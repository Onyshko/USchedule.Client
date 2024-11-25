import { useLoaderData, json } from "react-router-dom";

import UserList from "../../components/users/UserList";
import { getAuthToken } from "../../util/auth";

function UsersPage() {
  const users = useLoaderData();

  return (
    <>
      <UserList baseList={users} />
    </>
  );
}

export default UsersPage;

export async function loader() {
  const token = getAuthToken();
  const response = await fetch("https://localhost:44337/api/Account/users", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!(await response).ok) {
    throw json({ message: "Could not get all users." }, { status: 500 });
  }

  const resData = (await response).json();
  const users = (await resData).result;

  return users;
}
