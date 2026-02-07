// Recebe a tentativa do usuário e compara com o pokémon secreto
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    // Pega os dados enviados
    const { pokemonTentado, pokemonSecreto } = req.body;

    // Busca os dados do pokémon tentado da PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonTentado}`);
    const dadosTentativa = await response.json();

    // Função para determinar a geração pelo ID
    function getGeracao(id) {
      if (id >= 1 && id <= 151) return 1;    // Geração 1: Kanto (151 pokémons)
      if (id >= 152 && id <= 251) return 2;  // Geração 2: Johto (100 pokémons)
      if (id >= 252 && id <= 386) return 3;  // Geração 3: Hoenn (135 pokémons)
      if (id >= 387 && id <= 493) return 4;  // Geração 4: Sinnoh (107 pokémons)
      return null;
    }

    // Compara os dados
    const comparacao = {
        nomeCorreto: dadosTentativa.name === pokemonSecreto.name,
        geracaoCorreta: getGeracao(dadosTentativa.id) === getGeracao(pokemonSecreto.id),
        tipo1Correto: dadosTentativa.types[0].type.name === pokemonSecreto.types[0].type.name,
        tipo2Correto: (dadosTentativa.types[1]?.type.name || null) === (pokemonSecreto.types[1]?.type.name || null),
        pesoCorreto: dadosTentativa.weight === pokemonSecreto.weight ? true : dadosTentativa.weight < pokemonSecreto.weight ? "menor" : "maior"
    };

    res.status(200).json({ comparacao, dadosTentativa });

  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
