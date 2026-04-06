// Utilitários para persistência de dados no localStorage

const STORAGE_KEYS = {
  STUDENTS: 'eduforge_students',
  ATTENDANCE: 'eduforge_attendance',
  QUESTIONS: 'eduforge_questions',
  SYLLABUS: 'eduforge_syllabus',
  RESUME: 'eduforge_resume',
} as const;

// Funções genéricas para localStorage
export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
    throw new Error('Falha ao salvar dados. Verifique o espaço disponível.');
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
    return defaultValue;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Erro ao remover do localStorage:', error);
  }
}

// Funções específicas para cada tipo de dado
export const studentStorage = {
  save: (students: any[]) => saveToLocalStorage(STORAGE_KEYS.STUDENTS, students),
  load: () => loadFromLocalStorage(STORAGE_KEYS.STUDENTS, []),
};

export const attendanceStorage = {
  save: (attendance: any[]) => saveToLocalStorage(STORAGE_KEYS.ATTENDANCE, attendance),
  load: () => loadFromLocalStorage(STORAGE_KEYS.ATTENDANCE, []),
};

export const questionStorage = {
  save: (questions: any[]) => saveToLocalStorage(STORAGE_KEYS.QUESTIONS, questions),
  load: () => loadFromLocalStorage(STORAGE_KEYS.QUESTIONS, []),
};

export const syllabusStorage = {
  save: (syllabus: any) => saveToLocalStorage(STORAGE_KEYS.SYLLABUS, syllabus),
  load: () => loadFromLocalStorage(STORAGE_KEYS.SYLLABUS, { topics: [] }),
};

export const resumeStorage = {
  save: (resume: any) => saveToLocalStorage(STORAGE_KEYS.RESUME, resume),
  load: () => loadFromLocalStorage(STORAGE_KEYS.RESUME, null),
};
