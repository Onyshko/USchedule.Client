import { useLoaderData, json } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import StudentGroupList from "../../components/root/BaseSelectorList";

function TeacherSubjectGroupsPage() {
  const teacherSubjectGroups = useLoaderData();
  return (
    <>
      <StudentGroupList itemPropList={teacherSubjectGroups} />
    </>
  );
}

export default TeacherSubjectGroupsPage;

export async function loader() {
  const token = getAuthToken();
  const response = await fetch(
    "https://localhost:44337/api/TeacherSubjectGroup",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!(await response).ok) {
    throw json(
      { message: "Could not get all teacher subject groups." },
      { status: 500 }
    );
  }

  const resData = (await response).json();
  const teacherSubjectGroups = await resData;

  const listProps = {
    headers: ["Викладач", "Предмет", "Група"],
    list: teacherSubjectGroups.map((elem) => ({
      id: elem.id,
      list: [
        { name: "teacher", value: elem.teacherName },
        { name: "subject", value: elem.subjectName },
        { name: "group", value: elem.groupName },
      ],
    })),
  };

  return listProps;
}
