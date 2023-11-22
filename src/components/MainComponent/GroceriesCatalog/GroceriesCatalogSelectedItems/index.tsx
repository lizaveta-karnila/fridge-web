import React from "react";
import styles from './GroceriesCatalogSelectedItems.module.scss';
import {useAppDispatch, useAppSelector} from "store/hooks";
import {groceriesCatalogSelectors} from "store/groceriesCatalog/groceriesCatalogSelectors";
import {useTranslation} from "react-i18next";
import {IGrocery, ITranslatable} from "store/types";
import {groceriesCatalogActions} from "store/groceriesCatalog/groceriesCatalogSlice";
import CrossIcon from "assets/CrossIcon";
import QuantityInput from "./QuantityInput";
import cx from "classnames";

interface IProps {
  className: string,
}

function GroceriesCatalogSelectedItems({className}: IProps) {
  const selectedGroceries = useAppSelector(groceriesCatalogSelectors.selectedGroceriesSelector);
  const dispatch = useAppDispatch();

  const {t, i18n} = useTranslation();
  const language = i18n.language as keyof ITranslatable;

  const changeGroceryQuantity = (grocery: IGrocery, newQuantity: number) => {
    dispatch(groceriesCatalogActions.changeSelectedGroceryQuantity({
      grocery: grocery,
      quantity: newQuantity,
    }));
  };

  const removeGroceryFromSelectedGroceries = (groceryId: IGrocery["id"]) => {
    dispatch(groceriesCatalogActions.removeGroceryFromSelectedGroceries(groceryId));
  }

  return (
    selectedGroceries.length ? (
      <div className={cx(styles.GroceriesCatalogSelectedItems, className)}>
        <div className={styles.Title}>{t("selectedGroceries")}</div>
        <div className={styles.Items}>
          {
            selectedGroceries.map((selectedGrocery) => {
              const {grocery, quantity} = selectedGrocery;
              return (
                <div className={styles.Item} key={grocery.id}>
                  <img className={styles.ItemIcon} src={grocery.iconURI} alt={grocery.name[language]}/>
                  <QuantityInput
                    standardQuantity={grocery.standardQuantity}
                    unitType={grocery.unitType}
                    currentQuantity={quantity}
                    changeQuantity={(value) => changeGroceryQuantity(grocery, value)}
                    language={language}
                  />
                  <div
                    className={styles.RemoveGroceryButton}
                    onClick={() => removeGroceryFromSelectedGroceries(grocery.id)}
                  >
                    <CrossIcon/>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    ) : null
  );
}

export default GroceriesCatalogSelectedItems;
