import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICategory, IGrocery, IGroceryWithCategory, ISelectedGrocery} from "store/types";
import {getCategoriesThunk, getGroceriesThunk} from "./groceriesCatalogThunks";

interface IGroceriesCatalogState {
  isModalOpened: boolean;
  groceries: IGroceryWithCategory[];
  categories: ICategory[];
  selectedGroceries: ISelectedGrocery[];
}

const initialState: IGroceriesCatalogState = {
  isModalOpened: false,
  groceries: [],
  categories: [],
  selectedGroceries: [],
}

export const groceriesCatalogSlice = createSlice({
  name: 'groceriesCatalog',
  initialState,

  reducers: {
    setIsModalOpened(state, action: PayloadAction<boolean>) {
      state.isModalOpened = action.payload;
    },
    // setGroceries(state, action: PayloadAction<IGroceriesCatalogState['groceries']>) {
    //   state.groceries = action.payload;
    // },
    // setCategories(state, action: PayloadAction<IGroceriesCatalogState['categories']>) {
    //   state.categories = action.payload;
    // },
    changeSelectedGroceryQuantity(state, action: PayloadAction<ISelectedGrocery>) {
      const item = state.selectedGroceries.find((i) => i.grocery.id === action.payload.grocery.id);
      if (item) {
        item.quantity = action.payload.quantity;
      } else {
        state.selectedGroceries.push({grocery: action.payload.grocery, quantity: action.payload.quantity});
      }
    },
    removeGroceryFromSelectedGroceries(state, action: PayloadAction<IGrocery["id"]>) {
      state.selectedGroceries = state.selectedGroceries.filter((i) => i.grocery.id !== action.payload);
    },
    resetGroceriesCatalogState() {
      return initialState
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
