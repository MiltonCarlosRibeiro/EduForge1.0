// Utilitários para gerenciamento de arquivos importados

export interface FileMetadata {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  dataUrl?: string; // Para arquivos pequenos (PDFs)
}

const STORAGE_KEYS = {
  PDF_FILES: 'eduforge_pdf_files',
  VIDEO_FILES: 'eduforge_video_files',
} as const;

// Limite de 5MB para PDFs no localStorage
const MAX_PDF_SIZE = 5 * 1024 * 1024;

// Funções para PDFs
export const pdfFileStorage = {
  getAll: (): FileMetadata[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PDF_FILES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao carregar PDFs:', error);
      return [];
    }
  },

  add: async (file: File): Promise<FileMetadata> => {
    if (file.size > MAX_PDF_SIZE) {
      throw new Error('Arquivo PDF muito grande. Limite: 5MB');
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const metadata: FileMetadata = {
            id: Date.now().toString(),
            name: file.name,
            type: file.type,
            size: file.size,
            uploadDate: new Date().toISOString(),
            dataUrl: reader.result as string,
          };

          const files = pdfFileStorage.getAll();
          files.push(metadata);
          localStorage.setItem(STORAGE_KEYS.PDF_FILES, JSON.stringify(files));
          resolve(metadata);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  },

  remove: (id: string): void => {
    const files = pdfFileStorage.getAll().filter((f) => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.PDF_FILES, JSON.stringify(files));
  },

  get: (id: string): FileMetadata | undefined => {
    return pdfFileStorage.getAll().find((f) => f.id === id);
  },
};

// Funções para Vídeos (apenas metadados, arquivos ficam em memória durante a sessão)
export const videoFileStorage = {
  getAll: (): FileMetadata[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VIDEO_FILES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
      return [];
    }
  },

  add: (file: File): FileMetadata => {
    const metadata: FileMetadata = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString(),
    };

    const files = videoFileStorage.getAll();
    files.push(metadata);
    localStorage.setItem(STORAGE_KEYS.VIDEO_FILES, JSON.stringify(files));
    return metadata;
  },

  remove: (id: string): void => {
    const files = videoFileStorage.getAll().filter((f) => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.VIDEO_FILES, JSON.stringify(files));
  },

  get: (id: string): FileMetadata | undefined => {
    return videoFileStorage.getAll().find((f) => f.id === id);
  },
};

// Cache de vídeos em memória durante a sessão
const videoCache = new Map<string, string>();

export const videoObjectURLs = {
  set: (id: string, url: string): void => {
    videoCache.set(id, url);
  },

  get: (id: string): string | undefined => {
    return videoCache.get(id);
  },

  remove: (id: string): void => {
    const url = videoCache.get(id);
    if (url) {
      URL.revokeObjectURL(url);
      videoCache.delete(id);
    }
  },

  clear: (): void => {
    videoCache.forEach((url) => URL.revokeObjectURL(url));
    videoCache.clear();
  },
};
