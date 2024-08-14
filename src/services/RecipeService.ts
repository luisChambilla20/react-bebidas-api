import axios from "axios";
import {
  DrinksSchema,
  RecipeAPIResponseSchema,
  recipesSchema,
} from "../schemas/recipes-schema";
import { Drink, Filter } from "../types";

export const getCategories = async () => {
  const { data } = await axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
  );

  const result = recipesSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }
};

export const getRecipes = async (filter: Filter) => {
  const { ingredients, category } = filter;

  const { data } = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}&c=${category}`
  );

  const result = DrinksSchema.safeParse(data);

  if (result.success) {
    return result.data;
  }
};

export const getRecipeById = async (id: Drink["idDrink"]) => {
  const { data } = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]);

  if (result.success) {
    return result.data;
  }
};
