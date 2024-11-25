import { json, useLoaderData } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import BaseSelectorForm from "../../components/root/BaseSelectorForm";

function NewStudentGroupPage() {
  const selectors = useLoaderData();

  return (
    <BaseSelectorForm
      method="post"
      selectorsDataArrays={selectors}
      itemName="StudentGroup"
      itemRoute="studentgroups"
    />
  );
}

export default NewStudentGroupPage;

export async function loader() {
  const token = getAuthToken();
  const studentResponse = await fetch(
    "https://localhost:44337/api/Account/users",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const groupResponse = await fetch("https://localhost:44337/api/Group", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!(await studentResponse).ok) {
    throw json({ message: "Could not get all subjects." }, { status: 500 });
  }

  if (!(await groupResponse).ok) {
    throw json({ message: "Could not get all groups." }, { status: 500 });
  }

  const studentData = (await studentResponse).json();
  const groupData = (await groupResponse).json();
  const studentGroups = {
    students: {
      list: (await studentData).result.map((user) => ({
        id: user.id,
        name: `${user.name} ${user.surname}`,
      })),
      lable: "Студент",
      name: "studentId",
    },
    groups: {
      list: await groupData,
      lable: "Група",
      name: "groupId",
    },
  };

  return studentGroups;
}
