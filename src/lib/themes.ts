// Sistema de temas da aplicação

export type ThemeName = 'normal' | 'dracula' | 'atom';

export interface Theme {
  name: ThemeName;
  displayName: string;
  fontSize: 'normal' | 'large';
}

export const themes: Record<ThemeName, Theme> = {
  normal: {
    name: 'normal',
    displayName: 'Normal',
    fontSize: 'normal',
  },
  dracula: {
    name: 'dracula',
    displayName: 'Dracula',
    fontSize: 'large',
  },
  atom: {
    name: 'atom',
    displayName: 'Atom',
    fontSize: 'large',
  },
};

const THEME_STORAGE_KEY = 'eduforge_theme';

export const themeStorage = {
  get: (): ThemeName => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && (stored === 'normal' || stored === 'dracula' || stored === 'atom')) {
        return stored as ThemeName;
      }
      return 'normal';
    } catch {
      return 'normal';
    }
  },

  set: (theme: ThemeName): void => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  },
};
