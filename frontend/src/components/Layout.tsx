import { Outlet, NavLink } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      {/* NavBar fixe en haut, pleine largeur */}
      <nav style={{
        position: 'fixed',           // ← Fixe en haut
        top: 0,                      // ← Collé en haut
        left: 0,                     // ← Collé à gauche
        right: 0,                    // ← Collé à droite
        width: '100%',               // ← Pleine largeur
        padding: '20px',
        backgroundColor: '#2c3e50',
        color: 'white',
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // ← Ombre pour effet
        zIndex: 1000                 // ← Au-dessus de tout
      }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            color: 'white',
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal',
            padding: '5px 10px',
            borderBottom: isActive ? '2px solid white' : 'none'
          })}
        >
          Home
        </NavLink>
        
        <NavLink 
          to="/expenses"
          style={({ isActive }) => ({
            color: 'white',
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal',
            padding: '5px 10px',
            borderBottom: isActive ? '2px solid white' : 'none'
          })}
        >
          Expenses
        </NavLink>
        
        <NavLink 
          to="/messages"
          style={({ isActive }) => ({
            color: 'white',
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal',
            padding: '5px 10px',
            borderBottom: isActive ? '2px solid white' : 'none'
          })}
        >
          Messages
        </NavLink>
      </nav>

      {/* Contenu avec margin-top pour éviter que la NavBar le cache */}
      <main style={{ 
        marginTop: '80px',          // ← Espace pour la NavBar fixe
        padding: '20px', 
        maxWidth: '1280px', 
        margin: '80px auto 0 auto'  // ← margin-top + centré
      }}>
        <Outlet />
      </main>
    </div>
  );
}