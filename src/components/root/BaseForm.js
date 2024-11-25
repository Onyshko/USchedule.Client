import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import classes from "./BaseForm.module.css";
import { getAuthToken } from "../../util/auth";

function BaseForm({ method, item, itemName, itemRoute }) {
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
        <input type="hidden" name="itemName" value={itemName} />
      </p>
      <p>
        <input type="hidden" name="itemRoute" value={itemRoute} />
      </p>
      <p>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={item ? item.name : ""}
        />
      </p>
      <div className={classes.baseFormActions}>
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

export default BaseForm;

export async function action({ request, params }) {
  const token = getAuthToken();
  const method = request.method;
  const data = await request.formData();
  const itemName = data.get("itemName");

  const itemData = {
    name: data.get("name"),
  };

  let url = `https://localhost:44337/api/${itemName}`;

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(itemData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: `Could not save ${itemName}.` }, { status: 500 });
  }

  return redirect("/" + data.get("itemRoute"));
}
