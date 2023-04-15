import React, { useState, useEffect } from 'react';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "40px",
    "margin-left": "80px",
    "margin-top": "30px",
    "font-weight": "bold",
    "font-size": "30px",
    fontFamily: "Sans-Serif"
  };
  
  async function fetchPokemonDetails(url) {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedPokemon({
        height: data.height,
        weight: data.weight,
        stats: data.stats,
        abilities: data.abilities
      });
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setSelectedPokemon(null);
      setError('Failed to fetch Pokemon details.');
    }
  }
  
  async function fetchPokemonData(startIndex) {
    setIsLoading(true);
    try {
      const limit = 20;
      const offset = startIndex;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      setPokemonData(data.results);
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setIsLoading(false);
      setPokemonData([]);
      setError('Failed to fetch Pokemon.');
    }
  }
  
  const handlePrevClick = () => {
    const prevStartIndex = Math.max(0, startIndex - 20);
    console.log(prevStartIndex)
    fetchPokemonData(prevStartIndex);
  };
  
  const handleNextClick = () => {
    const nextStartIndex = startIndex + 20;
    console.log(nextStartIndex)
    fetchPokemonData(nextStartIndex);
  };
  

  useEffect(() => {
    fetchPokemonData(startIndex);
  }, []);
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
           <button onClick={handlePrevClick}>{"<"}</button>
           <button onClick={handleNextClick}>{">"}</button>
          <table style={{ display: "inline-block", textAlign: "center" }}>
            <tbody>
              {pokemonData.reduce((rows, key, index) => (index % 4 === 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, [])
                .map((row, index) => (
                  <tr key={index}>
                    {row.map((pokemon) => (
                      <td key={pokemon.name}>
                        <button style={myStyle} onClick={() => fetchPokemonDetails(pokemon.url)}>{pokemon.name}</button>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
          {selectedPokemon && (
           <table style={{ position: 'absolute', top: "80px",right:"50px", borderCollapse: "collapse" }}>
           <thead>
             <tr>
               <th style={{border: "1px solid black", padding: "5px"}}>Height</th>
               <th style={{border: "1px solid black", padding: "5px"}}>Weight</th>
               <th style={{border: "1px solid black", padding: "5px"}}>Stats</th>
               <th style={{border: "1px solid black", padding: "5px"}}>Abilities</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td style={{border: "1px solid black", padding: "5px"}}>{selectedPokemon.height}</td>
               <td style={{border: "1px solid black", padding: "5px"}}>{selectedPokemon.weight}</td>
               <td style={{border: "1px solid black", padding: "5px"}}>
                 <ul>
                   {selectedPokemon.stats.map((stat) => (
                     <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                   ))}
                 </ul>
               </td>
               <td style={{border: "1px solid black", padding: "5px"}}>
                 <ul>
                   {selectedPokemon.abilities.map((ability) => (
                     <li key={ability.ability.name}>{ability.ability.name}: {ability.base_ability}</li>
                   ))}
                 </ul>
               </td>
             </tr>
           </tbody>
         </table>
         
          )}
        </div>
      )}
    </div>
  );
}

export default App
