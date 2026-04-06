import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Download, Save } from 'lucide-react';
import { resumeStorage } from '@/lib/localStorage';
import {
  Resume,
  PersonalData,
  Experience,
  Education,
  Language,
  CustomSection,
} from '@/types/types';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

const defaultResume: Resume = {
  personalData: {
    name: 'Milton Carlos Ribeiro',
    age: 42,
    maritalStatus: 'Casado',
    title: 'PM | GD | SCRUM | IA | TQM | BIGDATA | JAVA | KOTLIN',
    email: 'mcr.milton@gmail.com',
    linkedin: 'www.linkedin.com/in/milton-carlosribeiro-62635959',
    location: 'Santa Bárbara d\'Oeste, São Paulo, Brasil',
    photo: '',
    summary: '',
  },
  experiences: [
    {
      id: '1',
      company: 'Pakmatic do Brasil',
      position: 'Process Analyst | BIGDATA',
      period: 'maio 2025 – presente',
      description: 'Santa Bárbara d\'Oeste, São Paulo, Brasil',
    },
    {
      id: '2',
      company: 'OTICS USA, Inc.',
      position: 'Electric trolley operator',
      period: 'agosto 2023 – agosto 2024',
      description: 'Japão. Abastecimento de linhas de produção e gestão de materiais.',
    },
    {
      id: '3',
      company: 'Justec Ltd. / Shibaoka製作所',
      position: 'Mechanical Designer',
      period: 'dezembro 2020 – junho 2023',
      description:
        'Aichi — Nagoia/Okazaki, Japão. Projeto de equipamentos de soldagem de robôs.',
    },
    {
      id: '4',
      company: 'Ishikawa製作所',
      position: 'CNC machine operator',
      period: 'março 2020 – novembro 2020',
      description: 'Aichi, Japão. Fabricação de peças.',
    },
    {
      id: '5',
      company: 'Futaba Manufacturing',
      position: 'Operator of robotic welding cells',
      period: 'agosto 2018 – outubro 2018',
      description: 'Aichi, Japão. Operação de robôs FANUC e MOTOMAN.',
    },
    {
      id: '6',
      company: 'Sony Electronics',
      position: 'Mounting lenses for professional cameras',
      period: 'outubro 2017 – agosto 2018',
      description: 'Japão. Montagem de lentes intercambiáveis profissionais.',
    },
    {
      id: '7',
      company: 'AISIN',
      position: 'Automated device bending machine operator',
      period: 'julho 2017 – outubro 2017',
      description: 'Toyota, Japão. Operador de linha de produção robótica.',
    },
    {
      id: '8',
      company: 'Showa Manufacturing',
      position: 'Welding operator and inspection',
      period: 'agosto 2016 – junho 2017',
      description: 'Shizuoka, Japão. Soldagem e inspeção de amortecedores.',
    },
    {
      id: '9',
      company: 'Pakmatic do Brasil',
      position: 'Mechanical Designer',
      period: 'novembro 2015 – julho 2016',
      description: 'Designer mecânico para desenvolvimento de novos produtos.',
    },
    {
      id: '10',
      company: 'SRP Industrial Automation',
      position: 'Project leader and Mechanical Designer',
      period: 'junho 2014 – maio 2015',
      description: 'Americana, São Paulo. Coordenação de projetos de automação.',
    },
    {
      id: '11',
      company: 'INDUSTRIAS NARDINI S.A',
      position: 'Production control leader',
      period: 'abril 2010 – maio 2014',
      description: 'Americana, SP. Planejamento de produção.',
    },
    {
      id: '12',
      company: 'CDG cutting and fabrication',
      position: 'Sheet metal planning development',
      period: 'agosto 2008 – abril 2010',
      description: 'Nova Odessa. Projetos de chapas metálicas.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'FIAP',
      degree: 'Análise e Desenvolvimento de Sistemas',
      period: 'fevereiro 2024 – janeiro 2026',
    },
    {
      id: '2',
      institution: 'Anhanguera Educacional',
      degree: 'MBA em Gestão da Qualidade',
      period: 'fevereiro 2025 – agosto 2025',
    },
    {
      id: '3',
      institution: 'Centro Universitário Salesiano de São Paulo',
      degree: 'MBA em Gestão de Projetos',
      period: '2015 – 2017',
    },
    {
      id: '4',
      institution: 'Anhanguera Educacional',
      degree: 'Bacharelado em Administração',
      period: 'fevereiro 2009 – dezembro 2013',
    },
  ],
  skills: ['Estratégias de sustentabilidade', 'Desenvolvedor full', 'Calibração'],
  certifications: [
    'GitHub versionamento de código',
    'Aprenda ERP TOTVS Protheus na prática Compras',
    'Inspetor de Qualidade',
    'Corporate Systems',
    'Cloud Fundamentals Administration and Solution Architect',
  ],
  languages: [
    { id: '1', name: 'English', proficiency: 'Professional Working' },
    { id: '2', name: 'Português', proficiency: 'Native or Bilingual' },
    { id: '3', name: '日本語', proficiency: 'Full Professional' },
  ],
  customSections: [],
};

const ResumePage: React.FC = () => {
  const [resume, setResume] = React.useState<Resume>(defaultResume);
  const [editingItem, setEditingItem] = React.useState<any>(null);
  const [dialogType, setDialogType] = React.useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  React.useEffect(() => {
    const loadedResume = resumeStorage.load();
    if (loadedResume) {
      setResume(loadedResume);
    } else {
      resumeStorage.save(defaultResume);
    }
  }, []);

  const saveResume = (updatedResume: Resume) => {
    setResume(updatedResume);
    resumeStorage.save(updatedResume);
    toast.success('Currículo salvo com sucesso');
  };

  const handleExportPDF = () => {
    try {
      toast.loading('Gerando PDF do currículo...');
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 7;
      let yPosition = margin;

      // Função auxiliar para adicionar texto com quebra de linha e suporte UTF-8
      const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
        if (yPosition > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        
        doc.setFontSize(fontSize);
        if (isBold) {
          doc.setFont('helvetica', 'bold');
        } else {
          doc.setFont('helvetica', 'normal');
        }
        
        // Converter para UTF-8
        const utf8Text = decodeURIComponent(encodeURIComponent(text));
        const lines = doc.splitTextToSize(utf8Text, pageWidth - 2 * margin);
        doc.text(lines, margin, yPosition);
        yPosition += lines.length * lineHeight;
      };

      const addSpace = (space: number = lineHeight) => {
        yPosition += space;
      };

      const addLine = () => {
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += lineHeight;
      };

      // Cabeçalho
      addText(resume.personalData.name, 20, true);
      addText(resume.personalData.title, 12);
      addSpace(3);
      addText(`${resume.personalData.age} anos • ${resume.personalData.maritalStatus}`, 10);
      addText(resume.personalData.location, 10);
      addText(resume.personalData.email, 10);
      addText(resume.personalData.linkedin, 10);
      
      if (resume.personalData.summary) {
        addSpace();
        addLine();
        addText('RESUMO PROFISSIONAL', 12, true);
        addSpace(3);
        addText(resume.personalData.summary, 10);
      }

      // Habilidades
      if (resume.skills.length > 0) {
        addSpace();
        addLine();
        addText('HABILIDADES', 12, true);
        addSpace(3);
        resume.skills.forEach((skill) => {
          addText(`• ${skill}`, 10);
        });
      }

      // Experiências
      if (resume.experiences.length > 0) {
        addSpace();
        addLine();
        addText('EXPERIÊNCIA PROFISSIONAL', 12, true);
        addSpace(3);
        resume.experiences.forEach((exp) => {
          addText(exp.position, 11, true);
          addText(`${exp.company} | ${exp.period}`, 9);
          if (exp.description) {
            addText(exp.description, 9);
          }
          addSpace(3);
        });
      }

      // Separar formação em Graduação e Pós-Graduação
      const graduacao = resume.education.filter(edu => 
        edu.degree.toLowerCase().includes('graduação') || 
        edu.degree.toLowerCase().includes('bacharelado') ||
        edu.degree.toLowerCase().includes('licenciatura') ||
        edu.degree.toLowerCase().includes('tecnólogo') ||
        edu.degree.toLowerCase().includes('análise') ||
        edu.degree.toLowerCase().includes('sistemas')
      );
      
      const posGraduacao = resume.education.filter(edu => 
        edu.degree.toLowerCase().includes('pós') ||
        edu.degree.toLowerCase().includes('mestrado') ||
        edu.degree.toLowerCase().includes('doutorado') ||
        edu.degree.toLowerCase().includes('mba') ||
        edu.degree.toLowerCase().includes('especialização')
      );

      // Graduação
      if (graduacao.length > 0) {
        addSpace();
        addLine();
        addText('GRADUAÇÃO', 12, true);
        addSpace(3);
        graduacao.forEach((edu) => {
          addText(edu.degree, 11, true);
          addText(`${edu.institution} | ${edu.period}`, 9);
          addSpace(3);
        });
      }

      // Pós-Graduação
      if (posGraduacao.length > 0) {
        addSpace();
        addLine();
        addText('PÓS-GRADUAÇÃO', 12, true);
        addSpace(3);
        posGraduacao.forEach((edu) => {
          addText(edu.degree, 11, true);
          addText(`${edu.institution} | ${edu.period}`, 9);
          addSpace(3);
        });
      }

      // Certificações
      if (resume.certifications.length > 0) {
        addSpace();
        addLine();
        addText('CERTIFICAÇÕES', 12, true);
        addSpace(3);
        resume.certifications.forEach((cert) => {
          addText(`• ${cert}`, 10);
        });
      }

      // Seções personalizadas
      resume.customSections.forEach((section) => {
        addSpace();
        addLine();
        addText(section.title.toUpperCase(), 12, true);
        addSpace(3);
        addText(section.content, 10);
      });

      // Idiomas por último
      if (resume.languages.length > 0) {
        addSpace();
        addLine();
        addText('IDIOMAS', 12, true);
        addSpace(3);
        resume.languages.forEach((lang) => {
          addText(`${lang.name} - ${lang.proficiency}`, 10);
        });
      }

      // Salvar PDF
      const fileName = `Curriculo_${resume.personalData.name.replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);
      
      toast.dismiss();
      toast.success('PDF do currículo gerado com sucesso!');
    } catch (error) {
      toast.dismiss();
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleOpenDialog = (type: string, item?: any) => {
    setDialogType(type);
    setEditingItem(item || null);
    setIsDialogOpen(true);
  };

  const handleSaveItem = (data: any) => {
    let updatedResume = { ...resume };

    switch (dialogType) {
      case 'experience':
        if (editingItem) {
          updatedResume.experiences = resume.experiences.map((exp) =>
            exp.id === editingItem.id ? { ...data, id: exp.id } : exp
          );
        } else {
          updatedResume.experiences = [
            ...resume.experiences,
            { ...data, id: Date.now().toString() },
          ];
        }
        break;
      case 'education':
        if (editingItem) {
          updatedResume.education = resume.education.map((edu) =>
            edu.id === editingItem.id ? { ...data, id: edu.id } : edu
          );
        } else {
          updatedResume.education = [
            ...resume.education,
            { ...data, id: Date.now().toString() },
          ];
        }
        break;
      case 'language':
        if (editingItem) {
          updatedResume.languages = resume.languages.map((lang) =>
            lang.id === editingItem.id ? { ...data, id: lang.id } : lang
          );
        } else {
          updatedResume.languages = [
            ...resume.languages,
            { ...data, id: Date.now().toString() },
          ];
        }
        break;
      case 'customSection':
        if (editingItem) {
          updatedResume.customSections = resume.customSections.map((section) =>
            section.id === editingItem.id ? { ...data, id: section.id } : section
          );
        } else {
          updatedResume.customSections = [
            ...resume.customSections,
            { ...data, id: Date.now().toString() },
          ];
        }
        break;
    }

    saveResume(updatedResume);
    setIsDialogOpen(false);
  };

  const handleDeleteItem = (type: string, id: string) => {
    let updatedResume = { ...resume };

    switch (type) {
      case 'experience':
        updatedResume.experiences = resume.experiences.filter((exp) => exp.id !== id);
        break;
      case 'education':
        updatedResume.education = resume.education.filter((edu) => edu.id !== id);
        break;
      case 'language':
        updatedResume.languages = resume.languages.filter((lang) => lang.id !== id);
        break;
      case 'customSection':
        updatedResume.customSections = resume.customSections.filter(
          (section) => section.id !== id
        );
        break;
    }

    saveResume(updatedResume);
    toast.success('Item removido');
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-12 py-12 max-w-6xl">
          {/* Header */}
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl mb-4">Editor de Currículo</h1>
              <p className="text-muted-foreground">
                Gerencie seu currículo profissional
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => saveResume(resume)}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              <Button variant="outline" onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>

          <Tabs defaultValue="personal" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
              <TabsTrigger value="personal">Pessoal</TabsTrigger>
              <TabsTrigger value="experience">Experiência</TabsTrigger>
              <TabsTrigger value="education">Formação</TabsTrigger>
              <TabsTrigger value="skills">Habilidades</TabsTrigger>
              <TabsTrigger value="certifications">Certificações</TabsTrigger>
              <TabsTrigger value="languages">Idiomas</TabsTrigger>
              <TabsTrigger value="custom">Personalizado</TabsTrigger>
            </TabsList>

            {/* Dados Pessoais */}
            <TabsContent value="personal">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nome</Label>
                      <Input
                        value={resume.personalData.name}
                        onChange={(e) =>
                          saveResume({
                            ...resume,
                            personalData: {
                              ...resume.personalData,
                              name: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Idade</Label>
                      <Input
                        type="number"
                        value={resume.personalData.age}
                        onChange={(e) =>
                          saveResume({
                            ...resume,
                            personalData: {
                              ...resume.personalData,
                              age: Number.parseInt(e.target.value),
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Estado Civil</Label>
                      <Input
                        value={resume.personalData.maritalStatus}
                        onChange={(e) =>
                          saveResume({
                            ...resume,
                            personalData: {
                              ...resume.personalData,
                              maritalStatus: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Título/Cargo</Label>
                      <Input
                        value={resume.personalData.title}
                        onChange={(e) =>
                          saveResume({
                            ...resume,
                            personalData: {
                              ...resume.personalData,
                              title: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>E-mail</Label>
                      <Input
                        type="email"
                        value={resume.personalData.email}
                        onChange={(e) =>
                          saveResume({
                            ...resume,
                            personalData: {
                              ...resume.personalData,
                              email: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>LinkedIn</Label>
                      <Input
                        value={resume.personalData.linkedin}
                        onChange={(e) =>
                          saveResume({
                            ...resume,
                            personalData: {
                              ...resume.personalData,
                              linkedin: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Localização</Label>
                      <Input
                        value={resume.personalData.location}
                        onChange={(e) =>
                          saveResume({
                            ...resume,
                            personalData: {
                              ...resume.personalData,
                              location: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Resumo Profissional</Label>
                      <Textarea
                        value={resume.personalData.summary}
                        onChange={(e) =>
                          saveResume({
                            ...resume,
                            personalData: {
                              ...resume.personalData,
                              summary: e.target.value,
                            },
                          })
                        }
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experiências */}
            <TabsContent value="experience">
              <div className="space-y-4">
                <Button onClick={() => handleOpenDialog('experience')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Experiência
                </Button>
                {resume.experiences.map((exp) => (
                  <Card key={exp.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{exp.position}</h3>
                          <p className="text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {exp.period}
                          </p>
                          <p className="text-sm mt-2">{exp.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog('experience', exp)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteItem('experience', exp.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Formação */}
            <TabsContent value="education">
              <div className="space-y-4">
                <Button onClick={() => handleOpenDialog('education')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Formação
                </Button>
                {resume.education.map((edu) => (
                  <Card key={edu.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{edu.degree}</h3>
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {edu.period}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog('education', edu)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteItem('education', edu.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Habilidades */}
            <TabsContent value="skills">
              <Card>
                <CardContent className="p-6">
                  <Label>Habilidades (uma por linha)</Label>
                  <Textarea
                    value={resume.skills.join('\n')}
                    onChange={(e) =>
                      saveResume({
                        ...resume,
                        skills: e.target.value.split('\n').filter((s) => s.trim()),
                      })
                    }
                    rows={10}
                    className="mt-2"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certificações */}
            <TabsContent value="certifications">
              <Card>
                <CardContent className="p-6">
                  <Label>Certificações (uma por linha)</Label>
                  <Textarea
                    value={resume.certifications.join('\n')}
                    onChange={(e) =>
                      saveResume({
                        ...resume,
                        certifications: e.target.value
                          .split('\n')
                          .filter((c) => c.trim()),
                      })
                    }
                    rows={10}
                    className="mt-2"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Idiomas */}
            <TabsContent value="languages">
              <div className="space-y-4">
                <Button onClick={() => handleOpenDialog('language')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Idioma
                </Button>
                {resume.languages.map((lang) => (
                  <Card key={lang.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{lang.name}</h3>
                          <p className="text-muted-foreground">{lang.proficiency}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog('language', lang)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteItem('language', lang.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Seções Personalizadas */}
            <TabsContent value="custom">
              <div className="space-y-4">
                <Button onClick={() => handleOpenDialog('customSection')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Seção Personalizada
                </Button>
                {resume.customSections.map((section) => (
                  <Card key={section.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium">{section.title}</h3>
                          <p className="text-sm mt-2 whitespace-pre-wrap">
                            {section.content}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog('customSection', section)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleDeleteItem('customSection', section.id)
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Dialog genérico para edição */}
          <ItemDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            type={dialogType}
            item={editingItem}
            onSave={handleSaveItem}
          />
        </div>
      </div>
    </MainLayout>
  );
};

// Componente auxiliar para o dialog de edição
const ItemDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  type: string;
  item: any;
  onSave: (data: any) => void;
}> = ({ isOpen, onClose, type, item, onSave }) => {
  const [formData, setFormData] = React.useState<any>({});

  React.useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({});
    }
  }, [item, isOpen]);

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'experience':
        return item ? 'Editar Experiência' : 'Adicionar Experiência';
      case 'education':
        return item ? 'Editar Formação' : 'Adicionar Formação';
      case 'language':
        return item ? 'Editar Idioma' : 'Adicionar Idioma';
      case 'customSection':
        return item ? 'Editar Seção' : 'Adicionar Seção';
      default:
        return 'Editar';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {type === 'experience' && (
            <>
              <div>
                <Label>Cargo</Label>
                <Input
                  value={formData.position || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Empresa</Label>
                <Input
                  value={formData.company || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Período</Label>
                <Input
                  value={formData.period || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, period: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={formData.description || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </>
          )}

          {type === 'education' && (
            <>
              <div>
                <Label>Curso</Label>
                <Input
                  value={formData.degree || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Instituição</Label>
                <Input
                  value={formData.institution || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Período</Label>
                <Input
                  value={formData.period || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, period: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {type === 'language' && (
            <>
              <div>
                <Label>Idioma</Label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Proficiência</Label>
                <Input
                  value={formData.proficiency || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, proficiency: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {type === 'customSection' && (
            <>
              <div>
                <Label>Título da Seção</Label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Conteúdo</Label>
                <Textarea
                  value={formData.content || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={5}
                />
              </div>
            </>
          )}

          <div className="flex gap-3">
            <Button onClick={handleSubmit}>Salvar</Button>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePage;
