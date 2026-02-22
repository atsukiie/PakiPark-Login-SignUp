import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './login.module.css';

const EyeOpenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M2 12C3.8 8.5 7.2 6 12 6C16.8 6 20.2 8.5 22 12C20.2 15.5 16.8 18 12 18C7.2 18 3.8 15.5 2 12Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 3L21 21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.7 6.2C11.1 6.1 11.5 6 12 6C16.8 6 20.2 8.5 22 12C21.2 13.6 20.1 14.9 18.7 15.9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.1 8.3C4.4 9.3 3.1 10.8 2 12C3.8 15.5 7.2 18 12 18C13.6 18 15.1 17.7 16.4 17.1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Login = () => {
  const router = useRouter();
  const [authMode, setAuthMode] = useState('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    countryCode: '+63',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (feedback.message) {
      setFeedback({ type: '', message: '' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const phoneValue = formData.phone.replace(/\s+/g, '');
    const identity = authMode === 'phone' ? phoneValue : formData.email.trim();

    if (!identity) {
      setFeedback({
        type: 'error',
        message: authMode === 'phone' ? 'Please enter your phone number.' : 'Please enter your email.'
      });
      return;
    }

    if (authMode === 'phone' && !/^\d{7,15}$/.test(phoneValue)) {
      setFeedback({
        type: 'error',
        message: 'Please enter a valid phone number (7 to 15 digits).'
      });
      return;
    }

    if (authMode === 'email' && !/^\S+@\S+\.\S+$/.test(identity)) {
      setFeedback({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    if (formData.password.length < 6) {
      setFeedback({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setFeedback({ type: 'success', message: 'Login successful. Redirecting...' });
    } catch (error) {
      setFeedback({ type: 'error', message: 'Unable to log in right now. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.heroPanel}>
        <div className={styles.heroTop}>
          <button
            type="button"
            className={styles.backButton}
            aria-label="Go back"
            onClick={() => router.back()}
          >
            &lt;
          </button>
          <div className={styles.brand}>PakiPARK</div>
        </div>

        <div className={styles.heroContent}>
          <h1>
            Welcome Back to
            <br />
            PakiPark
          </h1>
          <p>Your trusted parking partner for fast, secure, and reliable parking services across the city.</p>

          <ul className={styles.featureList}>
            <li>
              <span className={styles.featureIcon} aria-hidden="true" />
              <div>
                <strong>Lightning Fast Booking</strong>
                <small>Get your parking spot reserved within seconds</small>
              </div>
            </li>
            <li>
              <span className={styles.featureIcon} aria-hidden="true" />
              <div>
                <strong>100% Secure & Insured</strong>
                <small>All parking locations are fully protected</small>
              </div>
            </li>
            <li>
              <span className={styles.featureIcon} aria-hidden="true" />
              <div>
                <strong>24/7 Real-time Tracking</strong>
                <small>Monitor your parking reservation every second</small>
              </div>
            </li>
          </ul>

          <div className={styles.stats}>
            <div>
              <span>15K+</span>
              <small>Happy Customers</small>
            </div>
            <div>
              <span>50K+</span>
              <small>Reservations</small>
            </div>
            <div>
              <span>4.9</span>
              <small>Rating</small>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formPanel}>
        <form className={styles.loginCard} onSubmit={handleSubmit}>
          <h2>Welcome Back!</h2>
          <p className={styles.subtitle}>Login to continue parking</p>

          <div className={styles.modeToggle}>
            <button
              type="button"
              className={authMode === 'phone' ? styles.modeActive : ''}
              onClick={() => {
                setAuthMode('phone');
                setFeedback({ type: '', message: '' });
              }}
            >
              Phone
            </button>
            <button
              type="button"
              className={authMode === 'email' ? styles.modeActive : ''}
              onClick={() => {
                setAuthMode('email');
                setFeedback({ type: '', message: '' });
              }}
            >
              Email
            </button>
          </div>

          {authMode === 'phone' ? (
            <div className={styles.field}>
              <label htmlFor="phone">Phone Number</label>
              <div className={styles.phoneRow}>
                <input
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className={styles.countryCode}
                  aria-label="Country code"
                  maxLength={4}
                />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="912 345 6789"
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[0-9 ]{7,20}"
                  required
                />
              </div>
            </div>
          ) : (
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordRow}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </button>
            </div>
          </div>

          <Link href="/forgot-password" className={styles.forgotPassword}>
            Forgot Password?
          </Link>

          <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          {feedback.message ? (
            <p
              className={feedback.type === 'error' ? styles.errorText : styles.successText}
              role="status"
              aria-live="polite"
            >
              {feedback.message}
            </p>
          ) : null}

          <div className={styles.divider}>or continue with</div>

          <div className={styles.socialGrid}>
            <button type="button">Google</button>
            <button type="button">Facebook</button>
            <button type="button" className={styles.socialWide}>
              PakiShip
            </button>
          </div>

          <p className={styles.signupText}>
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
