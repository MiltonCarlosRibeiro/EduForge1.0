import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type {
  StudentDB,
  AssignmentDB,
  ExamDB,
  GroupActivity,
  QuizGrade,
  StudentFinalGrade,
  GradeConfig,
} from '@/types/types';

/**
 * Gera relatório individual do aluno em PDF
 */
export async function generateStudentReport(
  student: StudentDB,
  assignments: AssignmentDB[],
  exams: ExamDB[],
  groupActivities: GroupActivity[],
  quizzes: QuizGrade[],
  finalGrade: StudentFinalGrade | null,
  config: GradeConfig | null
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Cabeçalho
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Relatório de Desempenho do Aluno', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('EduForge - Plataforma Educacional', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.setFontSize(10);
  doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 14, yPosition);
  
  yPosition += 10;
  doc.setDrawColor(200, 200, 200);
  doc.line(14, yPosition, pageWidth - 14, yPosition);
  
  // Dados do Aluno
  yPosition += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Dados do Aluno', 14, yPosition);
  
  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nome: ${student.name}`, 14, yPosition);
  
  if (student.registration_number) {
    yPosition += 6;
    doc.text(`Matrícula: ${student.registration_number}`, 14, yPosition);
  }
  
  if (student.email) {
    yPosition += 6;
    doc.text(`E-mail: ${student.email}`, 14, yPosition);
  }
  
  // Trabalhos
  yPosition += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Trabalhos Entregues', 14, yPosition);
  
  yPosition += 5;
  if (assignments.length > 0) {
    autoTable(doc, {
      startY: yPosition,
      head: [['Título', 'Nota', 'Peso', 'Nota Ponderada']],
      body: assignments.map(a => [
        a.title,
        a.grade.toFixed(2),
        a.weight.toFixed(2),
        (a.grade * a.weight).toFixed(2)
      ]),
      theme: 'grid',
      headStyles: { fillColor: [100, 100, 100], fontSize: 9 },
      bodyStyles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
    });
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  } else {
    yPosition += 5;
    doc.setFont('helvetica', 'italic');
    doc.text('Nenhum trabalho cadastrado', 14, yPosition);
    yPosition += 10;
  }
  
  // Provas
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Provas', 14, yPosition);
  
  yPosition += 5;
  if (exams.length > 0) {
    autoTable(doc, {
      startY: yPosition,
      head: [['Título', 'Nota', 'Peso', 'Nota Ponderada']],
      body: exams.map(e => [
        e.title,
        e.grade.toFixed(2),
        e.weight.toFixed(2),
        (e.grade * e.weight).toFixed(2)
      ]),
      theme: 'grid',
      headStyles: { fillColor: [100, 100, 100], fontSize: 9 },
      bodyStyles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
    });
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  } else {
    yPosition += 5;
    doc.setFont('helvetica', 'italic');
    doc.text('Nenhuma prova cadastrada', 14, yPosition);
    yPosition += 10;
  }
  
  // Atividades em Grupo
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Atividades em Grupo', 14, yPosition);
  
  yPosition += 5;
  if (groupActivities.length > 0) {
    autoTable(doc, {
      startY: yPosition,
      head: [['Título', 'Nota']],
      body: groupActivities.map(g => [g.title, g.grade.toFixed(2)]),
      theme: 'grid',
      headStyles: { fillColor: [100, 100, 100], fontSize: 9 },
      bodyStyles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
    });
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  } else {
    yPosition += 5;
    doc.setFont('helvetica', 'italic');
    doc.text('Nenhuma atividade cadastrada', 14, yPosition);
    yPosition += 10;
  }
  
  // Questionários
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Questionários', 14, yPosition);
  
  yPosition += 5;
  if (quizzes.length > 0) {
    autoTable(doc, {
      startY: yPosition,
      head: [['Título', 'Acertos', 'Total', 'Nota']],
      body: quizzes.map(q => [
        q.quiz_title,
        q.correct_answers.toString(),
        q.total_questions.toString(),
        (q.grade || 0).toFixed(2)
      ]),
      theme: 'grid',
      headStyles: { fillColor: [100, 100, 100], fontSize: 9 },
      bodyStyles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
    });
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  } else {
    yPosition += 5;
    doc.setFont('helvetica', 'italic');
    doc.text('Nenhum questionário cadastrado', 14, yPosition);
    yPosition += 10;
  }
  
  // Resultado Final
  if (finalGrade) {
    // Nova página se necessário
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }
    
    yPosition += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, yPosition, pageWidth - 14, yPosition);
    
    yPosition += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Resultado Final', 14, yPosition);
    
    yPosition += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    autoTable(doc, {
      startY: yPosition,
      head: [['Categoria', 'Média', 'Peso', 'Contribuição']],
      body: [
        [
          'Trabalhos',
          finalGrade.assignments_avg.toFixed(2),
          ((config?.assignments_weight || 0) * 100).toFixed(1) + '%',
          (finalGrade.assignments_avg * (config?.assignments_weight || 0)).toFixed(2)
        ],
        [
          'Provas',
          finalGrade.exams_avg.toFixed(2),
          ((config?.exams_weight || 0) * 100).toFixed(1) + '%',
          (finalGrade.exams_avg * (config?.exams_weight || 0)).toFixed(2)
        ],
        [
          'Atividades em Grupo',
          finalGrade.group_activities_avg.toFixed(2),
          ((config?.group_activities_weight || 0) * 100).toFixed(1) + '%',
          (finalGrade.group_activities_avg * (config?.group_activities_weight || 0)).toFixed(2)
        ],
        [
          'Questionários',
          finalGrade.quizzes_avg.toFixed(2),
          ((config?.quizzes_weight || 0) * 100).toFixed(1) + '%',
          (finalGrade.quizzes_avg * (config?.quizzes_weight || 0)).toFixed(2)
        ],
      ],
      theme: 'grid',
      headStyles: { fillColor: [100, 100, 100], fontSize: 9 },
      bodyStyles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 15;
    
    // Nota Final e Status
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Nota Final: ${finalGrade.final_grade.toFixed(2)}`, 14, yPosition);
    
    yPosition += 10;
    const statusColor = finalGrade.status === 'Aprovado' ? [0, 128, 0] : [255, 0, 0];
    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.text(`Status: ${finalGrade.status}`, 14, yPosition);
    doc.setTextColor(0, 0, 0);
    
    if (config) {
      yPosition += 8;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Média de aprovação: ${(config.passing_grade * 10).toFixed(2)}`, 14, yPosition);
    }
  }
  
  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.text(
      '© 2026 EduForge - Desenvolvido por Milton Carlos Ribeiro',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 5,
      { align: 'center' }
    );
  }
  
  // Salvar
  doc.save(`relatorio_${student.name.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`);
}

/**
 * Gera relatório geral de todos os alunos em PDF
 */
export async function generateAllStudentsReport(
  students: StudentDB[],
  finalGrades: StudentFinalGrade[],
  config: GradeConfig | null
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPosition = 20;

  // Cabeçalho
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Relatório Geral de Desempenho', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('EduForge - Plataforma Educacional', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 15;
  doc.setFontSize(10);
  doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 14, yPosition);
  doc.text(`Total de alunos: ${students.length}`, pageWidth - 14, yPosition, { align: 'right' });
  
  yPosition += 10;
  doc.setDrawColor(200, 200, 200);
  doc.line(14, yPosition, pageWidth - 14, yPosition);
  
  // Configuração
  if (config) {
    yPosition += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Configuração de Avaliação', 14, yPosition);
    
    yPosition += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Média de aprovação: ${(config.passing_grade * 10).toFixed(2)}`, 14, yPosition);
    doc.text(`Trabalhos: ${(config.assignments_weight * 100).toFixed(1)}%`, 70, yPosition);
    doc.text(`Provas: ${(config.exams_weight * 100).toFixed(1)}%`, 120, yPosition);
    doc.text(`Ativ. Grupo: ${(config.group_activities_weight * 100).toFixed(1)}%`, 160, yPosition);
    
    yPosition += 10;
  }
  
  // Tabela de alunos
  yPosition += 5;
  const tableData = students.map(student => {
    const grade = finalGrades.find(g => g.student_id === student.id);
    return [
      student.name,
      student.registration_number || '-',
      grade ? grade.assignments_avg.toFixed(2) : '-',
      grade ? grade.exams_avg.toFixed(2) : '-',
      grade ? grade.group_activities_avg.toFixed(2) : '-',
      grade ? grade.quizzes_avg.toFixed(2) : '-',
      grade ? grade.final_grade.toFixed(2) : '-',
      grade ? grade.status : 'Pendente',
    ];
  });
  
  autoTable(doc, {
    startY: yPosition,
    head: [['Nome', 'Matrícula', 'Trabalhos', 'Provas', 'Ativ. Grupo', 'Questionários', 'Nota Final', 'Status']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [100, 100, 100], fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 20 },
      2: { cellWidth: 18 },
      3: { cellWidth: 18 },
      4: { cellWidth: 18 },
      5: { cellWidth: 22 },
      6: { cellWidth: 18 },
      7: { cellWidth: 22 },
    },
    margin: { left: 14, right: 14 },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 7) {
        const status = data.cell.text[0];
        if (status === 'Aprovado') {
          data.cell.styles.textColor = [0, 128, 0];
          data.cell.styles.fontStyle = 'bold';
        } else if (status === 'Reprovado') {
          data.cell.styles.textColor = [255, 0, 0];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    },
  });
  
  yPosition = (doc as any).lastAutoTable.finalY + 15;
  
  // Estatísticas
  const approved = finalGrades.filter(g => g.status === 'Aprovado').length;
  const failed = finalGrades.filter(g => g.status === 'Reprovado').length;
  const pending = students.length - approved - failed;
  const avgGrade = finalGrades.length > 0
    ? finalGrades.reduce((sum, g) => sum + g.final_grade, 0) / finalGrades.length
    : 0;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Estatísticas', 14, yPosition);
  
  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Aprovados: ${approved} (${((approved / students.length) * 100).toFixed(1)}%)`, 14, yPosition);
  
  yPosition += 6;
  doc.text(`Reprovados: ${failed} (${((failed / students.length) * 100).toFixed(1)}%)`, 14, yPosition);
  
  yPosition += 6;
  doc.text(`Pendentes: ${pending} (${((pending / students.length) * 100).toFixed(1)}%)`, 14, yPosition);
  
  yPosition += 6;
  doc.text(`Média geral da turma: ${avgGrade.toFixed(2)}`, 14, yPosition);
  
  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.text(
      '© 2026 EduForge - Desenvolvido por Milton Carlos Ribeiro',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 5,
      { align: 'center' }
    );
  }
  
  // Salvar
  doc.save(`relatorio_geral_${new Date().getTime()}.pdf`);
}
