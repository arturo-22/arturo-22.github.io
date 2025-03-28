import { useState, useEffect } from "react";
import { IPokemon } from "../Interfaces/IPokemon";

interface PokemonSelectProps {
  onSelectPokemon: (
    pokemon: { id: number; name: string; img: string } | null
  ) => void;
  initialPokemon?: { id: number; name: string; img: string };
}

const PokemonSelect = ({
  onSelectPokemon,
  initialPokemon,
}: PokemonSelectProps) => {
  
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemon | null>(null);

  const fetchPokemons = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      const data = await response.json();
      const pokemonList = data.results;

      const pokemones = await Promise.all(
        pokemonList.map(async (item: any) => {
          const response = await fetch(item.url);
          const pokemon = await response.json();

          return {
            id: pokemon.id,
            name: pokemon.name,
            img: pokemon.sprites.other.dream_world.front_default,
          };
        })
      );

      setPokemons(pokemones);

      if (initialPokemon) {
        const matchedPokemon = pokemones.find((p) => p.id === initialPokemon.id);
        if (matchedPokemon) {
          setSelectedPokemon(matchedPokemon);
          onSelectPokemon(matchedPokemon);
        }
      }
    } catch (err) {
      console.error("Error fetching pokemons:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const pokemon = pokemons.find((p) => p.name === selectedName) || null;
    setSelectedPokemon(pokemon);
    onSelectPokemon(pokemon);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    if (initialPokemon) {
      const matchedPokemon = pokemons.find((p) => p.id === initialPokemon.id);
      if (matchedPokemon) {
        setSelectedPokemon(matchedPokemon);
      }
    }
  }, [initialPokemon, pokemons]);

  return (
    <div className="mb-3">
      <label className="form-label">Pokémon Favorito</label>
      <select
        onChange={handleChange}
        className="form-select"
        value={selectedPokemon?.name || ""}
        required
      >
        <option value="" disabled>
          Selecciona un Pokémon
        </option>
        {pokemons.map((pokemon) => (
          <option key={pokemon.id} value={pokemon.name}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </option>
        ))}
      </select>

      {selectedPokemon && (
        <div className="mt-4 mb-4 text-center">
          <img
            src={selectedPokemon.img}
            alt={selectedPokemon.name}
            className="img-fluid"
          />
        </div>
      )}
    </div>
  );
};

export default PokemonSelect;
