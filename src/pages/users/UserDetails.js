import { useRouteLoaderData, json } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import UserItem from "../../components/users/UserItem";

function UserDetails() {
  const user = useRouteLoaderData("user-detail");

  return <UserItem user={user} />;
}

export default UserDetails;

export async function loader({ params }) {
  const id = params.userId;
  const token = getAuthToken();
  const response = await fetch(
    "https://localhost:44337/api/Account/users/" + id,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!(await response).ok) {
    throw json({ message: "Could not get user." }, { status: 500 });
  }

  const resData = (await response).json();
  const user = await resData;

  return user;
}
