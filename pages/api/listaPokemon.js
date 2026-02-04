// API Route que retorna lista dos primeiros 493 Pokémon
export default async function handler(req, res) {
  // Configuração CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET') {
    try {
      // Busca lista de 493 Pokémon da PokeAPI
      // limit=493 → retorna os primeiros 493
      // offset=0 → começa do primeiro
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=493&offset=0');
      
      if (!response.ok) {
        throw new Error('Erro ao buscar lista de Pokémon');
      }

      const data = await response.json();
      
      // Extrair apenas os nomes e adicionar IDs
      const pokemonList = data.results.map((pokemon, index) => ({
        id: index + 1,  // ID começa em 1
        name: pokemon.name,
        // Capitalizar primeira letra (bulbasaur → Bulbasaur)
        displayName: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      }));

      res.status(200).json({ pokemons: pokemonList });
      
    } catch (error) {
      console.error('Erro ao buscar lista:', error);
      res.status(500).json({ error: 'Erro ao buscar lista de Pokémon' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
