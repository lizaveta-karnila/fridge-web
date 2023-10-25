import {createSelector} from "@reduxjs/toolkit";
import {mainSelector} from "store/selector";

export const userReducerSelector = createSelector(
  mainSelector,
  param => param.user
);

export const userSelector = createSelector(
  userReducerSelector,
  param => param.user
);
