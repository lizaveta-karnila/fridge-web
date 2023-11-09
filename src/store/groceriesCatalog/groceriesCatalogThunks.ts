import {createAsyncThunk} from "@reduxjs/toolkit";
import {collection, query, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import {ICategory, IGroceryWithCategory} from "store/types";
import {mapFirestoreDocuments} from "../../firebase/utils/mapFirestoreDocuments";

export const getGroceriesThunk = createAsyncThunk<IGroceryWithCategory[]>(
  'groceriesCatalog/getGroceries',
  async () => {
    const querySnapshot = await getDocs(query(collection(db, "groceries")));
    return mapFirestoreDocuments<IGroceryWithCategory>(querySnapshot.docs);
  }
);

export const getCategoriesThunk = createAsyncThunk<ICategory[]>(
  'groceriesCatalog/getCategories',
  async () => {
    const querySnapshot = await getDocs(query(collection(db, "categories")));
    return mapFirestoreDocuments<ICategory>(querySnapshot.docs);
  }
);
