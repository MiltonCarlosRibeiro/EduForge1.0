import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2, Plus, FileDown, Users, RefreshCw } from 'lucide-react';
import {
  getGradeConfig,
  updateGradeConfig,
  getAssignmentsByStudent,
  getExamsByStudent,
  getGroupActivitiesByStudent,
  getQuizGradesByStudent,
  createAssignment,
  createExam,
  createGroupActivity,
  createQuizGrade,
  deleteAssignment,
  deleteExam,
  deleteGroupActivity,
  deleteQuizGrade,
  calculateAndSaveFinalGrade,
  getStudentFinalGrade,
  getAllStudentFinalGrades,
} from '@/db/api';
import { getStudentsHybrid, syncStudentsToSupabase } from '@/utils/studentSync';
import type {
  StudentDB,
  GradeConfig,
  AssignmentDB,
  ExamDB,
  GroupActivity,
  QuizGrade,
  StudentFinalGrade,
} from '@/types/types';
import { generateStudentReport, generateAllStudentsReport } from '@/utils/pdfGenerator';
import { toast } from 'sonner';

export const GradesPage: React.FC = () => {
  const [students, setStudents] = useState<StudentDB[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [config, setConfig] = useState<GradeConfig | null>(null);
  const [assignments, setAssignments] = useState<AssignmentDB[]>([]);
  const [exams, setExams] = useState<ExamDB[]>([]);
  const [groupActivities, setGroupActivities] = useState<GroupActivity[]>([]);
  const [quizzes, setQuizzes] = useState<QuizGrade[]>([]);
  const [finalGrade, setFinalGrade] = useState<StudentFinalGrade | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Estados para formulários
  const [newAssignment, setNewAssignment] = useState({ title: '', grade: '', weight: '1.0' });
  const [newExam, setNewExam] = useState({ title: '', grade: '', weight: '1.0' });
  const [newGroupActivity, setNewGroupActivity] = useState({ title: '', grade: '' });
  const [newQuiz, setNewQuiz] = useState({ title: '', correct: '', total: '' });

  useEffect(() => {
    loadStudents();
    loadConfig();
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      loadStudentData(selectedStudentId);
    }
  }, [selectedStudentId]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudentsHybrid();
      setStudents(data);
      
      if (data.length === 0) {
        toast.info('Nenhum aluno encontrado. Cadastre alunos na página "Gestão de Alunos".');
      }
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
      toast.error('Erro ao carregar alunos');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncStudents = async () => {
    setSyncing(true);
    try {
      toast.loading('Sincronizando alunos...');
      const syncedStudents = await syncStudentsToSupabase();
      setStudents(syncedStudents);
      toast.success(`${syncedStudents.length} alunos sincronizados com sucesso!`);
    } catch (error) {
      console.error('Erro ao sincronizar:', error);
      toast.error('Erro ao sincronizar alunos');
    } finally {
      setSyncing(false);
    }
  };

  const loadConfig = async () => {
    const data = await getGradeConfig();
    setConfig(data);
  };

  const loadStudentData = async (studentId: string) => {
    setLoading(true);
    const [assignmentsData, examsData, groupData, quizzesData, gradeData] = await Promise.all([
      getAssignmentsByStudent(studentId),
      getExamsByStudent(studentId),
      getGroupActivitiesByStudent(studentId),
      getQuizGradesByStudent(studentId),
      getStudentFinalGrade(studentId),
    ]);
    setAssignments(assignmentsData);
    setExams(examsData);
    setGroupActivities(groupData);
    setQuizzes(quizzesData);
    setFinalGrade(gradeData);
    setLoading(false);
  };

  const handleAddAssignment = async () => {
    if (!selectedStudentId || !newAssignment.title || !newAssignment.grade) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      await createAssignment({
        student_id: selectedStudentId,
        title: newAssignment.title,
        grade: parseFloat(newAssignment.grade),
        weight: parseFloat(newAssignment.weight),
        delivered: true,
      });
      setNewAssignment({ title: '', grade: '', weight: '1.0' });
      await loadStudentData(selectedStudentId);
      await recalculateGrade();
      toast.success('Trabalho adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar trabalho:', error);
      toast.error('Erro ao adicionar trabalho');
    }
  };

  const handleAddExam = async () => {
    if (!selectedStudentId || !newExam.title || !newExam.grade) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      await createExam({
        student_id: selectedStudentId,
        title: newExam.title,
        grade: parseFloat(newExam.grade),
        weight: parseFloat(newExam.weight),
      });
      setNewExam({ title: '', grade: '', weight: '1.0' });
      await loadStudentData(selectedStudentId);
      await recalculateGrade();
      toast.success('Prova adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar prova:', error);
      toast.error('Erro ao adicionar prova');
    }
  };

  const handleAddGroupActivity = async () => {
    if (!selectedStudentId || !newGroupActivity.title || !newGroupActivity.grade) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      await createGroupActivity({
        student_id: selectedStudentId,
        title: newGroupActivity.title,
        grade: parseFloat(newGroupActivity.grade),
      });
      setNewGroupActivity({ title: '', grade: '' });
      await loadStudentData(selectedStudentId);
      await recalculateGrade();
      toast.success('Atividade em grupo adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar atividade:', error);
      toast.error('Erro ao adicionar atividade em grupo');
    }
  };

  const handleAddQuiz = async () => {
    if (!selectedStudentId || !newQuiz.title || !newQuiz.correct || !newQuiz.total) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      await createQuizGrade({
        student_id: selectedStudentId,
        quiz_title: newQuiz.title,
        correct_answers: parseInt(newQuiz.correct),
        total_questions: parseInt(newQuiz.total),
      });
      setNewQuiz({ title: '', correct: '', total: '' });
      await loadStudentData(selectedStudentId);
      await recalculateGrade();
      toast.success('Questionário adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar questionário:', error);
      toast.error('Erro ao adicionar questionário');
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    try {
      await deleteAssignment(id);
      await loadStudentData(selectedStudentId);
      await recalculateGrade();
      toast.success('Trabalho removido');
    } catch (error) {
      console.error('Erro ao deletar trabalho:', error);
      toast.error('Erro ao remover trabalho');
    }
  };

  const handleDeleteExam = async (id: string) => {
    try {
      await deleteExam(id);
      await loadStudentData(selectedStudentId);
      await recalculateGrade();
      toast.success('Prova removida');
    } catch (error) {
      console.error('Erro ao deletar prova:', error);
      toast.error('Erro ao remover prova');
    }
  };

  const handleDeleteGroupActivity = async (id: string) => {
    try {
      await deleteGroupActivity(id);
      await loadStudentData(selectedStudentId);
      await recalculateGrade();
      toast.success('Atividade removida');
    } catch (error) {
      console.error('Erro ao deletar atividade:', error);
      toast.error('Erro ao remover atividade');
    }
  };

  const handleDeleteQuiz = async (id: string) => {
    try {
      await deleteQuizGrade(id);
      await loadStudentData(selectedStudentId);
      await recalculateGrade();
      toast.success('Questionário removido');
    } catch (error) {
      console.error('Erro ao deletar questionário:', error);
      toast.error('Erro ao remover questionário');
    }
  };

  const recalculateGrade = async () => {
    if (!selectedStudentId) return;
    try {
      const grade = await calculateAndSaveFinalGrade(selectedStudentId);
      setFinalGrade(grade);
    } catch (error) {
      console.error('Erro ao calcular nota:', error);
      toast.error('Erro ao calcular média final');
    }
  };

  const handleUpdateConfig = async () => {
    if (!config) return;
    
    // Validar soma dos pesos
    const sum = config.assignments_weight + config.exams_weight + 
                config.group_activities_weight + config.quizzes_weight;
    
    if (Math.abs(sum - 1.0) > 0.001) {
      toast.error('A soma dos pesos deve ser exatamente 1.000 (100%)');
      return;
    }
    
    try {
      await updateGradeConfig(config);
      await recalculateGrade();
      toast.success('Configuração salva com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error);
      toast.error('Erro ao salvar configuração');
    }
  };

  const handleExportStudentReport = async () => {
    if (!selectedStudentId) return;
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return;
    
    try {
      await generateStudentReport(student, assignments, exams, groupActivities, quizzes, finalGrade, config);
      toast.success('Relatório gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      toast.error('Erro ao gerar relatório');
    }
  };

  const handleExportAllReport = async () => {
    try {
      const allGrades = await getAllStudentFinalGrades();
      await generateAllStudentsReport(students, allGrades, config);
      toast.success('Relatório geral gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar relatório geral:', error);
      toast.error('Erro ao gerar relatório geral');
    }
  };

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Gestão de Notas</h1>
        <div className="flex gap-2">
          <Button onClick={handleSyncStudents} variant="outline" disabled={syncing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            Sincronizar Alunos
          </Button>
          <Button onClick={handleExportAllReport} variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Relatório Geral
          </Button>
        </div>
      </div>

      {/* Seletor de Aluno */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecionar Aluno</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Nenhum aluno encontrado. Cadastre alunos na página "Gestão de Alunos".
              </p>
              <Button onClick={handleSyncStudents} disabled={syncing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                Tentar Sincronizar
              </Button>
            </div>
          ) : (
            <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha um aluno" />
              </SelectTrigger>
              <SelectContent>
                {students.map(student => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name} {student.registration_number && `(${student.registration_number})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      {selectedStudentId && !loading && (
        <>
          {/* Configuração de Pesos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuração de Avaliação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label className="text-xs">Média de Aprovação</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={config?.passing_grade || 0.6}
                    onChange={(e) => setConfig(prev => prev ? { ...prev, passing_grade: parseFloat(e.target.value) } : null)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Peso Trabalhos</Label>
                  <Input
                    type="number"
                    step="0.001"
                    value={config?.assignments_weight || 0.25}
                    onChange={(e) => setConfig(prev => prev ? { ...prev, assignments_weight: parseFloat(e.target.value) } : null)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Peso Provas</Label>
                  <Input
                    type="number"
                    step="0.001"
                    value={config?.exams_weight || 0.4}
                    onChange={(e) => setConfig(prev => prev ? { ...prev, exams_weight: parseFloat(e.target.value) } : null)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Peso Ativ. Grupo</Label>
                  <Input
                    type="number"
                    step="0.001"
                    value={config?.group_activities_weight || 0.15}
                    onChange={(e) => setConfig(prev => prev ? { ...prev, group_activities_weight: parseFloat(e.target.value) } : null)}
                  />
                </div>
                <div>
                  <Label className="text-xs">Peso Questionários</Label>
                  <Input
                    type="number"
                    step="0.001"
                    value={config?.quizzes_weight || 0.2}
                    onChange={(e) => setConfig(prev => prev ? { ...prev, quizzes_weight: parseFloat(e.target.value) } : null)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpdateConfig} size="sm">Salvar Configuração</Button>
                <p className="text-xs text-muted-foreground flex items-center">
                  Soma dos pesos: {((config?.assignments_weight || 0) + (config?.exams_weight || 0) + (config?.group_activities_weight || 0) + (config?.quizzes_weight || 0)).toFixed(3)}
                  {((config?.assignments_weight || 0) + (config?.exams_weight || 0) + (config?.group_activities_weight || 0) + (config?.quizzes_weight || 0)) !== 1.0 && (
                    <span className="ml-2 text-destructive">⚠ Deve somar 1.000</span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trabalhos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trabalhos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Input
                  placeholder="Título"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Nota (0-10)"
                  value={newAssignment.grade}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, grade: e.target.value }))}
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Peso"
                  value={newAssignment.weight}
                  onChange={(e) => setNewAssignment(prev => ({ ...prev, weight: e.target.value }))}
                />
                <Button onClick={handleAddAssignment} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
              <div className="space-y-2">
                {assignments.map(assignment => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 bg-accent rounded-md">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{assignment.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Nota: {assignment.grade} | Peso: {assignment.weight}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAssignment(assignment.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {assignments.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Nenhum trabalho cadastrado</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Provas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Provas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Input
                  placeholder="Título"
                  value={newExam.title}
                  onChange={(e) => setNewExam(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Nota (0-10)"
                  value={newExam.grade}
                  onChange={(e) => setNewExam(prev => ({ ...prev, grade: e.target.value }))}
                />
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Peso"
                  value={newExam.weight}
                  onChange={(e) => setNewExam(prev => ({ ...prev, weight: e.target.value }))}
                />
                <Button onClick={handleAddExam} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
              <div className="space-y-2">
                {exams.map(exam => (
                  <div key={exam.id} className="flex items-center justify-between p-3 bg-accent rounded-md">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{exam.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Nota: {exam.grade} | Peso: {exam.weight}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteExam(exam.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {exams.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Nenhuma prova cadastrada</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Atividades em Grupo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Atividades em Grupo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Título"
                  value={newGroupActivity.title}
                  onChange={(e) => setNewGroupActivity(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Nota (0-10)"
                  value={newGroupActivity.grade}
                  onChange={(e) => setNewGroupActivity(prev => ({ ...prev, grade: e.target.value }))}
                />
                <Button onClick={handleAddGroupActivity} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
              <div className="space-y-2">
                {groupActivities.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-accent rounded-md">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">Nota: {activity.grade}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteGroupActivity(activity.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {groupActivities.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Nenhuma atividade cadastrada</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Questionários */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Questionários</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Input
                  placeholder="Título"
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Acertos"
                  value={newQuiz.correct}
                  onChange={(e) => setNewQuiz(prev => ({ ...prev, correct: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Total de questões"
                  value={newQuiz.total}
                  onChange={(e) => setNewQuiz(prev => ({ ...prev, total: e.target.value }))}
                />
                <Button onClick={handleAddQuiz} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </div>
              <div className="space-y-2">
                {quizzes.map(quiz => (
                  <div key={quiz.id} className="flex items-center justify-between p-3 bg-accent rounded-md">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{quiz.quiz_title}</p>
                      <p className="text-xs text-muted-foreground">
                        {quiz.correct_answers}/{quiz.total_questions} acertos | Nota: {quiz.grade?.toFixed(2)}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteQuiz(quiz.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {quizzes.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Nenhum questionário cadastrado</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Resultado Final */}
          {finalGrade && (
            <Card className={finalGrade.status === 'Aprovado' ? 'border-primary' : 'border-destructive'}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Resultado Final - {selectedStudent?.name}</span>
                  <Button onClick={handleExportStudentReport} variant="outline" size="sm">
                    <FileDown className="w-4 h-4 mr-2" />
                    Exportar PDF
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Média Trabalhos</p>
                    <p className="text-lg font-medium">{finalGrade.assignments_avg.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Média Provas</p>
                    <p className="text-lg font-medium">{finalGrade.exams_avg.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Média Ativ. Grupo</p>
                    <p className="text-lg font-medium">{finalGrade.group_activities_avg.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Média Questionários</p>
                    <p className="text-lg font-medium">{finalGrade.quizzes_avg.toFixed(2)}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Nota Final</p>
                      <p className="text-3xl font-bold">{finalGrade.final_grade.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className={`text-2xl font-bold ${finalGrade.status === 'Aprovado' ? 'text-primary' : 'text-destructive'}`}>
                        {finalGrade.status}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {selectedStudentId && loading && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Carregando dados do aluno...</p>
          </CardContent>
        </Card>
      )}

      {!selectedStudentId && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Selecione um aluno para gerenciar suas notas</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
