import { useState } from 'react';
import { Lock } from 'lucide-react';
import { demoAdmin } from '../lib/store';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitLogin = (event) => {
    event.preventDefault();

    if (email === demoAdmin.email && password === demoAdmin.password) {
      localStorage.setItem('thebrinc.admin', 'true');
      onLogin();
      return;
    }

    setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  };

  return (
    <main className="admin-page login-page">
      <form className="login-card" onSubmit={submitLogin}>
        <a className="brand" href="/">
          <img className="brand-logo" src="/logothebrinc1.png" alt="Thebrinc.c" />
          <span>Thebrinc.c</span>
        </a>
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h1>เข้าสู่ระบบ</h1>
          <p className="muted">
            Demo: admin@thebrinc.c / thebrinc
          </p>
        </div>
        <label>
          Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@thebrinc.c"
            type="email"
            value={email}
          />
        </label>
        <label>
          Password
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="thebrinc"
            type="password"
            value={password}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="primary-button" type="submit">
          <Lock size={17} />
          Login
        </button>
      </form>
    </main>
  );
}
