// src/pages/EditActivity.tsx
import ActivityForm from '../pages/ActivityForm';
import { useNavigate, useParams } from 'react-router-dom';

// (Você deve mover seu mockData para um local central, mas por enquanto...)
const mockData = [
  {
    id: 1,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: 2,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: 3,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: 4,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: 5,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: 6,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: 7,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: 8,
    date: '12/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
  {
    id: 9,
    date: '02/07/25',
    title: 'Lorem Ipsum',
    preparo: 'Aragem no solo do talhão 3',
    aplicacao: 'Fertilizante NPK (20 kg)',
    responsavel: 'Lorem Ipsum e equipe',
    propriedade: 'Sítio Oliveira',
    tipo: 'preparo' as 'preparo',
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    anexos: [{ name: 'Foto.png' }],
  },
];

export default function EditActivity() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o 'id' da URL (ex: /diary/edit/1)

  // 1. "Busca" a atividade. (Em um app real, isso seria um fetch/useEffect)
  const activityToEdit = mockData.find(
    (activity) => activity.id.toString() === id
  );

  const handleEdit = (data: any) => {
    console.log(`EDITANDO ATIVIDADE ${id}:`, data);
    // Lógica para salvar...
    navigate('/diary'); // Volta para a lista
  };

  if (!activityToEdit) {
    return <div>Atividade não encontrada!</div>;
  }

  // 2. Renderiza o formulário em modo "Editar"
  return (
    <ActivityForm initialData={activityToEdit} onSubmit={handleEdit} />
  );
}