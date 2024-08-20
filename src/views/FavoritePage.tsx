import { useMemo } from "react";
import { DrinkCard } from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

const FavoritePage = () => {
  const favorites = useAppStore((state) => state.favorites);
  const hasFavorites = useMemo(() => favorites.length > 0, [favorites]);

  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>

      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4   gap-4 mt-10">
          {favorites.map((favorite) => (
            <DrinkCard key={favorite.idDrink} drink={favorite} />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">
          Aqui se mostrarán los favoritos{" "}
        </p>
      )}
    </>
  );
};

export default FavoritePage;
