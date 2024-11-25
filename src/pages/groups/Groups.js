import { useLoaderData, json } from "react-router-dom";

import BaseList from "../../components/root/BaseList";
import { getAuthToken } from "../../util/auth";

function GroupsPage() {
  const groups = useLoaderData();
  return (
    <>
      <BaseList baseList={groups} />
    </>
  );
}

export default GroupsPage;

export async function loader() {
  const token = getAuthToken();
  const response = await fetch("https://localhost:44337/api/Group", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!(await response).ok) {
    throw json({ message: "Could not get all groups." }, { status: 500 });
  }

  const resData = (await response).json();
  const groups = await resData;

  return groups;
}
