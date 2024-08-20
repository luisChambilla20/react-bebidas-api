import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { Filter } from "../types";

export const Header = () => {
  const [searchFilter, setSearchFilter] = useState<Filter>({
    ingredients: "",
    category: "",
  });

  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);
  const showNotification = useAppStore((state) => state.showNotification);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searchFilter).some((value) => value === "")) {
      showNotification({
        error: true,
        text: "Todos los campos son requeridos",
      });
      return;
    } else {
      setSearchFilter({
        ingredients: "",
        category: "",
      });
      searchRecipes(searchFilter);
    }
  };

  return (
    <header
      className={isHome ? "bg-header bg-cover  bg-center" : "bg-slate-800"}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="Logo" />
          </div>

          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredients"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o Ingrediente
              </label>
              <input
                type="text"
                name="ingredients"
                id="ingredients"
                value={searchFilter.ingredients}
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Ejemplo: Vodka, Tequila, Ron, etc."
                onChange={handleChange}
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o Ingrediente
              </label>
              <select
                name="category"
                id="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                value={searchFilter.category}
                onChange={handleChange}
              >
                <option value="">-- Seleccione --</option>

                {categories.drinks.map((category) => (
                  <option
                    value={category.strCategory}
                    key={category.strCategory}
                  >
                    {" "}
                    {category.strCategory}{" "}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="submit"
              value="Buscar Recetas"
              className=" transition-opacity cursor-pointer bg-orange-700 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
            />
          </form>
        )}
      </div>
    </header>
  );
};
