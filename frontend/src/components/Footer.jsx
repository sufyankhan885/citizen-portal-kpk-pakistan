import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <footer style={styles.footer}>
        <div style={styles.container} className="ftr-container">
          <div style={styles.section}>
            <h3 style={styles.brand}>Pakistan Citizen Portal</h3>
            <p style={styles.desc}>
              A digital platform for citizens to register and track complaints
              with government departments efficiently and transparently.
            </p>
          </div>
          <div style={styles.section}>
            <h3 style={styles.heading}>Quick Links</h3>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/track-complaint" style={styles.link}>Track Complaint</Link>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </div>
          <div style={styles.section}>
            <h3 style={styles.heading}>Contact</h3>
            <p style={styles.text}>Pakistan Citizen Portal</p>
            <p style={styles.text}>Islamabad, Pakistan</p>
            <p style={styles.text}>Email: support@citizenportal.gov.pk</p>
            <p style={styles.text}>Phone: +92-51-111-111-111</p>
          </div>
        </div>
        <div style={styles.bottomBar}>
          <p style={styles.copyright}>&copy; 2024 Pakistan Citizen Portal. All rights reserved.</p>
        </div>
      </footer>
      <style>{`
        @media (max-width: 768px) {
          .ftr-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </>
  )
}

const styles = {
  footer: {
    background: '#2c3e50',
    color: '#fff',
    marginTop: 'auto',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,
    flexWrap: 'wrap',
  },
  section: {
    flex: 1,
    minWidth: 200,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  brand: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    color: '#fff',
  },
  desc: {
    fontSize: 14,
    lineHeight: 1.6,
    color: '#ccc',
    margin: 0,
  },
  heading: {
    fontSize: 16,
    fontWeight: 600,
    margin: 0,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: 14,
    transition: 'color 0.2s',
  },
  text: {
    fontSize: 14,
    color: '#ccc',
    margin: 0,
    lineHeight: 1.6,
  },
  bottomBar: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    padding: '16px 20px',
    textAlign: 'center',
  },
  copyright: {
    fontSize: 13,
    color: '#aaa',
    margin: 0,
  },
}

export default Footer
