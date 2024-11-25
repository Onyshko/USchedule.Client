import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import classes from "../root/BaseForm.module.css";
import { getAuthToken } from "../../util/auth";

function UserForm({ method, user, roles }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.baseForm}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={user ? user.name : ""}
        />
      </p>
      <p>
        <label htmlFor="surname">Surname</label>
        <input
          id="surname"
          type="text"
          name="surname"
          required
          defaultValue={user ? user.surname : ""}
        />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          defaultValue={user ? user.email : ""}
        />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          required
          defaultValue={user ? user.password : ""}
        />
      </p>
      <p>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          required
          defaultValue={user ? user.confirmPassword : ""}
        />
      </p>
      <div>
        <h3>Assign Roles:</h3>
        {roles.map((role) => (
          <div key={role} className={classes.userFormCheckBox}>
            <label>{role}</label>
            <input type="checkbox" name="roles" value={role} />
          </div>
        ))}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default UserForm;

export async function action({ request, params }) {
  const token = getAuthToken();
  const method = request.method;
  const data = await request.formData();

  const userData = {
    name: data.get("name"),
    surname: data.get("surname"),
    email: data.get("email"),
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
    roles: data.getAll("roles"),
    clientUri: "http://localhost:3000/users/email-confirmation",
  };

  let url = "https://localhost:44337/api/Account/register";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/users");
}
