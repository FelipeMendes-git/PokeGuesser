import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <nav style={{
        backgroundColor: '#ffffff',
        padding: '1rem 2rem',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginRight: 'auto',
        }}>
          <img 
            src="/imagens/pokeball-pokemon-svgrepo-com.svg" 
            alt="PokeGuesser" 
            style={{ height: '30px' }} 
          />
          <span style={{
            fontWeight: 'bold',
            fontSize: '1.3rem',
            fontFamily: 'Arial, sans-serif',
          }}>
            PokeGuesser
          </span>
        </div>

        <Link href="/" style={{ 
          textDecoration: 'none', 
          fontWeight: 'bold',
          fontSize: '1.1rem',
          fontFamily: 'Arial, sans-serif',
          transition: 'opacity 0.2s',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
        }}>
           <img src="/imagens/pikachu.png" style={{ height: '20px', marginRight: '0.5rem' }} />
           PokeGuesser
        </Link>

        <Link href="/pokedex" style={{ 
          textDecoration: 'none', 
          fontWeight: 'bold',
          fontSize: '1.1rem',
          fontFamily: 'Arial, sans-serif',
          transition: 'opacity 0.2s',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
        }}>
        <img src="/imagens/smartphone.png" style={{ height: '20px', marginRight: '0.5rem' }} />
          Pokédex
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
