// src/utils/generatePDF.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ActivityDTO } from '../services/activityService';
import { Property as PropertyResponseDTO } from '../types/property.types';

export const generateActivityReport = (activities: ActivityDTO[], filterDescription?: string) => {
  const doc = new jsPDF('landscape', 'mm', 'a4');

  const colorPrimary = '#008542'; 
  const colorSecondary = '#e3f4e9'; 

  doc.setFontSize(18);
  doc.setTextColor(colorPrimary);
  doc.text('Relatório de Atividades - AgroDiário', 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(100);
  const today = new Date().toLocaleDateString('pt-BR');
  doc.text(`Gerado em: ${today}`, 14, 30);
  
  if (filterDescription) {
    doc.text(`Filtro aplicado: ${filterDescription}`, 14, 35);
  }

  doc.setDrawColor(200);
  doc.line(14, 38, 283, 38); 
  
  const tableColumn = [
    "Data", 
    "Atividade / Operação", 
    "Propriedade", 
    "Responsável", 
    "Insumos Utilizados", 
    "Descrição"
  ];

  const tableRows = activities.map(item => {
    const dataFormatada = new Date(item.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    
    const tituloOperacao = `${item.titulo || item.tipo.toUpperCase()}\n(${item.operacao || 'Sem detalhes'})`;
    
    const insumos = item.insumoNome 
      ? `${item.insumoNome}\n${item.insumoQuantidade || ''} ${item.insumoUnidade || ''}`
      : '-';

    return [
      dataFormatada,
      tituloOperacao,
      item.propriedade,
      item.responsavel,
      insumos,
      item.descricao || '-'
    ];
  });


  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 45,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 3,
      valign: 'middle',
      overflow: 'linebreak', 
    },
    headStyles: {
      fillColor: colorPrimary,
      textColor: 255,
      fontSize: 10,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 25 }, 
      1: { cellWidth: 50 }, 
      2: { cellWidth: 40 }, 
      3: { cellWidth: 35 }, 
      4: { cellWidth: 40 },
      5: { cellWidth: 'auto' } 
    },
    alternateRowStyles: {
      fillColor: colorSecondary, 
    },
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  doc.save(`agrodiario_relatorio_${new Date().toISOString().slice(0,10)}.pdf`);
};


export const generatePropertyReport = (properties: PropertyResponseDTO[], filterDescription?: string) => {  const doc = new jsPDF('landscape', 'mm', 'a4');

  const colorPrimary = '#008542'; 
  const colorSecondary = '#e3f4e9'; 

  // --- Cabeçalho do Documento ---
  doc.setFontSize(18);
  doc.setTextColor(colorPrimary);
  doc.text('Relatório de Propriedades - AgroDiário', 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(100);
  const today = new Date().toLocaleDateString('pt-BR');
  doc.text(`Gerado em: ${today}`, 14, 30);
  
  if (filterDescription) {
    doc.text(`Filtro aplicado: ${filterDescription}`, 14, 35);
  }

  doc.setDrawColor(200);
  doc.line(14, 38, 283, 38); 
  
  // --- Estrutura da Tabela ---
  const tableColumn = [
    "Nome", 
    "Endereço", 
    "Área Total (ha)", 
    "Área Prod. (ha)", 
    "Cultivo Principal", 
    "Certificações",
    "Data de Criação"
  ];

  const tableRows = properties.map(item => {
    
    // Formatação dos campos
    const areaTotal = item.totalArea ? `${Number(item.totalArea).toFixed(2)}` : 'N/A';
    const areaProducao = item.productionArea ? `${Number(item.productionArea).toFixed(2)}` : 'N/A';
    const certificacoes = item.certifications || '-';
    
    // Note que createdAt é um objeto Date no DTO, precisa ser formatado
    const dataCriacao = item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR') : '-';

    return [
      item.name,
      item.address,
      areaTotal,
      areaProducao,
      item.mainCrop,
      certificacoes,
      dataCriacao
    ];
  });


  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 45,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 2,
      valign: 'middle',
      overflow: 'linebreak', 
    },
    headStyles: {
      fillColor: colorPrimary,
      textColor: 255,
      fontSize: 10,
      fontStyle: 'bold',
    },
    columnStyles: {
      // Ajustar larguras de coluna para A4 paisagem
      0: { cellWidth: 35 }, // Nome
      1: { cellWidth: 70 }, // Endereço
      2: { cellWidth: 25, halign: 'center' }, // Área Total
      3: { cellWidth: 25, halign: 'center' }, // Área Produtiva
      4: { cellWidth: 35 }, // Cultivo Principal
      5: { cellWidth: 50 }, // Certificações
      6: { cellWidth: 25, halign: 'center' }  // Data de Criação
    },
    alternateRowStyles: {
      fillColor: colorSecondary, 
    },
  });

  // --- Rodapé (Paginação) ---
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  doc.save(`agrodiario_relatorio_propriedades_${new Date().toISOString().slice(0,10)}.pdf`);
};