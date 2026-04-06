import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';
import { themes, themeStorage, ThemeName } from '@/lib/themes';

export const ThemeSelector: React.FC = () => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeName>(() => themeStorage.get());

  const applyTheme = (themeName: ThemeName) => {
    const theme = themes[themeName];
    
    // Remover classes de tema anteriores
    document.documentElement.classList.remove('theme-dracula', 'theme-atom');
    document.body.classList.remove('font-large');
    
    // Aplicar novo tema
    if (themeName === 'dracula') {
      document.documentElement.classList.add('theme-dracula');
      document.body.classList.add('font-large');
    } else if (themeName === 'atom') {
      document.documentElement.classList.add('theme-atom');
      document.body.classList.add('font-large');
    }
    
    // Salvar preferência
    themeStorage.set(themeName);
    setCurrentTheme(themeName);
  };

  React.useEffect(() => {
    // Aplicar tema salvo ao carregar
    applyTheme(currentTheme);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" title="Selecionar tema">
          <Palette className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => applyTheme('normal')}>
          <span className={currentTheme === 'normal' ? 'font-bold' : ''}>
            Normal
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyTheme('dracula')}>
          <span className={currentTheme === 'dracula' ? 'font-bold' : ''}>
            Dracula (Letras Grandes)
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyTheme('atom')}>
          <span className={currentTheme === 'atom' ? 'font-bold' : ''}>
            Atom (Letras Grandes)
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
