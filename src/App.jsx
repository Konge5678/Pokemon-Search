import React, { useState } from 'react';

function PokemonSearch() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      .then(response => response.json())
      .then(data => setPokemon(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    
    <div className="p-6 mt-4 max-w-sm mx-auto bg-gray-600 rounded-xl shadow-md flex flex-col items-center space-y-10">
      <h1 className='text-3xl text-slate-100'>POKE-SEARCH</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input className='bg-gray-400 p-2 rounded-lg  ' type="text" value={search} onChange={handleChange} placeholder="Enter Pokemon name" />
        <button className='text-blue-400 bg-black p-2 rounded-lg' type="submit">Search</button>
      </form>
      {pokemon && (
        <div className='text-slate-100 flex flex-row justify-center items-center space-x-4'>
          <div>
            <h2>Name: {pokemon.name}</h2>
            <p>Weight: {pokemon.weight}</p>
            <p>Type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <p>Moves: {pokemon.moves[0].move.name}</p>
          </div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
    </div>
  );
}

export default PokemonSearch;