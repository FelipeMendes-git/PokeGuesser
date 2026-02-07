import { useState, useEffect } from 'react';

function home() {

    const [listaPokemon, setListaPokemon] = useState([]);

    const [pokemonSelecionado, setPokemonSelecionado] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);

    function selecionarPokemon(pokemon) {
        async function fetchPokemonDetails() {
            const response = await fetch(`/api/buscarDadosPokemon?id=${pokemon.id}`);
            const data = await response.json();
            setPokemonSelecionado(data);
        }
        fetchPokemonDetails();
    }

    const colorBackground = {
        electric: '#F8D030',
        fire: '#F08030',
        grass: '#78C850',
        water: '#6890F0',
        normal: '#A8A878',
        fighting: '#C03028',
        flying: '#A890F0',
        poison: '#A040A0',
        ground: '#E0C068',
        rock: '#B8A038',
        bug: '#A8B820',
        ghost: '#705898',
        steel: '#B8B8D0',
        psychic: '#F85888',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        fairy: '#EE99AC',
    }


    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        return () => {
            document.body.style.margin = '';
            document.body.style.padding = '';
        };
    }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/listaPokemon");
            const data = await response.json();
            setListaPokemon(data.pokemons);
        }
        fetchData();
    }, []);

    console.log(listaPokemon);

    return (
        <>
        <style jsx>{`
            .pokemon-image-container {
                background-color: #fff;
                width: 90%;
                height: 30%;
                border-radius: 8px;
                margin-top: 1rem;
            }
            
            .pokemon-info-container {
                background-color: rgba(255, 255, 255);
                border-radius: 8px;
                padding: 1rem;
                width: 80%;
                min-width: 200px;
                min-height: 400px;
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
                margin-top: 2rem;
                color: #000000;
            }
            
            .info-item {
                font-weight: bold;
                font-size: 0.9rem;
            }
            
            .stats-container {
                border-top: 1px solid rgba(255,255,255,0.3);
                padding-top: 0.8rem;
            }
            
            .stats-title {
                font-weight: bold;
                font-size: 1rem;
                margin-bottom: 0.5rem;
            }
            
            .stats-grid {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;
            }
            
            .stat-item {
                font-size: 0.8rem;
                margin-bottom: 0.2rem;
            }
            
            .pokemon-list-container {
                display: flex;
                flex-wrap: wrap;
                gap: 1.5rem;
                overflow-y: auto;
                flex: 1 1 300px;
                min-height: 200px;
                max-height: calc(100vh - 150px);
                padding: 0.5rem;
                align-content: flex-start;
                justify-content: center;
            }
            
            .pokemon-card-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                border-radius: 8px;
                font-weight: bold;
                font-family: Arial, sans-serif;
                color: #fff;
                padding: 1rem 0;
                flex: 1 1 250px;
                max-width: 350px;
                max-height: calc(100vh - 150px);
                overflow-y: auto;
            }
            
            @media (max-width: 768px) {
                .pokemon-image-container {
                    min-height: 80px;
                    max-height: 150px;
                    height: auto;
                    margin-top: 0.5rem;
                }
                
                .pokemon-info-container {
                    padding: 0.5rem;
                    gap: 0.3rem;
                    margin-top: 1rem;
                    width: 90%;
                }
                
                .info-item {
                    font-size: 0.7rem;
                }
                
                .stats-container {
                    padding-top: 0.3rem;
                }
                
                .stats-title {
                    font-size: 0.8rem;
                    margin-bottom: 0.2rem;
                }
                
                .stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.2rem;
                }
                
                .stat-item {
                    font-size: 0.65rem;
                    margin-bottom: 0;
                }
                
                .pokemon-list-container {
                    gap: 5px;
                }
                
                .pokemon-card-container {
                    flex: 1 1 180px;
                    max-width: 350px;
                    padding: 0.5rem 0;
                    font-size: 14px;
                }
                
                .pokemon-info-container {
                    min-width: unset;
                    min-height: unset;
                }
            }
        `}</style>
        <div style={{
            backgroundImage: 'url("/imagens/ChatGPT Image 4 de fev. de 2026, 19_29_50.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            minHeight: 'calc(100vh - 70px)',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '1rem',
            boxSizing: 'border-box',
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                width: '100%',
                maxWidth: '100rem',
                minHeight: '300px',
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'center',
                borderRadius: 16,
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                flexWrap: 'wrap',
                gap: '1rem',
                padding: '1rem',
                boxSizing: 'border-box',
            }}>

                <div className="pokemon-card-container" style={{
                    backgroundColor: pokemonSelecionado ? colorBackground[pokemonSelecionado.types[0].type.name] : 'rgba(253, 2, 2, 0.6)',
                    fontSize: 'clamp(14px, 3vw, 20px)',
                }}>
                    <div className="pokemon-image-container" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <img
                            src={pokemonSelecionado ? pokemonSelecionado.sprites.front_default : null}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        {pokemonSelecionado ? pokemonSelecionado.name.charAt(0).toUpperCase() + pokemonSelecionado.name.slice(1) : "SELECIONE UM POKEMON"}
                    </div>

                    <div className="pokemon-info-container">
                        {pokemonSelecionado && (
                            <>
                                <div className="info-item">
                                    Número: #{pokemonSelecionado.id}
                                </div>
                                <div className="info-item">
                                    Tipo: {pokemonSelecionado.types.map(t => t.type.name).join(', ')}
                                </div>
                                <div className="info-item">
                                    Altura: {pokemonSelecionado.height / 10}m
                                </div>
                                <div className="info-item">
                                    Peso: {pokemonSelecionado.weight / 10}kg
                                </div>
                                
                                <div className="stats-container">
                                    <div className="stats-title">
                                        Estatísticas:
                                    </div>
                                    <div className="stats-grid">
                                        {pokemonSelecionado.stats.map(stat => (
                                            <div key={stat.stat.name} className="stat-item">
                                                <strong>{stat.stat.name}:</strong> {stat.base_stat}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="stats-container">
                                    <div className="info-item">
                                        Habilidades:
                                    </div>
                                    <div className="stat-item">
                                        {pokemonSelecionado.abilities.map(a => a.ability.name).join(', ')}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>


                </div>

                <div className="pokemon-list-container"
                >
                    {listaPokemon.map(pokemon => (
                        <button
                            key={pokemon.id}
                            onClick={() => selecionarPokemon(pokemon)}
                            onMouseEnter={() => setHoveredId(pokemon.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            style={{
                                display: 'flex',
                                backgroundColor: hoveredId === pokemon.id
                                    ? 'rgba(255, 255, 255, 0.8)'
                                    : colorBackground[pokemon.type] || '#A8A878',
                                borderRadius: 8,
                                flexDirection: 'column',
                                width: 'clamp(6rem, 20vw, 10rem)',
                                alignItems: 'center',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                transform: hoveredId === pokemon.id ? 'scale(1.05)' : 'scale(1)',
                            }}>
                            <img
                                src={pokemon.imagem}
                                alt={pokemon.name} style={{ width: 'clamp(4rem, 15vw, 6rem)' }}
                            />
                            <p style={{
                                textAlign: 'center',
                                width: '100%',
                                fontSize: 'clamp(0.6rem, 2vw, 0.9rem)',
                                margin: '0.3rem 0',
                            }}>{pokemon.id} - {pokemon.displayName}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
        </>


    );
}

export default home;

{/* <div>
    {listaPokemon.map(pokemon => (
        <div key={pokemon.name}>
            <p>{pokemon.name}</p>
        </div>
    ))}
</div> */}