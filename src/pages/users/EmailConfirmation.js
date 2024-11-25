import { json, redirect } from "react-router-dom";

import EmailConfirmationForm from "../../components/users/EmailConfirmationForm";

function EmailConfirmation() {
  return <EmailConfirmationForm />;
}

export default EmailConfirmation;

export async function action({ request, params }) {
  // Отримуємо URL з request
  const url = new URL(request.url);

  // Отримуємо параметри запиту
  const email = url.searchParams.get("email");
  const emailToken = encodeURIComponent(url.searchParams.get("emailToken"));
  const passwordToken = encodeURIComponent(
    url.searchParams.get("passwordToken")
  );
  const apiUrl = `https://localhost:44337/api/Account/userconfirmation?email=${email}&emailToken=${emailToken}&passwordToken=${passwordToken}&=`;

  const data = await request.formData();
  const authData = {
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
    email: email,
  };

  const authDataJson = JSON.stringify(authData);

  console.log(authDataJson);
  console.log(apiUrl);

  const response = fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: authDataJson,
  });

  console.log(response);

  if ((await response).status === 422 || (await response).status === 401) {
    return response;
  }

  if (!(await response).ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = (await response).text();

  console.log(resData);

  return redirect("/auth");
}
