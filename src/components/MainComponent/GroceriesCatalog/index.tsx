import React from "react";
import GroceriesCatalogItems from "./GroceriesCatalogItems";
import GroceriesCatalogSelectedItems from "./GroceriesCatalogSelectedItems";
import styles from './GroceriesCatalog.module.scss';

function GroceriesCatalog() {
  return (
    <div className={styles.GroceriesCatalog}>
      {/*GroceriesCatalogSearch*/}
      <GroceriesCatalogItems className={styles.GroceriesCatalogItemsWrapper}/>
      <GroceriesCatalogSelectedItems className={styles.GroceriesCatalogSelectedItemsWrapper}/>
      {/*ActionButtons*/}
    </div>
  );
}

export default GroceriesCatalog;
