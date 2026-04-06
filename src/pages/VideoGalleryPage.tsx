import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Video as VideoIcon, Maximize, Play, Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { videoFileStorage, videoObjectURLs, FileMetadata } from '@/lib/fileStorage';

const VideoGalleryPage: React.FC = () => {
  const [videoFiles, setVideoFiles] = React.useState<FileMetadata[]>([]);
  const [selectedVideo, setSelectedVideo] = React.useState<FileMetadata | null>(null);
  const [videoObjectURL, setVideoObjectURL] = React.useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = React.useState<Map<string, File>>(new Map());
  const videoContainerRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const videoElementRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    loadVideoFiles();
    
    // Listener para detectar saída do fullscreen
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    // Cleanup: revogar URLs ao desmontar
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      videoObjectURLs.clear();
    };
  }, []);

  const loadVideoFiles = () => {
    const files = videoFileStorage.getAll();
    setVideoFiles(files);
  };

  const handleFullscreen = async () => {
    if (!videoElementRef.current) return;

    try {
      if (!isFullscreen) {
        // Tentar fullscreen no elemento de vídeo
        if (videoElementRef.current.requestFullscreen) {
          await videoElementRef.current.requestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Erro ao alternar fullscreen:', error);
      toast.error('Erro ao alternar modo tela cheia');
    }
  };

  const handleImportVideo = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validar tipo de arquivo
    if (!file.type.includes('video')) {
      toast.error('Por favor, selecione um arquivo de vídeo');
      return;
    }

    try {
      const metadata = videoFileStorage.add(file);
      
      // Armazenar arquivo em memória
      const newUploadedFiles = new Map(uploadedFiles);
      newUploadedFiles.set(metadata.id, file);
      setUploadedFiles(newUploadedFiles);
      
      loadVideoFiles();
      toast.success(`Vídeo "${file.name}" importado com sucesso`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao importar vídeo');
    }

    // Limpar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteVideo = (id: string) => {
    videoFileStorage.remove(id);
    videoObjectURLs.remove(id);
    
    // Remover do cache de arquivos
    const newUploadedFiles = new Map(uploadedFiles);
    newUploadedFiles.delete(id);
    setUploadedFiles(newUploadedFiles);
    
    if (selectedVideo?.id === id) {
      setSelectedVideo(null);
      setVideoObjectURL(null);
    }
    loadVideoFiles();
    toast.success('Vídeo removido');
  };

  const handleSelectVideo = (video: FileMetadata) => {
    setSelectedVideo(video);
    
    // Buscar arquivo do cache
    const file = uploadedFiles.get(video.id);
    if (file) {
      // Revogar URL anterior se existir
      if (videoObjectURL) {
        URL.revokeObjectURL(videoObjectURL);
      }
      
      // Criar nova URL
      const url = URL.createObjectURL(file);
      setVideoObjectURL(url);
      videoObjectURLs.set(video.id, url);
    } else {
      // Tentar recuperar do cache de URLs
      const cachedUrl = videoObjectURLs.get(video.id);
      if (cachedUrl) {
        setVideoObjectURL(cachedUrl);
      } else {
        toast.error('Arquivo de vídeo não encontrado. Por favor, importe novamente.');
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-background">
        <div className="container mx-auto px-6 md:px-12 py-12 max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl mb-4">Acervo de Vídeos</h1>
            <p className="text-muted-foreground">
              Importe e reproduza vídeos das suas aulas
            </p>
            <div className="mt-6">
              <Button onClick={handleImportVideo}>
                <Upload className="w-4 h-4 mr-2" />
                Importar Vídeo
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Lista de vídeos */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4">Vídeos Importados</h3>
                  {videoFiles.length === 0 ? (
                    <Alert>
                      <AlertDescription>
                        Nenhum vídeo importado. Clique em "Importar Vídeo" para adicionar.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-2">
                      {videoFiles.map((file) => (
                        <div
                          key={file.id}
                          className={`group relative rounded-md transition-colors ${
                            selectedVideo?.id === file.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-accent hover:bg-accent/80'
                          }`}
                        >
                          <button
                            onClick={() => handleSelectVideo(file)}
                            className="w-full text-left px-4 py-3 flex items-start gap-3"
                          >
                            <Play className="w-4 h-4 shrink-0 mt-0.5" />
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
                              handleDeleteVideo(file.id);
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

            {/* Player de vídeo */}
            <div className="lg:col-span-3">
              {!selectedVideo ? (
                <Card className="h-[600px] flex items-center justify-center">
                  <CardContent className="text-center">
                    <VideoIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">
                      Importe ou selecione um vídeo para reproduzir
                    </p>
                    <Button onClick={handleImportVideo}>
                      <Upload className="w-4 h-4 mr-2" />
                      Importar Vídeo
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Controles */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg truncate flex-1">{selectedVideo.name}</h3>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={handleFullscreen}
                          title="Tela cheia"
                        >
                          <Maximize className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Área de reprodução do vídeo */}
                  <Card className="bg-muted">
                    <CardContent className="p-8">
                      <div className="bg-card rounded-lg overflow-hidden">
                        {videoObjectURL ? (
                          <video
                            ref={videoElementRef}
                            src={videoObjectURL}
                            controls
                            className="w-full aspect-video bg-black"
                            controlsList="nodownload"
                          >
                            Seu navegador não suporta a reprodução de vídeo.
                          </video>
                        ) : (
                          <div className="aspect-video bg-muted flex items-center justify-center">
                            <div className="text-center space-y-4 p-8">
                              <VideoIcon className="w-24 h-24 mx-auto text-muted-foreground" />
                              <h3 className="text-xl">{selectedVideo.name}</h3>
                              <Alert className="max-w-md mx-auto">
                                <AlertDescription>
                                  Carregando vídeo...
                                </AlertDescription>
                              </Alert>
                            </div>
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

export default VideoGalleryPage;
