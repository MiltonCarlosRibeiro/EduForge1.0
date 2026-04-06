import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">EduForge</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Desenvolvido por Milton Carlos Ribeiro
          </p>
          <p className="text-xs text-muted-foreground">
            © 2026 Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};
