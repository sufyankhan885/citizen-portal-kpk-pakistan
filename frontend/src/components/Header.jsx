import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const isLoggedIn = auth && auth.user
  const logout = auth?.logout

  const handleLogout = () => {
    if (logout) logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.container}>
          <Link to="/" style={styles.logo}>
            <span style={styles.logoIcon}>🇵🇰</span>
            <span style={styles.logoText}>Citizen Portal</span>
          </Link>
          <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
          <div style={styles.navLinks} className="hdr-nav-links" data-open={menuOpen}>
            <Link to="/" style={styles.link} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/track-complaint" style={styles.link} onClick={() => setMenuOpen(false)}>
              Track Complaint
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" style={styles.link} onClick={() => setMenuOpen(false)}>
                  My Dashboard
                </Link>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.link} onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" style={{ ...styles.link, ...styles.registerBtn }}
                  onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <style>{`
        @media (max-width: 768px) {
          .hdr-nav-links[data-open="false"] {
            display: none !important;
          }
          .hdr-nav-links[data-open="true"] {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background: #1a5276;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
          }
        }
      `}</style>
    </>
  )
}

const styles = {
  nav: {
    background: '#1a5276',
    padding: '0 20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    position: 'relative',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    color: '#fff',
  },
  logoIcon: {
    fontSize: 28,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  hamburger: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: 24,
    cursor: 'pointer',
    padding: 4,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: 15,
    fontWeight: 500,
    padding: '8px 14px',
    borderRadius: 4,
    transition: 'background 0.2s',
  },
  registerBtn: {
    border: '1px solid #fff',
  },
  logoutBtn: {
    background: 'transparent',
    color: '#fff',
    border: '1px solid #e74c3c',
    borderRadius: 4,
    padding: '8px 14px',
    fontSize: 15,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
}

export default Header
