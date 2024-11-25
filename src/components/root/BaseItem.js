import classes from "./BaseItem.module.css";

function BaseItem({ itemPropList }) {
  console.log(itemPropList);
  return (
    <>
      <div className={classes.itemInfoContainer}>
        <div className={classes.itemSeparator}>
          <h3>Деталі</h3>
          <table className={classes.itemTable}>
            <tbody>
              {itemPropList.map((prop) => (
                <tr key={prop.name}>
                  <td>
                    <b>{prop.name}</b>
                  </td>
                  <td>{prop.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={classes.itemButtonBlock}>Button area</div>
      </div>
    </>
  );
}

export default BaseItem;
