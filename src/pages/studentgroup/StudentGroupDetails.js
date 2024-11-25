import { useRouteLoaderData, json } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import BaseItem from "../../components/root/BaseItem";

function StudentGroupDetail() {
  const studentGroup = useRouteLoaderData("studentgroup-detail");

  return <BaseItem itemPropList={studentGroup} />;
}

export default StudentGroupDetail;

export async function loader({ params }) {
  const id = params.studentGroupId;
  const token = getAuthToken();
  const response = await fetch(
    "https://localhost:44337/api/StudentGroup/" + id,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!(await response).ok) {
    throw json({ message: "Could not get student group." }, { status: 500 });
  }

  const resData = (await response).json();
  const studentGroup = await resData;

  const propListStudentGroup = [
    { name: "Група", value: studentGroup.groupName },
    { name: "Студент", value: studentGroup.studentName },
  ];

  return propListStudentGroup;
}
