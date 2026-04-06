import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { attendanceStorage, studentStorage } from '@/lib/localStorage';
import { AttendanceRecord, StudentAttendance, Student } from '@/types/types';
import { toast } from 'sonner';

const AttendancePage: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = React.useState<
    AttendanceRecord[]
  >([]);
  const [students, setStudents] = React.useState<Student[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingRecord, setEditingRecord] = React.useState<AttendanceRecord | null>(
    null
  );
  const [formDate, setFormDate] = React.useState('');
  const [formAttendance, setFormAttendance] = React.useState<StudentAttendance[]>([]);

  React.useEffect(() => {
    const loadedRecords = attendanceStorage.load();
    const loadedStudents = studentStorage.load();
    setAttendanceRecords(loadedRecords);
    setStudents(loadedStudents);
  }, []);

  const saveAttendance = (updatedRecords: AttendanceRecord[]) => {
    setAttendanceRecords(updatedRecords);
    attendanceStorage.save(updatedRecords);
  };

  const formatDateToDDMMYY = (dateString: string): string => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year.slice(2)}`;
  };

  const handleOpenDialog = (record?: AttendanceRecord) => {
    if (students.length === 0) {
      toast.error('Cadastre alunos antes de criar uma chamada');
      return;
    }

    if (record) {
      setEditingRecord(record);
      // Converter data de dd/mm/aa para yyyy-mm-dd
      const [day, month, year] = record.date.split('/');
      const fullYear = `20${year}`;
      setFormDate(`${fullYear}-${month}-${day}`);
      setFormAttendance(record.studentAttendance);
    } else {
      setEditingRecord(null);
      setFormDate('');
      setFormAttendance(
        students.map((student) => ({
          studentId: student.id,
          studentName: student.name,
          present: true,
        }))
      );
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingRecord(null);
  };

  const handleSaveRecord = () => {
    if (!formDate) {
      toast.error('Selecione uma data');
      return;
    }

    const formattedDate = formatDateToDDMMYY(formDate);

    if (editingRecord) {
      const updatedRecords = attendanceRecords.map((r) =>
        r.id === editingRecord.id
          ? { ...r, date: formattedDate, studentAttendance: formAttendance }
          : r
      );
      saveAttendance(updatedRecords);
      toast.success('Chamada atualizada com sucesso');
    } else {
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        date: formattedDate,
        studentAttendance: formAttendance,
      };
      saveAttendance([...attendanceRecords, newRecord]);
      toast.success('Chamada registrada com sucesso');
    }

    handleCloseDialog();
  };

  const handleDeleteRecord = (recordId: string) => {
    const updatedRecords = attendanceRecords.filter((r) => r.id !== recordId);
    saveAttendance(updatedRecords);
    toast.success('Chamada removida');
  };

  const sortedRecords = [...attendanceRecords].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split('/').map(Number);
    const [dayB, monthB, yearB] = b.date.split('/').map(Number);
    const dateA = new Date(2000 + yearA, monthA - 1, dayA);
    const dateB = new Date(2000 + yearB, monthB - 1, dayB);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-12 py-12 max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl mb-4">Lista de Chamadas</h1>
            <p className="text-muted-foreground">
              Registre e gerencie a presença dos alunos por data
            </p>
          </div>

          {/* Botão adicionar chamada */}
          <div className="mb-8">
            <Button onClick={() => handleOpenDialog()} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Registrar Nova Chamada
            </Button>
          </div>

          {/* Lista de chamadas */}
          {attendanceRecords.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-muted-foreground">
                <Calendar className="w-16 h-16 mx-auto mb-4" />
                <p>Nenhuma chamada registrada ainda.</p>
                <p className="text-sm mt-2">
                  Clique em "Registrar Nova Chamada" para começar.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {sortedRecords.map((record) => {
                const presentCount = record.studentAttendance.filter(
                  (s) => s.present
                ).length;
                const totalCount = record.studentAttendance.length;

                return (
                  <AccordionItem key={record.id} value={record.id}>
                    <Card>
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between p-6">
                          <AccordionTrigger className="flex-1 hover:no-underline">
                            <div className="flex items-center gap-4 text-left">
                              <Calendar className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <h3 className="text-lg">Chamada de {record.date}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {presentCount}/{totalCount} presentes
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog(record);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteRecord(record.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <AccordionContent>
                          <div className="px-6 pb-6 pt-2 border-t border-border">
                            <div className="space-y-2 mt-4">
                              {record.studentAttendance.map((attendance) => (
                                <div
                                  key={attendance.studentId}
                                  className="flex items-center justify-between p-3 rounded-md bg-accent"
                                >
                                  <span>{attendance.studentName}</span>
                                  <span
                                    className={
                                      attendance.present
                                        ? 'text-primary'
                                        : 'text-destructive'
                                    }
                                  >
                                    {attendance.present ? '✓ Presente' : '✗ Ausente'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </CardContent>
                    </Card>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}

          {/* Dialog de criação/edição */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingRecord ? 'Editar Chamada' : 'Registrar Chamada'}
                </DialogTitle>
                <DialogDescription>
                  Selecione a data e marque a presença dos alunos
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div>
                  <Label htmlFor="date">Data (dd/mm/aa)</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="mb-4 block">Presença dos Alunos</Label>
                  <div className="space-y-3">
                    {formAttendance.map((attendance, index) => (
                      <div
                        key={attendance.studentId}
                        className="flex items-center justify-between p-4 rounded-md bg-accent"
                      >
                        <span>{attendance.studentName}</span>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`present-${attendance.studentId}`}
                            checked={attendance.present}
                            onCheckedChange={(checked) => {
                              const updated = [...formAttendance];
                              updated[index].present = checked as boolean;
                              setFormAttendance(updated);
                            }}
                          />
                          <Label
                            htmlFor={`present-${attendance.studentId}`}
                            className="cursor-pointer"
                          >
                            Presente
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSaveRecord}>Salvar</Button>
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

export default AttendancePage;
