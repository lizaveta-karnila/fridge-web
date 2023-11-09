import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICategory, IGroceryWithCategory} from "store/types";
import {getCategoriesThunk, getGroceriesThunk} from "./groceriesCatalogThunks";

interface IGroceriesCatalogState {
  groceries: IGroceryWithCategory[];
  categories: ICategory[];
}

const initialState: IGroceriesCatalogState = {
  groceries: [],
  categories: [],
}

export const groceriesCatalogSlice = createSlice({
  name: 'groceriesCatalog',
  initialState,

  reducers: {
    // setGroceries(state, action: PayloadAction<IGroceriesCatalogState['groceries']>) {
    //   state.groceries = action.payload;
    // },
    setCategories(state, action: PayloadAction<IGroceriesCatalogState['categories']>) {
      state.categories = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getGroceriesThunk.fulfilled, (state: IGroceriesCatalogState, {payload}) => {
      state.groceries = payload;
    })

    builder.addCase(getCategoriesThunk.fulfilled, (state: IGroceriesCatalogState, {payload}) => {
      state.categories = payload;
    })
  },
})

export const groceriesCatalogActions = groceriesCatalogSlice.actions;

export default groceriesCatalogSlice.reducer;
