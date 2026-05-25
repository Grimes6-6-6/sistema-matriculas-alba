import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  FaArrowLeft,
  FaCheckCircle,
  FaEnvelope,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaSignInAlt,
  FaUserShield
} from 'react-icons/fa';
import '../styles/App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setError('Completa usuario y contrasena para continuar');
      return;
    }

    if (cleanUsername.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres');
      return;
    }

    if (cleanPassword.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    const result = await login(cleanUsername, cleanPassword);

    if (result.success) {
      const rol = result.user?.rol;
      if (rol === 'matriculador') {
        navigate('/matriculas');
      } else if (rol === 'tutor') {
        navigate('/tutores');
      } else {
        navigate('/admin');
      }
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="responsive-split auth-screen" style={styles.screen}>
      <section className="hide-mobile auth-brand-panel" style={styles.brandPanel}>
        <div style={styles.brandContent}>
          <div style={styles.iconWrap}>
            <FaUserShield size={46} color="white" />
          </div>
          <p style={styles.kicker}>Sistema academico Alba</p>
          <h1 style={styles.brandTitle}>Panel administrativo seguro</h1>
          <p style={styles.brandSubtitle}>
            Gestion centralizada para matriculas, pagos, cursos, docentes y reportes.
          </p>

          <div style={styles.features}>
            <div style={styles.featureItem}>
              <FaCheckCircle style={styles.featureIcon} />
              <span>Acceso por roles administrativos</span>
            </div>
            <div style={styles.featureItem}>
              <FaCheckCircle style={styles.featureIcon} />
              <span>Control de matriculas y pagos</span>
            </div>
            <div style={styles.featureItem}>
              <FaCheckCircle style={styles.featureIcon} />
              <span>Indicadores academicos en tiempo real</span>
            </div>
            <div style={styles.featureItem}>
              <FaCheckCircle style={styles.featureIcon} />
              <span>Portales separados para estudiantes y docentes</span>
            </div>
          </div>
        </div>
      </section>

      <main className="auth-form-panel" style={styles.formPanel}>
        <section className="auth-form-card" style={styles.formCard} aria-label="Acceso administrativo">
          <div style={styles.formHeader}>
            <img
              className="auth-logo"
              src="/logo_oficial.png"
              alt="Academia Alba"
              style={styles.logo}
            />
            <h2 style={styles.title}>Acceso administrativo</h2>
            <p style={styles.subtitle}>Ingresa con tus credenciales autorizadas</p>
          </div>

          {error && (
            <div style={styles.errorBox} role="alert">
              <FaExclamationCircle />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={styles.formGroup}>
              <label htmlFor="admin-username" style={styles.label}>Usuario o email</label>
              <div style={styles.inputWrap}>
                <FaEnvelope style={styles.inputIcon} />
                <input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="usuario@academia.com"
                  style={styles.input}
                  maxLength={100}
                  disabled={loading}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="admin-password" style={styles.label}>Contrasena</label>
              <div style={styles.inputWrap}>
                <FaLock style={styles.inputIcon} />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contrasena"
                  style={{ ...styles.input, paddingRight: 48 }}
                  maxLength={200}
                  disabled={loading}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                  onClick={() => setShowPassword((current) => !current)}
                  style={styles.passwordToggle}
                  disabled={loading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.72 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Validando acceso...' : <><FaSignInAlt /> Entrar al sistema</>}
            </button>
          </form>

          <div style={styles.footerLinkWrap}>
            <a href="/" style={styles.backLink}>
              <FaArrowLeft size={12} /> Regresar a portales
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  screen: {
    minHeight: '100vh',
    background: '#f8fafc'
  },
  brandPanel: {
    flex: 1,
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 58%, #164e63 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: 56,
    position: 'relative'
  },
  brandContent: {
    maxWidth: 460
  },
  iconWrap: {
    width: 86,
    height: 86,
    background: 'rgba(255,255,255,0.14)',
    borderRadius: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    border: '1px solid rgba(255,255,255,0.22)'
  },
  kicker: {
    marginBottom: 10,
    color: '#bae6fd',
    fontSize: 13,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.08em'
  },
  brandTitle: {
    fontSize: 38,
    lineHeight: 1.1,
    fontWeight: 900,
    marginBottom: 16,
    letterSpacing: 0
  },
  brandSubtitle: {
    fontSize: 16,
    lineHeight: 1.7,
    color: 'rgba(255,255,255,0.78)',
    marginBottom: 34
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 14,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.92)'
  },
  featureIcon: {
    color: '#86efac',
    flexShrink: 0
  },
  formPanel: {
    flex: 1,
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  formCard: {
    background: 'white',
    borderRadius: 24,
    padding: 42,
    width: '100%',
    maxWidth: 470,
    boxShadow: '0 24px 70px rgba(15, 23, 42, 0.1)',
    border: '1px solid #e2e8f0'
  },
  formHeader: {
    textAlign: 'center',
    marginBottom: 28
  },
  logo: {
    width: 170,
    marginBottom: 18,
    filter: 'drop-shadow(0 10px 15px rgba(15, 23, 42, 0.1))'
  },
  title: {
    fontSize: 24,
    fontWeight: 900,
    color: '#0f172a',
    marginBottom: 6,
    letterSpacing: 0
  },
  subtitle: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: 500
  },
  errorBox: {
    background: '#fff1f2',
    color: '#be123c',
    padding: '12px 14px',
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: 700,
    border: '1px solid #ffe4e6',
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  formGroup: {
    marginBottom: 18
  },
  label: {
    display: 'block',
    marginBottom: 8,
    fontSize: 12,
    fontWeight: 800,
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.04em'
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  inputIcon: {
    position: 'absolute',
    left: 14,
    color: '#94a3b8',
    fontSize: 15,
    zIndex: 1
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 42,
    paddingRight: 16,
    border: '2px solid #e2e8f0',
    borderRadius: 12,
    fontSize: 15,
    color: '#0f172a',
    background: 'white',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: "'Plus Jakarta Sans', sans-serif"
  },
  passwordToggle: {
    position: 'absolute',
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 10,
    border: 'none',
    background: '#f1f5f9',
    color: '#475569',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  submitBtn: {
    width: '100%',
    height: 52,
    background: 'linear-gradient(135deg, #0f172a, #164e63)',
    color: 'white',
    border: 'none',
    borderRadius: 14,
    fontWeight: 800,
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.18)',
    fontFamily: "'Plus Jakarta Sans', sans-serif"
  },
  footerLinkWrap: {
    textAlign: 'center',
    marginTop: 28
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    color: '#64748b',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 700
  }
};

export default Login;
