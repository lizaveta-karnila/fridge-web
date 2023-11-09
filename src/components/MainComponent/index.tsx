import React from "react";
import styles from './MainComponent.module.scss';
import Header from "components/MainComponent/views/Header";
import GroceriesCatalog from "./GroceriesCatalog";

function MainComponent() {
  return (
    <div className={styles.Container}>
      <Header/>
      <GroceriesCatalog/>
    </div>
  );
}

export default MainComponent;
