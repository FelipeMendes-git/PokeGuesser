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
        <div style={{
            backgroundImage: 'url("/imagens/ChatGPT Image 4 de fev. de 2026, 19_29_50.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            minHeight: '95vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: '2rem',
            boxSizing: 'border-box',
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                width: '100%',
                maxWidth: '100rem',
                height: '50rem',
                maxHeight: 'calc(100vh - 140px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 16,
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                flexWrap: 'wrap',
                gap: '3rem',
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    overflowY: 'auto',
                    height: '45rem',
                    padding: '1rem',
                    width: '70%',
                }}
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
                                width: '10rem',
                                alignItems: 'center',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                transform: hoveredId === pokemon.id ? 'scale(1.05)' : 'scale(1)',
                            }}>
                            <img
                                src={pokemon.imagem}
                                alt={pokemon.name} style={{ width: '6rem' }}
                            />
                            <p style={{
                                textAlign: 'center',
                                width: '100%',
                            }}>{pokemon.id} - {pokemon.displayName}</p>
                        </button>
                    ))}
                </div>
                <div style={{
                    backgroundColor: pokemonSelecionado ? colorBackground[pokemonSelecionado.types[0].type.name] : 'rgba(253, 2, 2, 0.6)',
                    width: '20%',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderRadius: 8,
                    fontSize: '20px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif',
                    color: '#fff',
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        width: '90%',
                        height: '30%',
                        borderRadius: 8,
                        marginTop: '1rem',
                    }}>
                        <img
                            src={pokemonSelecionado ? pokemonSelecionado.sprites.front_default : null}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        {pokemonSelecionado ? pokemonSelecionado.name.charAt(0).toUpperCase() + pokemonSelecionado.name.slice(1) : "SELECIONE UM POKEMON"}
                    </div>

                    {pokemonSelecionado && (
                        <div style={{
                            backgroundColor: 'rgba(255, 255, 255)',
                            borderRadius: 8,
                            padding: '1rem',
                            width: '80%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem',
                            marginTop: '2rem',
                            color: '#000000',
                        }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                                Número: #{pokemonSelecionado.id}
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                                Tipo: {pokemonSelecionado.types.map(t => t.type.name).join(', ')}
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                                Altura: {pokemonSelecionado.height / 10}m
                            </div>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                                Peso: {pokemonSelecionado.weight / 10}kg
                            </div>
                            
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '0.8rem' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.5rem' }}>
                                    Estatísticas:
                                </div>
                                {pokemonSelecionado.stats.map(stat => (
                                    <div key={stat.stat.name} style={{ fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                                        <strong>{stat.stat.name}:</strong> {stat.base_stat}
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '0.8rem' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                    Habilidades:
                                </div>
                                <div style={{ fontSize: '0.8rem' }}>
                                    {pokemonSelecionado.abilities.map(a => a.ability.name).join(', ')}
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>


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