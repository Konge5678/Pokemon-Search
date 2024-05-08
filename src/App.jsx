import React, { useState } from 'react';

function PokemonSearch() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        return response.json();
      })
      .then(data => {
        setPokemon(data);
        setError(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(true);
      });
  };
  return (
    
    <div className="p-6 mt-4 max-w-sm mx-auto bg-gray-600 rounded-xl shadow-md flex flex-col items-center space-y-8 text-left">
    <h1 className='text-3xl text-yellow-400 font-Pokemon style [text-shadow:_0_5px_0_rgb(0_0_0_/_80%)] '>POKE-SEARCH</h1>
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input className='bg-gray-400 p-2 rounded-lg' type="text" value={search} onChange={handleChange} placeholder="Enter Pokemon name" />
      {error && <p className="text-red-500">Pokemon could not be found</p>}
      <button className='text-blue-400 bg-black p-2 rounded-lg' type="submit">Search</button>
    </form>
    {pokemon && (
      <div className='text-white flex flex-row justify-center items-center space-x-4'>
        <div className="min-w-max">
          <div className="columns-2">
            <div className="min-w-max">
              <h2 className="min-w-max">Name: {pokemon.name}</h2>
              <p>Weight: {pokemon.weight} lbs</p>
              <p>Type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            </div>
            <div>
              <img className="bg-gray-300 w-24 h-24 object-cover" src={pokemon.sprites.front_default} alt={pokemon.name} />  
            </div>
          </div>
          <div className='flex flex-col items-start space-y-2 '>
            <h2 className="">Moves: </h2>
            <div className="grid grid-cols-2 gap-4 text-left">
              {pokemon.moves.slice(0, 4).map((move, index) => (
                <p className='bg-black rounded-lg p-2' key={index}>{move.move.name}</p>
              ))}
            </div>  
          </div>
        </div>
      </div>
    )}
</div>
  );
}

export default PokemonSearch;