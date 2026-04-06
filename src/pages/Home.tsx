import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Video, Linkedin, Mail, MapPin } from 'lucide-react';
import { resumeStorage } from '@/lib/localStorage';

interface TimelineItem {
  period: string;
  title: string;
  institution: string;
  type: 'education' | 'certification' | 'experience';
}

const timelineData: TimelineItem[] = [
  // Experiências profissionais (mais recente primeiro)
  {
    period: 'maio 2025 – presente',
    title: 'Process Analyst | BIGDATA',
    institution: 'Pakmatic do Brasil, Santa Bárbara d\'Oeste, São Paulo, Brasil',
    type: 'experience',
  },
  {
    period: 'agosto 2023 – agosto 2024',
    title: 'Electric trolley operator',
    institution: 'OTICS USA, Inc., Japão',
    type: 'experience',
  },
  {
    period: 'dezembro 2020 – junho 2023',
    title: 'Mechanical Designer',
    institution: 'Justec Ltd. (contract agent) / Shibaoka製作所, Aichi — Nagoia/Okazaki, Japão',
    type: 'experience',
  },
  {
    period: 'março 2020 – novembro 2020',
    title: 'CNC machine operator',
    institution: 'Ishikawa製作所, Aichi, Japão',
    type: 'experience',
  },
  {
    period: 'agosto 2018 – outubro 2018',
    title: 'Operator of robotic welding cells',
    institution: 'Futaba Manufacturing, Aichi, Japão',
    type: 'experience',
  },
  {
    period: 'outubro 2017 – agosto 2018',
    title: 'Mounting lenses for professional cameras',
    institution: 'Sony Electronics, Japão',
    type: 'experience',
  },
  {
    period: 'julho 2017 – outubro 2017',
    title: 'Automated device bending machine operator',
    institution: 'AISIN, Toyota, Japão',
    type: 'experience',
  },
  {
    period: 'agosto 2016 – junho 2017',
    title: 'Welding operator and inspection',
    institution: 'Showa Manufacturing, Shizuoka, Japão',
    type: 'experience',
  },
  {
    period: 'novembro 2015 – julho 2016',
    title: 'Mechanical Designer',
    institution: 'Pakmatic do Brasil',
    type: 'experience',
  },
  {
    period: 'junho 2014 – maio 2015',
    title: 'Project leader and Mechanical Designer',
    institution: 'SRP Industrial Automation, Americana, São Paulo',
    type: 'experience',
  },
  {
    period: 'abril 2010 – maio 2014',
    title: 'Production control leader',
    institution: 'INDUSTRIAS NARDINI S.A, Americana, SP',
    type: 'experience',
  },
  {
    period: 'agosto 2008 – abril 2010',
    title: 'Sheet metal planning development / Programmer',
    institution: 'CDG cutting and fabrication, Nova Odessa',
    type: 'experience',
  },
  // Formação acadêmica
  {
    period: 'fevereiro 2024 – janeiro 2026',
    title: 'Análise e Desenvolvimento de Sistemas',
    institution: 'FIAP',
    type: 'education',
  },
  {
    period: 'fevereiro 2025 – agosto 2025',
    title: 'MBA em Gestão da Qualidade',
    institution: 'Anhanguera Educacional',
    type: 'education',
  },
  {
    period: '2015 – 2017',
    title: 'MBA em Gestão de Projetos',
    institution: 'Centro Universitário Salesiano de São Paulo',
    type: 'education',
  },
  {
    period: 'fevereiro 2009 – dezembro 2013',
    title: 'Bacharelado em Administração',
    institution: 'Anhanguera Educacional',
    type: 'education',
  },
  // Certificações
  {
    period: '',
    title: 'GitHub versionamento de código',
    institution: 'Certificação',
    type: 'certification',
  },
  {
    period: '',
    title: 'Aprenda ERP TOTVS Protheus na prática Compras',
    institution: 'Certificação',
    type: 'certification',
  },
  {
    period: '',
    title: 'Inspetor de Qualidade',
    institution: 'Certificação',
    type: 'certification',
  },
  {
    period: '',
    title: 'Corporate Systems',
    institution: 'Certificação',
    type: 'certification',
  },
  {
    period: '',
    title: 'Cloud Fundamentals, Administration and Solution Architect',
    institution: 'Certificação',
    type: 'certification',
  },
];

const Home: React.FC = () => {
  const [resume, setResume] = React.useState<any>(null);

  React.useEffect(() => {
    // Carregar dados do currículo se existirem
    const loadedResume = resumeStorage.load();
    if (!loadedResume) {
      // Inicializar com dados padrão se não existir
      const defaultResume = {
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
        experiences: [],
        education: [],
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
      resumeStorage.save(defaultResume);
      setResume(defaultResume);
    } else {
      setResume(loadedResume);
    }
  }, []);

  const personalData = resume?.personalData || {
    name: 'Milton Carlos Ribeiro',
    age: 42,
    maritalStatus: 'Casado',
    title: 'PM | GD | SCRUM | IA | TQM | BIGDATA | JAVA | KOTLIN',
    email: 'mcr.milton@gmail.com',
    linkedin: 'www.linkedin.com/in/milton-carlosribeiro-62635959',
    location: 'Santa Bárbara d\'Oeste, São Paulo, Brasil',
  };

  return (
    <MainLayout>
      <div className="w-full">
        {/* Hero Section */}
        <section className="section-spacing bg-card border-b border-border">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <div className="content-spacing text-center">
              <h1 className="text-5xl md:text-6xl tracking-tight">
                {personalData.name}
              </h1>
              <p className="text-lg text-muted-foreground mt-4">
                {personalData.age} anos • {personalData.maritalStatus}
              </p>
              <p className="text-xl mt-6 text-foreground">
                {personalData.title}
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personalData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${personalData.email}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {personalData.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <a
                    href={`https://${personalData.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Idiomas */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Idiomas
                </h3>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span>English (Professional Working)</span>
                  <span>•</span>
                  <span>Português (Native or Bilingual)</span>
                  <span>•</span>
                  <span>日本語 (Full Professional)</span>
                </div>
              </div>

              {/* Principais Competências */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Principais Competências
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {resume?.skills?.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
                <Button asChild size="lg">
                  <Link to="/pdf">
                    <FileText className="w-5 h-5 mr-2" />
                    Visualizador de PDF
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/videos">
                    <Video className="w-5 h-5 mr-2" />
                    Acervo de Vídeos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section-spacing">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <h2 className="text-center mb-16">Timeline Acadêmica e Profissional</h2>

            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <div key={index} className="relative">
                  <Card className="border-border">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="md:w-48 shrink-0">
                          <span className="text-sm text-muted-foreground">
                            {item.period || 'Data não especificada'}
                          </span>
                          <div className="mt-2">
                            <span
                              className={`inline-block px-3 py-1 rounded-md text-xs ${
                                item.type === 'education'
                                  ? 'bg-primary/10 text-primary'
                                  : item.type === 'certification'
                                    ? 'bg-accent text-accent-foreground'
                                    : 'bg-secondary text-secondary-foreground'
                              }`}
                            >
                              {item.type === 'education'
                                ? 'Formação'
                                : item.type === 'certification'
                                  ? 'Certificação'
                                  : 'Experiência'}
                            </span>
                          </div>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="hidden md:block h-auto"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.institution}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 mt-16">
          <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>© 2026 EduForge. Plataforma educacional pessoal.</p>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
};

export default Home;
