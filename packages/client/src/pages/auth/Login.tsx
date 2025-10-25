// src/pages/auth/Login.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa os ícones

// Importa os componentes reutilizáveis
import { Button } from '../../components/common/Button/Button';
import { Input } from '../../components/common/Input/Input';

// Importa os assets
import loginImage from '../../assets/login-image.jpg';
import logo from '../../assets/logo.png'; // <- Coloque seu logo aqui

// Importa o CSS da página
import styles from './Login.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/'); 
  };

  return (
    <div className={styles.loginPage}>
      {/* Coluna da Imagem (Esquerda) */}
      <div
        className={styles.imageColumn}
        style={{ backgroundImage: `url(${loginImage})` }}
      />

      {/* Coluna do Formulário (Direita) */}
      <div className={styles.formColumn}>
        <div className={styles.formCard}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="AgroDiário Logo" className={styles.logo} />
            </div>

          <h2 className={styles.title}>Entre na sua conta</h2>
          
          <p className={styles.subtitle}>
            Não tem uma conta?{' '}
            <Link to="/register" className={styles.link}>
              Cadastre-se agora.
            </Link>
          </p>

          <form onSubmit={handleLogin} className={styles.form}>
            <Input
              label="Seu e-mail"
              type="email"
              name="email"
              required
            />
            
            <Input
              label="Sua senha"
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              icon={showPassword ? <FaEyeSlash /> : <FaEye />}
              onIconClick={() => setShowPassword(!showPassword)}
            />

            <Button type="submit">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}