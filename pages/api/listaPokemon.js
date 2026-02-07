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
      
      // Buscar detalhes de cada pokemon para pegar o tipo
      const pokemonList = await Promise.all(
        data.results.map(async (pokemon, index) => {
          let type = null;
          try {
            const detailResponse = await fetch(pokemon.url);
            if (detailResponse.ok) {
              const detailData = await detailResponse.json();
              if (detailData.types && detailData.types.length > 0) {
                type = detailData.types[0].type.name;
              }
            }
          } catch (e) {
            // fallback para normal se der erro
          }
          return {
            id: index + 1,
            name: pokemon.name,
            imagem: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
            displayName: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            type
          };
        })
      );

      res.status(200).json({ pokemons: pokemonList });
      
    } catch (error) {
      console.error('Erro ao buscar lista:', error);
      res.status(500).json({ error: 'Erro ao buscar lista de Pokémon' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
