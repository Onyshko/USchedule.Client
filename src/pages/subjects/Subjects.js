import { useLoaderData, json } from "react-router-dom";

import BaseList from "../../components/root/BaseList";
import { getAuthToken } from "../../util/auth";

function SubjectsPage() {
  const subjects = useLoaderData();
  return (
    <>
      <BaseList baseList={subjects} />
    </>
  );
}

export default SubjectsPage;

export async function loader() {
  const token = getAuthToken();
  const response = await fetch("https://localhost:44337/api/Subject", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!(await response).ok) {
    throw json({ message: "Could not get all subjects." }, { status: 500 });
  }

  const resData = (await response).json();
  const subjects = await resData;

  return subjects;
}
