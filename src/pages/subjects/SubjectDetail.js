import { useRouteLoaderData, json } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import BaseItem from "../../components/root/BaseItem";

function SubjectDetail() {
  const subject = useRouteLoaderData("subject-detail");

  return <BaseItem itemPropList={subject} />;
}

export default SubjectDetail;

export async function loader({ params }) {
  const id = params.subjectId;
  const token = getAuthToken();
  const response = await fetch("https://localhost:44337/api/Subject/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!(await response).ok) {
    throw json({ message: "Could not get subject." }, { status: 500 });
  }

  const resData = (await response).json();
  const subject = await resData;

  const propListSubject = [{ name: "Предмет", value: subject.name }];

  return propListSubject;
}
