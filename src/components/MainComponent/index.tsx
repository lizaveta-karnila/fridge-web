import React from "react";
import styles from './MainComponent.module.scss';
import Header from "components/MainComponent/views/Header";
import GroceriesCatalog from "./GroceriesCatalog";
import Modal from "components/ui/Modal";
import {useAppDispatch, useAppSelector} from "store/hooks";
import {groceriesCatalogSelectors} from "store/groceriesCatalog/groceriesCatalogSelectors";
import {groceriesCatalogActions} from "store/groceriesCatalog/groceriesCatalogSlice";

function MainComponent() {
  const isGroceriesCatalogModalOpened = useAppSelector(groceriesCatalogSelectors.isModalOpenedSelector);
  const dispatch = useAppDispatch();

  const onCloseGroceriesCatalogModalHandler = () => {
    dispatch(groceriesCatalogActions.resetGroceriesCatalogState());
  };

  return (
    <div className={styles.Container}>
      <Header/>
      <Modal isOpened={isGroceriesCatalogModalOpened} onClose={onCloseGroceriesCatalogModalHandler}>
        <GroceriesCatalog/>
      </Modal>
    </div>
  );
}

export default MainComponent;
