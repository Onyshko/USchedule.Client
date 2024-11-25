import { useLoaderData, json } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import StudentGroupList from "../../components/root/BaseSelectorList";

function StudentGroupsPage() {
  const studentGroups = useLoaderData();

  console.log(studentGroups);
  return (
    <>
      <StudentGroupList itemPropList={studentGroups} />
    </>
  );
}

export default StudentGroupsPage;

export async function loader() {
  const token = getAuthToken();
  const response = await fetch("https://localhost:44337/api/StudentGroup", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!(await response).ok) {
    throw json(
      { message: "Could not get all student groups." },
      { status: 500 }
    );
  }

  const resData = (await response).json();
  const studentGroups = await resData;

  const listProps = {
    headers: ["Студент", "Група"],
    list: studentGroups.map((elem) => ({
      id: elem.id,
      list: [
        { name: "student", value: elem.studentName },
        { name: "group", value: elem.groupName },
      ],
    })),
  };

  return listProps;
}
