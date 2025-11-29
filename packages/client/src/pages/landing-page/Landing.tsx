import { useState } from 'react';
import { Navbar } from './components/Navbar';
import './Landing.css';
import { Header } from './components/Header';
import { About } from './components/About';
import { Team } from './components/Team';
import { Affiliation } from './components/Affiliation';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';

export default function Landing() {
  const [activeSection, setActiveSection] = useState<'inicio' | 'sobre' | 'quem-somos'>('inicio');

  const handleNavigate = (section: string) => {
    setActiveSection(section as 'inicio' | 'sobre' | 'quem-somos');
  };

  return (
    <div className="landing-page">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <Header />
      <About />
      <Team />
      <Affiliation />
      <CallToAction />
      <Footer />
    </div>
  );
}
