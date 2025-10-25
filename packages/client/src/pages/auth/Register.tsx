// src/pages/auth/Register.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Importa os componentes e utils
import { Button } from '../../components/common/Button/Button';
import { Input } from '../../components/common/Input/Input';
import { cpfMask, dateMask, phoneMask } from '../../utils/masks';
import logo from '../../assets/logo.png';
import styles from './Register.module.css';

// Interface para o estado do formulário
interface FormData {
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  senha: string;
  confirmaSenha: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    senha: '',
    confirmaSenha: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Efeito para validar o formulário
  useEffect(() => {
    // Verifica se todos os valores no objeto formData são preenchidos
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ''
    );
    setIsButtonDisabled(!allFieldsFilled);
  }, [formData]);

  // Handler genérico para os inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Aplica a máscara correta com base no 'name' do input
    let maskedValue = value;
    switch (name) {
      case 'cpf':
        maskedValue = cpfMask(value);
        break;
      case 'dataNascimento':
        maskedValue = dateMask(value);
        break;
      case 'telefone':
        maskedValue = phoneMask(value);
        break;
      default:
        maskedValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: maskedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    // (Opcional) Validação extra antes de submeter
    if (formData.senha !== formData.confirmaSenha) {
      alert('As senhas não conferem!');
      return;
    }

    console.log('Dados da conta criada:', formData);
    alert('Conta criada com sucesso! (Veja o console)');
    navigate('/'); // Navega para a Home
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerCard}>
        <img src={logo} alt="AgroDiário Logo" className={styles.logo} />
        <h2 className={styles.title}>Crie sua conta</h2>
        <p className={styles.subtitle}>
          Já tem uma conta?{' '}
          <Link to="/login" className={styles.link}>
            Entre agora.
          </Link>
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Seu nome completo"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: Maria da Silva"
            required
          />
          <Input
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="000.000.000-00"
            maxLength={14}
            required
          />
          <Input
            label="Data de nascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            placeholder="DD/MM/AAAA"
            maxLength={10}
            required
          />
          <Input
            label="Seu número de telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            maxLength={15}
            required
          />
          <Input
            label="Seu e-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex: maria.silva@email.com"
            required
          />
          <Input
            label="Sua senha"
            name="senha"
            type={showPassword ? 'text' : 'password'}
            value={formData.senha}
            onChange={handleChange}
            placeholder="Mínimo 8 caracteres"
            icon={showPassword ? <FaEyeSlash /> : <FaEye />}
            onIconClick={() => setShowPassword(!showPassword)}
            required
          />
          <Input
            label="Confirme sua senha"
            name="confirmaSenha"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmaSenha}
            onChange={handleChange}
            placeholder="Repita sua senha"
            icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            required
          />

          <Button type="submit" disabled={isButtonDisabled}>
            Criar conta
          </Button>
        </form>
      </div>
    </div>
  );
}