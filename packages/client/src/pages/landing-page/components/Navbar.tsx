import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import logo from '@/assets/logo-grande.png';
import { Button } from '@/components/common/Button/Button';

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState<'inicio' | 'sobre' | 'quem-somos'>('inicio');

    const navItems = [
        { id: 'inicio', label: 'Início' },
        { id: 'sobre', label: 'Sobre' },
        { id: 'quem-somos', label: 'Quem somos' },
        { id: 'parceiros', label: 'Parceiros' },

    ];

    // ScrollSpy com IntersectionObserver
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentSection(entry.target.id as any);
                    }
                });
            },
            {
                threshold: 0.55,
            }
        );

        sections.forEach((sec) => observer.observe(sec));

        return () => {
            sections.forEach((sec) => observer.unobserve(sec));
        };
    }, []);

    const handleNavClick = (section: string) => {
        setCurrentSection(section as any);
        setMobileMenuOpen(false);

        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSignup = () => {
        window.location.href = '/register';
    };

    const handleLogin = () => {
        window.location.href = '/login';
    };

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
                                className={`${styles.navLink} ${currentSection === item.id ? styles.active : ''
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
                            className={`${styles.mobileNavLink} ${currentSection === item.id ? styles.active : ''
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
