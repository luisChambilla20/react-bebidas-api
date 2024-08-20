import { create } from "zustand";
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice";
import { createFavoriteSlice, FavoriteSliceType } from "./favoriteSlice";
import { devtools } from "zustand/middleware";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

export const useAppStore = create<
  RecipeSliceType & FavoriteSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
  }))
);
