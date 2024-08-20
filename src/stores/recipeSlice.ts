import { StateCreator } from "zustand";
import { Categories, Drink, Drinks, Filter, Recipe } from "../types";
import {
  getCategories,
  getRecipeById,
  getRecipes,
} from "../services/RecipeService";
import { FavoriteSliceType } from "./favoriteSlice";

export type RecipeSliceType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (filter: Filter) => Promise<void>;
  searchRecipesById: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipeSlice: StateCreator<
  RecipeSliceType & FavoriteSliceType,
  [],
  [],
  RecipeSliceType
> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  selectedRecipe: {} as Recipe,
  modal: false,

  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },

  searchRecipes: async (filter) => {
    const drinks = await getRecipes(filter);
    set({ drinks });
  },

  searchRecipesById: async (id) => {
    const selectedRecipe = await getRecipeById(id);

    set({
      selectedRecipe,
      modal: true,
    });
  },

  closeModal: () => {
    set({
      modal: false,
      selectedRecipe: {} as Recipe,
    });
  },
});
