import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, UserPlus } from 'lucide-react';
import { studentStorage } from '@/lib/localStorage';
import { Student, Assignment, Exam } from '@/types/types';
import { toast } from 'sonner';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);
  const [formData, setFormData] = React.useState<Partial<Student>>({
    name: '',
    column: '',
    desk: '',
    assignments: [],
    exams: [],
    presentedGroupWork: false,
    absent: false,
    notes: '',
  });

  React.useEffect(() => {
    const loadedStudents = studentStorage.load();
    setStudents(loadedStudents);
  }, []);

  const saveStudents = (updatedStudents: Student[]) => {
    setStudents(updatedStudents);
    studentStorage.save(updatedStudents);
  };

  const handleOpenDialog = (student?: Student) => {
    if (student) {
      setEditingStudent(student);
      setFormData(student);
    } else {
      setEditingStudent(null);
      setFormData({
        name: '',
        column: '',
        desk: '',
        assignments: [
          { id: '1', name: 'Trabalho 1', completed: false },
          { id: '2', name: 'Trabalho 2', completed: false },
        ],
        exams: [
          { id: '1', name: 'Prova 1', grade: '' },
          { id: '2', name: 'Prova 2', grade: '' },
        ],
        presentedGroupWork: false,
        absent: false,
        notes: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingStudent(null);
  };

  const handleSaveStudent = () => {
    if (!formData.name?.trim()) {
      toast.error('Digite o nome do aluno');
      return;
    }

    if (editingStudent) {
      const updatedStudents = students.map((s) =>
        s.id === editingStudent.id ? { ...formData, id: s.id } as Student : s
      );
      saveStudents(updatedStudents);
      toast.success('Aluno atualizado com sucesso');
    } else {
      const newStudent: Student = {
        ...formData,
        id: Date.now().toString(),
      } as Student;
      saveStudents([...students, newStudent]);
      toast.success('Aluno cadastrado com sucesso');
    }

    handleCloseDialog();
  };

  const handleDeleteStudent = (studentId: string) => {
    const updatedStudents = students.filter((s) => s.id !== studentId);
    saveStudents(updatedStudents);
    toast.success('Aluno removido');
  };

  const handleAddAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      name: `Trabalho ${(formData.assignments?.length || 0) + 1}`,
      completed: false,
    };
    setFormData({
      ...formData,
      assignments: [...(formData.assignments || []), newAssignment],
    });
  };

  const handleAddExam = () => {
    const newExam: Exam = {
      id: Date.now().toString(),
      name: `Prova ${(formData.exams?.length || 0) + 1}`,
      grade: '',
    };
    setFormData({
      ...formData,
      exams: [...(formData.exams || []), newExam],
    });
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-12 py-12 max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl mb-4">Gestão de Alunos</h1>
            <p className="text-muted-foreground">
              Cadastre e gerencie informações dos alunos
            </p>
          </div>

          {/* Botão adicionar aluno */}
          <div className="mb-8">
            <Button onClick={() => handleOpenDialog()} size="lg">
              <UserPlus className="w-5 h-5 mr-2" />
              Adicionar Aluno
            </Button>
          </div>

          {/* Lista de alunos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="p-12 text-center text-muted-foreground">
                  <p>Nenhum aluno cadastrado ainda.</p>
                  <p className="text-sm mt-2">
                    Clique em "Adicionar Aluno" para começar.
                  </p>
                </CardContent>
              </Card>
            ) : (
              students.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-medium">{student.name}</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(student)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Posição:</span>{' '}
                        {student.column} - {student.desk}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Trabalhos:</span>{' '}
                        {student.assignments?.filter((a) => a.completed).length || 0}/
                        {student.assignments?.length || 0}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Provas:</span>{' '}
                        {student.exams?.filter((e) => e.grade).length || 0}/
                        {student.exams?.length || 0}
                      </p>
                      {student.presentedGroupWork && (
                        <p className="text-primary">✓ Apresentou trabalho em grupo</p>
                      )}
                      {student.absent && (
                        <p className="text-destructive">✗ Faltou</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Dialog de criação/edição */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingStudent ? 'Editar Aluno' : 'Adicionar Aluno'}
                </DialogTitle>
                <DialogDescription>
                  Preencha as informações do aluno
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Nome do aluno"
                    />
                  </div>

                  <div>
                    <Label htmlFor="column">Coluna</Label>
                    <Input
                      id="column"
                      value={formData.column}
                      onChange={(e) =>
                        setFormData({ ...formData, column: e.target.value })
                      }
                      placeholder="ex: 1 direita"
                    />
                  </div>

                  <div>
                    <Label htmlFor="desk">Carteira</Label>
                    <Input
                      id="desk"
                      value={formData.desk}
                      onChange={(e) =>
                        setFormData({ ...formData, desk: e.target.value })
                      }
                      placeholder="ex: carteira 1"
                    />
                  </div>
                </div>

                {/* Trabalhos */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Trabalhos</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddAssignment}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.assignments?.map((assignment, index) => (
                      <div key={assignment.id} className="flex items-center gap-3">
                        <Checkbox
                          checked={assignment.completed}
                          onCheckedChange={(checked) => {
                            const updated = [...(formData.assignments || [])];
                            updated[index].completed = checked as boolean;
                            setFormData({ ...formData, assignments: updated });
                          }}
                        />
                        <Input
                          value={assignment.name}
                          onChange={(e) => {
                            const updated = [...(formData.assignments || [])];
                            updated[index].name = e.target.value;
                            setFormData({ ...formData, assignments: updated });
                          }}
                          placeholder="Nome do trabalho"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Provas */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Provas</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddExam}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.exams?.map((exam, index) => (
                      <div key={exam.id} className="flex items-center gap-3">
                        <Input
                          value={exam.name}
                          onChange={(e) => {
                            const updated = [...(formData.exams || [])];
                            updated[index].name = e.target.value;
                            setFormData({ ...formData, exams: updated });
                          }}
                          placeholder="Nome da prova"
                          className="flex-1"
                        />
                        <Input
                          value={exam.grade}
                          onChange={(e) => {
                            const updated = [...(formData.exams || [])];
                            updated[index].grade = e.target.value;
                            setFormData({ ...formData, exams: updated });
                          }}
                          placeholder="Nota"
                          className="w-24"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="presentedGroupWork"
                      checked={formData.presentedGroupWork}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          presentedGroupWork: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="presentedGroupWork" className="cursor-pointer">
                      Apresentou trabalho em grupo
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="absent"
                      checked={formData.absent}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, absent: checked as boolean })
                      }
                    />
                    <Label htmlFor="absent" className="cursor-pointer">
                      Faltou
                    </Label>
                  </div>
                </div>

                {/* Notas adicionais */}
                <div>
                  <Label htmlFor="notes">Notas Adicionais</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Observações sobre o aluno..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSaveStudent}>Salvar</Button>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentsPage;
