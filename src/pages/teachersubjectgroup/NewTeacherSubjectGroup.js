import { json, useLoaderData } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import BaseSelectorForm from "../../components/root/BaseSelectorForm";

function NewTeacherSubjectGroupPage() {
  const selectors = useLoaderData();

  return (
    <BaseSelectorForm
      method="post"
      selectorsDataArrays={selectors}
      itemName="TeacherSubjectGroup"
      itemRoute="teachersubjectgroups"
    />
  );
}

export default NewTeacherSubjectGroupPage;

export async function loader() {
  const token = getAuthToken();
  const teacherResponse = await fetch(
    "https://localhost:44337/api/Account/users",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const subjectResponse = await fetch("https://localhost:44337/api/Subject", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const groupResponse = await fetch("https://localhost:44337/api/Group", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!(await teacherResponse).ok) {
    throw json({ message: "Could not get all subjects." }, { status: 500 });
  }

  if (!(await subjectResponse).ok) {
    throw json({ message: "Could not get all subjects." }, { status: 500 });
  }

  if (!(await groupResponse).ok) {
    throw json({ message: "Could not get all groups." }, { status: 500 });
  }

  const studentData = (await teacherResponse).json();
  const subjectData = (await subjectResponse).json();
  const groupData = (await groupResponse).json();
  const teacherSubjectGroups = {
    teachers: {
      list: (await studentData).result.map((user) => ({
        id: user.id,
        name: `${user.name} ${user.surname}`,
      })),
      lable: "Викладач",
      name: "teacherId",
    },
    subjects: {
      list: await subjectData,
      lable: "Предмет",
      name: "subjectId",
    },
    groups: {
      list: await groupData,
      lable: "Група",
      name: "groupId",
    },
  };

  return teacherSubjectGroups;
}
