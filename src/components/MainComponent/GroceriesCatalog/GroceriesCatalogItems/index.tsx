import React, {RefObject, useState} from "react";
import styles from './GroceriesCatalogItems.module.scss';
import {useAppDispatch, useAppSelector} from "store/hooks";
import {groceriesCatalogSelectors} from "store/groceriesCatalog/groceriesCatalogSelectors";
import {ICategory, IGrocery, ITranslatable} from "store/types";
import {useTranslation} from "react-i18next";
import cx from "classnames";
import {capitalizeFirstLetter} from "utils/stringHelpers";
import {groceriesCatalogActions} from "store/groceriesCatalog/groceriesCatalogSlice";

interface IProps {
  className: string,
}

function GroceriesCatalogItems({className}: IProps) {
  const categories = useAppSelector(groceriesCatalogSelectors.categoriesSelector);
  const groupedByCategoriesGroceries = useAppSelector(groceriesCatalogSelectors.groupedByCategoriesGroceriesSelector);
  const selectedGroceries = useAppSelector(groceriesCatalogSelectors.selectedGroceriesSelector);
  const dispatch = useAppDispatch();

  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id);

  const {t, i18n} = useTranslation();
  const language = i18n.language as keyof ITranslatable;

  const refs = categories.reduce((acc: { [key: ICategory['id']]: RefObject<HTMLDivElement> }, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  const scrollToCategoryRef = (categoryId: ICategory['id']) => {
    refs[categoryId].current!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  const handleCategorySelect = (categoryId: ICategory['id']) => {
    setSelectedCategoryId(categoryId);
    scrollToCategoryRef(categoryId);
  }

  const addGroceryToSelectedGroceries = (grocery: IGrocery) => {
    dispatch(groceriesCatalogActions.changeSelectedGroceryQuantity({
      grocery: grocery,
      quantity: grocery.standardQuantity
    }))
  };

  return (
    <div className={cx(styles.CategoryGroceryWrapper, className)}>
      {
        categories.length && (
          <div className={styles.CategoriesList}>
            {
              categories.map((category, i) => {
                const isSelected = category.id === selectedCategoryId;
                return (
                  <div
                    className={cx(styles.CategoryItem, {[styles.CategoryItemSelected]: isSelected})}
                    key={i}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <img className={styles.CategoryItemIcon} src={category.iconURI} alt={category.name[language]}/>
                    <div>{capitalizeFirstLetter(category.name[language].trim())}</div>
                  </div>
                );
              })
            }
          </div>
        )
      }
      {
        groupedByCategoriesGroceries.length && (
          <div className={styles.GroceriesBlock}>
            {
              groupedByCategoriesGroceries.map((category, i) => (
                <div key={i} className={styles.Category} ref={refs[category.id]}>
                  <div className={styles.CategoryName}>{capitalizeFirstLetter(category.name[language].trim())}</div>
                  <div className={styles.GroceriesList}>
                    {!category.groceries.length && (
                      <div className={styles.NoGroceriesInCategory}>{t("noGroceriesInCategory")}</div>
                    )}
                    {
                      category.groceries.map((grocery, ii) => {
                        const isGrocerySelected = selectedGroceries.find((sg) => sg.grocery.id === grocery.id);
                        return (
                          <div className={styles.GroceryItem} key={ii}>
                            <div className={styles.CategoryIconNameWrapper}>
                              <img className={styles.GroceryItemIcon} src={grocery.iconURI} alt={grocery.name[language]}/>
                              <div>{capitalizeFirstLetter(grocery.name[language].trim())}</div>
                            </div>
                            {
                              !isGrocerySelected && (
                                <button
                                  className={styles.SelectGroceryButton}
                                  onClick={() => addGroceryToSelectedGroceries(grocery)}
                                >
                                  +
                                </button>
                              )
                            }
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  );
}

export default GroceriesCatalogItems;
