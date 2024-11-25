import { useRouteLoaderData, json } from "react-router-dom";

import { getAuthToken } from "../../util/auth";
import BaseItem from "../../components/root/BaseItem";

function GroupDetail() {
  const group = useRouteLoaderData("group-detail");

  return <BaseItem itemPropList={group} />;
}

export default GroupDetail;

export async function loader({ params }) {
  const id = params.groupId;
  const token = getAuthToken();
  const response = await fetch("https://localhost:44337/api/Group/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!(await response).ok) {
    throw json({ message: "Could not get group." }, { status: 500 });
  }

  const resData = (await response).json();
  const group = await resData;

  const propListGroup = [{ name: "Група", value: group.name }];

  return propListGroup;
}
