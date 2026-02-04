export default function handler(req, res) {
  // Permite requisições de qualquer origem (como o CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const apiKey = 'https://pokeapi.co/api/v2/pokemon/';

      async function getRandomPokemonData(pokemonNumber) {
    try {
        const response = await fetch(`${apiKey}${pokemonNumber}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        throw error;
    }
    
  }

  // Responde apenas para GET requests
  if (req.method === 'GET') {
      const randomPokemonNumber = Math.floor(Math.random() * 493) + 1; 
  getRandomPokemonData(randomPokemonNumber)
    .then(pokemonData => {
      res.status(200).json(pokemonData);
    })
    .catch(error => {
      res.status(500).json({ error: 'Erro ao buscar dados do Pokémon' });
    });
} 
    else {
      res.status(405).json({ error: 'Método não permitido' });
    }
}




