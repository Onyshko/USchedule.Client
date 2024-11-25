import { Link } from "react-router-dom";

import classes from "../root/BaseList.module.css";

function BaseSelectorList({ itemPropList }) {
  return (
    <div className={classes.baseListContainer}>
      <table className={classes.baseListTable}>
        <thead>
          <tr>
            {itemPropList.headers.map((elem) => (
              <th key={elem}>{elem}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemPropList.list.map((propList) => (
            <tr
              className={classes.baseListTr}
              key={itemPropList.list.indexOf(propList)}
            >
              {propList.list.map((prop) => (
                <td key={prop.name}>{prop.value}</td>
              ))}
              <td>
                <Link to={propList.id}>details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BaseSelectorList;
