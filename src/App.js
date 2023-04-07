import React, { useState, useEffect } from 'react';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
  useEffect(() => {
  
    async function fetchPokemonData() {
      setIsLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
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
    fetchPokemonData();
  }, []);
  async function fetchPokemonData2() {
   setIsLoading(true);
   try {
     const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');
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
 async function getDetail(pokemonName) { 
   setIsLoading(true);
   try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      setPokemonData(data);
      setIsLoading(false);
      setError(null);
   } catch(err) {
      setIsLoading(false);
      setPokemonData([]);
      setError('Failed to fetch Pokemon details.');
   }
}

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
      <table style={{display: "inline-block", textAlign: "center"}} >
         
            <tbody>
               {pokemonData.reduce((rows, key, index) => (index % 4 === 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, [])
               .map((row, index) => (
                  <tr key={index}>
                  {row.map((pokemon) => (
                     <td key={pokemon.name}><button style={myStyle} onClick={() => getDetail(pokemon.name)}>{pokemon.name}</button>
                     </td>
                  ))}
                  </tr>
               ))}
            </tbody>
           
      </table>
      
      )}
      <table style={{ float: "right", textAlign: "right" }} >
      <thead>
            <tr>
               <th>Details</th>
            </tr>
      </thead>
           <tbody>
            <tr>
               <td style={{ padding: "50px" }}>{"ability"}</td>
               <td style={{ padding: "50px" }}>{"stats"}</td>
            </tr>
            <tr>
               <td style={{ padding: "50px" }}>{"height"}</td>
               <td style={{ padding: "50px" }}>{"weight"}</td>
            </tr>
           </tbody>
      </table>
      <button >{"<"}</button>
      <button onClick={fetchPokemonData2}>{">"}</button>
    </div>
  );
                  }
export default App;
