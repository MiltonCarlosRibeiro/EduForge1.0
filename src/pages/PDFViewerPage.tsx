import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Video, Maximize, ChevronLeft, ChevronRight, FileText, Upload, Trash2, RotateCw, Minimize } from 'lucide-react';
import { pdfFileStorage, FileMetadata } from '@/lib/fileStorage';
import { toast } from 'sonner';

const PDFViewerPage: React.FC = () => {
  const [pdfFiles, setPdfFiles] = React.useState<FileMetadata[]>([]);
  const [selectedPdf, setSelectedPdf] = React.useState<FileMetadata | null>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const viewerRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    loadPdfFiles();

    // Listener para detectar saída do fullscreen
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const loadPdfFiles = () => {
    const files = pdfFileStorage.getAll();
    setPdfFiles(files);
  };

  const handleFullscreen = async () => {
    if (!viewerRef.current) return;

    try {
      if (!isFullscreen) {
        await viewerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Erro ao alternar fullscreen:', error);
      toast.error('Erro ao alternar modo tela cheia');
    }
  };

  const handleRotate = () => {
    setRotation((prev) => {
      const newRotation = (prev + 90) % 360;
      return newRotation;
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleImportPdf = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validar tipo de arquivo
    if (!file.type.includes('pdf')) {
      toast.error('Por favor, selecione um arquivo PDF');
      return;
    }

    try {
      toast.loading('Importando PDF...');
      await pdfFileStorage.add(file);
      loadPdfFiles();
      toast.dismiss();
      toast.success(`PDF "${file.name}" importado com sucesso`);
    } catch (error) {
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : 'Erro ao importar PDF');
    }

    // Limpar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeletePdf = (id: string) => {
    pdfFileStorage.remove(id);
    if (selectedPdf?.id === id) {
      setSelectedPdf(null);
    }
    loadPdfFiles();
    toast.success('PDF removido');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-12 py-12 max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl mb-4">Visualizador de PDF</h1>
            <p className="text-muted-foreground">
              Importe e visualize arquivos PDF
            </p>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleImportPdf}>
                <Upload className="w-4 h-4 mr-2" />
                Importar PDF
              </Button>
              <Button asChild variant="outline">
                <Link to="/videos">
                  <Video className="w-4 h-4 mr-2" />
                  Ir para Acervo de Vídeos
                </Link>
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Lista de PDFs */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4">Arquivos Importados</h3>
                  {pdfFiles.length === 0 ? (
                    <Alert>
                      <AlertDescription>
                        Nenhum arquivo importado. Clique em "Importar PDF" para adicionar.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-2">
                      {pdfFiles.map((file) => (
                        <div
                          key={file.id}
                          className={`group relative rounded-md transition-colors ${
                            selectedPdf?.id === file.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-accent hover:bg-accent/80'
                          }`}
                        >
                          <button
                            onClick={() => {
                              setSelectedPdf(file);
                              setCurrentPage(1);
                            }}
                            className="w-full text-left px-4 py-3 flex items-start gap-3"
                          >
                            <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <span className="text-sm block truncate">{file.name}</span>
                              <span className="text-xs opacity-70">
                                {formatFileSize(file.size)}
                              </span>
                            </div>
                          </button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePdf(file.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Visualizador de PDF */}
            <div className="lg:col-span-3">
              {!selectedPdf ? (
                <Card className="h-[600px] flex items-center justify-center">
                  <CardContent className="text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">
                      Importe ou selecione um arquivo PDF para visualizar
                    </p>
                    <Button onClick={handleImportPdf}>
                      <Upload className="w-4 h-4 mr-2" />
                      Importar PDF
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div ref={viewerRef} className={`space-y-4 ${isFullscreen ? 'bg-background p-4' : ''}`}>
                  {/* Controles */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            title="Página anterior"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <span className="text-sm px-4">
                            Página {currentPage}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleNextPage}
                            title="Próxima página"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={handleRotate}
                            title={`Rotação: ${rotation}°`}
                          >
                            <RotateCw className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={handleFullscreen}
                            title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                          >
                            {isFullscreen ? (
                              <Minimize className="w-4 h-4" />
                            ) : (
                              <Maximize className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Área de visualização do PDF */}
                  <Card className="bg-muted">
                    <CardContent className="p-4">
                      <div 
                        className={`bg-card rounded-lg overflow-auto ${
                          isFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[600px]'
                        } flex items-center justify-center`}
                      >
                        {selectedPdf.dataUrl ? (
                          <div 
                            className="w-full h-full flex items-center justify-center p-4"
                            style={{
                              transform: `rotate(${rotation}deg)`,
                              transition: 'transform 0.3s ease',
                            }}
                          >
                            <iframe
                              src={`${selectedPdf.dataUrl}#page=${currentPage}`}
                              className={`rounded-lg border border-border ${
                                rotation === 90 || rotation === 270
                                  ? 'h-full w-auto'
                                  : 'w-full h-full'
                              }`}
                              title={selectedPdf.name}
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                              }}
                            />
                          </div>
                        ) : (
                          <div className="text-center space-y-4 p-8">
                            <FileText className="w-24 h-24 mx-auto text-muted-foreground" />
                            <h3 className="text-xl">{selectedPdf.name}</h3>
                            <p className="text-muted-foreground">
                              Página {currentPage}
                            </p>
                            <Alert className="max-w-md mx-auto">
                              <AlertDescription>
                                Erro ao carregar PDF. Tente importar o arquivo novamente.
                              </AlertDescription>
                            </Alert>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PDFViewerPage;
