import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeSelector } from '@/components/ThemeSelector';
import { Footer } from '@/components/Footer';
import {
  Home,
  FileText,
  Video,
  BookOpen,
  HelpCircle,
  Users,
  ClipboardList,
  FileUser,
  Menu,
  GraduationCap,
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/pdf', label: 'Visualizador de PDF', icon: FileText },
  { path: '/videos', label: 'Acervo de Vídeos', icon: Video },
  { path: '/ementa', label: 'Ementa', icon: BookOpen },
  { path: '/questoes', label: 'Questões', icon: HelpCircle },
  { path: '/alunos', label: 'Gestão de Alunos', icon: Users },
  { path: '/notas', label: 'Gestão de Notas', icon: GraduationCap },
  { path: '/chamadas', label: 'Lista de Chamadas', icon: ClipboardList },
  { path: '/curriculo', label: 'Currículo', icon: FileUser },
];

const NavLinks = ({ onItemClick }: { onItemClick?: () => void }) => {
  const location = useLocation();

  return (
    <nav className="space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-accent'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar para desktop */}
      <aside className="hidden lg:block w-64 border-r border-border bg-card shrink-0">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-border">
            <h1 className="text-base font-medium tracking-tight">EduForge</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Plataforma Educacional
            </p>
          </div>
          <ScrollArea className="flex-1 p-4">
            <NavLinks />
          </ScrollArea>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        {/* Header desktop */}
        <header className="hidden lg:flex items-center justify-end border-b border-border bg-card px-6 py-3">
          <ThemeSelector />
        </header>

        {/* Header mobile */}
        <header className="lg:hidden border-b border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-medium tracking-tight">EduForge</h1>
            <div className="flex items-center gap-2">
              <ThemeSelector />
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="p-4 border-b border-border">
                    <h2 className="text-base font-medium tracking-tight">EduForge</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Plataforma Educacional
                    </p>
                  </div>
                  <ScrollArea className="h-[calc(100vh-80px)] p-3">
                    <NavLinks onItemClick={() => setMobileMenuOpen(false)} />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Área de conteúdo */}
        <main className="flex-1">{children}</main>
        
        {/* Rodapé */}
        <Footer />
      </div>
    </div>
  );
};
