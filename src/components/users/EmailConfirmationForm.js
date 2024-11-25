import { Form, useActionData, useNavigation } from "react-router-dom";

import classes from "../root/AuthForm.module.css";

function EmailConfirmationForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className={classes.form}>
      <h1>Create new password</h1>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>err</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="password">New Password</label>
        <input id="password" type="password" name="password" required />
      </p>
      <p>
        <label htmlFor="password">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          required
        />
      </p>
      <div className={classes.actions}>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Log in"}
        </button>
      </div>
    </Form>
  );
}

export default EmailConfirmationForm;
