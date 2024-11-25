import { json, redirect } from "react-router-dom";

import AuthForm from "../../components/root/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = fetch("https://localhost:44337/api/Account/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  console.log(response);

  if ((await response).status === 422 || (await response).status === 401) {
    return response;
  }

  if (!(await response).ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = (await response).json();
  const token = (await resData).token;

  localStorage.setItem("token", token);

  return redirect("/");
}
