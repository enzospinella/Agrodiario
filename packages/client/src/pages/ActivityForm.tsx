// src/components/diary/ActivityForm/ActivityForm.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ActivityForm.module.css';

// Imports de componentes e ícones
import { Input } from '../components/common/Input/Input';
import { Button } from '../components/common/Button/Button';
import { TagToggle } from '../components/common/TagToggle/TagToggle';
import { Radio } from '../components/common/Radio/Radio';
import { FileInput } from '../components/common/FileInput/FileInput';
import {
  FiArrowLeft,
  FiCalendar,
  FiUpload,
  FiEye,
  FiTrash2
} from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';

// Importe a URL base para exibir imagens do servidor
import { UPLOADS_URL } from '../config/api.client';

// Tipos
export type ActivityFormData = {
  date: string;
  propriedade: string;
  tipo: 'preparo' | 'aplicacao' | 'colheita' | 'manejo';
  descricao: string;
  responsavel: string;
  insumoNome?: string;
  insumoQuantidade?: string;
  insumoUnidade?: string;
  // Adicionamos o campo para receber os nomes dos arquivos existentes do backend
  anexos?: string[]; 
};

type Props = {
  initialData?: Partial<ActivityFormData>;
  // onSubmit agora recebe também a lista de arquivos a serem removidos do servidor
  onSubmit: (data: ActivityFormData, newFiles: File[], removedFiles: string[]) => void;
  isLoading?: boolean;
};

const mockProperties = [
  { label: 'Sítio Oliveira', value: 'Sítio Oliveira' },
  { label: 'Fazenda Santa Fé', value: 'Fazenda Santa Fé' },
  { label: 'Rancho Fundo', value: 'Rancho Fundo' },
  { label: 'Chácara do Sol', value: 'Chácara do Sol' },
];

const mockInsumos = [
  { label: 'Fertilizante NPK 10-10-10', value: 'Fertilizante NPK 10-10-10' },
  { label: 'Calcário Dolomítico', value: 'Calcário Dolomítico' },
  { label: 'Ureia Agrícola', value: 'Ureia Agrícola' },
  { label: 'Herbicida Glifosato', value: 'Herbicida Glifosato' },
];

const mockUnidades = [
    { label: 'Kg', value: 'Kg' },
    { label: 'L', value: 'L' },
    { label: 'Ton', value: 'Ton' },
    { label: 'Sacos', value: 'Sacos' },
];
export function ActivityForm({ initialData, onSubmit, isLoading = false }: Props) {
  const navigate = useNavigate();
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState<ActivityFormData>({
    date: initialData?.date || '',
    propriedade: initialData?.propriedade || '',
    tipo: initialData?.tipo || 'preparo',
    descricao: initialData?.descricao || '',
    responsavel: initialData?.responsavel || '',
    insumoNome: initialData?.insumoNome || '',
    insumoQuantidade: initialData?.insumoQuantidade || '',
    insumoUnidade: initialData?.insumoUnidade || '',
    anexos: initialData?.anexos || [],
  });

  const [showInsumos, setShowInsumos] = useState(!!initialData?.insumoNome);
  const [isValid, setIsValid] = useState(false);

  // --- GERENCIAMENTO DE ARQUIVOS ---
  
  // 1. Arquivos NOVOS (File Objects) selecionados agora
  const [newFiles, setNewFiles] = useState<File[]>([]);
  
  // 2. Arquivos EXISTENTES (Strings) que vieram do banco
  const [existingFiles, setExistingFiles] = useState<string[]>(initialData?.anexos || []);
  
  // 3. Arquivos REMOVIDOS (Strings) para avisar o backend o que deletar
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);

  // --- HANDLERS ---

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // ... (outros handlers de tipo e insumo permanecem iguais) ...
  const handleTypeChange = (type: any) => setFormData(prev => ({ ...prev, tipo: type }));
  const handleInsumoOption = (show: boolean) => {
    setShowInsumos(show);
    if(!show) setFormData(prev => ({ ...prev, insumoNome: '', insumoQuantidade: '', insumoUnidade: '' }));
  };

  // Adicionar novos arquivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      // Adiciona aos novos sem perder os que já foram selecionados nesta sessão
      setNewFiles((prev) => [...prev, ...filesArray]);
    }
  };

  // Remover arquivo (funciona tanto para novos quanto para existentes)
  const handleRemoveFile = (index: number, type: 'new' | 'existing') => {
    if (type === 'new') {
      setNewFiles((prev) => prev.filter((_, i) => i !== index));
    } else {
      const fileToRemove = existingFiles[index];
      setExistingFiles((prev) => prev.filter((_, i) => i !== index));
      setRemovedFiles((prev) => [...prev, fileToRemove]);
    }
  };

  // Visualizar arquivo (abre em nova aba)
  const handleViewFile = (file: File | string) => {
    if (typeof file === 'string') {
      // Arquivo existente: abre URL do backend
      window.open(`${UPLOADS_URL}/${file}`, '_blank');
    } else {
      // Arquivo novo: cria URL temporária local
      const url = URL.createObjectURL(file);
      window.open(url, '_blank');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    // Envia dados, arquivos novos E a lista de arquivos antigos para remover
    onSubmit({ ...formData, anexos: existingFiles }, newFiles, removedFiles);
  };

  // ... (useEffect de validação permanece igual) ...
  useEffect(() => {
    const isBasicInfoValid = formData.date.trim() !== '' && formData.propriedade.trim() !== '' && formData.descricao.trim() !== '' && formData.responsavel.trim() !== '';
    let isInsumoValid = true;
    if (showInsumos) {
      isInsumoValid = (formData.insumoNome || "").trim() !== '';
    }
    setIsValid(isBasicInfoValid && isInsumoValid);
  }, [formData, showInsumos]);

  const title = isEditMode ? 'Editar atividade' : 'Nova atividade';
  const submitText = isEditMode ? 'Salvar alterações' : 'Salvar atividade';

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <FiArrowLeft size={20} />
          <span>{title}</span>
        </button>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* ... (Seções Detalhes, Tipo e Insumo - CÓDIGO IGUAL AO ANTERIOR) ... */}
         <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Detalhes da atividade</h3>
          <div className={styles.fieldGroup}>
            <Input label="Data da atividade" name="date" type="date" value={formData.date} onChange={handleChange} icon={<FiCalendar size={18} />} />
            <Input as="select" label="Propriedade associada" name="propriedade" value={formData.propriedade} onChange={handleChange} options={mockProperties} icon={<IoIosArrowDown size={18} />} />
          </div>
        </div>

         <div className={styles.section}>
           <h3 className={styles.sectionTitle}>Tipo de atividade</h3>
           <div className={styles.tagGroup}>
             <TagToggle color="red" isActive={formData.tipo === 'preparo'} onClick={() => handleTypeChange('preparo')} type="button">Preparo</TagToggle>
             <TagToggle color="blue" isActive={formData.tipo === 'aplicacao'} onClick={() => handleTypeChange('aplicacao')} type="button">Aplicação</TagToggle>
             <TagToggle color="green" isActive={formData.tipo === 'colheita'} onClick={() => handleTypeChange('colheita')} type="button">Colheita</TagToggle>
             <TagToggle color="orange" isActive={formData.tipo === 'manejo'} onClick={() => handleTypeChange('manejo')} type="button">Manejo de solo</TagToggle>
          </div>
           <Input as="textarea" label="Descrição detalhada da atividade" name="descricao" value={formData.descricao} onChange={handleChange} rows={4} />
           <Input label="Responsável pela execução" name="responsavel" value={formData.responsavel} onChange={handleChange} />
         </div>

        <div className={styles.section}>
           <h3 className={styles.sectionTitle}>Produto ou Insumo</h3>
           <div className={styles.radioGroup}>
             <Radio label="Sim" name="insumo_opt" checked={showInsumos} onChange={() => handleInsumoOption(true)} />
             <Radio label="Não" name="insumo_opt" checked={!showInsumos} onChange={() => handleInsumoOption(false)} />
           </div>
           {showInsumos && (
            <div className={styles.insumoFields}>
              <Input as="select" label="Nome do produto/insumo utilizado" name="insumoNome" value={formData.insumoNome} onChange={handleChange} options={mockInsumos} icon={<IoIosArrowDown size={18} />} />
              <div className={styles.fieldGroup}>
                <Input label="Quantidade utilizada" name="insumoQuantidade" value={formData.insumoQuantidade} onChange={handleChange} />
                <Input as="select" label="Unidade" name="insumoUnidade" value={formData.insumoUnidade} onChange={handleChange} options={mockUnidades} icon={<IoIosArrowDown size={18} />} />
              </div>
            </div>
          )}
        </div>

        {/* --- SEÇÃO DE ANEXOS ATUALIZADA --- */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Anexos</h3>
          <p className={styles.sectionSubtitle}>
            Você pode inserir fotos da plantação, notas fiscais, recibos.
          </p>

          {/* Lista de Arquivos (Existentes + Novos) */}
          <div className={styles.fileList}>
            {/* 1. Arquivos Existentes */}
            {existingFiles.map((fileName, index) => (
              <div key={`existing-${index}`} className={styles.fileItem}>
                <span className={styles.fileName}>{fileName}</span>
                <div className={styles.fileActions}>
                  <button type="button" onClick={() => handleViewFile(fileName)} className={styles.actionBtn} title="Visualizar">
                    <FiEye size={18} />
                  </button>
                  <button type="button" onClick={() => handleRemoveFile(index, 'existing')} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Remover">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {/* 2. Arquivos Novos */}
            {newFiles.map((file, index) => (
              <div key={`new-${index}`} className={styles.fileItem}>
                <span className={styles.fileName}>{file.name} (Novo)</span>
                <div className={styles.fileActions}>
                  <button type="button" onClick={() => handleViewFile(file)} className={styles.actionBtn} title="Visualizar">
                    <FiEye size={18} />
                  </button>
                  <button type="button" onClick={() => handleRemoveFile(index, 'new')} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Remover">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <FileInput 
            leftIcon={<FiUpload size={18} />}
            onChange={handleFileChange}
            multiple 
          >
            Fazer upload de foto ou documento
          </FileInput>
        </div>
        
        <footer className={styles.footer}>
          <Button variant="tertiary" type="button" onClick={() => navigate(-1)} disabled={isLoading}>Cancelar</Button>
          <Button variant="primary" type="submit" disabled={!isValid || isLoading}>{isLoading ? 'Salvando...' : submitText}</Button>
        </footer>
      </form>
    </div>
  );
}