import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const colors = {
  primary: '#1a5276',
  secondary: '#2ecc71',
  accent: '#f39c12',
  background: '#f8f9fa',
  text: '#2c3e50',
  white: '#ffffff',
  lightGray: '#e9ecef',
  darkGray: '#6c757d',
}

const styles = {
  page: {
    background: colors.background,
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: colors.text,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  heroSection: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, #1a3a5c 100%)`,
    color: colors.white,
    padding: '80px 0',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    opacity: 0.4,
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(255,255,255,0.15)',
    color: colors.white,
    padding: '6px 18px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.5px',
    marginBottom: '20px',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 700,
    margin: '0 0 16px',
    lineHeight: 1.2,
    letterSpacing: '-0.5px',
  },
  heroSubtitle: {
    fontSize: '20px',
    opacity: 0.9,
    margin: '0 0 36px',
    fontWeight: 300,
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: colors.white,
    color: colors.primary,
    border: 'none',
    padding: '14px 32px',
    borderRadius: '8px',
    fontSize: '17px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  btnOutline: {
    background: 'transparent',
    color: colors.white,
    border: '2px solid rgba(255,255,255,0.7)',
    padding: '14px 32px',
    borderRadius: '8px',
    fontSize: '17px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  section: {
    padding: '70px 0',
  },
  sectionAlt: {
    padding: '70px 0',
    background: colors.white,
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 700,
    textAlign: 'center',
    margin: '0 0 12px',
    color: colors.primary,
  },
  sectionSubtitle: {
    fontSize: '16px',
    textAlign: 'center',
    color: colors.darkGray,
    margin: '0 0 48px',
  },
  underline: {
    width: '60px',
    height: '4px',
    background: colors.secondary,
    margin: '12px auto 0',
    borderRadius: '2px',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  stepCard: {
    textAlign: 'center',
    padding: '36px 24px',
    background: colors.white,
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid rgba(0,0,0,0.04)',
  },
  stepNumber: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: colors.primary,
    color: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: 700,
    margin: '0 auto 20px',
  },
  stepIcon: {
    fontSize: '32px',
    marginBottom: '12px',
    color: colors.primary,
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: 600,
    margin: '0 0 10px',
  },
  stepDesc: {
    fontSize: '15px',
    color: colors.darkGray,
    margin: 0,
    lineHeight: 1.6,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
  },
  statCard: {
    textAlign: 'center',
    padding: '32px 20px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.04)',
  },
  statNumber: {
    fontSize: '40px',
    fontWeight: 700,
    margin: '0 0 4px',
  },
  statLabel: {
    fontSize: '15px',
    fontWeight: 500,
    margin: 0,
    opacity: 0.85,
  },
  trackBox: {
    maxWidth: '560px',
    margin: '0 auto',
    background: colors.white,
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid rgba(0,0,0,0.04)',
  },
  trackLabel: {
    display: 'block',
    fontSize: '15px',
    fontWeight: 600,
    marginBottom: '10px',
    color: colors.text,
  },
  trackInputRow: {
    display: 'flex',
    gap: '12px',
  },
  trackInput: {
    flex: 1,
    padding: '13px 16px',
    border: '2px solid colors.lightGray',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  trackBtn: {
    background: colors.primary,
    color: colors.white,
    border: 'none',
    padding: '13px 28px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background 0.2s',
  },
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [trackingId, setTrackingId] = useState('')

  const handleTrack = (e) => {
    e.preventDefault()
    if (trackingId.trim()) {
      navigate(`/track-complaint?id=${trackingId.trim()}`)
    }
  }

  return (
    <div style={styles.page}>
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay} />
        <div style={{ ...styles.container, ...styles.heroContent }}>
          <div style={styles.badge}>Government of Pakistan</div>
          <h1 style={styles.heroTitle}>Pakistan Citizen Portal</h1>
          <p style={styles.heroSubtitle}>
            File complaints, track status, get results
          </p>
          <div style={styles.heroButtons}>
            <Link to="/register-complaint" style={styles.btnPrimary}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9" />
                <path d="M14 3l4 4-9 9H9v-4l5-5z" />
                <path d="M18 3l-4-4" />
              </svg>
              Register Complaint
            </Link>
            <Link to="/track-complaint" style={styles.btnOutline}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8.5" cy="8.5" r="7" />
                <path d="M13.5 13.5L18 18" />
              </svg>
              Track Complaint
            </Link>
          </div>
        </div>
      </section>

      <section style={styles.sectionAlt} id="how-it-works">
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <p style={styles.sectionSubtitle}>Three simple steps to get your voice heard</p>
          <div style={styles.underline} />
          <div style={{ ...styles.stepsGrid, marginTop: '48px' }}>
            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>1</div>
              <div style={styles.stepIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 style={styles.stepTitle}>Register Yourself</h3>
              <p style={styles.stepDesc}>
                Create an account with your basic details and CNIC verification to get started.
              </p>
            </div>
            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>2</div>
              <div style={styles.stepIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 style={styles.stepTitle}>File Your Complaint</h3>
              <p style={styles.stepDesc}>
                Submit your complaint with relevant details, category, and supporting documents.
              </p>
            </div>
            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>3</div>
              <div style={styles.stepIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3 style={styles.stepTitle}>Track & Get Resolved</h3>
              <p style={styles.stepDesc}>
                Monitor your complaint status in real time and receive updates until resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.section} id="stats">
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Live Statistics</h2>
          <p style={styles.sectionSubtitle}>Real-time overview of citizen complaints</p>
          <div style={styles.underline} />
          <div style={{ ...styles.statsGrid, marginTop: '48px' }}>
            <div style={{ ...styles.statCard, borderTop: `4px solid ${colors.primary}` }}>
              <p style={{ ...styles.statNumber, color: colors.primary }}>12,458</p>
              <p style={styles.statLabel}>Total Complaints</p>
            </div>
            <div style={{ ...styles.statCard, borderTop: `4px solid ${colors.secondary}` }}>
              <p style={{ ...styles.statNumber, color: colors.secondary }}>9,210</p>
              <p style={styles.statLabel}>Resolved</p>
            </div>
            <div style={{ ...styles.statCard, borderTop: `4px solid ${colors.accent}` }}>
              <p style={{ ...styles.statNumber, color: colors.accent }}>2,847</p>
              <p style={styles.statLabel}>Pending</p>
            </div>
            <div style={{ ...styles.statCard, borderTop: `4px solid ${colors.primary}` }}>
              <p style={{ ...styles.statNumber, color: colors.primary }}>32</p>
              <p style={styles.statLabel}>Departments</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ ...styles.sectionAlt, background: colors.background }} id="quick-track">
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Quick Track</h2>
          <p style={styles.sectionSubtitle}>Enter your complaint ID to check status instantly</p>
          <div style={styles.underline} />
          <div style={{ ...styles.trackBox, marginTop: '40px' }}>
            <form onSubmit={handleTrack}>
              <label style={styles.trackLabel} htmlFor="trackingId">
                Complaint Tracking ID
              </label>
              <div style={styles.trackInputRow}>
                <input
                  id="trackingId"
                  type="text"
                  placeholder="e.g. PKC-2024-001234"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  style={styles.trackInput}
                />
                <button type="submit" style={styles.trackBtn}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="8.5" cy="8.5" r="7" />
                      <path d="M13.5 13.5L18 18" />
                    </svg>
                    Track
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
