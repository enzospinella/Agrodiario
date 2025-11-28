import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import logo from '@/assets/logo-grande.png';
import { Button } from '@/components/common/Button/Button';

type NavbarProps = {
    activeSection?: 'inicio' | 'sobre' | 'quem-somos';
    onNavigate?: (section: string) => void;
};

export function Navbar({ activeSection = 'inicio', onNavigate }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (section: string) => {
        onNavigate?.(section);
        setMobileMenuOpen(false);

        // Scroll suave para a seção
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSignup = () => {
        // Redirecionar para página de autenticação
        window.location.href = '/auth/signup';
    };

    const handleLogin = () => {
        // Redirecionar para página de login
        window.location.href = '/auth/login';
    };

    const navItems = [
        { id: 'inicio', label: 'Início' },
        { id: 'sobre', label: 'Sobre' },
        { id: 'quem-somos', label: 'Quem somos' },
    ];

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    {/* Logo */}
                    <a href="/" className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <img src={logo} alt="AgroDiário Logo" className={styles.logoImg} />
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <div className={styles.navigation}>
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''
                                    }`}
                                onClick={() => handleNavClick(item.id)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className={styles.actions}>
                        <Button variant='outlined' onClick={handleSignup}>
                            Criar uma conta
                        </Button>
                        <Button variant='primary' onClick={handleLogin}>
                            Entrar
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.mobileMenuButton}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.active : ''
                                }`}
                            onClick={() => handleNavClick(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}

                    <div className={styles.mobileActions}>
                        <Button variant='outlined' onClick={handleSignup}>
                            Criar uma conta
                        </Button>
                        <Button variant='primary' onClick={handleLogin}>
                            Entrar
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
