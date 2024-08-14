import { z } from "zod";
import {
  DrinkSchema,
  DrinksSchema,
  FilterSchema,
  RecipeAPIResponseSchema,
  recipesSchema,
} from "../schemas/recipes-schema";

export type Categories = z.infer<typeof recipesSchema>;
export type Filter = z.infer<typeof FilterSchema>;
export type Drinks = z.infer<typeof DrinksSchema>;
export type Drink = z.infer<typeof DrinkSchema>;
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>;
