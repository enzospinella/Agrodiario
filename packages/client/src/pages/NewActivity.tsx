// src/pages/NewActivity.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NewActivity.module.css';

// Importa todos os componentes que criamos
import { Input } from '../components/common/Input/Input';
import { Button } from '../components/common/Button/Button';
import { TagToggle } from '../components/common/TagToggle/TagToggle';
import { Radio } from '../components/common/Radio/Radio';
import { FileInput } from '../components/common/FileInput/FileInput';

// Ícones
import {
  FiArrowLeft,
  FiCalendar,
  FiSearch,
  FiUpload,
} from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io'; // Para o Select

export default function NewActivityPage() {
  const navigate = useNavigate();
  
  // Estado para os tipos de atividade
  const [activityType, setActivityType] = useState('preparo');
  
  // Estado para a lógica condicional
  const [showInsumos, setShowInsumos] = useState(false);

  // Estado para o botão Salvar
  // (Em um app real, isso viria da validação de todos os campos)
  const [isFormValid, _setIsFormValid] = useState(false);

  return (
    <div className={styles.page}>
      {/* 1. Cabeçalho com "Voltar" */}
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <FiArrowLeft size={20} />
          <span>Nova atividade</span>
        </button>
      </header>

      {/* 2. Formulário */}
      <form className={styles.form}>
        {/* Seção: Detalhes */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Detalhes da atividade</h3>
          <div className={styles.fieldGroup}>
            <Input
              label="Data da atividade"
              type="text" // Usar text para estilizar com ícone
              placeholder="DD/MM/AAAA"
              icon={<FiCalendar size={18} />}
            />
            {/* Input de Select customizado (só layout) */}
            <Input
              label="Propriedade associada"
              readOnly
              placeholder="Selecione uma propriedade"
              icon={<IoIosArrowDown size={18} />}
            />
          </div>
        </div>

        {/* Seção: Tipo de atividade */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Tipo de atividade</h3>
          <div className={styles.tagGroup}>
            <TagToggle
              color="red"
              isActive={activityType === 'preparo'}
              onClick={() => setActivityType('preparo')}
              type="button"
            >
              Preparo
            </TagToggle>
            <TagToggle
              color="blue"
              isActive={activityType === 'aplicacao'}
              onClick={() => setActivityType('aplicacao')}
              type="button"
            >
              Aplicação
            </TagToggle>
            <TagToggle
              color="green"
              isActive={activityType === 'colheita'}
              onClick={() => setActivityType('colheita')}
              type="button"
            >
              Colheita
            </TagToggle>
            <TagToggle
              color="orange"
              isActive={activityType === 'manejo'}
              onClick={() => setActivityType('manejo')}
              type="button"
            >
              Manejo de solo
            </TagToggle>
          </div>
          <Input label="Descrição detalhada da atividade" />
          <Input label="Responsável pela execução" />
        </div>

        {/* Seção: Produto ou Insumo (com lógica) */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Produto ou Insumo</h3>
          <p className={styles.radioLabel}>
            Foi utilizado algum produto ou insumo?
          </p>
          <div className={styles.radioGroup}>
            <Radio
              label="Sim"
              name="insumo"
              value="sim"
              onChange={() => setShowInsumos(true)}
            />
            <Radio
              label="Não"
              name="insumo"
              value="nao"
              defaultChecked // Começa com "Não"
              onChange={() => setShowInsumos(false)}
            />
          </div>

          {/* LÓGICA CONDICIONAL AQUI */}
          {showInsumos && (
            <div className={styles.insumoFields}>
              <Input
                label="Nome do produto/insumo utilizado"
                placeholder="Busque pelo nome..."
                icon={<FiSearch size={18} />}
              />
              <div className={styles.fieldGroup}>
                <Input label="Quantidade utilizada" placeholder="Ex: 100" />
                <Input
                  label="Unidade de medida"
                  readOnly
                  placeholder="Ex: Kg, L, etc."
                  icon={<IoIosArrowDown size={18} />}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Seção: Anexos */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Anexos</h3>
          <p className={styles.sectionSubtitle}>
            Você pode inserir fotos da plantação, notas fiscais, recibos.
          </p>
          <FileInput leftIcon={<FiUpload size={18} />}>
            Fazer upload de foto ou documento
          </FileInput>
        </div>
        
        {/* Rodapé com botões */}
        <footer className={styles.footer}>
          <Button 
            variant="tertiary" 
            type="button" 
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            disabled={!isFormValid} // Botão desabilitado
          >
            Salvar atividade
          </Button>
        </footer>
      </form>
    </div>
  );
}