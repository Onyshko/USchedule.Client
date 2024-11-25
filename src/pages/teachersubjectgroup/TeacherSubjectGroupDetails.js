import { useRouteLoaderData, json } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import BaseItem from "../../components/root/BaseItem";

function TeacherSubjectGroupDetail() {
  const teacherSubjectGroup = useRouteLoaderData("teachersubjectgroup-detail");
  console.log(teacherSubjectGroup);

  return <BaseItem itemPropList={teacherSubjectGroup} />;
}

export default TeacherSubjectGroupDetail;

export async function loader({ params }) {
  const id = params.teacherSubjectGroupId;
  const token = getAuthToken();
  const response = await fetch(
    "https://localhost:44337/api/TeacherSubjectGroup/" + id,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!(await response).ok) {
    throw json(
      { message: "Could not get teacher subject group." },
      { status: 500 }
    );
  }

  const resData = (await response).json();
  const teacherSubjectGroup = await resData;

  const propListStudentGroup = [
    { name: "Викладач", value: teacherSubjectGroup.teacherName },
    { name: "Предмет", value: teacherSubjectGroup.subjectName },
    { name: "Група", value: teacherSubjectGroup.groupName },
  ];

  console.log(propListStudentGroup);

  return propListStudentGroup;
}
