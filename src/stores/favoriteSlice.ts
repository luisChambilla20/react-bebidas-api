import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { RecipeSliceType, createRecipeSlice } from "./recipeSlice";
import {
  NotificationSliceType,
  createNotificationSlice,
} from "./notificationSlice";

export type FavoriteSliceType = {
  favorites: Recipe[];
  handleFvoriteAdd: (recipe: Recipe) => void;
  favoriteExist: (id: Recipe["idDrink"]) => boolean;
  loadFromLocalStorage: () => void;
};

export const createFavoriteSlice: StateCreator<
  FavoriteSliceType & RecipeSliceType & NotificationSliceType,
  [],
  [],
  FavoriteSliceType
> = (set, get, api) => ({
  favorites: [],

  handleFvoriteAdd: (recipe) => {
    if (get().favoriteExist(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));

      createNotificationSlice(set, get, api).showNotification({
        error: false,
        text: "Receta eliminada de favoritos",
      });
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));

      createNotificationSlice(set, get, api).showNotification({
        error: false,
        text: "Receta añadida a favoritos",
      });
    }

    createRecipeSlice(set, get, api).closeModal();

    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },

  favoriteExist: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },

  loadFromLocalStorage: () => {
    const favorites = localStorage.getItem("favorites");

    if (favorites) {
      set({ favorites: JSON.parse(favorites) });
    }
  },
});
