import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaChalkboardTeacher, FaShieldAlt, FaUserGraduate } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();

  const portals = [
    {
      title: 'Portal Estudiantil',
      desc: 'Horarios, pagos, asistencias y matriculas del estudiante.',
      icon: <FaUserGraduate size={34} />,
      path: '/portal',
      accent: '#2563eb',
      surface: '#eff6ff',
      label: 'Estudiantes'
    },
    {
      title: 'Portal Docente',
      desc: 'Cursos asignados, estudiantes y registro de asistencia.',
      icon: <FaChalkboardTeacher size={34} />,
      path: '/portal-docente',
      accent: '#059669',
      surface: '#ecfdf5',
      label: 'Docentes'
    },
    {
      title: 'Administracion',
      desc: 'Gestion academica, reportes, pagos, cursos y matriculas.',
      icon: <FaShieldAlt size={34} />,
      path: '/login',
      accent: '#0f172a',
      surface: '#f1f5f9',
      label: 'Equipo interno'
    }
  ];

  return (
    <main className="landing-page" style={styles.page}>
      <section className="landing-shell" style={styles.shell}>
        <header className="landing-header" style={styles.header}>
          <div className="landing-identity" style={styles.identity}>
            <img className="landing-logo" src="/logo_oficial.png" alt="Academia Alba" style={styles.logo} />
            <div>
              <p className="landing-kicker" style={styles.kicker}>Academia Alba Peru</p>
              <h1 className="landing-title" style={styles.title}>Plataforma academica digital</h1>
            </div>
          </div>
          <p className="landing-subtitle" style={styles.subtitle}>
            Accede al entorno correspondiente para consultar, registrar o administrar la informacion academica.
          </p>
        </header>

        <section className="landing-grid" style={styles.grid} aria-label="Portales disponibles">
          {portals.map((portal) => (
            <button
              key={portal.path}
              type="button"
              className="landing-card"
              style={styles.card}
              onClick={() => navigate(portal.path)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = portal.accent;
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ ...styles.iconWrap, background: portal.surface, color: portal.accent }}>
                {portal.icon}
              </div>
              <span style={{ ...styles.badge, background: portal.surface, color: portal.accent }}>
                {portal.label}
              </span>
              <h2 style={styles.cardTitle}>{portal.title}</h2>
              <p style={styles.cardDesc}>{portal.desc}</p>
              <span style={{ ...styles.action, color: portal.accent }}>
                Ingresar <FaArrowRight size={13} />
              </span>
            </button>
          ))}
        </section>

        <footer className="landing-footer" style={styles.footer}>
          Sistema de gestion academica. Academia Alba Peru, 2026.
        </footer>
      </section>
    </main>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '34px 18px'
  },
  shell: {
    width: '100%',
    maxWidth: 1120
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 32,
    marginBottom: 32
  },
  identity: {
    display: 'flex',
    alignItems: 'center',
    gap: 20
  },
  logo: {
    width: 138,
    maxWidth: '34vw',
    filter: 'drop-shadow(0 10px 18px rgba(15, 23, 42, 0.08))'
  },
  kicker: {
    margin: 0,
    color: '#2563eb',
    fontSize: 13,
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.08em'
  },
  title: {
    margin: '6px 0 0',
    color: '#0f172a',
    fontSize: 42,
    lineHeight: 1.08,
    fontWeight: 900,
    letterSpacing: 0
  },
  subtitle: {
    maxWidth: 420,
    margin: 0,
    color: '#475569',
    fontSize: 15,
    lineHeight: 1.7,
    fontWeight: 600
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 18
  },
  card: {
    appearance: 'none',
    border: '1px solid #e2e8f0',
    background: '#ffffff',
    borderRadius: 18,
    padding: 28,
    minHeight: 286,
    textAlign: 'left',
    cursor: 'pointer',
    boxShadow: '0 16px 36px rgba(15, 23, 42, 0.06)',
    transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18
  },
  badge: {
    borderRadius: 999,
    padding: '6px 10px',
    fontSize: 11,
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 14
  },
  cardTitle: {
    margin: '0 0 10px',
    color: '#0f172a',
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: 0
  },
  cardDesc: {
    margin: 0,
    color: '#64748b',
    fontSize: 14,
    lineHeight: 1.65,
    fontWeight: 600,
    flex: 1
  },
  action: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 22,
    fontSize: 14,
    fontWeight: 900
  },
  footer: {
    marginTop: 28,
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: 700,
    textAlign: 'center'
  }
};

export default LandingPage;
