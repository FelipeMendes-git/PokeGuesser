import { useState, useEffect } from 'react';

function Home() {

    function getGeracao(id) {
      if (id >= 1 && id <= 151) return 1;    // Geração 1: Kanto (151 pokémons)
      if (id >= 152 && id <= 251) return 2;  // Geração 2: Johto (100 pokémons)
      if (id >= 252 && id <= 386) return 3;  // Geração 3: Hoenn (135 pokémons)
      if (id >= 387 && id <= 493) return 4;  // Geração 4: Sinnoh (107 pokémons)
      return null;
    }

  // Guarda a lista de 493 pokémons
  const [listaPokemon, setListaPokemon] = useState([]);
  
  // Guarda qual pokémon o usuário escolheu no select
  const [pokemonSelecionado, setPokemonSelecionado] = useState('');
  
  // Guarda o texto digitado no input de busca
  const [buscaTexto, setBuscaTexto] = useState('');
  
  // Controla se mostra a lista de sugestões
  const [mostrarLista, setMostrarLista] = useState(false);
  
  // Guarda os dados do pokémon secreto
  const [pokemonSecreto, setPokemonSecreto] = useState(null);

  // Guarda o histórico de tentativas
  const [tentativas, setTentativas] = useState([]);
  
  // Controla se o jogador acertou
  const [acertou, setAcertou] = useState(false);

  // Filtra pokémons baseado no texto digitado
  const pokemonsFiltrados = listaPokemon.filter(pokemon => 
    pokemon.displayName.toLowerCase().includes(buscaTexto.toLowerCase())
  );

  // Remove margens do body quando componente monta
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Executa 1 vez quando a página carrega
  useEffect(() => {
    carregarLista();
  }, []);

  // Busca os 493 pokémons da API
  async function carregarLista() {
    const response = await fetch("/api/listaPokemon");
    const data = await response.json();
    setListaPokemon(data.pokemons); // Guarda no estado
    // Gera pokémon automaticamente após carregar a lista
    if (data.pokemons.length > 0) {
      gerarPokemonAleatorio();
    }
  }

  // Gera um pokémon aleatório
  async function gerarPokemonAleatorio() {
    const response = await fetch("/api/geraPokemonAleatorio");
    const data = await response.json();
    setPokemonSecreto(data); // Guarda no estado
    setTentativas([]); // Limpa as tentativas anteriores
    setPokemonSelecionado(''); // Limpa a seleção
    setBuscaTexto(''); // Limpa o texto de busca
    setAcertou(false); // Reseta o estado de acerto
  }

  // Envia a tentativa para o backend
  async function enviarTentativa() {
    const response = await fetch("/api/verificaTentativa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        pokemonTentado: pokemonSelecionado,
        pokemonSecreto: pokemonSecreto // Envia dados do secreto
      })
    });
    const resultado = await response.json();
    const dadosTentativa = resultado.dadosTentativa;
    
    // Adiciona a tentativa ao histórico (no início)
    setTentativas([resultado, ...tentativas]);
    
    if (resultado.comparacao.nomeCorreto) {
      setAcertou(true);
      alert("Parabéns! Você acertou o pokémon secreto!");
    }
  }

  return (
    <div style={{ 
      backgroundImage: 'url("/imagens/ChatGPT Image 4 de fev. de 2026, 19_29_50.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      width: '100%',
      position: 'relative'
    }}>
      <div style={{
        padding: '20px', 
        fontFamily: 'Arial, sans-serif', 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ 
          color: '#333', 
          backgroundColor: 'rgba(255, 255, 255, 0.9)', 
          display: 'inline-block', 
          padding: '10px 20px', 
          borderRadius: '10px',
          margin: '0'
        }}> 
          <img 
            src="/imagens/pokeball-pokemon-svgrepo-com.svg" 
            alt="Pokemon Guesser" 
            style={{ height: '30px', verticalAlign: 'middle', marginRight: '10px' }} 
          /> 
          PokeGuesser
        </h1>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        {acertou && (
          <>
            <button 
              onClick={gerarPokemonAleatorio}
              style={{
                padding: '15px 30px',
                fontSize: '16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              🎉 Tentar Novamente
            </button>
            <span style={{ color: 'gold', fontWeight: 'bold', fontSize: '20px' }}>🏆 Você acertou!</span>
          </>
        )}
      </div>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px',
        position: 'relative'
      }}>
        <input 
          type="text"
          value={buscaTexto}
          onChange={(e) => {
            setBuscaTexto(e.target.value);
            setMostrarLista(true);
          }}
          onFocus={() => setMostrarLista(true)}
          placeholder="Digite o nome do Pokémon..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '2px solid #ddd',
            marginBottom: '10px',
            boxSizing: 'border-box'
          }}
        />
        
        {mostrarLista && buscaTexto && pokemonsFiltrados.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '20px',
            right: '20px',
            backgroundColor: 'white',
            border: '2px solid #ddd',
            borderRadius: '5px',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            {pokemonsFiltrados.slice(0, 10).map((pokemon) => (
              <div
                key={pokemon.id}
                onClick={() => {
                  setPokemonSelecionado(pokemon.name);
                  setBuscaTexto(pokemon.displayName);
                  setMostrarLista(false);
                }}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  backgroundColor: 'white',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                #{pokemon.id} - {pokemon.displayName}
              </div>
            ))}
          </div>
        )}
        
        {pokemonSelecionado && (
          <p style={{ margin: '10px 0', color: '#555' }}>
            Selecionado: <strong>{buscaTexto}</strong>
          </p>
        )}

        <button 
          onClick={enviarTentativa}
          disabled={!pokemonSelecionado || !pokemonSecreto}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            backgroundColor: pokemonSelecionado && pokemonSecreto ? '#2196F3' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: pokemonSelecionado && pokemonSecreto ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          ✅ Enviar Tentativa
        </button>
      </div>

      {tentativas.length > 0 && (
        <>
          
          {tentativas.map((tentativa, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ marginTop: 0, color: '#555' }}>
                {tentativa.dadosTentativa.name.toUpperCase()}
              </h3>
              
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                flexWrap: 'wrap',
                marginTop: '15px'
              }}>

                {/*imagem*/}
                <div style={{
                  flex: '1',
                  minWidth: '150px',
                    backgroundColor: '#eee',
                    padding: '15px',
                    borderRadius: '8px',
                    textAlign: 'center'
                }}>
                    <div>
                        <img 
                            src={tentativa.dadosTentativa.sprites.front_default} 
                            alt={tentativa.dadosTentativa.name}
                        />
                    </div>
                </div>

                {/* Nome */}
                <div style={{
                  flex: '1',
                  minWidth: '150px',
                  backgroundColor: tentativa.comparacao.nomeCorreto ? '#4CAF50' : '#f44336',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <strong>Nome</strong>
                  <div style={{ fontSize: '18px', marginTop: '5px' }}>
                    {tentativa.dadosTentativa.name}
                  </div>
                </div>

                {/* Geração */}
                <div style={{
                  flex: '1',
                  minWidth: '150px',
                  backgroundColor: tentativa.comparacao.geracaoCorreta ? '#4CAF50' : '#f44336',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <strong>Geração</strong>
                  <div style={{ fontSize: '18px', marginTop: '5px' }}>
                    {getGeracao(tentativa.dadosTentativa.id)}
                  </div>
                </div>

                {/* Tipo 1 */}
                <div style={{
                  flex: '1',
                  minWidth: '150px',
                  backgroundColor: tentativa.comparacao.tipo1Correto ? '#4CAF50' : '#f44336',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <strong>Tipo 1</strong>
                  <div style={{ fontSize: '18px', marginTop: '5px' }}>
                    {tentativa.dadosTentativa.types[0].type.name}
                  </div>
                </div>

                {/* Tipo 2 */}
                <div style={{
                  flex: '1',
                  minWidth: '150px',
                  backgroundColor: tentativa.comparacao.tipo2Correto ? '#4CAF50' : '#f44336',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <strong>Tipo 2</strong>
                  <div style={{ fontSize: '18px', marginTop: '5px' }}>
                    {tentativa.dadosTentativa.types[1]?.type.name || '—'}
                  </div>
                </div>

                {/* Peso */}
                <div style={{
                  flex: '1',
                  minWidth: '150px',
                  backgroundColor: tentativa.comparacao.pesoCorreto === true ? '#4CAF50' : '#f44336',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <strong>Peso</strong>
                  <div style={{ fontSize: '18px', marginTop: '5px' }}>
                    {tentativa.dadosTentativa.weight}
                    {tentativa.comparacao.pesoCorreto === 'menor' && ' ⬇️'}
                    {tentativa.comparacao.pesoCorreto === 'maior' && ' ⬆️'}
                  </div>
                  {tentativa.comparacao.pesoCorreto === 'menor' && (
                    <small>(muito leve)</small>
                  )}
                  {tentativa.comparacao.pesoCorreto === 'maior' && (
                    <small>(muito pesado)</small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      </div>
    </div>
  );
}


export default Home;