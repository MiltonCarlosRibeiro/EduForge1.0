import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Trash2, Eye, EyeOff, Download, FileText } from 'lucide-react';
import { questionStorage } from '@/lib/localStorage';
import { Question, Alternative } from '@/types/types';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

interface ExamInfo {
  institution: string;
  location: string;
  date: string;
  courseName: string;
  className: string;
  roomNumber: string;
  teacherName: string;
}

const EXAM_INFO_STORAGE_KEY = 'eduforge_exam_info';

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = React.useState(false);
  const [newQuestion, setNewQuestion] = React.useState('');
  const [newAlternatives, setNewAlternatives] = React.useState<string[]>([
    '',
    '',
    '',
    '',
  ]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = React.useState(0);
  const [passwordInput, setPasswordInput] = React.useState('');
  const [selectedQuestionId, setSelectedQuestionId] = React.useState<string | null>(
    null
  );
  
  // Informações da prova
  const [examInfo, setExamInfo] = React.useState<ExamInfo>(() => {
    try {
      const stored = localStorage.getItem(EXAM_INFO_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Erro ao carregar informações da prova:', error);
    }
    return {
      institution: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      courseName: '',
      className: '',
      roomNumber: '',
      teacherName: '',
    };
  });

  React.useEffect(() => {
    const loadedQuestions = questionStorage.load();
    setQuestions(loadedQuestions);
  }, []);

  const saveQuestions = (updatedQuestions: Question[]) => {
    setQuestions(updatedQuestions);
    questionStorage.save(updatedQuestions);
  };

  const saveExamInfo = (info: ExamInfo) => {
    setExamInfo(info);
    try {
      localStorage.setItem(EXAM_INFO_STORAGE_KEY, JSON.stringify(info));
    } catch (error) {
      console.error('Erro ao salvar informações da prova:', error);
    }
  };

  const handleCreateQuestion = () => {
    if (!newQuestion.trim()) {
      toast.error('Digite o enunciado da questão');
      return;
    }

    const validAlternatives = newAlternatives.filter((alt) => alt.trim() !== '');
    if (validAlternatives.length < 2) {
      toast.error('Adicione pelo menos 2 alternativas');
      return;
    }

    const question: Question = {
      id: Date.now().toString(),
      question: newQuestion.trim(),
      alternatives: validAlternatives.map((text, index) => ({
        id: `${Date.now()}-${index}`,
        text: text.trim(),
      })),
      correctAnswerIndex,
      showingAnswer: false,
    };

    saveQuestions([...questions, question]);
    setNewQuestion('');
    setNewAlternatives(['', '', '', '']);
    setCorrectAnswerIndex(0);
    setIsCreating(false);
    toast.success('Questão criada com sucesso');
  };

  const handleDeleteQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter((q) => q.id !== questionId);
    saveQuestions(updatedQuestions);
    toast.success('Questão removida');
  };

  const handleShowAnswer = (questionId: string) => {
    if (passwordInput !== 'password') {
      toast.error('Senha incorreta');
      return;
    }

    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, showingAnswer: true } : q
    );
    saveQuestions(updatedQuestions);
    setPasswordInput('');
    setSelectedQuestionId(null);
    toast.success('Resposta correta revelada');
  };

  const handleHideAnswer = (questionId: string) => {
    const updatedQuestions = questions.map((q) =>
      q.id === questionId ? { ...q, showingAnswer: false } : q
    );
    saveQuestions(updatedQuestions);
  };

  const handleExportPDF = () => {
    if (questions.length === 0) {
      toast.error('Adicione pelo menos uma questão antes de exportar');
      return;
    }

    if (!examInfo.institution || !examInfo.courseName || !examInfo.teacherName) {
      toast.error('Preencha pelo menos Instituição, Curso e Nome do Docente');
      return;
    }

    try {
      toast.loading('Gerando PDF da prova...');

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 7;
      let yPosition = margin;

      // Função para adicionar nova página se necessário
      const checkNewPage = (requiredSpace: number = 20) => {
        if (yPosition + requiredSpace > pageHeight - margin - 40) {
          doc.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // Função para adicionar texto com UTF-8
      const addText = (text: string, fontSize: number = 10, isBold: boolean = false, align: 'left' | 'center' | 'right' = 'left') => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        
        const utf8Text = decodeURIComponent(encodeURIComponent(text));
        
        if (align === 'center') {
          doc.text(utf8Text, pageWidth / 2, yPosition, { align: 'center' });
        } else if (align === 'right') {
          doc.text(utf8Text, pageWidth - margin, yPosition, { align: 'right' });
        } else {
          const lines = doc.splitTextToSize(utf8Text, pageWidth - 2 * margin);
          doc.text(lines, margin, yPosition);
          yPosition += (lines.length - 1) * lineHeight;
        }
        yPosition += lineHeight;
      };

      const addSpace = (space: number = lineHeight) => {
        yPosition += space;
      };

      const addLine = () => {
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += lineHeight / 2;
      };

      // Cabeçalho da prova
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.rect(margin, margin, pageWidth - 2 * margin, 50);

      // Instituição
      addText(examInfo.institution, 16, true, 'center');
      
      // Informações da prova
      yPosition = margin + 15;
      doc.setFontSize(9);
      doc.text(`Curso: ${examInfo.courseName}`, margin + 5, yPosition);
      yPosition += 5;
      doc.text(`Turma: ${examInfo.className}`, margin + 5, yPosition);
      doc.text(`Sala: ${examInfo.roomNumber}`, pageWidth / 2, yPosition);
      yPosition += 5;
      doc.text(`Local: ${examInfo.location}`, margin + 5, yPosition);
      doc.text(`Data: ${new Date(examInfo.date).toLocaleDateString('pt-BR')}`, pageWidth / 2, yPosition);
      
      yPosition = margin + 50 + 10;

      // Campo de nota e carimbo (movido para cima)
      const noteCarimboY = yPosition;
      
      // Campo de nota
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.3);
      doc.rect(margin, noteCarimboY, 50, 20);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('NOTA:', margin + 2, noteCarimboY + 7);
      doc.line(margin + 2, noteCarimboY + 17, margin + 48, noteCarimboY + 17);

      // Carimbo digital do professor
      const stampX = pageWidth - margin - 70;
      const stampY = noteCarimboY;
      const stampWidth = 65;
      const stampHeight = 20;

      // Bordas do carimbo (estilo antigo com linhas duplas)
      doc.setDrawColor(0, 0, 255); // Azul
      doc.setLineWidth(0.8);
      doc.rect(stampX, stampY, stampWidth, stampHeight);
      doc.setLineWidth(0.3);
      doc.rect(stampX + 1.5, stampY + 1.5, stampWidth - 3, stampHeight - 3);

      // Texto do carimbo
      doc.setTextColor(0, 0, 255); // Azul
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      
      const teacherNameLines = doc.splitTextToSize(examInfo.teacherName, stampWidth - 6);
      const textStartY = stampY + stampHeight / 2 - (teacherNameLines.length * 2);
      
      teacherNameLines.forEach((line: string, idx: number) => {
        doc.text(line, stampX + stampWidth / 2, textStartY + (idx * 4), { align: 'center' });
      });
      
      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.text('PROFESSOR(A)', stampX + stampWidth / 2, stampY + stampHeight - 3, { align: 'center' });

      // Resetar cor do texto e linha
      doc.setTextColor(0, 0, 0);
      doc.setDrawColor(0, 0, 0);
      
      yPosition = noteCarimboY + 25;

      // Linha separadora
      addLine();
      addSpace(5);

      // Instruções
      addText('AVALIAÇÃO', 14, true, 'center');
      addSpace(3);
      addText('Instruções: Leia atentamente cada questão e marque a alternativa correta.', 9);
      addSpace(5);
      addLine();
      addSpace(10);

      // Questões
      questions.forEach((question, index) => {
        checkNewPage(40);

        // Número e enunciado da questão
        addText(`${index + 1}. ${question.question}`, 11, true);
        addSpace(3);

        // Alternativas
        const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
        question.alternatives.forEach((alt, altIndex) => {
          checkNewPage(10);
          
          // Círculo para marcar
          doc.circle(margin + 2, yPosition - 2, 2);
          
          // Texto da alternativa
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          const altText = `${letters[altIndex]}) ${alt.text}`;
          const utf8AltText = decodeURIComponent(encodeURIComponent(altText));
          const lines = doc.splitTextToSize(utf8AltText, pageWidth - 2 * margin - 10);
          doc.text(lines, margin + 7, yPosition);
          yPosition += lines.length * lineHeight;
        });

        addSpace(10);
      });

      // Salvar PDF
      const fileName = `Prova_${examInfo.courseName.replace(/\s+/g, '_')}_${examInfo.className}.pdf`;
      doc.save(fileName);

      toast.dismiss();
      toast.success('PDF da prova gerado com sucesso!');
      setIsExportDialogOpen(false);
    } catch (error) {
      toast.dismiss();
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF. Tente novamente.');
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-12 py-12 max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl mb-4">Questões de Múltipla Escolha</h1>
            <p className="text-muted-foreground">
              Crie e gerencie questões de múltipla escolha para suas aulas
            </p>
          </div>

          {/* Botão criar nova questão */}
          <div className="mb-8 flex flex-wrap gap-4">
            <Button onClick={() => setIsCreating(!isCreating)} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              {isCreating ? 'Cancelar' : 'Criar Nova Questão'}
            </Button>
            
            {questions.length > 0 && (
              <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    <Download className="w-5 h-5 mr-2" />
                    Exportar Prova em PDF
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Exportar Prova em PDF</DialogTitle>
                    <DialogDescription>
                      Preencha as informações da prova para gerar o PDF
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="institution">Instituição *</Label>
                        <Input
                          id="institution"
                          value={examInfo.institution}
                          onChange={(e) => saveExamInfo({ ...examInfo, institution: e.target.value })}
                          placeholder="Ex: Universidade Federal"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Local</Label>
                        <Input
                          id="location"
                          value={examInfo.location}
                          onChange={(e) => saveExamInfo({ ...examInfo, location: e.target.value })}
                          placeholder="Ex: São Paulo, SP"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="courseName">Nome do Curso *</Label>
                        <Input
                          id="courseName"
                          value={examInfo.courseName}
                          onChange={(e) => saveExamInfo({ ...examInfo, courseName: e.target.value })}
                          placeholder="Ex: Análise e Desenvolvimento de Sistemas"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date">Data</Label>
                        <Input
                          id="date"
                          type="date"
                          value={examInfo.date}
                          onChange={(e) => saveExamInfo({ ...examInfo, date: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="className">Turma</Label>
                        <Input
                          id="className"
                          value={examInfo.className}
                          onChange={(e) => saveExamInfo({ ...examInfo, className: e.target.value })}
                          placeholder="Ex: D"
                          maxLength={10}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="roomNumber">Número da Sala</Label>
                        <Input
                          id="roomNumber"
                          value={examInfo.roomNumber}
                          onChange={(e) => saveExamInfo({ ...examInfo, roomNumber: e.target.value })}
                          placeholder="Ex: 101"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teacherName">Nome do Docente (Nome e Sobrenome) *</Label>
                      <Input
                        id="teacherName"
                        value={examInfo.teacherName}
                        onChange={(e) => saveExamInfo({ ...examInfo, teacherName: e.target.value })}
                        placeholder="Ex: Milton Carlos Ribeiro"
                      />
                      <p className="text-xs text-muted-foreground">
                        Este nome aparecerá no carimbo digital azul no rodapé da prova
                      </p>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>
                          O PDF incluirá: cabeçalho com informações da prova, {questions.length} questão(ões) 
                          com alternativas, campo para nota e carimbo digital do professor em azul.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleExportPDF}>
                      <Download className="w-4 h-4 mr-2" />
                      Gerar PDF
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Formulário de criação */}
          {isCreating && (
            <Card className="mb-8">
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="question">Enunciado da Questão</Label>
                  <Textarea
                    id="question"
                    placeholder="Digite o enunciado da questão..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    rows={3}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Alternativas</Label>
                  <div className="space-y-3 mt-2">
                    {newAlternatives.map((alt, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-8">
                          {String.fromCharCode(65 + index)})
                        </span>
                        <Input
                          placeholder={`Alternativa ${String.fromCharCode(65 + index)}`}
                          value={alt}
                          onChange={(e) => {
                            const updated = [...newAlternatives];
                            updated[index] = e.target.value;
                            setNewAlternatives(updated);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Resposta Correta</Label>
                  <RadioGroup
                    value={correctAnswerIndex.toString()}
                    onValueChange={(value) => setCorrectAnswerIndex(Number.parseInt(value))}
                    className="mt-2"
                  >
                    {newAlternatives.map((alt, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={index.toString()}
                          id={`correct-${index}`}
                        />
                        <Label htmlFor={`correct-${index}`} className="cursor-pointer">
                          Alternativa {String.fromCharCode(65 + index)}
                          {alt && `: ${alt}`}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleCreateQuestion}>Salvar Questão</Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de questões */}
          <div className="space-y-6">
            {questions.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  <p>Nenhuma questão criada ainda.</p>
                  <p className="text-sm mt-2">
                    Clique em "Criar Nova Questão" para começar.
                  </p>
                </CardContent>
              </Card>
            ) : (
              questions.map((question, qIndex) => (
                <Card key={question.id}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h3 className="text-sm font-medium mb-4 break-words whitespace-normal">
                          <span className="text-muted-foreground">Questão {qIndex + 1}:</span>{' '}
                          {question.question}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <RadioGroup className="space-y-3">
                      {question.alternatives.map((alt, altIndex) => (
                        <div
                          key={alt.id}
                          className={`flex items-start space-x-3 p-3 rounded-md ${
                            question.showingAnswer &&
                            altIndex === question.correctAnswerIndex
                              ? 'bg-primary/10 border border-primary'
                              : 'bg-accent'
                          }`}
                        >
                          <RadioGroupItem
                            value={alt.id}
                            id={alt.id}
                            disabled
                            className="shrink-0 mt-0.5"
                          />
                          <Label htmlFor={alt.id} className="flex-1 cursor-default break-words whitespace-normal leading-relaxed">
                            {String.fromCharCode(65 + altIndex)}) {alt.text}
                            {question.showingAnswer &&
                              altIndex === question.correctAnswerIndex && (
                                <span className="ml-2 text-primary font-medium">
                                  ✓ Correta
                                </span>
                              )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    <div className="flex gap-3 pt-4">
                      {!question.showingAnswer ? (
                        <Dialog
                          open={selectedQuestionId === question.id}
                          onOpenChange={(open) => {
                            setSelectedQuestionId(open ? question.id : null);
                            if (!open) setPasswordInput('');
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              Mostrar Resposta Correta
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Digite a Senha</DialogTitle>
                              <DialogDescription>
                                Para visualizar a resposta correta, digite a senha de
                                acesso.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                  id="password"
                                  type="password"
                                  placeholder="Digite a senha..."
                                  value={passwordInput}
                                  onChange={(e) => setPasswordInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleShowAnswer(question.id);
                                    }
                                  }}
                                />
                              </div>
                              <Button
                                onClick={() => handleShowAnswer(question.id)}
                                className="w-full"
                              >
                                Confirmar
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => handleHideAnswer(question.id)}
                        >
                          <EyeOff className="w-4 h-4 mr-2" />
                          Ocultar Resposta
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuestionsPage;
