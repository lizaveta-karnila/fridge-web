import {createSelector} from "@reduxjs/toolkit";
import {mainSelector} from "store/selector";
import {ICategory, IGrocery} from "store/types";

export const groceriesCatalogReducerSelector = createSelector(
  mainSelector,
  param => param.groceriesCatalog
);

export const groceriesCatalogSelectors = {
  isModalOpenedSelector: createSelector(
    groceriesCatalogReducerSelector,
    param => param.isModalOpened
  ),
  groupedByCategoriesGroceriesSelector: createSelector(
    groceriesCatalogReducerSelector,
    param => {
      const map = param.groceries.reduce((acc, {category, ...rest}) => {
        const existingCategory = Array.from(acc.keys()).find((i) => i.id === category.id);
        return !existingCategory
          ? acc.set(category, [rest])
          : acc.set(existingCategory, [...(acc.get(existingCategory) || []), rest]);
      }, new Map<ICategory, IGrocery[]>());

      return param.categories.map((category: ICategory) => {
        const existingCategory = Array.from(map.keys()).find((i) => i.id === category.id);
        return {
          ...category,
          groceries: existingCategory ? map.get(existingCategory) as IGrocery[] : [],
        };
      })
    }
  ),
  categoriesSelector: createSelector(
    groceriesCatalogReducerSelector,
    param => param.categories
  ),
  selectedGroceriesSelector: createSelector(
    groceriesCatalogReducerSelector,
    param => param.selectedGroceries
  ),
};
