import React, {RefObject, useEffect, useState} from "react";
import styles from './GroceriesCatalogItems.module.scss';
import {useAppDispatch, useAppSelector} from "store/hooks";
import {groceriesCatalogSelectors} from "store/groceriesCatalog/groceriesCatalogSelectors";
import {getCategoriesThunk, getGroceriesThunk} from "store/groceriesCatalog/groceriesCatalogThunks";
import {ICategory, ITranslatable} from "store/types";
import {useTranslation} from "react-i18next";
import cx from "classnames";
import {capitalizeFirstLetter} from "utils/stringHelpers";

function GroceriesCatalogItems() {
  const categories = useAppSelector(groceriesCatalogSelectors.categoriesSelector);
  const groupedByCategoriesGroceries = useAppSelector(groceriesCatalogSelectors.groupedByCategoriesGroceriesSelector);
  const dispatch = useAppDispatch();

  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id);

  const {t, i18n} = useTranslation();
  const language = i18n.language as keyof ITranslatable;

  const refs = categories.reduce((acc: { [key: ICategory['id']]: RefObject<HTMLDivElement> }, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getGroceriesThunk());
  }, [dispatch])

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

  return (
    <div className={styles.CategoryGroceryWrapper}>
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
                      category.groceries.map((grocery, ii) => (
                        <div className={styles.GroceryItem} key={ii}>
                          <div className={styles.CategoryIconNameWrapper}>
                            <img className={styles.GroceryItemIcon} src={grocery.iconURI} alt={grocery.name[language]}/>
                            <div>{capitalizeFirstLetter(grocery.name[language].trim())}</div>
                          </div>
                        </div>
                      ))
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
