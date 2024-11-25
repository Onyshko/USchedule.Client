import { useLoaderData, json } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import UserForm from "../../components/users/UserForm";

function NewUserPage() {
  const roles = useLoaderData();

  return <UserForm method="post" roles={roles} />;
}

export default NewUserPage;

export async function loader() {
  const token = getAuthToken();
  const response = await fetch("https://localhost:44337/api/Account/roles", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!(await response).ok) {
    throw json({ message: "Could not get all roles." }, { status: 500 });
  }

  const resData = (await response).json();
  const roles = await resData;

  console.log(roles);

  return roles;
}
