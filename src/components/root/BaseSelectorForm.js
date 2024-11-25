import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";

import classes from "../root/BaseForm.module.css";
import { getAuthToken } from "../../util/auth";

function BaseSelectorForm({
  method,
  item,
  selectorsDataArrays,
  itemName,
  itemRoute,
}) {
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
      {Object.values(selectorsDataArrays).map((selector) => (
        <div key={selector.name}>
          <p>
            <label htmlFor="name">{selector.lable}</label>
            <select name={selector.name}>
              {selector.list.map((elem) => (
                <option key={elem.id} value={elem.id}>
                  {elem.name}
                </option>
              ))}
            </select>
          </p>
          <p>
            <input type="hidden" name="keys" value={selector.name} />
          </p>
        </div>
      ))}
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

export default BaseSelectorForm;

export async function action({ request, params }) {
  const token = getAuthToken();
  const method = request.method;
  const data = await request.formData();
  const itemName = data.get("itemName");

  const json = {};
  const keys = data.getAll("keys");

  keys.forEach((key) => {
    json[key] = data.get(key);
  });

  let url = `https://localhost:44337/api/${itemName}`;

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(json),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: `Could not save ${itemName}.` }, { status: 500 });
  }

  return redirect("/" + data.get("itemRoute"));
}
